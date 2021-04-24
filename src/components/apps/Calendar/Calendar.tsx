import { useState } from 'preact/hooks';
import clsx from 'clsx';
import css from './Calendar.module.scss';
import YearView from './Views/YearView';
import WeekView from './Views/WeekView';
import MonthView from './Views/MonthView';
import DayView from './Views/DayView';
import { motion } from 'framer-motion';

enum VIEW_OPTIONS {
  YEAR,
  MONTH,
  WEEK,
  DAY,
}

const renderView = (v: VIEW_OPTIONS) => {
  switch (v) {
    case VIEW_OPTIONS.YEAR:
      return <YearView />;
    case VIEW_OPTIONS.MONTH:
      return <MonthView />;
    case VIEW_OPTIONS.WEEK:
      return <WeekView />;
    case VIEW_OPTIONS.DAY:
      return <DayView />;
  }
};

export const Calendar = () => {
  const [view, setView] = useState(VIEW_OPTIONS.MONTH);

  return (
    <section class={css.container}>
      <header class={clsx('app-window-drag-handle', css.titleBar)}></header>
      <section class={css.mainArea}>{renderView(view)}</section>
    </section>
  );
};
