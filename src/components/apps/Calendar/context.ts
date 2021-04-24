import { createContext } from 'preact';
import { ICalendarAppContext } from './type';

export const CalendarAppContext = createContext<ICalendarAppContext>({} as ICalendarAppContext);
