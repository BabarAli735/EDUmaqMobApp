import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { FontAwesome, Ionicons, Feather, Entypo } from '@expo/vector-icons';
import { Colors, Strings, Icon, Icons } from '../../../../assets';
import Picker from '../../../../components/picker';
import { Container, DateHeaderView, HeaderView, HorizontalDivider, ButtonView, VerticalDivider } from '../../../../components';
import { HorizontalCalendar } from '../../../../components/horizontalCalendar';
import { useClassHomeworkSelector, useClassAssignmentSelector, useClassClassworkSelector, useMainNavigator } from '../../../../redux';
import { heightPercentageToDP as hp, responsiveFontSize as rf, widthPercentageToDP as wp } from '../../../../common';

const SELECTED_CLASS_INITIAL_STATE = {
  label: '',
  value: '',
  item: {
    batchName: '',
    className: '',
    homeWorkText: '',
    homeWorkTitle: '',
    id: 0,
    subjectName: '',
  },
};

const CATEGORY_LIST_INITIAL_STATE = {
  label: '',
  value: '',
};

const CATEGORY_LIST = [
  {
    label: 'Homework',
    value: 'Homework',
  },
  {
    label: 'Classwork',
    value: 'Classwork',
  },
  {
    label: 'Assignment',
    value: 'Assignment',
  },
];

