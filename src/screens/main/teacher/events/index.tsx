import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Colors, Strings } from '../../../../assets';
import { CalendarView, Container, DateHeaderView, Event, HeaderView, HorizontalDivider } from '../../../../components';
import { useEventSelector, useMainNavigator } from '../../../../redux';

export function TeacherEventsScreen() {
  const event = useEventSelector();

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.Events.TITLE} isSearch isNotification />
        <FlatList
          data={event.event}
          ListHeaderComponent={
            <>
              <HorizontalDivider width={3} />
              <DateHeaderView />
              <HorizontalDivider width={3} />
              <CalendarView
                type={'EVENT'}
                events={
                  event.event
                    ? event.event.map(item => {
                        return { date: new Date(item.startDate), color: Colors.HOLIDAY } as Event;
                      })
                    : []
                }
                onDateSelect={date => {
                  event.filter(date);
                }}
              />
            </>
          }
          renderItem={({ item }) => {
            return (
              <View style={_styles.eventHolder}>
                <View style={_styles.eventIconHolder}>
                  <Text style={_styles.eventIconDate}>{moment(new Date(item.startDate)).format('DD')}</Text>
                  <Text style={_styles.eventIconMonth}>{moment(new Date(item.startDate)).format('MMM')}</Text>
                </View>
                <View style={_styles.eventLabelHolder}>
                  <Text style={_styles.eventLabelTitle}>{item.eventName}</Text>
                  <Text style={_styles.eventLabelType}>{item.eventType === 'Holiday' ? item.eventType : 'Event'}</Text>
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
  eventHolder: {
    flexDirection: 'row',
    padding: 5,
  },
  eventIconHolder: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    backgroundColor: Colors.HOLIDAY,
  },
  eventIconDate: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 30,
  },
  eventIconMonth: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  eventLabelHolder: {
    flex: 1,
    paddingStart: 10,
    paddingEnd: 10,
    marginStart: 10,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },
  eventLabelTitle: {
    color: Colors.PRIMARY,
    fontWeight: 'bold',
    fontSize: 25,
  },
  eventLabelType: {
    color: Colors.PRIMARY,
    fontSize: 16,
  },
});
