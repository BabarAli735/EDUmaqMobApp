import { ResizeMode, Video } from 'expo-av';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Icons, ImageView } from '../../../../assets';
import { Container, HeaderView } from '../../../../components';
import { ApiEndpoints } from '../../../../data';

export function CourseInformation({ route }: any) {
  const { obj } = route.params;

  const video = React.useRef(null);

  const [activeTab, setActiveTab] = useState('tab1');
  let [count, setCount] = useState(0);
  const [videoUri, setVideoUri] = React.useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  console.log(obj);
  const data = [
    'http://amaratmaterials.com/videos/v1.mp4',
    'http://amaratmaterials.com/videos/v2.mp4',
    'http://amaratmaterials.com/videos/v3.mp4',
    'http://amaratmaterials.com/videos/v4.mp4',
    // Add more items as needed
  ];

  console.log(obj);
  const handleTabClick = (tabName: any) => {
    setActiveTab(tabName);
  };

  function handlePressItem(item: any) {
    setVideoUri(data[count]);
    count++;
    setCount(count);

    setSelectedItem(item.sessionId);
  }

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={obj.subjectName} isSearch isNotification />
        {videoUri ? (
          <Video
            ref={video}
            style={_styles.video}
            source={{
              uri: videoUri,
            }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping
          />
        ) : (
          <View style={[_styles.video, { justifyContent: 'center', alignItems: 'center' }]}>
            <ImageView icon={Icons.IC_PLAY} style={_styles.liveImg} />
          </View>
        )}
        <Text style={_styles.chapterName}>{obj.courseName ?? '-'}</Text>
        {obj?.typeOfClass === 'Video' ? (
          <View style={[_styles.rowView, { alignItems: 'center' }]}>
            <View style={_styles.badge}>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.WHITE,
                }}>
                {obj?.typeOfClass}
              </Text>
            </View>
            <Text style={_styles.courseName}>{obj.subjectName ?? '-'}</Text>
          </View>
        ) : (
          <View style={[_styles.rowView, { alignItems: 'center' }]}>
            <ImageView icon={Icons.IC_LIVE} style={_styles.liveImg} />
            <Text style={_styles.courseName}>{obj.subjectName ?? '-'}</Text>
          </View>
        )}
        <View style={_styles.line}></View>
        <View style={_styles.rowView}>
          <View style={_styles.teacherView}>
            <Image source={{ uri: ApiEndpoints.BASE_API_URL + obj?.teacherImage }} style={{ width: 40, height: 40, borderRadius: 40, marginRight: 8 }} />
          </View>

          <Text style={_styles.teacherName}>{obj?.teacherName ?? '-'}</Text>
        </View>

        <View style={_styles.tabContainer}>
          <TouchableOpacity style={[_styles.tabItemOne, activeTab === 'tab1' && _styles.activeTabItem]} onPress={() => handleTabClick('tab1')}>
            <Text style={[_styles.tabText, activeTab === 'tab1' && _styles.activeTabText]}>Sessions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[_styles.tabItemTwo, activeTab === 'tab2' && _styles.activeTabItem]} onPress={() => handleTabClick('tab2')}>
            <Text style={[_styles.tabText, activeTab === 'tab2' && _styles.activeTabText]}>Course Information</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[_styles.tabItemOne, activeTab === 'tab3' && _styles.activeTabItem]} onPress={() => handleTabClick('tab3')}>
            <Text style={[_styles.tabText, activeTab === 'tab3' && _styles.activeTabText]}>Resource</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'tab1' && (
          <View style={_styles.tabContent}>
            <FlatList
              data={obj?.sessions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={[_styles.rowViewSpace, { backgroundColor: item.sessionId === selectedItem ? '#aaa' : '#eee' }]}>
                    <View style={_styles.rowView}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          handlePressItem(item);
                        }}
                        style={{
                          justifyContent: 'center',
                        }}>
                        {item.sessionId === selectedItem ? <ImageView icon={Icons.PAUSE_BUTTON} style={_styles.playBtn} /> : <ImageView icon={Icons.PLAY_BUTTON} style={_styles.playBtn} />}
                      </TouchableOpacity>
                      <Text style={_styles.sessionTitle}>{obj?.topicName ?? obj?.chapterName ?? '-'}</Text>
                    </View>

                    <Text style={_styles.sessionDate}>{item?.sessionDuration}:00</Text>
                  </View>
                );
              }}
            />
          </View>
        )}
        {activeTab === 'tab2' && (
          <View style={_styles.tabContent}>
            <Text></Text>
          </View>
        )}
        {activeTab === 'tab3' && (
          <View style={_styles.tabContent}>
            <Text></Text>
          </View>
        )}
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
    backgroundColor: Colors.L_GRAY,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  tabItemTwo: {
    flex: 2,
    marginRight: 16,
  },
  tabItemOne: {
    flex: 1,
    marginRight: 16,
  },
  activeTabItem: {},
  tabText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.TEXT_GRAY,
  },
  teacherView: {
    width: 40,
    height: 40,
    borderRadius: 40,
    margin: 10,
  },
  activeTabText: {
    fontWeight: 'bold',
    borderBottomWidth: 2,
  },
  tabContent: {
    flex: 1,
  },
  rowViewSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowView: {
    flexDirection: 'row',
  },
  playBtn: {
    width: 20,
    height: 20,
    marginStart: 10,
  },
  liveImg: {
    width: 40,
    height: 40,
    marginStart: 10,
  },
  sessionTitle: {
    margin: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  sessionDate: {
    margin: 10,
    alignSelf: 'center',
  },
  courseName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  teacherName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.TEXT_GRAY,
    alignSelf: 'center',
  },
  chapterName: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#aaa',
    marginTop: 12,
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.25,
  },
  badge: {
    width: 40,
    marginStart: 16,
    backgroundColor: Colors.ACCENT,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
