import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screens } from '../../..';
import { Colors, Icon, Icons } from '../../../../assets';
import { Container, HeaderView, VerticalDivider, VirtualizedList } from '../../../../components';
import { ApiEndpoints } from '../../../../data';
import { useLearnWithVideoSelector, useMainNavigator, useMyCoursesSelector, useRecommendedLessonsSelector } from '../../../../redux';
import { DummyVideoClasses } from '../../../../utils';
import Shimmer from '../../../../components/shimmer';

export function LearnScreen() {
  const { navigation } = useMainNavigator();

  const { myCourses, isLoading } = useMyCoursesSelector();
  const { recommendedLessons, isLoading: isLoadingLessons } = useRecommendedLessonsSelector();
  const { learnWithVideos, isLoading: isLoadinngVidoes } = useLearnWithVideoSelector();

  const viewCourseInformation = (item: any) => {
    navigation.navigate(Screens.COURSE_INFORMATION as any, { HeaderText: item.subjectName, obj: item } as any);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'English':
        return Icons.IC_ENGLISH;
      case 'Social Science':
        return Icons.IC_SOCIAL_SCIENCE;
      case 'Math':
        return Icons.IC_MATHS;
      case 'Geology':
        return Icons.IC_BIOLOGY;
      default:
        return Icons.IC_ENGLISH;
    }
  };

  const getBackgroundColor = (name: string) => {
    switch (name) {
      case 'English':
        return '#D35400';
      case 'Social Science':
        return '#2ECC71';
      case 'Math':
        return '#2980B9';
      case 'Geology':
        return '#16A085';
      default:
        return '#D35400';
    }
  };

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView isDrawer isSearch isNotification />
        <VirtualizedList>
          <>
            {/*My courses section*/}
            <View style={_styles.myCoursesBg}>
              <Text style={_styles.myCoursesText}>My Courses</Text>
              <View>
                {isLoading ? (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
                    {[0, 1].map((_, i) => (
                      <View key={i} style={[_styles.courseHolder, { padding: 10, marginRight: 12 }]}>
                        <View style={{ flexDirection: 'row' }}>
                          <View>
                            <Shimmer width={100} height={'100%'} borderRadius={5} />
                          </View>
                          <View style={{ marginLeft: 6 }}>
                            <Shimmer width={112} height={14} borderRadius={4} marginBottom={4} />
                            <Shimmer width={60} height={20} borderRadius={4} />
                            <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                              <Shimmer width={112} height={14} borderRadius={4} />
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                ) : (
                  <FlatList
                    horizontal={true}
                    data={myCourses}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 12 }}
                    ItemSeparatorComponent={() => <VerticalDivider width={12} />}
                    renderItem={({ item }) => {
                      const uri = ApiEndpoints.BASE_API_URL + item?.teacherImage;
                      return (
                        <TouchableOpacity
                          style={_styles.courseHolder}
                          onPress={() => {
                            viewCourseInformation(item);
                          }}>
                          {item?.teacherImage ? (
                            <Image source={{ uri: uri }} style={{ width: 100, height: '100%', borderRadius: 8, marginRight: 8 }} />
                          ) : (
                            <View style={{ width: 100, height: '100%', borderRadius: 8, marginRight: 8, backgroundColor: Colors.LIGHT_GRAY }}></View>
                          )}
                          <View style={_styles.courseInfoHolder}>
                            <Text style={_styles.courseTitle} numberOfLines={1}>
                              {item?.courseName}
                            </Text>
                            <View style={_styles.freeOrPaid}>
                              <Text style={_styles.freeOrPaidTxt}>{item?.courseType}</Text>
                            </View>
                            <Text style={_styles.sessions}>Total Sessions: {item?.sessions?.length ?? 0}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                )}
              </View>
            </View>

            {/*Test & Quiz*/}
            <Text style={[_styles.textAndQuiz, { color: Colors.PRIMARY }]}>Test & Quiz</Text>
            <View>
              <FlatList
                horizontal={true}
                data={DummyVideoClasses}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity activeOpacity={0.5} style={_styles.itemContainer}>
                      <View style={{ ..._styles.subjectHolder, backgroundColor: Colors.LIGHT_GRAY }}></View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {/*Subject wise learning*/}
            <Text style={[_styles.textAndQuiz, { color: Colors.PRIMARY }]}>Subject wise learning</Text>
            {isLoadinngVidoes ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[0, 1, 2].map((_, i) => (
                  <View key={i} style={[_styles.itemContainer, { marginRight: 10, marginTop: 10 }]}>
                    <Shimmer width={110} height={110} borderRadius={10} />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <FlatList
                horizontal={true}
                data={learnWithVideos}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  const icon = getIcon(item?.subjectName);
                  const backgroundColor = getBackgroundColor(item.subjectName);
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={_styles.itemContainer}
                      onPress={() => {
                        navigation.navigate(Screens.VIDEO_CLASSES as any, { HeaderText: item.subjectName } as any);
                      }}>
                      <View style={{ ..._styles.subjectHolder, backgroundColor }}>
                        <Icon icon={icon} size={45} color={Colors.WHITE} />
                        <Text adjustsFontSizeToFit numberOfLines={1} style={_styles.subjectName}>
                          {item.subjectName}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}

            {/*Recommended Lessons*/}
            <Text style={[_styles.textAndQuiz, { color: Colors.PRIMARY }]}>Recommended Lessons</Text>
            <View>
              {isLoadingLessons ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {[0, 1].map((_, i) => (
                    <View key={i} style={[_styles.recommendedContainer, { marginRight: 12 }]}>
                      <View style={{ flexDirection: 'row' }}>
                        <View>
                          <Shimmer width={100} height={130} borderRadius={8} />
                        </View>
                        <View style={{ marginLeft: 8 }}>
                          <Shimmer width={200} height={20} borderRadius={4} marginBottom={16} marginTop={8} />
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                              <Shimmer width={80} height={14} borderRadius={4} marginBottom={4} />
                              <Shimmer width={80} height={12} borderRadius={4} />
                            </View>
                            <View>
                              <Shimmer width={80} height={14} borderRadius={4} marginBottom={4} />
                              <Shimmer width={80} height={12} borderRadius={4} />
                            </View>
                          </View>
                          <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                            <Shimmer width={200} height={14} borderRadius={4} />
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <FlatList
                  horizontal
                  data={recommendedLessons}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={_styles.recommendedContainer}
                        onPress={() => {
                          viewCourseInformation(item);
                        }}>
                        <View style={_styles.twoColumn}>
                          {item?.teacherImage ? (
                            <Image
                              source={{ uri: ApiEndpoints.BASE_API_URL + item?.teacherImage }}
                              style={{
                                width: 100,
                                height: 130,
                                borderRadius: 8,
                                marginRight: 8,
                              }}
                            />
                          ) : (
                            <View style={{ width: 100, height: 130, borderRadius: 8, marginRight: 8, backgroundColor: Colors.LIGHT_GRAY }}></View>
                          )}
                          <View>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: Colors.WHITE,
                              }}>
                              {item?.courseName}
                            </Text>
                            <View style={[_styles.twoColumn, { justifyContent: 'space-between', width: '63%' }]}>
                              <View>
                                <Text style={_styles.label}>Session No</Text>
                                <Text style={_styles.value}>{item?.sessions[0]?.sessionId}</Text>
                              </View>
                              <View>
                                <Text style={_styles.label}>Duration</Text>
                                <Text style={_styles.value}>{item?.sessions[0]?.sessionDuration}:00</Text>
                              </View>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                              }}>
                              <Text style={_styles.teacherName}>BY: {item?.sessions[0]?.teacherName}</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              )}
            </View>
          </>
        </VirtualizedList>
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
    backgroundColor: Colors.WHITE,
  },
  myCoursesBg: {
    backgroundColor: Colors.PRIMARY,
  },
  exploreBtn: {
    backgroundColor: Colors.ACCENT,
    paddingLeft: 10,
    paddingEnd: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
    color: Colors.WHITE,
    paddingTop: 12,
  },
  value: {
    fontWeight: '500',
    fontSize: 16,
    color: Colors.PRESENT,
  },
  teacherName: {
    fontWeight: '500',
    fontSize: 16,
    color: Colors.PRESENT,
  },
  myCoursesText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.WHITE,
    margin: 12,
  },
  courseHolder: {
    backgroundColor: Colors.WHITE,
    width: 240,
    height: 140,
    padding: 8,
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 12,
  },
  courseTitle: {
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 4,
  },
  freeOrPaid: {
    flex: 1,
  },
  freeOrPaidTxt: {
    backgroundColor: Colors.ACCENT,
    fontSize: 12,
    color: Colors.WHITE,
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'baseline',
    borderRadius: 12,
  },
  twoColumn: {
    flexDirection: 'row',
  },
  twoColumnSpace: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  textAndQuiz: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.WHITE,
    marginStart: 12,
    marginTop: 12,
  },
  courseInfoHolder: {
    flex: 1,
  },
  itemContainer: {
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 12,
  },
  recommendedContainer: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 12,
    padding: 12,
    margin: 10,
    width: 340,
  },
  subjectHolder: {
    backgroundColor: Colors.WHITE,
    width: 110,
    height: 110,
    padding: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  subjectName: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.WHITE,
    textAlignVertical: 'center',
  },
  sessions: {
    fontSize: 14,
    fontWeight: '400',
  },
});
