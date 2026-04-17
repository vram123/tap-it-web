import type { AppPreferencesState } from '@/features/appPreferences/appPreferencesTypes';

export const TEXT_SIZE_LEVELS = [1, 2, 3, 4, 5] as const;

export type TextSizeLevel = AppPreferencesState['textSizeLevel'];

const SCALE_BY_LEVEL: Record<TextSizeLevel, number> = {
  1: 0.9,
  2: 0.96,
  3: 1,
  4: 1.08,
  5: 1.16,
};

export function getTextSizeScale(level: TextSizeLevel): number {
  return SCALE_BY_LEVEL[level] ?? SCALE_BY_LEVEL[3];
}

export function scaleText(size: number, level: TextSizeLevel): number {
  return Math.round(size * getTextSizeScale(level));
}
