import { useState } from 'preact/hooks';
import dayjs from 'dayjs';
import { DAYS, DAYS_LEAP } from './constants';

function getStartDayOfMonth(date: dayjs.Dayjs) {
  const startDate = date.startOf('month');
  return startDate.day() === 0 ? 7 : startDate;
}

function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function useCalendar() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const days = isLeapYear(selectedDate.year()) ? DAYS_LEAP : DAYS;

  const goPrevMonth = () => {
    setSelectedDate(selectedDate.add(-1, 'month'));
  };

  const goNextMonth = () => {
    setSelectedDate(selectedDate.add(1, 'month'));
  };

  return {
    selectedDate,
    startDay: getStartDayOfMonth(selectedDate),
    days,

    goPrevMonth,
    goNextMonth,
  };
}
