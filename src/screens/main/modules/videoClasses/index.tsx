import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Colors, Icons, ImageView, Strings } from '../../../../assets';
import { CalendarView, Container, DateHeaderView, HeaderView, HorizontalDivider, VerticalDivider } from '../../../../components';
import { logout, useAttendanceSelector, useAuthenticationSelector, useMainNavigator } from '../../../../redux';
import { ApiEndpoints, getInstitute } from '../../../../data';
import axios from 'axios';
import StoreService from '../../../../redux/StoreService';
import { Screens } from '../../../index';

export function VideoClasses({ route }: any) {
  // const attendance = useAttendanceSelector();
  const { navigation } = useMainNavigator();
  const { profile } = useAuthenticationSelector();
  const { HeaderText } = route.params;
  console.log(route);
  let [courses, setCourses] = useState([]);
  useEffect(() => {
    getVideClasses();
  }, []);

  const getVideClasses = async () => {
    await getInstitute().then(institute => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          InstitutionCode: institute?.institutionCode,
        },
        params: { classId: profile?.classId, batchId: profile?.batchId },
      };
      console.log(config);

      axios
        .get(ApiEndpoints.BASE_API_URL + ApiEndpoints.LEARN_CHAPTER_COURSE, config)
        .then(response => {
          console.log(response);
          let subjects = response.data.subjects;
          let tempArr: [] = [];
          for (let i = 0; i < subjects.length; i++) {
            if (subjects[i].subjectName == HeaderText) {
              console.log(subjects[i].courses);
              subjects[i]?.courses.map((e: object) => tempArr.push(e));
            }
          }
          console.log(tempArr);
          setCourses(tempArr);
        })
        .catch(error => {
          if (error.response.status === 401) {
            StoreService.dispatch(logout()); // Call your logout method here
          } else {
            console.log(error);
          }
        });
    });
  };

  function gotoCourseInformation(item: any) {
    let obj = {};
    let sessionsArray = [];
    for (let chapter of item.chapters) {
      for (let session of chapter.sessions) {
        if (!sessionsArray.find(obj => obj.id === session.sessionId)) {
          sessionsArray.push(session);
          // setTrendingChapters(prevArray => [...prevArray, obj])
        }
      }
    }
    obj.sessions = sessionsArray;
    obj.teacherName = sessionsArray[0]?.teacherName;
    obj.teacherImage = sessionsArray[0]?.teacherImage;
    obj.courseImage = item.courseThumblineURL;
    obj.courseName = item.courseName;
    obj.chapterName = item?.chapters[0]?.topicPlannerTitle;
    obj.subjectName = item?.subjectName;
    console.log(obj);
    navigation.navigate(Screens.COURSE_INFORMATION as any, { HeaderText: item.subjectName, obj: obj } as any);
  }

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={HeaderText} isSearch isNotification />
        <FlatList
          data={courses}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={_styles.courseHolder}
                onPress={() => {
                  gotoCourseInformation(item);
                }}>
                <View style={_styles.twoColum}>
                  <Image source={{ uri: item?.coverImageURL ? ApiEndpoints.BASE_API_URL + item.coverImageURL : '' }} style={{ width: 70, height: 90, borderRadius: 5 }} />
                  <View style={_styles.courseDetails}>
                    <Text style={_styles.courseName}>{item.courseName}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                      }}>
                      <ImageView icon={Icons.IC_PROFILE} style={_styles.userIcon} />
                      <Text style={_styles.courseName}>{item?.chapters[0]?.sessions[0]?.teacherName}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                      }}>
                      <ImageView icon={Icons.IC_CLOCK} style={_styles.userIcon} />
                      <Text style={_styles.courseName}>{item?.chapters[0]?.sessions[0]?.sessionStartTime}</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <View style={_styles.line}></View>
                  <View style={_styles.twoColumSpace}>
                    <Text style={_styles.paid}>{item.courseType}</Text>
                    <Text style={_styles.subjectName}>{item.subjectName}</Text>
                    <Text style={_styles.subjectName}></Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
        />
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
    backgroundColor: Colors.LIGHT_GRAY,
  },
  courseHolder: {
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#fff',
  },
  twoColum: {
    padding: 10,
    flexDirection: 'row',
  },
  twoColumSpace: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseDetails: {
    margin: 10,
  },
  courseName: {
    fontWeight: 'bold',
  },
  line: {
    backgroundColor: '#cccccc',
    width: '100%',
    height: 1,
  },
  paid: {
    backgroundColor: Colors.ACCENT,
    padding: 5,
    // width: 35,
    margin: 10,
    color: '#fff',
    fontSize: 12,
    borderRadius: 5,
  },
  subjectName: {
    alignSelf: 'center',
  },
  userIcon: {
    width: 15,
    height: 15,
    margin: 2,
  },
});
