'use client';

import './landingScrollRail.css';

import type { LandingScrollRailProps } from '@/components/LandingScrollRail';
import React from 'react';

export function LandingScrollRail({ scrollY, viewportH, contentH, progressAria }: LandingScrollRailProps) {
  const maxScroll = Math.max(0, contentH - viewportH);
  const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
  const percent = Math.round(progress * 100);

  return (
    <div
      className="landing-scroll-rail"
      role="progressbar"
      aria-label={progressAria}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
    >
      <div className="landing-scroll-rail__track" aria-hidden>
        <div className="landing-scroll-rail__track-fill" style={{ transform: `scaleY(${progress})` }} />
      </div>
    </div>
  );
}
