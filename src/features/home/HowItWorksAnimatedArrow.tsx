import type { FlowArrowVariant } from '@/features/home/howItWorksFlowTypes';
import React from 'react';

export type { FlowArrowVariant };

/** Native: arrows are web-only. */
export function HowItWorksAnimatedArrow(_props: {
  active?: boolean;
  caption?: string;
  variant?: FlowArrowVariant;
  direction?: 'right' | 'down';
  className?: string;
}) {
  return null;
}
