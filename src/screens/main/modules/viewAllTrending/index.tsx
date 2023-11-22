import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Colors, Strings } from '../../../../assets';
import {Container, HeaderView, VerticalDivider} from '../../../../components';
import {ApiEndpoints, getInstitute} from "../../../../data";
import axios from "axios";
import StoreService from "../../../../redux/StoreService";
import {logout, useMainNavigator} from "../../../../redux";
import moment from "moment/moment";
import {Screens} from "../../../index";

export function ViewAllTrending() {
  const {navigation} = useMainNavigator();

  const [trendingChapters, setTrendingChapters] = useState({});
  useEffect(() => {
    // setToken("sdsada")
    getTrendingChapters();
  }, []);
  const getTrendingChapters = async () => {
    await getInstitute().then(institute => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'InstitutionCode': institute?.institutionCode
        }
      };
      axios.get(ApiEndpoints.BASE_API_URL + ApiEndpoints.TRENDING_CHAPTERS, config)
          .then(response => {
            setTrendingChapters(response.data)
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

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.TrendingChapters.TITLE} isSearch isNotification />
        <FlatList
            style={{marginTop: 10}}
            numColumns={2}
            data={trendingChapters}
            renderItem={({item}) => {
              return (
                  <TouchableOpacity style={_styles.trendingHolder}

                                    onPress={() => {
                                      navigation.navigate(Screens.COURSE_INFORMATION as any,{HeaderText:item.subjectName} as any);
                                    }}
                  >
                    <View style={{flexDirection: 'row'}}>
                      <View style={{
                        ..._styles.trendingImageHolder,
                        borderColor: item.typeOfClass === 'Live' ? Colors.ACCENT : Colors.TRANSPARENT
                      }}>
                        <Image source={{uri: ApiEndpoints.BASE_API_URL + item.teacherImage}}
                               style={{width: 60, height: 60, borderRadius: 5}}/>
                        {item.typeOfClass === 'Live' ?
                            <View style={_styles.trendingStatusHolder}>
                              <View style={{
                                width: 5,
                                height: 5,
                                backgroundColor: Colors.WHITE,
                                marginEnd: 5,
                                borderRadius: 2.5
                              }}/>
                              <Text style={{
                                color: Colors.WHITE,
                                fontSize: 10
                              }}>{'Live'}</Text>
                            </View> : ""
                        }
                      </View>
                      <View>
                        <Text numberOfLines={2} style={{
                          ..._styles.trendingTopic,
                          fontWeight: 'bold',
                          marginStart: 5,
                          flex: 1
                        }}>
                          {item.subjectName}
                        </Text>
                        <Text style={{
                          ..._styles.trendingTopic,
                          marginStart: 5,
                          opacity: 0.7
                        }}>{item.teacherName.split(' ')[0]}</Text>
                        <Text style={{
                          ..._styles.trendingTopic,
                          fontSize: 12,
                          marginStart: 5,
                          opacity: 0.7
                        }}>{moment(item.dateTime).format('hh:mm A')}</Text>
                      </View>
                    </View>
                    <Text style={{
                      ..._styles.trendingTopic,
                      fontWeight: 'bold',
                      marginTop: 5
                    }}>{item.topicName}</Text>
                    <Text numberOfLines={3} style={_styles.trendingDescription}>
                      {item.description}
                    </Text>
                  </TouchableOpacity>
              );
            }}
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
    backgroundColor: Colors.PRIMARY,
  },
  trendingHolder: {
    padding: 5,
    margin:10,
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    width: '45%',
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
    fontSize: 14,
    color: Colors.PRIMARY,
  },
  trendingDescription: {
    fontSize: 10,
    color: Colors.PRIMARY,
    marginTop: 5,
  },
  subjectHolder: {
    width: 110,
    height: 110,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    alignItems: 'center',
  },
  subjectName: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.WHITE,
    textAlignVertical: 'center',
  },
});
