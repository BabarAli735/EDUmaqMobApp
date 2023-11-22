import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Colors, Icon, Icons, Strings } from '../../../../assets';
import { ButtonTabView, ButtonView, Container, HeaderView } from '../../../../components';
import Picker from '../../../../components/picker';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useAuthenticationSelector } from '../../../../redux';
import { useClassAttendanceGetSelector, useClassAttendancePostSelector } from '../../../../redux/selectors/ClassAttendanceSelector';
import { ApiEndpoints } from '../../../../data';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, responsiveFontSize as rf } from '../../../../common';
import moment from 'moment';

export function ClassAttendance() {
  // const [data, setData] = useState([
  //   { Roll: 0, name: 'Rajesh', Full: 100, Obtained: '', Percent: '45%', Status: 'P' },
  //   { Roll: 0, name: 'Rajesh', Full: 100, Obtained: '', Percent: '45%', Status: 'A' },
  //   { Roll: 0, name: 'Rajesh', Full: 100, Obtained: '', Percent: '45%', Status: 'P' },
  //   { Roll: 0, name: 'Rajesh', Full: 100, Obtained: '', Percent: '45%', Status: 'A' },
  // ]);
  const [selectall, setSelectAll] = useState(false);
  const { profile } = useAuthenticationSelector();
  const { attendances = [], ref, selectedOption, listData, setListData, handleSelected, fetchAttendances } = useClassAttendanceGetSelector();
  const { postAttendance } = useClassAttendancePostSelector();
  // const { Loading, response, sError } = useClassAttendancePostSelector();

  useEffect(() => {
    fetchAttendances({ classId: profile?.classId, batchId: profile?.batchId });
  }, []);

  useEffect(() => {
    if (attendances?.length > 0 && listData?.length === 0) {
      setListData(attendances?.filter(e => e?.classId === profile?.classId?.toString()));
    }
  }, [attendances]);

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.ClassAttendance.TITLE} isSearch isNotification />
        <View style={[_styles.upperContent, { justifyContent: 'space-between' }]}>
          <View style={[_styles.upperContent, { paddingHorizontal: 5 }]}>
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
                onPress={() => {
                  ref.current.show();
                }}
                style={_styles.rowContainer}>
                <Text style={_styles.titleStyle}>Sort By</Text>
                <FontAwesome name="sort" color={Colors.PRIMARY} size={18} />
              </TouchableOpacity>
            </ModalDropdown>

            <View style={_styles.borderLine} />

            <View style={_styles.rowContainer}>
              <Text style={_styles.titleStyle}>Select All</Text>
              {
                <Feather
                  onPress={() => {
                    let updatedListData = listData?.map((mapitem, index) => {
                      return { ...mapitem, attendanceStatus: !selectall };
                    });

                    // Now, you can set the updatedListData back to your state, assuming listData is part of your component's state.
                    setListData(updatedListData);
                    setSelectAll(!selectall);
                  }}
                  name={selectall ? 'check-square' : 'square'}
                  color={Colors.PRIMARY}
                  size={18}
                />
              }
            </View>
            <View style={_styles.borderLine} />

            <Picker dataKey="category" title="" layout="1" data={[]} value={'Change Class'} onSelect={val => {}} />
          </View>
        </View>
        <FlatList
          style={{ paddingTop: 5 }}
          data={listData}
          contentContainerStyle={{ paddingBottom: hp(5) }}
          renderItem={({ item, index }) => {
            // console.log(ApiEndpoints.BASE_API_URL + item?.profileImageUPL);
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center', margin: 2, marginBottom: 0, paddingHorizontal: 5, paddingRight: 15 }} key={item?.profileImageUPL + index}>
                <View style={{ flex: 1, borderRadius: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.WHITE }}>
                  <Image resizeMode="contain" source={item?.profileImageUPL ? { uri: ApiEndpoints.BASE_API_URL + item?.profileImageUPL } : Icons.IC_USER} style={{ borderWidth: 1, borderColor: 'gray', width: 40, height: 40, borderRadius: 100 }} />
                  <View style={{ padding: 5, flex: 0.85 }}>
                    <Text style={_styles.titleStyle2}>{item?.studentName || '-'}</Text>
                    <Text style={_styles.titleStyle}>Roll No: {item?.rollNo || '-'}</Text>
                  </View>
                  <View style={{ width: wp(10), height: wp(10), justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: Colors.PRIMARY, borderRadius: wp(10) }}>
                    <FontAwesome onPress={() => {}} name="phone" size={20} />
                  </View>
                </View>
                {item?.leaveStatus ? (
                  <TouchableOpacity style={{ width: wp(8), right: 4, position: 'absolute', height: wp(8), justifyContent: 'center', alignItems: 'center', borderRadius: wp(2), backgroundColor: Colors.PRIMARY }}>
                    <Text style={_styles.titleStyle2}>{'L'}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{ width: wp(8), right: 4, position: 'absolute', height: wp(8), justifyContent: 'center', alignItems: 'center', borderRadius: wp(2), backgroundColor: item?.attendanceStatus === true ? 'lightgreen' : 'red' }}
                    onPress={() => {
                      let updatedListData = listData?.map((mapitem, index) => {
                        if (mapitem.id === item.id) {
                          return { ...mapitem, attendanceStatus: !mapitem.attendanceStatus };
                        } else {
                          return mapitem;
                        }
                      });

                      // Now, you can set the updatedListData back to your state, assuming listData is part of your component's state.
                      setListData(updatedListData);

                      // Optionally, you can also call any additional functions like onAttendents(item) here.
                    }}>
                    <Text style={_styles.titleStyle2}>{item?.attendanceStatus ? 'P' : 'A'}</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
        />
      </Container>
      <ButtonView
        title="Save"
        style={{ marginHorizontal: wp(2) }}
        onPress={() => {
          let temp:any = [];
          listData?.map((mapitem, index) => {
            temp.push({
              admissionId: mapitem?.admissionId,
              batchId: mapitem?.batchId,
              classId: mapitem?.classId,
              attendanceDate:moment(new Date()).format('DD-MM-YYYY'),
              attendanceStatus: mapitem?.attendanceStatus?1:0,
              leaveStatus: mapitem?.leaveStatus?1:0,
              remarks: '',
              attendanceModeId: mapitem?.attendanceModeId,
              academicYearId: mapitem?.academicYearId,
            });
          });
          postAttendance(temp)
        }}
      />
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
  rowContainer: { flexDirection: 'row', alignItems: 'center', marginEnd: 10 },
  listItemStyle: { paddingVertical: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, backgroundColor: Colors.WHITE, borderBottomColor: Colors.GRAY, borderBottomWidth: 1 },
  upperContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: Colors.CYAN,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  upperContent2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: Colors.CYAN,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  titleStyle: {
    fontWeight: '400',
    paddingHorizontal: 6,
    fontSize: 14,
  },
  titleStyle2: {
    color: Colors.PRIMARY,
    fontWeight: '500',
    paddingHorizontal: 6,
    height: 25,
    fontSize: 16,
    paddingVertical: 0,
  },
  tableContainer: {
    backgroundColor: Colors.WHITE,
  },
  rollStyle: { flex: 0.6, paddingVertical: 6, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.PRIMARY },
  nameStyle: { flex: 2, paddingVertical: 6, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.PRIMARY },
  FullStyle: { flex: 0.8, paddingVertical: 6, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.PRIMARY },
  obtainedStyle: { flex: 1, paddingVertical: 6, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.PRIMARY },
  perStyle: { flex: 0.8, paddingVertical: 6, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.PRIMARY },
  statusStyle: { flex: 1, paddingVertical: 6, justifyContent: 'center', alignItems: 'center' },
  borderLine: { width: 1, height: 25, marginHorizontal: 10, borderLeftWidth: 2, borderColor: Colors.LIGHT_GRAY },
  dropDownText: {
    fontSize: rf(1.8),
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    fontWeight: '600',
    paddingLeft: wp(2),
  },
  dropDown: { backgroundColor: Colors.PRIMARY, width: wp(30), height: hp(12) },
});
