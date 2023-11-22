import moment from 'moment';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Icons } from '../../assets';
import { getCalendar, getDates, isToday } from '../../utils';
import { responsiveFontSize as rf, widthPercentageToDP as wp } from '../../common';

export interface Event {
  date: Date;
  color?: string;
  textColor?: string;
}

interface Props {
  events?: Event[];
  onDateSelect?: (date: Date) => void;
  type: 'ATTENDANCE' | 'EVENT' | 'HOLIDAY';
}

export function CalendarView({ events, type, onDateSelect }: Props) {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THUS', 'FRI', 'SAT'];
  const [date, setDate] = React.useState<Date>(new Date());
  const [dates, setDates] = React.useState<Date[]>(getCalendar(getDates(date.getMonth(), date.getFullYear())));

  React.useEffect(() => {
    onDateSelect && onDateSelect(date);
    setDates(getCalendar(getDates(date.getMonth(), date.getFullYear())));
  }, [date]);

  return (
    <View>
      <View style={_styles.header}>
        <TouchableOpacity style={_styles.button} onPress={() => setDate(moment(date).add(-1, 'years').toDate())}>
          <Image source={Icons.IC_ARROW_DOWN} style={_styles.leftIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={_styles.buttonCircle} onPress={() => setDate(moment(date).add(-1, 'months').toDate())}>
          <Image source={Icons.IC_ARROW_LEFT} style={_styles.leftIcon} />
        </TouchableOpacity>
        <Text style={_styles.title}>{moment(date).format('MMMM YYYY')}</Text>
        <TouchableOpacity style={_styles.buttonCircle} onPress={() => setDate(moment(date).add(1, 'months').toDate())}>
          <Image source={Icons.IC_ARROW_LEFT} style={_styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={_styles.button} onPress={() => setDate(moment(date).add(1, 'years').toDate())}>
          <Image source={Icons.IC_ARROW_DOWN} style={_styles.rightIcon} />
        </TouchableOpacity>
      </View>
      <View style={_styles.calendar}>
        <FlatList
          data={dates}
          bounces={false}
          numColumns={7}
          ListHeaderComponent={
            <View style={_styles.dayNameHolder}>
              {days.map((item, index) => {
                return (
                  <Text key={index.toString()} style={{ ..._styles.dayName, color: index === 0 ? Colors.HOLIDAY : Colors.PRIMARY }}>
                    {item}
                  </Text>
                );
              })}
            </View>
          }
          renderItem={({ item, index }) => {
            if (item.getTime() === 0) {
              return (
                <View style={_styles.dateHolder}>
                  <Text key={index.toString()} style={_styles.disabled}>
                    {moment(item).format('D')}
                  </Text>
                </View>
              );
            } else if (item.getDay() === 0) {
              const event = events?.filter(event => moment(event.date).toDate().toDateString() === moment(item).toDate().toDateString());

              const isEvent = event && event.length > 0 && type !== 'ATTENDANCE';

              return (
                <View style={_styles.dateHolder}>
                  {isEvent && <View style={{ ..._styles.event, backgroundColor: Colors.HOLIDAY }} />}
                  <Text key={index.toString()} style={{ ..._styles.sunday, color: isEvent ? Colors.WHITE : Colors.HOLIDAY }}>
                    {moment(item).format('D')}
                  </Text>
                </View>
              );
            } else {
              const event = events?.filter(event => moment(event.date).toDate().toDateString() === moment(item).toDate().toDateString());

              const backgroundColor = type !== 'ATTENDANCE' && isToday(item) ? Colors.GRAY : event && event.length > 0 ? event[0].color : Colors.TRANSPARENT;
              const textColor = type !== 'ATTENDANCE' && isToday(item) ? Colors.WHITE : event && event.length > 0 ? (event[0].textColor ? event[0].textColor : Colors.WHITE) : Colors.PRIMARY;

              return (
                <View style={_styles.dateHolder}>
                  <View style={{ ..._styles.event, backgroundColor: backgroundColor }} />
                  <Text key={index.toString()} style={{ ..._styles.date, color: textColor }}>
                    {moment(item).format('D')}
                  </Text>
                </View>
              );
            }
          }}
        />
      </View>
    </View>
  );
}

const _styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: Colors.L_GRAY,
  },
  button: {
    padding: 10,
    margin: 5,
  },
  buttonCircle: {
    padding: 10,
    margin: 5,
    backgroundColor: Colors.CYAN,
    borderRadius: 20,
  },
  leftIcon: {
    width: wp(4),
    height: wp(4),
    tintColor: Colors.PRIMARY,
  },
  rightIcon: {
    width: wp(4),
    height: wp(4),
    tintColor: Colors.PRIMARY,
    transform: [{ rotate: '180deg' }],
  },
  title: {
    flex: 1,
    fontSize: rf(2),
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.PRIMARY,
  },
  calendar: {
    margin: 3,
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
  },
  dayNameHolder: {
    flexDirection: 'row',
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.L_GRAY,
  },
  dayName: {
    flex: 1,
    fontSize: rf(1.8),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dateHolder: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunday: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
    fontSize: rf(1.8),
    color: Colors.HOLIDAY,
  },
  date: {
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
    fontSize: rf(1.8),
    color: Colors.PRIMARY,
  },
  disabled: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
    fontSize: rf(1.8),
    color: Colors.TRANSPARENT,
  },
  event: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: 5,
    bottom: 5,
    borderRadius: 20,
    backgroundColor: Colors.TRANSPARENT,
  },
});
