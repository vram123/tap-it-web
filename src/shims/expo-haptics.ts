/** Web stub — Expo haptics are no-ops in the browser. */

export const ImpactFeedbackStyle = {
  Light: 0,
  Medium: 1,
  Heavy: 2,
  Soft: 3,
  Rigid: 4,
} as const;

export const NotificationFeedbackType = {
  Success: 0,
  Warning: 1,
  Error: 2,
} as const;

export async function impactAsync(_style?: number): Promise<void> {}
export async function selectionAsync(): Promise<void> {}
export async function notificationAsync(_type?: number): Promise<void> {}
