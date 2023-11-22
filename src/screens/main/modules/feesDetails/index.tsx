import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Icon, Icons, Strings } from '../../../../assets';
import { Container, HeaderView, VerticalDivider } from '../../../../components';
import { isDocumentExtension, isImageExtension } from '../../../../utils';
import { ApiEndpoints, getInstitute, getToken } from '../../../../data';
import axios from 'axios';
import StoreService from '../../../../redux/StoreService';
import { logout, useAuthenticationSelector } from '../../../../redux';
import moment from 'moment';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const TabComponent = ({ weight, title, isSelected, onPress }: { weight: number; title: string; isSelected: boolean; onPress: () => void }) => {
  return (
    <TouchableOpacity
      style={{
        ..._styles.tab,
        flex: weight,
        borderBottomWidth: isSelected ? 1.5 : 0,
        borderBottomColor: isSelected ? Colors.WHITE : Colors.NORMAL_TAB,
      }}
      onPress={() => onPress()}>
      <Text style={{ ..._styles.tabTitle, color: isSelected ? Colors.WHITE : Colors.NORMAL_TAB }}>{title}</Text>
    </TouchableOpacity>
  );
};

export function FeesDetailsScreen(feeItem: any) {
  const [tab, setTab] = React.useState(0);
  const [feeList, setFeeList] = useState([]);
  const { profile } = useAuthenticationSelector();
  const [totalPayment, setTotalPayment] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [isAllPaid, setIsAllPaid] = useState(true);

  async function getDataFromServer() {
    await getInstitute().then(institute => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          InstitutionCode: institute?.institutionCode,
          // 'Authorization': 'Bearer ' + getToken()
        },
      };

      let url = ApiEndpoints.BASE_API_URL + ApiEndpoints.GET_STUDENT_PAYMENT + '?id=' + profile?.id;
      // + profile?.batchId + "/" + profile?.classId + "/" + profile?.admissionNo
      axios
        .get(url, config)
        .then(response => {
          let data = response.data;
          setFeeList(data);
          getAllPaidStatus(data);
        })
        .catch(error => {
          if (error.response.status === 401) {
            StoreService.dispatch(logout()); // Call your logout method here
          } else {
            console.log(error);
          }
        });
    });
  }

  React.useEffect(() => {
    if (tab === 0) {
    } else if (tab === 1) {
    } else if (tab === 2) {
    } else {
    }

    getDataFromServer();
  }, [tab]);

  function getFormattedDate(createdDate: any) {
    const date = moment(createdDate);
    const formattedDate = date.format('DD MMM');
    // const formattedDate = date.format('YYYY-MM-DD');
    return formattedDate;
  }

  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [feeLoading, setFeeLoading] = useState(false);
  const [feeHeadDetails, setFeeHeadDetails] = useState([]);

  async function callNewApi(index: number, id: any) {
    if (expandedIndex == index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
      setFeeHeadDetails([]);
      setFeeLoading(true);
      await getInstitute().then(institute => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            InstitutionCode: institute?.institutionCode,
          },
        };

        let url = ApiEndpoints.BASE_API_URL + ApiEndpoints.GET_FEE_HEAD_BY_INSTALLMENT + id + '/' + profile?.classId + '/' + profile.id;

        axios
          .get(url, config)
          .then(response => {
            let feeHeadByInstallment = response.data;
            setFeeHeadDetails(feeHeadByInstallment);
            setFeeLoading(false);
          })
          .catch(error => {
            setFeeLoading(false);
            if (error.response.status === 401) {
              StoreService.dispatch(logout()); // Call your logout method here
            } else {
              console.log(error);
            }
          });
      });
    }
  }

  function calculateTotal(feeItem: any, feeHeadDetails: any[]) {
    let total = 0;
    for (let feeHeadItem of feeHeadDetails) {
      total += feeHeadItem?.amount;
    }
    total += feeItem?.fineAmount - feeItem?.discount;

    return total;
  }

  function checkedItem(feeItem: any, isChecked: any) {
    if (totalPayment.some(selectedItem => selectedItem.id === feeItem.id)) {
      // Item is already selected, so remove it from the array
      const newSelectedItems = totalPayment.filter(selectedItem => selectedItem.id !== feeItem.id);
      setTotalPayment(newSelectedItems);
    } else {
      // Item is not yet selected, so add it to the array
      setTotalPayment([...totalPayment, feeItem]);
    }

    // const selectedIndex = totalPayment.indexOf(feeItem);
    //
    // if (selectedIndex === -1) {
    //     totalPayment.push(feeItem)
    //     // setTotalPayment([...totalPayment, feeItem]);
    //
    //     // Log the selected item
    // }else{
    //     const newSelectedItems = [...totalPayment];
    //     newSelectedItems.splice(selectedIndex, 1);
    //     setTotalPayment(newSelectedItems);
    //
    // }
    // let gt=0;
    // for(let payment of totalPayment){
    //     gt+=payment?.amount
    // }
    // setGrandTotal(gt)
  }

  let totalAmount = 0;
  for (const item of totalPayment) {
    totalAmount += item.amount;
  }

  const getAllPaidStatus = (data: any) => {
    const isPaidArray = data.map((item: any) => item.isPaid);

    const isAllTrue = isPaidArray.every((item: any) => item === true);
    setIsAllPaid(isAllTrue);
  };

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.Fees.TITLE} isSearch isNotification />

        <View style={_styles.tabs}>
          <TabComponent weight={1} title={'Academic Fee'} isSelected={tab === 0} onPress={() => setTab(0)} />
          <TabComponent weight={1} title={'Transport Fee'} isSelected={tab === 1} onPress={() => setTab(1)} />
          <TabComponent weight={1} title={'Hostel Fee'} isSelected={tab === 2} onPress={() => setTab(2)} />
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flex: 5 }}>
            <FlatList
              data={feeList}
              renderItem={({ item: feeItem, index }) => {
                const isExpanded = expandedIndex === index;
                return (
                  <View style={_styles.feeItem}>
                    <View style={_styles.feeHolder}>
                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {feeItem?.isPaid ? (
                          ''
                        ) : (
                          <BouncyCheckbox
                            size={25}
                            fillColor={Colors.PRIMARY}
                            isChecked={totalPayment.some(selectedItem => selectedItem.id === feeItem.id)}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: 'red', borderRadius: 5 }}
                            innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
                            onPress={(isChecked: boolean) => {
                              checkedItem(feeItem, isChecked);
                            }}
                          />
                        )}
                      </View>
                      <View style={_styles.feeAmountHolder}>
                        <Text style={{ color: Colors.PRIMARY }}>{feeItem.installmentName}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={_styles.feeAmount}>₹{feeItem.amount}</Text>
                          <Text style={feeItem.isPaid ? _styles.feePaid : _styles.feeUnpaid}>{feeItem.isPaid ? 'Paid' : 'Unpaid'}</Text>
                        </View>
                      </View>
                      <View style={{ flex: 2 }}>
                        <Text style={_styles.feeDate}>{getFormattedDate(feeItem.createdDate)}</Text>

                        <TouchableOpacity style={_styles.downArrow} onPress={() => callNewApi(index, feeItem?.id)}>
                          {isExpanded ? <Icon icon={Icons.IC_ARROW_LEFT} size={20} color={Colors.PRIMARY} rotation={'90deg'} /> : <Icon icon={Icons.IC_ARROW_LEFT} size={20} color={Colors.PRIMARY} rotation={'270deg'} />}
                        </TouchableOpacity>
                      </View>
                    </View>
                    {isExpanded && (
                      <View style={_styles.expandedArea}>
                        {feeLoading ? (
                          <ActivityIndicator />
                        ) : (
                          <View>
                            <FlatList
                              data={feeHeadDetails}
                              renderItem={({ item: feeHead }) => {
                                return (
                                  <View style={_styles.feeHeadItemDetails}>
                                    <Text style={_styles.feeHeadItemText}>{feeHead.feeHeadName}</Text>
                                    <Text style={_styles.feeHeadItemText}>₹{feeHead.amount}</Text>
                                  </View>
                                );
                              }}
                            />
                            <View style={_styles.feeHeadItemDetails}>
                              <Text style={_styles.feeHeadItemText}>Fine</Text>
                              <Text style={_styles.feeHeadItemText}>₹{feeItem?.fineAmount}</Text>
                            </View>

                            <View style={_styles.feeHeadItemDetails}>
                              <Text style={_styles.feeHeadItemText}>Discount</Text>
                              <Text style={_styles.feeHeadItemText}>
                                {feeItem?.discount > 0 ? '-' : ''} ₹{feeItem?.discount}
                              </Text>
                            </View>
                            <View style={_styles.feeHeadItemDetails}>
                              <Text style={_styles.feeHeadTotal}>Total Fee</Text>
                              <Text style={_styles.feeHeadTotal}> ₹ {calculateTotal(feeItem, feeHeadDetails)}</Text>
                            </View>
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                );
              }}
            />
          </View>
          {!isAllPaid && (
            <View style={_styles.bottomView}>
              <Text style={_styles.payableAmount}>Payable amount ₹{totalAmount}</Text>
              <TouchableOpacity style={_styles.proceedBtn}>
                <Text style={_styles.proceedBtnText}>Proceed to Pay</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Container>
    </Container>
  );
}

const _styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.ACCENT,
  },
  container: {
    backgroundColor: Colors.PRIMARY,
  },
  tab: {
    flex: 1,
    paddingBottom: 10,
    borderBottomWidth: 0,
    borderBottomColor: Colors.WHITE,
  },
  tabTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  tabs: {
    padding: 10,
    flexDirection: 'row',
  },
  feeHolder: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
  feeHeader: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  feeDate: {
    fontSize: 20,
    color: Colors.PRIMARY,
    alignSelf: 'center',
  },
  feeAmountHolder: {
    marginStart: 10,
    fontSize: 18,
    flex: 7,
  },
  feeAmount: {
    fontSize: 40,
    color: Colors.PRIMARY,
  },
  feePaid: {
    height: 20,
    color: '#fff',
    padding: 2,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 10,
    backgroundColor: '#42c900',
  },
  feeUnpaid: {
    height: 20,
    color: '#fff',
    padding: 2,
    backgroundColor: '#be0000',
    borderRadius: 5,
    alignSelf: 'center',
    margin: 10,
  },
  downArrow: {
    alignSelf: 'center',
    margin: 5,
  },
  feeItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 2,
  },
  expandedArea: {
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
    marginEnd: 20,
    marginStart: 20,
  },
  feeHeadItemDetails: {
    flexDirection: 'row',
    margin: 3,
    justifyContent: 'space-between',
  },
  feeHeadItemText: {
    color: Colors.PRIMARY,
    fontSize: 17,
  },
  feeHeadTotal: {
    color: Colors.PRIMARY,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomView: {
    flex: 1,
    backgroundColor: '#fdf3f3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payableAmount: {
    color: Colors.PRIMARY,
    alignSelf: 'center',
    margin: 10,
    fontSize: 20,
  },
  proceedBtn: {
    backgroundColor: Colors.ACCENT,
    width: 180,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  proceedBtnText: {
    color: '#fff',
    fontSize: 20,
  },
});
