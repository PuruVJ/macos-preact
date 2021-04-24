import dayjs from 'dayjs';
import { DAYS, DAYS_LEAP, NUMBER_OF_CELLS_IN_CALENDAR } from './constants';

export function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getRangeArray(lower: number, upper: number) {
  const arr: number[] = [];
  for (let i = lower + 1; i <= upper; i++) {
    arr.push(i);
  }
  return arr;
}

export function getDisplayDays(selectedDate: dayjs.Dayjs) {
  const thisMonth = selectedDate.month();
  const prevMonth = thisMonth - 1 < 0 ? 11 : thisMonth - 1;

  const days = isLeapYear(selectedDate.year()) ? DAYS_LEAP : DAYS;
  const weekday = selectedDate.startOf('month').day();

  // If it's Sunday, weekday is 0
  const daysToShowInPrevMonth = weekday === 0 ? 6 : weekday - 1;
  const daysToShowInNextMonth =
    NUMBER_OF_CELLS_IN_CALENDAR - days[thisMonth] - daysToShowInPrevMonth;

  const daysInPrevMonth = getRangeArray(days[prevMonth] - daysToShowInPrevMonth, days[prevMonth]);
  const daysInThisMonth = getRangeArray(0, days[thisMonth]);
  const daysInNextMonth = getRangeArray(0, daysToShowInNextMonth);

  return {
    daysInPrevMonth,
    daysInThisMonth,
    daysInNextMonth,
  };
}
