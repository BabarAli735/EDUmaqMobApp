import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Icons, Images, ImageView, Strings } from '../../../../assets';
import { ButtonTabView, ButtonView, Container, HeaderView, HorizontalDivider, InputTextAreaView, InputTextView, VerticalDivider } from '../../../../components';
import { Store, teacherProfileRequest, useAuthenticationSelector } from '../../../../redux';
import StoreService from '../../../../redux/StoreService';
import { ApiEndpoints } from '../../../../data';
import { SmallButtonView } from '../../../../components/smallButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import { mystudentsRequest } from '../../../../redux/actions/StudentsByTeacherActions';
import { useComplaintsSelector, useMyStudentSelector } from '../../../../redux/selectors/MystudentsSelector';
import { useSubmitComplaintStudentSelector } from '../../../../redux/selectors/SubmitStudentComplaintSelector';
import { heightPercentageToDP as hp,widthPercentageToDP as wp,responsiveFontSize as rf} from '../../../../common';

export const image = 'https://lh3.googleusercontent.com/ogw/ADea4I4g-ecyjmlL-F6UtGHPeUr2HCHp-GFrF6pWeqKV-g=s192-c-mo';

const STUDENT = 'STUDENT';
const COMPLAINT = 'COMPLAINT';

export function TeacherComplaints() {
  const { profile } = useAuthenticationSelector();
  const { myStudents } = useMyStudentSelector();
  const { complaints } = useComplaintsSelector();

  React.useEffect(() => {
    console.log('---', myStudents, complaints);
  }, [complaints]);

  const refRBSheet = useRef<RBSheet>(null);
  // const [subject, setSubject] = useState<string>();
  const [activeItem, setActiveItem] = useState<string>();
  const [selectedTab, setSelectedTab] = useState<string>(STUDENT);

  const student = myStudents || [];

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

  const renderHeader = () => {
    return (
      <View style={{ backgroundColor: Colors.CYAN }}>
        <View style={{ flexDirection: 'row', padding: 8, justifyContent: 'space-around' }}>
          <TouchableOpacity style={_styles.innerContainer_1} onPress={() => {}}>
            <Text style={_styles._label}>Class</Text>
            <Image source={Icons.IC_SORT} style={_styles.icon} />
          </TouchableOpacity>
          <VerticalDivider color={Colors.GRAY} />

          <TouchableOpacity style={_styles.innerContainer_1} onPress={() => {}}>
            <Text style={_styles._label}>Batch</Text>
            <Image source={Icons.IC_ASK} style={_styles.icon} />
          </TouchableOpacity>

          <VerticalDivider color={Colors.GRAY} />

          <View style={_styles.innerContainer_1}>
            <SmallButtonView style={{ backgroundColor: Colors.PRIMARY }} titleStyle={{ fontSize: 16 }} onPress={() => console.log('here')} title="&nbsp;&nbsp;Submit&nbsp;&nbsp;" />
          </View>
        </View>
        {/* //white row */}
        <View style={{ flexDirection: 'row', backgroundColor: Colors.WHITE, padding: 4 }}>
          <TouchableOpacity style={_styles.innerContainer} onPress={() => {}}>
            <Text style={_styles._label}>Class</Text>
            <View style={{ width: 40 }}></View>
          </TouchableOpacity>

          <TouchableOpacity style={_styles.innerContainer} onPress={() => {}}>
            <Text style={_styles._label}>Subject</Text>
            <View style={{ width: 36 }}></View>
          </TouchableOpacity>
          <View style={_styles.innerContainer}></View>
        </View>
      </View>
    );
  };

  const renderStudents = ({ item }: any) => (
    <View style={_styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          console.log(item);
          setActiveItem(item);
          refRBSheet?.current?.open();
        }}
        style={_styles.mainContainer1}>
        <View style={_styles.imageHolder}>
          <ImageView icon={item?.imageUrl && item?.imageUrl.length > 0 ? ApiEndpoints.BASE_API_URL + item?.imageUrl : Icons.IC_USER} style={_styles.image} />
        </View>

        <View style={{ ..._styles.name, paddingVertical: 10 }}>
          <Text style={_styles.mainLabel}>{item?.studentName}</Text>
          <Text style={{ fontSize: 16, color: Colors.PRIMARY, fontWeight: '500' }}>
            Std : {item?.classCourseName} &nbsp;&nbsp;&nbsp; Roll no. : {item?.id}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  const renderComplaints = ({ item }: any) => (
    <View style={_styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          setActiveItem(item);
          refRBSheet?.current?.open();
        }}
        style={_styles.mainContainer1}>
        <View style={_styles.imageHolder}>
          <ImageView icon={item?.imageUrl && item?.imageUrl.length > 0 ? ApiEndpoints.BASE_API_URL + item?.imageUrl : Icons.IC_USER} style={_styles.image} />
        </View>

        <View style={_styles.name}>
          <Text style={_styles.mainLabel}>{item?.subject}</Text>
          {/* <Text style={{ fontSize: 12, color: Colors.PRIMARY, fontWeight: '500' }}>Complaint Detail : {item?.complaintDetail}</Text> */}
          <HorizontalDivider width={1} color={Colors.GRAY} />
          <Text style={[_styles.complaintLabel, { paddingTop: 4 }]}>Complaint: {item.id}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const BottomComponent = () => {
    const [subject, setSubject] = useState<string>();
    const [complaintText, setComplaintText] = useState<string>();
    const { submitComplaint, responseData } = useSubmitComplaintStudentSelector();

    const submitComplainByStudent = () => {
      try {
        const params = {
          admissionId: activeItem?.id,
          subject: subject,
          complaintDetail: complaintText,
          status: false,
          createdDate: moment().toISOString(),
          modifiedDate: moment().toISOString(),
          isDeleted: false,
        };
        console.log(params);
        submitComplaint(params);
        refRBSheet?.current?.close();
      } catch (error) {}
    };

    return (
      <View style={_styles.bottomSheet}>
        <View style={{ flex: 1, width: '100%', padding: 2 }}>
          <Text style={{ ..._styles._label, paddingTop: 6 }}>Subject:-</Text>
          <InputTextView
            value={subject || activeItem?.subject || ''}
            onChangeText={subjectText => {
              setSubject(subjectText);
            }}
          />

          <Text style={{ ..._styles._label, paddingTop: 6 }}>Complaint details:-</Text>
          <InputTextAreaView value={complaintText || activeItem?.complaintDetail || ''} onChangeText={complaintText => setComplaintText(complaintText)} multiline={true} numberOfLines={6} />
        </View>
        {selectedTab == STUDENT && (
          <ButtonView
            onPress={() => {
              if (subject?.trim() && complaintText?.trim()) {
                submitComplainByStudent();
              }
            }}
            title="Submit Complaint"
          />
        )}
      </View>
    );
  };

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.TeacherStudentComplaint.TITLE} />

        {/* <View style={{ flexDirection: 'row', paddingVertical: 2, justifyContent: 'space-evenly' }}>
          <ButtonTabView
            activeOpacity={0.5}
            onPress={() => setSelectedTab(STUDENT)}
            textColor={selectedTab == STUDENT ? Colors.PRIMARY : Colors.WHITE}
            style={{ ..._styles.tab, backgroundColor: selectedTab == STUDENT ? Colors.ACCENT : Colors.GRAY }}
            title="My Students"
          />
          <ButtonTabView
            activeOpacity={0.5}
            onPress={() => setSelectedTab(COMPLAINT)}
            textColor={selectedTab == COMPLAINT ? Colors.PRIMARY : Colors.WHITE}
            style={{ ..._styles.tab, backgroundColor: selectedTab == COMPLAINT ? Colors.ACCENT : Colors.GRAY }}
            title="Complaints"
          />
        </View> */}
        <View style={_styles.tabs}>
          <TabComponent weight={1} title={'My Students'} isSelected={selectedTab == STUDENT} onPress={() => setSelectedTab(STUDENT)} />
          <TabComponent weight={1} title={'Complaints'} isSelected={selectedTab == COMPLAINT} onPress={() => setSelectedTab(COMPLAINT)} />
        </View>

        {selectedTab == STUDENT && <FlatList data={student} renderItem={renderStudents} />}
        {selectedTab == COMPLAINT && <FlatList data={complaints} renderItem={renderComplaints} />}
        <RBSheet
          ref={refRBSheet}
          height={350}
          openDuration={250}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              // justifyContent: 'center',
              // alignItems: 'center',
            },
          }}>
          <BottomComponent />
        </RBSheet>
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
  header: {
    alignItems: 'center',
    paddingBottom: 30,
    backgroundColor: Colors.TRANSPARENT,
  },
  mainLabel: { fontSize: 16, fontWeight: '800', color: Colors.PRIMARY, flex: 1 },
  complaintLabel: { fontSize: 16, color: Colors.PRIMARY, flex: 1 },
  icon: {
    width: 16,
    height: 16,
    marginHorizontal: 10,
    tintColor: Colors.WHITE,
  },
  innerContainer_1: { flexDirection: 'row', alignItems: 'center' },
  _label: { fontWeight: '600', color: Colors.PRIMARY, fontSize: 16 },
  innerContainer: { flexDirection: 'row', flex: 1, justifyContent: 'center' },

  mainContainer: {
    backgroundColor: Colors.WHITE,
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginTop: 4,
    borderRadius: 8,
  },
  mainContainer1: {
    flexDirection: 'row',
    alignItems:'center'
  },
  tabTitle: {
    fontSize: rf(1.8),
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.WHITE,
    marginBottom:hp(1.5)
  },
  tabs: {
    padding: 10,
    flexDirection: 'row',
  },
  imageHolder: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(13),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  name: { padding: 4 },

  bottomSheet: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 4,
  },
  tab: { flex: 1, paddingHorizontal: 20, borderRadius: 0 },
});