export function ClassHomeWorkScreen() {
  const [pickedDate, setPickedDate] = useState(moment());
  const [category, setCategory] = useState(CATEGORY_LIST_INITIAL_STATE);
  const [selectedClass, setSelectedClass] = useState(SELECTED_CLASS_INITIAL_STATE);

  const { homework, homeworkLoading } = useClassHomeworkSelector();
  const { assignment, assignmentLoading } = useClassAssignmentSelector();
  const { classwork, classworkLoading } = useClassClassworkSelector();
  const [image, setImage] = useState('');
  const [documents, setDocuments] = useState();
  const [editable, setEditable] = useState(false);
  const onChangeDate = (date: any) => {
    setPickedDate(date);
    setCategory(CATEGORY_LIST_INITIAL_STATE);
    setSelectedClass(SELECTED_CLASS_INITIAL_STATE);
  };

  const onSelectCategory = (item: any) => {
    setCategory(item);
    setSelectedClass(SELECTED_CLASS_INITIAL_STATE);
  };

  const onSelectClass = (item: any) => {
    setSelectedClass(item);
  };

  const filteredData = useMemo(() => {
    if (category?.label === CATEGORY_LIST[0].label) {
      return homework?.filter(({ homeWorkDate }) => homeWorkDate === pickedDate.format('YYYY-MM-DD')) || [];
    }
    if (category?.label === CATEGORY_LIST[1].label) {
      return classwork?.filter(({ classWorkDate }) => classWorkDate === pickedDate.format('YYYY-MM-DD')) || [];
    }
    if (category?.label === CATEGORY_LIST[2].label) {
      return assignment?.filter(({ assignmentDate }) => assignmentDate === pickedDate.format('YYYY-MM-DD')) || [];
    }
  }, [pickedDate, homework, assignment, category]);

  const filteredClassNames = useMemo(() => homework?.map(item => ({ label: item?.className + '' + item?.batchName, value: item?.id, item: item })) || [], [filteredData]);

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.ClassHomework.TITLE} isSearch isNotification />
        <HorizontalDivider width={4} color={Colors.PRIMARY} />

        <DateHeaderView date={pickedDate.toDate()} />
        <HorizontalCalendar setPickedDate={onChangeDate} pickedDate={pickedDate} />
        <HorizontalDivider width={4} color={Colors.PRIMARY} />
        <View style={_styles.filterContainer}>
          <Picker dataKey="category" title="Select Category" layout="1" data={CATEGORY_LIST} onSelect={onSelectCategory} value={category?.label || 'Select Category'} />
          <Picker dataKey="className" title="Select Class Name" layout="1" data={filteredClassNames} value={selectedClass?.label || 'Select Class'} onSelect={onSelectClass} />

          <ButtonView title="+" style={{ width: wp(20) }} titleStyles={{ fontSize: rf(3), fontWeight: '600' }} onPress={() => {}} />
        </View>
        <HorizontalDivider width={4} color={Colors.PRIMARY} />
        {/* {!category?.label && (
          <View style={_styles.errorContainer}>
            <Text>{`No Category Selected`} </Text>
          </View>
        )} */}

        {selectedClass?.item?.subjectName ? (
          <View style={_styles.contentContainer}>
            <View style={_styles.subjectHeader}>
              <Text style={{ fontSize: 20, fontWeight: '600', color: Colors.PRIMARY }}>{selectedClass?.item?.subjectName}</Text>
              <View style={_styles.media}>
                <View style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                  <Entypo
                    onPress={async () => {
                      let result = await DocumentPicker.getDocumentAsync({
                        type: '*/*',
                      }).then(resut => {
                        setDocuments(resut);
                      });
                    }}
                    name="attachment"
                    size={20}
                    color={Colors.PRIMARY}
                  />
                </View>
                <View style={{ width: 35, height: 35, justifyContent: 'center' }}>
                  <Entypo
                    onPress={async () => {
                      let result = await ImagePicker.launchCameraAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.All,
                        allowsEditing: true,
                        aspect: [4, 3],
                        quality: 1,
                      });
                      if (result.assets !== null) {
                        setImage(result);
                      }
                    }}
                    name="camera"
                    size={24}
                    color={Colors.PRIMARY}
                  />
                </View>
              </View>
              <ButtonView title={Strings.ClassHomework.BUTTON} style={_styles.uploadBtn} isLoading={false} onPress={() => {}} />
            </View>
            {image !== '' && <Image style={{ height: wp(15), width: wp(15), margin: wp(2) }} source={{ uri: image?.assets[0]?.uri }} />}
            {documents !== undefined && <Text style={_styles.homeworkContent}>{documents?.uri}</Text>}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextInput style={_styles.homeworkTitle} placeholder={selectedClass?.item?.homeWorkTitle} placeholderTextColor={Colors.PRIMARY} editable={editable} />
              <TouchableOpacity
                onPress={() => {
                  setEditable(!editable);
                }}>
                <Text style={_styles.homeworkContent}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={_styles.homeworkContent}>{selectedClass?.item?.homeWorkText}</Text>
          </View>
        ) : // <View style={_styles.errorContainer}>
        //   <Text>{`No ${category?.label} Found`} </Text>
        // </View>nuk
        null}
        <View style={_styles.approvalConatiner}>
          <View style={_styles.statusContainer}>
            <Text style={_styles.statusText}>Pending: </Text>
            <VerticalDivider width={2} color={Colors.LIGHT_GRAY} />
            <Text style={_styles.statusText}>Compose: </Text>
            <VerticalDivider width={2} color={Colors.LIGHT_GRAY} />
            <Text style={_styles.statusText}>Complete: </Text>
          </View>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
            <View style={{ flex: 1, borderRadius: 10, paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.WHITE }}>
              <Image resizeMode="contain" source={Icons.IC_USER} style={{ borderWidth: 1, borderColor: 'gray', width: 40, height: 40, borderRadius: 100 }} />
              <View style={{ padding: 5, flex: 0.85 }}>
                <Text style={_styles.titleStyle2}>{'Student 1'}</Text>
                <Text style={_styles.titleStyle}>Roll No: {'Student No'}</Text>
              </View>

              <View>
                <Text style={_styles.submissionDate}>{pickedDate.format('DD MMM YYYY')}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', borderRadius: 6 }}>
                    <Ionicons onPress={() => {}} name="md-eye-outline" size={20} color={Colors.WHITE} />
                  </View>
                  <View style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', borderRadius: 6 }}>
                    <Feather onPress={() => {}} name="phone-call" size={20} color={Colors.WHITE} />
                  </View>
                  <View style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                    <Feather onPress={() => {}} name="check-square" size={35} color="red" />
                  </View>
                </View>
              </View>
            </View>
          </View> */}
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
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  errorContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
  },
  subjectHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: Colors.CYAN,
    borderRadius: 12,
    paddingLeft: 20,
  },
  media: {
    padding: 2,
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  iconHolder: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: 5,
  },
  uploadBtn: {
    fontWeight: 'bold',
    alignSelf: 'center',
    width: wp(20),
    paddingVertical: hp(0.5),
  },
  homeworkTitle: {
    fontSize: rf(1.8),
    fontWeight: '600',
    padding: 10,
    color: Colors.PRIMARY,
  },
  homeworkContent: {
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 12,
    padding: 10,
    color: Colors.PRIMARY,
  },
  approvalConatiner: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 12,
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: Colors.CYAN,
    borderRadius: 12,
    paddingHorizontal: 20,
  },
  statusText: {
    color: Colors.PRIMARY,
    fontSize: 18,
    fontWeight: '600',
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
    marginVertical: 4,
  },
  submissionDate: {
    color: Colors.TEXT_GRAY,
    marginBottom: 4,
    marginLeft: 'auto',
  },
});
