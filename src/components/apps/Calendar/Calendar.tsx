import { useState } from 'preact/hooks';
import clsx from 'clsx';
import { AppIcon } from '__/components/utils/AppIcon';
import css from './Calendar.module.scss';
import { YearView } from './Views/YearView';
import { WeekView } from './Views/WeekView';
import { MonthView } from './Views/MonthView';
import { DayView } from './Views/DayView';
import dayjs from 'dayjs';
import { CalendarAppContext } from './context';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

enum VIEW_OPTIONS {
  YEAR,
  MONTH,
  WEEK,
  DAY,
}

export const Calendar = () => {
  const [view, setView] = useState(VIEW_OPTIONS.MONTH);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const goToday = () => {
    setSelectedDate(dayjs());
  };

  const goPrevMonth = () => {
    setSelectedDate(selectedDate.add(-1, 'month'));
  };

  const goNextMonth = () => {
    setSelectedDate(selectedDate.add(1, 'month'));
  };

  return (
    <CalendarAppContext.Provider value={{ selectedDate }}>
      <section class={css.container}>
        <header class={clsx('app-window-drag-handle', css.titleBar)}></header>

        <section class={css.mainArea}>
          <div className={css.calendarHeader}>
            <div>
              <span className={css.month}>{selectedDate.format('MMMM')}</span>{' '}
              <span className={css.year}>{selectedDate.format('YYYY')}</span>
            </div>
            <div className={css.controlButtons}>
              <button onClick={goPrevMonth}>
                <AppIcon size={24} path={mdiChevronLeft} />
              </button>
              <button onClick={goToday}>Today</button>
              <button onClick={goNextMonth}>
                <AppIcon size={24} path={mdiChevronRight} />
              </button>
            </div>
          </div>
          {view === VIEW_OPTIONS.YEAR && <YearView />}
          {view === VIEW_OPTIONS.MONTH && <MonthView />}
          {view === VIEW_OPTIONS.WEEK && <WeekView />}
          {view === VIEW_OPTIONS.DAY && <DayView />}
        </section>
      </section>
    </CalendarAppContext.Provider>
  );
};
function isLeapYear(arg0: number) {
  throw new Error('Function not implemented.');
}
