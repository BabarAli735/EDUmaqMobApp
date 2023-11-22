import moment from 'moment';
import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screens } from '../../..';
import { Colors, Icon, Icons, ImageView, Images } from '../../../../assets';
import { Container, HeaderView, VerticalDivider, VirtualizedList } from '../../../../components';
import Shimmer from '../../../../components/shimmer';
import { ApiEndpoints } from '../../../../data';
import { useAuthenticationSelector, useInstituteSelector, useLearnWithVideoSelector, useMainNavigator, useTrendingChapterSelector } from '../../../../redux';
import { AcademicModules } from '../../../../utils';

export function HomeScreen() {
  const { navigation } = useMainNavigator();

  const { profile } = useAuthenticationSelector();
  const { institute } = useInstituteSelector();
  const { trendingChapters, isLoading } = useTrendingChapterSelector();
  const { learnWithVideos, isLoading: isLoadinngVidoes } = useLearnWithVideoSelector();

  const viewCourseInformation = (item: any) => {
    console.log(item);
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
        <Image source={Images.IMG_PATTERN_HEADER} style={{ width: '200%', height: '50%', position: 'absolute', opacity: 0.3, resizeMode: 'cover' }} />
        <HeaderView isDrawer isSearch isNotification color={Colors.TRANSPARENT} />
        <VirtualizedList>
          <View style={{ alignItems: 'center' }}>
            <View style={_styles.header}>
              <View style={_styles.imageHolder}>
                <ImageView icon={profile?.imageUrl ? ApiEndpoints.BASE_API_URL + profile?.imageUrl : Icons.IC_USER} style={_styles.image} />
              </View>
              <Text style={_styles.name}>Hi, {profile?.userName ?? profile?.studentName}</Text>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <View style={_styles.codeHolder}>
                  <Text style={_styles.code}>{institute?.institutionCode}</Text>
                </View>
                <Text style={_styles.institute}>{institute?.institutionName}</Text>
              </View>
            </View>

            {/* Trending Chapters */}
            <View style={{ ..._styles.section, backgroundColor: Colors.PRIMARY }}>
              <TouchableOpacity
                style={_styles.sectionTitleHolder}
                onPress={() => {
                  navigation.navigate(Screens.VIEW_ALL_TRENDING as any);
                }}>
                <Text style={_styles.sectionTitle}>{'Trending Chapters'}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: Colors.WHITE, fontSize: 12, marginEnd: 5 }}>{'View All'}</Text>
                  <Icon icon={Icons.IC_ARROW_LEFT} size={12} color={Colors.WHITE} rotation={'180deg'} />
                </View>
              </TouchableOpacity>
              {isLoading ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {[0, 1].map((_, i) => (
                    <View key={i} style={[_styles.trendingHolder, { padding: 10, marginRight: 12, marginTop: 10 }]}>
                      <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                        <View>
                          <Shimmer width={60} height={60} borderRadius={5} />
                        </View>
                        <View style={{ marginLeft: 6 }}>
                          <Shimmer width={112} height={14} borderRadius={4} marginBottom={4} />
                          <Shimmer width={112} height={14} borderRadius={4} marginBottom={4} />
                          <Shimmer width={112} height={14} borderRadius={4} />
                        </View>
                      </View>
                      <Shimmer width={150} height={14} borderRadius={4} marginBottom={4} />
                      <Shimmer width={150} height={18} borderRadius={4} />
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <FlatList
                  data={trendingChapters}
                  horizontal
                  style={{ marginTop: 10 }}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <VerticalDivider width={10} />}
                  renderItem={({ item }) => {
                    const uri = ApiEndpoints.BASE_API_URL + item?.teacherImage;
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          viewCourseInformation(item);
                        }}
                        style={_styles.trendingHolder}>
                        <View style={{ flexDirection: 'row' }}>
                          <View
                            style={{
                              ..._styles.trendingImageHolder,
                              borderColor: item?.typeOfClass === 'Live' ? Colors.ACCENT : Colors.TRANSPARENT,
                            }}>
                            <Image source={{ uri }} style={{ width: 60, height: 60, borderRadius: 5 }} />
                            {item?.typeOfClass === 'Live' && (
                              <View style={_styles.trendingStatusHolder}>
                                <View
                                  style={{
                                    width: 5,
                                    height: 5,
                                    backgroundColor: Colors.WHITE,
                                    marginEnd: 5,
                                    borderRadius: 2.5,
                                  }}
                                />
                                <Text
                                  style={{
                                    color: Colors.WHITE,
                                    fontSize: 10,
                                  }}>
                                  {'Live'}
                                </Text>
                              </View>
                            )}
                          </View>
                          <View style={{ flexWrap: 'wrap' }}>
                            <Text
                              numberOfLines={2}
                              style={{
                                ..._styles.trendingTopic,
                                fontWeight: 'bold',
                                marginStart: 6,
                              }}>
                              {item?.subjectName}
                            </Text>
                            <Text
                              style={{
                                ..._styles.trendingTopic,
                                marginStart: 6,
                                opacity: 0.7,
                              }}>
                              {item?.teacherName}
                            </Text>
                            <Text
                              style={{
                                ..._styles.trendingTopic,
                                fontSize: 12,
                                marginStart: 6,
                                opacity: 0.7,
                              }}>
                              {moment(item?.dateTime).format('DD-MM-YYYY hh:mm A')}
                            </Text>
                          </View>
                        </View>
                        <Text
                          numberOfLines={1}
                          style={{
                            ..._styles.trendingTopic,
                            fontWeight: 'bold',
                            marginTop: 6,
                          }}>
                          {item?.topicName ?? '-'}
                        </Text>
                        <Text numberOfLines={3} style={_styles.trendingDescription}>
                          {item?.description ?? '-'}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              )}
            </View>

            {/* Learn with Video Class */}
            <View style={_styles.section}>
              <TouchableOpacity style={{ ..._styles.sectionTitleHolder, opacity: 1 }}>
                <Text
                  style={{
                    ..._styles.sectionTitle,
                    color: Colors.PRIMARY,
                  }}>
                  {'Learn with Video Class'}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: Colors.PRIMARY, fontSize: 12, marginEnd: 5 }}>{'View All'}</Text>
                  <Icon icon={Icons.IC_ARROW_LEFT} size={12} color={Colors.PRIMARY} rotation={'180deg'} />
                </View>
              </TouchableOpacity>
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
                    const backgroundColor = getBackgroundColor(item?.subjectName);
                    return (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={_styles.itemContainer}
                        onPress={() => {
                          console.log(item);
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
            </View>

            {/* Explore Academics */}
            <View style={_styles.section}>
              <TouchableOpacity activeOpacity={1} style={{ ..._styles.sectionTitleHolder, opacity: 1 }}>
                <Text
                  style={{
                    ..._styles.sectionTitle,
                    color: Colors.PRIMARY,
                  }}>
                  {'Explore Academics'}
                </Text>
              </TouchableOpacity>
              <FlatList
                numColumns={4}
                data={AcademicModules}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={_styles.itemContainer}
                      onPress={() => {
                        navigation.navigate(item.id as any);
                      }}>
                      <View style={{ ..._styles.iconHolder, backgroundColor: item.color }}>
                        <ImageView icon={item.icon} size={40} style={{ tintColor: Colors.WHITE }} />
                      </View>
                      <Text style={_styles.nameModule} adjustsFontSizeToFit numberOfLines={1}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
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
    backgroundColor: Colors.ACCENT,
  },
  header: {
    width: '100%',
    paddingBottom: 10,
    alignItems: 'center',
  },
  imageHolder: {
    width: 140,
    height: 140,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: Colors.WHITE,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
  name: {
    fontSize: 22,
    marginTop: 10,
    color: Colors.WHITE,
  },
  codeHolder: {
    borderRadius: 5,
    paddingStart: 5,
    paddingEnd: 5,
    marginEnd: 5,
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },
  code: {
    fontSize: 9,
    fontWeight: 'bold',
    color: Colors.ACCENT,
  },
  institute: {
    fontSize: 14,
    color: Colors.WHITE,
  },
  section: {
    width: '100%',
    padding: 10,
    backgroundColor: Colors.WHITE,
  },
  sectionTitleHolder: {
    flexDirection: 'row',
  },
  sectionTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  iconHolder: {
    padding: 15,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#aaa',
    shadowOpacity: 1,
    elevation: 2,
    backgroundColor: '#0000',
    borderRadius: 25,
  },
  nameModule: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    color: '#000',
    textAlignVertical: 'center',
  },
  /// Old Styles
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.WHITE,
    marginTop: 10,
    textTransform: 'uppercase',
  },
  itemContainer: {
    flex: 1,
    marginEnd: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },
  itemIcon: {
    width: 85,
    height: 85,
  },
  itemTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.WHITE,
    marginTop: 10,
  },
  trendingHolder: {
    padding: 8,
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    width: 182,
    minWidth: Dimensions.get('window').width * 0.25,
  },
  trendingImageHolder: {
    borderRadius: 5,
    borderColor: Colors.ACCENT,
    borderWidth: 1,
    padding: 1,
  },
  trendingStatusHolder: {
    position: 'absolute',
    backgroundColor: Colors.ACCENT,
    start: 1,
    end: 1,
    bottom: 1,
    flexDirection: 'row',
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendingTopic: {
    fontSize: 12,
    color: Colors.PRIMARY,
  },
  trendingDescription: {
    fontSize: 10,
    color: Colors.PRIMARY,
    marginTop: 6,
  },
  subjectHolder: {
    width: 110,
    height: 110,
    padding: 1,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  subjectName: {
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
    color: Colors.WHITE,
    textAlignVertical: 'center',
  },
});
