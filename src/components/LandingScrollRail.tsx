import type { ScrollView } from 'react-native';
import type { RefObject } from 'react';

export type LandingScrollRailProps = {
  scrollRef: RefObject<ScrollView | null>;
  scrollY: number;
  viewportH: number;
  contentH: number;
  progressAria: string;
};

/** Native: no fixed rail (web uses `.web` implementation). */
export function LandingScrollRail(_props: LandingScrollRailProps) {
  return null;
}
