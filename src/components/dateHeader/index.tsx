import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors, Icons } from '../../assets';
import { weekDays } from '../../utils';
import { widthPercentageToDP as wp,heightPercentageToDP as hp,responsiveFontSize as rf} from '../../common';

export function DateHeaderView({ date }: { date?: Date }) {
  return (
    <View style={_styles.container}>
      <Image source={Icons.IC_CALENDAR} style={_styles.icon} />
      <Text style={_styles.date}>{moment(date ?? new Date()).format('DD')}</Text>
      <View>
        <Text style={{ ..._styles.day, fontWeight: 'bold' }}>{weekDays[(date ?? new Date()).getDay()]}</Text>
        <Text style={_styles.day}>{moment(date ?? new Date()).format('MMMM YYYY')}</Text>
      </View>
    </View>
  );
}

const _styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.CYAN,
    paddingStart: 15,
    paddingEnd: 15,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: wp(10),
    height: wp(10),
    tintColor: Colors.PRIMARY,
  },
  date: {
    fontSize: rf(5),
    marginStart: 15,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  day: {
    fontSize: rf(1.8),
    marginStart: 15,
    color: Colors.PRIMARY,
  },
});
