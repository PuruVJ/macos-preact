import dayjs from 'dayjs';
import { DAYS, DAYS_LEAP, NUMBER_OF_CELLS_IN_CALENDAR } from './constants';

export function getStartDayOfMonth(date: dayjs.Dayjs) {
  const startDate = date.startOf('month');
  return startDate.day() === 0 ? 7 : startDate.day();
}

export function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getRangeArray(lower: number, upper: number) {
  const arr: number[] = [];
  for (let i = lower; i <= upper; i++) {
    arr.push(i);
  }
  return arr;
}

export function getDisplayDays(selectedDate: dayjs.Dayjs) {
  const thisMonth = selectedDate.month();
  const prevMonth = thisMonth - 1 < 0 ? 12 : thisMonth - 1;

  const days = isLeapYear(selectedDate.year()) ? DAYS_LEAP : DAYS;
  const weekday = selectedDate.day();

  const daysInPrevMonth = getRangeArray(days[prevMonth] - weekday, days[prevMonth]);
  const daysInThisMonth = getRangeArray(1, days[thisMonth]);
  const daysInNextMonth = getRangeArray(
    1,
    NUMBER_OF_CELLS_IN_CALENDAR - weekday - days[thisMonth] - 1,
  );

  return {
    daysInPrevMonth,
    daysInThisMonth,
    daysInNextMonth,
  };
}
