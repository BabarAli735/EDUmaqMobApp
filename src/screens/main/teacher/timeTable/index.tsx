import moment from 'moment';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from 'react-native-swiper-flatlist/src/themes';
import { Colors, Icons, Strings } from '../../../../assets';
import { Container, DateHeaderView, HeaderView, HorizontalDivider } from '../../../../components';
import { useAuthenticationSelector } from '../../../../redux';
import { useTeacherTimeTableSelector } from '../../../../redux/selectors/TeacherTimeTableSelector';
import { getCalendar, getDates } from '../../../../utils';

export const image = 'https://lh3.googleusercontent.com/ogw/ADea4I4g-ecyjmlL-F6UtGHPeUr2HCHp-GFrF6pWeqKV-g=s192-c-mo';

export function TeacherTimeTable() {
  const { profile } = useAuthenticationSelector();
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [count, setCount] = useState(0);
  const [allClasses, setAllClasses] = useState([]);
  const [timetable, setTimeTable] = useState([]);
  const { isLoading, teacherTimeTable, error, onRetry } = useTeacherTimeTableSelector();

  const [date, setDate] = React.useState<Date>(new Date());
  const [dates, setDates] = React.useState<Date[]>(getCalendar(getDates(date.getMonth(), date.getFullYear())));

  React.useEffect(() => {
    setDates(getCalendar(getDates(date.getMonth(), date.getFullYear())));
  }, [date]);

  React.useEffect(() => {
    if (teacherTimeTable) {
      setDays(teacherTimeTable?.Table);
      setAllClasses(teacherTimeTable?.Table1);
      setSelectedDay(teacherTimeTable?.Table[0]?.weekname);
    }
  }, [teacherTimeTable]);

  React.useEffect(() => {
    console.log('here!');
    if (allClasses && selectedDay) {
      setTimeTable([]);
      const filtered = allClasses.filter(item => item?.WeekName == selectedDay);
      setTimeTable(filtered);
    }
  }, [selectedDay]);

  const next = (c: number) => {
    console.log(c);
    if (days.length > c) {
      setCount(c);
      setSelectedDay(teacherTimeTable?.Table[c]?.weekname);
      console.log(count);
    }
  };
  const previous = (c: number) => {
    if (c > -1) {
      setCount(c);
      setSelectedDay(teacherTimeTable?.Table[c]?.weekname);
      console.log('minus', count);
    } else {
      console.log('minus');
    }
  };

  const renderPeriod = ({ item, index }: any) => (
    <View style={_styles.periodRow}>
      <View style={{ backgroundColor: Colors.PRIMARY, padding: 10, marginHorizontal: 8, borderRadius: 2 }}>
        <Text style={{ ..._styles.number }}>{index + 1}</Text>
      </View>
      <View style={_styles.viewConaitner}>
        <View style={_styles.timeContainer}>
          <Text style={{ ..._styles.time }}>{item?.PeriodTime}</Text>
          <Text style={{ ..._styles.time }}>{item?.SubjectName}</Text>
        </View>
        <HorizontalDivider color={Colors.LIGHT_GRAY} />
        <View style={_styles.timeContainer}>
          <Text style={{ ..._styles.room }}>Class:{item?.ClassCourse}</Text>
          <Text style={{ ..._styles.room }}>Room no:{item?.RoomName}</Text>
        </View>
      </View>
    </View>
  );
  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView isDrawer title={Strings.TeacherTimeTable.TITLE} isSearch isNotification />
        <HorizontalDivider width={4} color={Colors.PRIMARY} />
        <DateHeaderView />
        <View style={_styles.header2}>
          <TouchableOpacity style={_styles.buttonCircle} onPress={() => previous(count - 1)}>
            <Image source={Icons.IC_ARROW_LEFT} style={_styles.leftIcon} />
          </TouchableOpacity>

          <Text style={_styles.title}>{selectedDay}</Text>
          <TouchableOpacity style={_styles.buttonCircle} onPress={() => next(count + 1)}>
            <Image source={Icons.IC_ARROW_LEFT} style={_styles.rightIcon} />
          </TouchableOpacity>
        </View>
        <FlatList data={timetable} renderItem={renderPeriod} />
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
  viewConaitner: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  timeContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  dayHeader: {
    margin: 2,
    height: 50,
  },
  dayHolder: {
    padding: 6,
    borderRadius: 5,
    backgroundColor: Colors.ACCENT,
  },
  number: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  time: {
    color: Colors.PRIMARY,
  },
  room: {
    color: Colors.GRAY,
  },
  dayName: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },

  periodRow: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    padding: 6,
    marginTop: 4,
    borderRadius: 8,
  },
  header2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 4,
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
    width: 20,
    height: 20,
    tintColor: Colors.PRIMARY,
  },
  rightIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.PRIMARY,
    transform: [{ rotate: '180deg' }],
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.PRIMARY,
  },
  calendar: {
    margin: 3,
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
  },
});
