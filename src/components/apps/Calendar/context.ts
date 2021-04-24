import { createContext } from 'preact';
import { ICalendarAppContext } from './types';

export const CalendarAppContext = createContext<ICalendarAppContext>({} as ICalendarAppContext);
