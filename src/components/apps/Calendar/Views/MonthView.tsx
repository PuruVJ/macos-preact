import { useCalendar } from '../use-calendar';
import styles from './MonthView.module.scss';

export default function MonthView() {
  const {
    selectedDate,
    startDay,
    days,

    goPrevMonth,
    goNextMonth,
  } = useCalendar();

  console.log(selectedDate, startDay, days);

  return (
    <div className={styles.monthView}>
      <div>
        <span>{selectedDate.format('MMMM')}</span> <span>{selectedDate.format('YYYY')}</span>
      </div>
    </div>
  );
}
