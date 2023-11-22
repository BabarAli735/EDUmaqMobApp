import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { Colors } from '../../assets';
import { heightPercentageToDP as hp, responsiveFontSize as rf} from '../../common';

export function HorizontalCalendar({ setPickedDate, pickedDate }: any) {
  const customDatesStyles = (date: any) =>
    date.format('YYYY-MM-DD') === pickedDate.format('YYYY-MM-DD')
      ? {
          dateNameStyle: { fontSize: 14, color: 'white' },
          dateNumberStyle: { fontSize: 14, color: 'white' },
          dateContainerStyle: { backgroundColor: Colors.PRIMARY },
        }
      : {};
  return (
    <View style={styles.container}>
      <CalendarStrip
        scrollable
        style={{ height: hp(7), paddingBottom: 12, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
        calendarColor={'#fff'}
        calendarHeaderStyle={{ color: 'white' }}
        dateNumberStyle={{ color: Colors.PRIMARY, fontSize: rf(1.6) }}
        dateNameStyle={{ color: Colors.PRIMARY, fontSize: rf(1.6) }}
        iconContainer={{ flex: 0.1 }}
        onDateSelected={date => setPickedDate(date)}
        highlightDateNameStyle={{ fontSize: rf(1.6), color: 'white' }}
        highlightDateNumberStyle={{ fontSize: rf(1.6), color: 'white' }}
        customDatesStyles={customDatesStyles}
        selectedDate={pickedDate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 12 },
});
