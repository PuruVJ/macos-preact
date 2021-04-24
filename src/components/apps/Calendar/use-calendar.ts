import { useState } from 'preact/hooks';
import dayjs from 'dayjs';
import { DAYS, DAYS_LEAP } from './constants';
import { getStartDayOfMonth, isLeapYear } from './utils';

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
    today: dayjs(),
    selectedDate,
    startDay: getStartDayOfMonth(selectedDate),
    days,

    setSelectedDate,
    goPrevMonth,
    goNextMonth,
  };
}
