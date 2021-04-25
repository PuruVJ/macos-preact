import clsx from 'clsx';
import { getDate, getMonth } from 'date-fns';
import { useContext } from 'preact/hooks';
import { DAYS_OF_THE_WEEK } from '../constants';
import { CalendarAppContext } from '../context';
import { getDisplayDays } from '../utils';
import css from './MonthView.module.scss';

export const MonthView = () => {
  const { selectedDate } = useContext(CalendarAppContext);
  const today = new Date();

  const { daysInPrevMonth, daysInThisMonth, daysInNextMonth } = getDisplayDays(selectedDate);

  /**
   * Render each day block
   * @param daysInMonth the number array of days in the month to be displayed
   * @param isThisMonth flag to check if this day block belongs to current month
   */
  const renderDay = (daysInMonth: number[], isThisMonth: boolean) => {
    return daysInMonth.map((d) => {
      const isToday =
        isThisMonth && getMonth(selectedDate) === getMonth(today) && d === getDate(today);
      const isSelected = isThisMonth && d === getDate(selectedDate);

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
