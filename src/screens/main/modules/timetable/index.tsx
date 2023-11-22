import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Icons, ImageView, Strings } from '../../../../assets';
import { Container, ContentList, DateHeaderView, HeaderView, HorizontalDivider } from '../../../../components';
import { TimeTable } from '../../../../data';
import { useTimeTableSelector } from '../../../../redux';

export function TimeTableScreen() {
  const { date, dates, setDate, isLoading, timeTable, error, onRetry } = useTimeTableSelector();

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.TimeTable.TITLE} isSearch isNotification />
        <View style={_styles.dayHeader}>
          <TouchableOpacity style={{ ..._styles.dayHolder, backgroundColor: date.getDay() == 0 || date.getDay() == 1 ? Colors.ACCENT : Colors.WHITE }} onPress={() => setDate(dates[0])}>
            <Text style={{ ..._styles.dayName, color: date.getDay() == 0 || date.getDay() == 1 ? Colors.WHITE : Colors.ACCENT }}>{'MON'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ..._styles.dayHolder, backgroundColor: date.getDay() == 2 ? Colors.ACCENT : Colors.WHITE }} onPress={() => setDate(dates[1])}>
            <Text style={{ ..._styles.dayName, color: date.getDay() == 2 ? Colors.WHITE : Colors.ACCENT }}>{'TUE'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ..._styles.dayHolder, backgroundColor: date.getDay() == 3 ? Colors.ACCENT : Colors.WHITE }} onPress={() => setDate(dates[2])}>
            <Text style={{ ..._styles.dayName, color: date.getDay() == 3 ? Colors.WHITE : Colors.ACCENT }}>{'WED'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ..._styles.dayHolder, backgroundColor: date.getDay() == 4 ? Colors.ACCENT : Colors.WHITE }} onPress={() => setDate(dates[3])}>
            <Text style={{ ..._styles.dayName, color: date.getDay() == 4 ? Colors.WHITE : Colors.ACCENT }}>{'THU'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ..._styles.dayHolder, backgroundColor: date.getDay() == 5 ? Colors.ACCENT : Colors.WHITE }} onPress={() => setDate(dates[4])}>
            <Text style={{ ..._styles.dayName, color: date.getDay() == 5 ? Colors.WHITE : Colors.ACCENT }}>{'FRI'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ..._styles.dayHolder, backgroundColor: date.getDay() == 6 ? Colors.ACCENT : Colors.WHITE }} onPress={() => setDate(dates[5])}>
            <Text style={{ ..._styles.dayName, color: date.getDay() == 6 ? Colors.WHITE : Colors.ACCENT }}>{'SAT'}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ ..._styles.dayHeader, backgroundColor: Colors.ACCENT, justifyContent: 'space-between' }}>
          <Text style={{ ..._styles.dayName, color: Colors.WHITE }}>{'Total Periods : ' + (timeTable?.length ?? 0)}</Text>
          {timeTable && timeTable.length != 0 && (
            <Text style={{ ..._styles.dayName, color: Colors.WHITE }}>{moment(new Date(timeTable[0].startTime)).format('hh:mm A') + ' to ' + moment(new Date(timeTable[timeTable.length - 1].endTime)).format('hh:mm A')}</Text>
          )}
        </View>
        <HorizontalDivider width={3} />
        <DateHeaderView date={date} />
        <HorizontalDivider width={3} />
        <ContentList<TimeTable>
          items={timeTable}
          isLoading={isLoading}
          isRetry={!!error}
          onRetry={() => onRetry()}
          onRefresh={() => onRetry()}
          message={error ? error.error.message : Strings.Siblings.EMPTY}
          onRender={(item, index) => {
            return (
              <View style={_styles.itemHolder}>
                <View style={_styles.image}>{item.imageURI ? <ImageView icon={item.imageURI} style={_styles.image} /> : <Image source={Icons.IC_PLACEHOLDER} style={{ width: 40, height: 40, tintColor: Colors.PRIMARY }} />}</View>
                <View style={{ justifyContent: 'center', marginStart: 10 }}>
                  <Text style={_styles.title}>{item.subjectName}</Text>
                  <Text style={_styles.subTitle}>{'Time: ' + moment(new Date(item.startTime)).format('hh:mm A') + ' to ' + moment(new Date(item.endTime)).format('hh:mm A')}</Text>
                  <Text style={_styles.subTitle}>{item.roomName}</Text>
                </View>
                <View style={{ ..._styles.professorHolder, top: 5, right: 5 }}>
                  <Text style={_styles.professor}>{String(index + 1).padStart(2, '0')}</Text>
                </View>
                <View style={{ ..._styles.professorHolder, bottom: 5, right: 5 }}>
                  <Text style={_styles.professor}>{item.employeeName}</Text>
                </View>
              </View>
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
  dayHeader: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
  },
  dayHolder: {
    flex: 1,
    padding: 3,
    borderRadius: 5,
    backgroundColor: Colors.ACCENT,
  },
  dayName: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemHolder: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: Colors.L_GRAY,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  subTitle: {
    fontSize: 16,
    color: Colors.PRIMARY,
    marginTop: 5,
  },
  professorHolder: {
    backgroundColor: '#9DBEF5',
    padding: 5,
    position: 'absolute',
    borderRadius: 5,
  },
  professor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  count: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
});
