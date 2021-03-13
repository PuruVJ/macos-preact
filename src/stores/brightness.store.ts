import { atom } from 'jotai';

/**
 * The store used to store the current brightness value
 */
export const brightnessStore = atom<number>(100);
