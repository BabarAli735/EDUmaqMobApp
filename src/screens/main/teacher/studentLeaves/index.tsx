import moment from 'moment';
import React, { useRef, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Colors, Icon, Icons, ImageView, Strings } from '../../../../assets';
import { ButtonView, Container, HeaderView, HorizontalDivider, IconButton, InputTextView, SmallIconButton, VerticalDivider } from '../../../../components';
import { SmallButtonView } from '../../../../components/smallButton';
import { ApiEndpoints } from '../../../../data';
import { useAuthenticationSelector } from '../../../../redux';
import { useTeacherLeaveApprovalSelector } from '../../../../redux/selectors/TeacherLeaveApprovalSelector';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { responsiveFontSize as rf, heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../../common';
export const image = 'https://lh3.googleusercontent.com/ogw/ADea4I4g-ecyjmlL-F6UtGHPeUr2HCHp-GFrF6pWeqKV-g=s192-c-mo';

export function TeacherLeavesApprovalStudents() {
  const { profile } = useAuthenticationSelector();
  const { teacherLeaveApproval, acceptReject, acceptLoading, rejectLoading } = useTeacherLeaveApprovalSelector();
  const [isOpened, setOpened] = useState(0);

  const [startDate, setStartDate] = useState(moment().subtract(60, 'days').format('DD-MM-YYYY'));
  const [endDate, setEndDate] = useState(moment().add(30, 'days').format('DD-MM-YYYY'));
  const [showDate, setShowDate] = useState(false);
  const [showEndDate, setEndShowDate] = useState(false);
  const [date, setDate] = useState(new Date(moment(startDate, 'DD-MM-YYYY').format('YYYY-MM-DD')));
  const [eDate, setEDate] = useState(new Date(moment(endDate, 'DD-MM-YYYY').format('YYYY-MM-DD')));

  const [filtered, setFiltered] = useState(teacherLeaveApproval);
  const [sort, setSort] = useState(false);
  const [isAscending, setIsAscending] = useState(true);

  const [showSearchBar, setSearchBar] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedData, setSearchData] = useState([]);
  const ref = useRef<ModalDropdown>();
  const [selectedOption, setSelectedoption] = React.useState<String>('Sort By');
  React.useEffect(() => {
    filter();
  }, [startDate, endDate, teacherLeaveApproval]);

  // fot date filter
  const filter = () => {
    const temp = teacherLeaveApproval?.filter((item: any) => {
      const start = new Date(moment(item.fromDate, 'DD-MM-YYYY').format('YYYY-MM-DD')); //converting dates to getTime milliseconds
      const end = new Date(moment(item.toDate, 'DD-MM-YYYY').format('YYYY-MM-DD'));
      const selectStart = new Date(moment(startDate, 'DD-MM-YYYY').format('YYYY-MM-DD'));
      const selectedEnd = new Date(moment(endDate, 'DD-MM-YYYY').format('YYYY-MM-DD'));
      return start.getTime() >= selectStart.getTime() && end.getTime() <= selectedEnd.getTime();
    });
    setFiltered(temp);
  };


  React.useEffect(() => {
    if (searchText.length > 0) {
      const searched = filtered?.filter(item => {
        return item.studentName.toUpperCase().includes(searchText.toUpperCase().trim().replace(/\s/g, ''));
      });
      setSearchData(searched as any);
    } else {
      setSearchData([]);
    }
  }, [searchText]);
  const handleSelected = (data: any) => {
    ref.current.hide();
    setSelectedoption(data);
    setSort(!sort);
    console.log('====================================');
    if (data === 'Sort By Name') {
      const sorted = filtered?.sort((a, b) => a.studentName.toLowerCase().localeCompare(b.studentName.toLowerCase()));
      setFiltered(sorted);
    }

    if (data === 'Sort By Roll No') {
      const sorted = filtered?.sort((a, b) => b.studentName.toLowerCase().localeCompare(a.studentName.toLowerCase()));
      setFiltered(sorted);
    }
  };

  const renderHeader = () => {
    return (
      <View style={{ backgroundColor: Colors.CYAN }}>
        <View style={{ flexDirection: 'row', padding: wp(1.5), justifyContent: 'space-between' }}>
          <ModalDropdown
            options={['Sort By Name', 'Sort By Roll No']}
            ref={ref}
            dropdownStyle={_styles.dropDown}
            dropdownTextHighlightStyle={_styles.dropDownText}
            dropdownTextStyle={_styles.dropDownText}
            renderRow={(rowData: any) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    handleSelected(rowData);
                  }}>
                  <Text
                    style={[
                      _styles.dropDownText,
                      {
                        color: selectedOption === rowData ? Colors.ACCENT : Colors.WHITE,
                        marginVertical: hp(1),
                      },
                    ]}>{`${rowData}`}</Text>
                </TouchableOpacity>
              );
            }}>
            <TouchableOpacity
              style={{ flexDirection: 'row',alignItems:'center' }}
              onPress={() => {
                ref?.current.show();
              }}>
              <Text style={{ fontWeight: '600', color: Colors.PRIMARY }}>Sort by </Text>
              <Image source={Icons.IC_SORT} style={_styles.sort} />
            </TouchableOpacity>
          </ModalDropdown>

          <VerticalDivider color={Colors.GRAY} />
          <TouchableOpacity
            onPress={() => {
              setShowDate(!showDate);
            }}
            style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: '600', color: Colors.PRIMARY,fontSize:rf(1.8) }}>{startDate} </Text>
          </TouchableOpacity>

          <VerticalDivider color={Colors.GRAY} />

          <TouchableOpacity
            onPress={() => {
              setEndShowDate(!showEndDate);
            }}
            style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: '600', color: Colors.PRIMARY,fontSize:rf(1.8) }}>{endDate} </Text>
          </TouchableOpacity>

          <VerticalDivider color={Colors.GRAY} />
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => {
              setSearchBar(!showSearchBar);
              setSearchText('');
            }}>
            <Image source={!showSearchBar ? Icons.IC_SEARCH : Icons.IC_CANCEL_SEARCH} style={_styles.search} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={_styles.mainContainer}>
      <View style={_styles.mainContainer1}>
        <View style={_styles.imageHolder}>
          <ImageView icon={item?.studentImage && item?.studentImage.length > 0 ? ApiEndpoints.BASE_API_URL + item?.studentImage : Icons.IC_USER} style={_styles.image} />
        </View>

        <View style={_styles.name}>
          <Text style={{ fontSize: rf(1.8), fontWeight: '800', color: Colors.PRIMARY, flex: 1 }}>{item?.studentName}</Text>
          <Text style={{ fontSize: rf(1.5), color: Colors.PRIMARY, fontWeight: '500' }}>
            Std : {item?.className} &nbsp;&nbsp;&nbsp; Roll no. : {item?.rollNumber}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            item.id == isOpened ? setOpened(0) : setOpened(item.id);
          }}>
          {isOpened == item.id ? <Image source={Icons.IC_ARROW_LEFT} style={_styles.downIcon} /> : <Image source={Icons.IC_ARROW_LEFT} style={_styles.upIcon} />}
        </Pressable>
      </View>

      {isOpened == item.id && (
        <View style={{ marginHorizontal: wp(1) }}>
          <Text style={_styles.days}>
            {item?.requiredDays} {item?.requiredDays > 1 ? 'Days' : 'Day'}
          </Text>

          <View style={_styles.date}>
            <View style={{ flex: 1 }}>
              <HorizontalDivider width={1} color={Colors.GRAY} />
              <Text style={{ color: Colors.PRIMARY, fontSize: rf(1.6) }}>
                From:{moment(item?.fromDate, 'DD-MM-YYYY').format('DD MMM YY')} | To:{moment(item?.toDate, 'DD-MM-YYYY').format('DD MMM')}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              {item.leaveStatus == 'Pending' && (
                <View style={{ flexDirection: 'row' }}>
                  <SmallIconButton isLoading={rejectLoading} size={18} smallButtonColor={Colors.GRAY} icon={Icons.IC_FORBIDDEN} onPress={() => acceptReject(item.id, 'Rejected', 'reason', 'remarks')} />
                  <SmallButtonView isLoading={acceptLoading} onPress={() => acceptReject(item.id, 'Approved', 'reason', 'remarks')} title="Accept" style={{ backgroundColor: Colors.ACCENT }} />
                </View>
              )}
              {(item.leaveStatus == 'Approved' || item.leaveStatus == 'Accepted') && <SmallButtonView isLoading={false} title="Approved" style={{ backgroundColor: Colors.HOLIDAY }} />}
              {item.leaveStatus == 'Rejected' && <SmallButtonView isLoading={false} title="Rejected" style={{ backgroundColor: Colors.GRAY }} />}
            </View>
          </View>
          <Text style={{ color: Colors.GRAY }}>
            {item?.reason}Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid- idunt ut labore et dolore magna aliqua. Ut nim ad minim veniam. auis nostrud exerci. t. "ion ullamco laboris nisi ut aliquip ex ea con
            nodo consequat. Duis aute irure dolo
          </Text>
        </View>
      )}
    </View>
  );
  const setD = (dat: any) => {
    if (showDate) {
      setStartDate(moment(dat).format('DD-MM-YYYY'));
      setShowDate(false);
      setDate(dat);
      console.log('here');
    }
    if (showEndDate) {
      setEndDate(moment(dat).format('DD-MM-YYYY'));
      setEndShowDate(false);
      setEDate(dat);
      console.log('here else');
    }
  };

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.TeacherLeaveApproval.TITLE} />
        {renderHeader()}
        {showSearchBar && (
          <InputTextView
            placeHolder="Search"
            style={{ backgroundColor: Colors.WHITE, borderRadius: 0 }}
            // rightIcon={props => <Icon {...props} icon={Icons.IC_ARROW_LEFT} rotation={'270deg'} />}
            onPress={() => {
              console.log();
            }}
            onChangeText={value => setSearchText(value)}
          />
        )}

        <DateTimePickerModal
          isVisible={showDate}
          mode="date"
          date={date}
          onConfirm={setD}
          onCancel={() => {
            setShowDate(false);
            // setEndShowDate(false);
          }}
        />
        <DateTimePickerModal
          isVisible={showEndDate}
          date={eDate}
          mode="date"
          onConfirm={setD}
          onCancel={() => {
            setShowDate(false);
            // setEndShowDate(false);
          }}
        />

        {searchText.length ? <FlatList data={searchedData} renderItem={renderItem} /> : <FlatList data={filtered} renderItem={renderItem} />}
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
  mainContainer: {
    backgroundColor: Colors.WHITE,
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginTop: 4,
    borderRadius: 8,
  },
  mainContainer1: {
    flexDirection: 'row',
  },
  imageHolder: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  upIcon: {
    width: wp(4),
    height: wp(4),
    marginHorizontal: 14,
    tintColor: Colors.PRIMARY,
    transform: [{ rotate: '90deg' }],
  },
  downIcon: {
    width: wp(4),
    height: wp(4),
    tintColor: Colors.PRIMARY,
    marginHorizontal: 14,
    transform: [{ rotate: '-90deg' }],
  },
  sort: {
    width: wp(4),
    height: wp(4),
    marginHorizontal: wp(1),
    tintColor: Colors.PRIMARY,
  },
  search: {
    width: wp(5),
    height: wp(5),
    marginHorizontal: wp(1),
    tintColor: Colors.PRIMARY,
  },
  name: { padding: wp(1.5), flex: 1 },
  days: { fontSize: rf(1.8), fontWeight: '800', color: Colors.PRIMARY, paddingStart: 38 },
  date: { flexDirection: 'row', flex: 1, justifyContent: 'space-between' },
  dropDownText: {
    fontSize: rf(1.8),
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    fontWeight: '600',
    paddingLeft: wp(2),
  },
  dropDown: { backgroundColor: Colors.PRIMARY, width: wp(30), height: hp(12) },
});
