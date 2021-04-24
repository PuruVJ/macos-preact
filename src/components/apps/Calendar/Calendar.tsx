import { useState } from 'preact/hooks';
import clsx from 'clsx';
import css from './Calendar.module.scss';
import { YearView } from './Views/YearView';
import { WeekView } from './Views/WeekView';
import { MonthView } from './Views/MonthView';
import { DayView } from './Views/DayView';
import { useCalendar } from './use-calendar';

enum VIEW_OPTIONS {
  YEAR,
  MONTH,
  WEEK,
  DAY,
}

export const Calendar = () => {
  const [view, setView] = useState(VIEW_OPTIONS.MONTH);
  const { selectedDate } = useCalendar();

  return (
    <section class={css.container}>
      <header class={clsx('app-window-drag-handle', css.titleBar)}></header>

      <section class={css.mainArea}>
        <div className={css.calendarHeader}>
          <div>
            <span className={css.month}>{selectedDate.format('MMMM')}</span>{' '}
            <span className={css.year}>{selectedDate.format('YYYY')}</span>
          </div>
          <div>{/* Buttons */}</div>
        </div>
        {view === VIEW_OPTIONS.YEAR && <YearView />}
        {view === VIEW_OPTIONS.MONTH && <MonthView />}
        {view === VIEW_OPTIONS.WEEK && <WeekView />}
        {view === VIEW_OPTIONS.DAY && <DayView />}
      </section>
    </section>
  );
};
