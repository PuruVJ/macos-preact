import { atom } from 'jotai';
import { WallpaperID } from '__/data/wallpapers/wallpapers.config';

export const wallpaperImageStore = atom('3-2');

export const wallpaperNameStore = atom<WallpaperID>('big-sur-graphic');
