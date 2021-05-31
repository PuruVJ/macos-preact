import { atom } from 'jotai';
import type { WallpaperID } from '__/data/wallpapers/wallpapers.config';

export const wallpaperImageStore = atom('24-3');

export const wallpaperNameStore = atom<WallpaperID>('catalina');
