import { atom } from 'jotai';

export const activeMenuStore = atom<Record<string, boolean>>({});
