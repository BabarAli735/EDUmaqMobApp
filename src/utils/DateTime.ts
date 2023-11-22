import moment from 'moment';

export function getDates(month: number, year: number) {
  var date = new Date(Date.UTC(year, month, 1));
  var days = [];
  while (date.getUTCMonth() === month) {
    days.push(new Date(date));
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return days;
}

export function getCalendar(items: Date[]): Date[] {
  const dates: Date[] = [];

  items.map((item, index) => {
    if (index === 0 && item.getDay() > 0) {
      for (var i = 0; i < item.getDay(); i++) {
        dates.push(new Date(0));
      }
    }

    dates.push(item);

    if (index === items.length - 1 && item.getDay() < 6) {
      for (var i = 0; i < 6 - item.getDay(); i++) {
        dates.push(new Date(0));
      }
    }
  });

  return dates;
}

export function isToday(date: Date): boolean {
  return moment(date).isSame(moment(), 'day');
}

export function isSameDate(date1: Date, date2: Date): boolean {
  return moment(date1).isSame(moment(date2));
}

export function isSameMonthYear(date1: Date, date2: Date): boolean {
  return moment(date1).format('MM-YYYY') === moment(date2).format('MM-YYYY');
}

export function format(date: Date, format: string): string {
  return moment(date).format(format);
}

export function getDays(start: Date, end: Date) {
  const difference = end.getTime() - start.getTime();
  return difference / (1000 * 3600 * 24);
  //return moment.duration(moment(end).diff(moment(start))).asDays() + 1;
}

export const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function enumerateDaysBetweenDates(startDate: Date, endDate: Date): Date[] {
  let date: Date[] = [];
  while (moment(startDate) <= moment(endDate)) {
    if (startDate.getDay() != 0) {
      date.push(startDate);
    }
    startDate = moment(startDate).add(1, 'days').toDate();
  }
  return date;
}

export function getWeekDates(): Date[] {
  var date = moment(new Date()).toDate();

  if (date.getDay() == 0) {
    date = moment(date).add(1, 'days').toDate();
  }

  const start = moment(date).startOf('week').toDate();
  const end = moment(date).endOf('week').toDate();

  return enumerateDaysBetweenDates(start, end);
}
