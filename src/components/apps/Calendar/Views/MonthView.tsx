import clsx from 'clsx';
import dayjs from 'dayjs';
import { useContext } from 'preact/hooks';
import { DAYS_OF_THE_WEEK } from '../constants';
import { CalendarAppContext } from '../context';
import { getDisplayDays } from '../utils';
import css from './MonthView.module.scss';

export const MonthView = () => {
  const { selectedDate } = useContext(CalendarAppContext);
  const today = dayjs();

  const { daysInPrevMonth, daysInThisMonth, daysInNextMonth } = getDisplayDays(selectedDate);

  const renderDay = (daysInPrevMonth: number[], isThisMonth: boolean) => {
    return daysInPrevMonth.map((d) => {
      const isToday = isThisMonth && selectedDate.month() === today.month() && d === today.date();
      const isSelected = isThisMonth && d === selectedDate.date();

      return (
        <div
          className={clsx({
            [css.day]: true,
            [css.today]: isToday,
            [css.selected]: isSelected,
          })}
          key={d}
        >
          <div className={clsx({ [css.dateNumber]: true, [css.thisMonth]: isThisMonth })}>{d}</div>
        </div>
      );
    });
  };

  return (
    <div className={css.monthView}>
      {DAYS_OF_THE_WEEK.map((d, i) => (
        <div className={i === 5 || i === 6 ? css.weekend : css.weekday}>{d}</div>
      ))}
      {renderDay(daysInPrevMonth, false)}
      {renderDay(daysInThisMonth, true)}
      {renderDay(daysInNextMonth, false)}
    </div>
  );
};
