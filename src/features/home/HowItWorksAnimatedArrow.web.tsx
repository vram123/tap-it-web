'use client';

import './howItWorksAnimatedArrow.css';

import type { FlowArrowVariant } from '@/features/home/howItWorksFlowTypes';
import React, { useId } from 'react';

export type { FlowArrowVariant };

const VARIANT_STOPS: Record<
  FlowArrowVariant,
  { a: string; b: string; c: string; head: string }
> = {
  'indigo-emerald': {
    a: 'rgba(129,140,248,0.25)',
    b: 'rgba(129,140,248,0.95)',
    c: 'rgba(52,211,153,0.9)',
    head: 'rgba(52,211,153,0.95)',
  },
  'violet-amber': {
    a: 'rgba(167,139,250,0.3)',
    b: 'rgba(192,132,252,0.95)',
    c: 'rgba(251,191,36,0.92)',
    head: 'rgba(252,211,77,0.95)',
  },
  'sky-rose': {
    a: 'rgba(56,189,248,0.3)',
    b: 'rgba(125,211,252,0.95)',
    c: 'rgba(251,113,133,0.9)',
    head: 'rgba(251,113,133,0.95)',
  },
  'cyan-fuchsia': {
    a: 'rgba(34,211,238,0.3)',
    b: 'rgba(103,232,249,0.95)',
    c: 'rgba(232,121,249,0.88)',
    head: 'rgba(217,70,239,0.95)',
  },
};

type Props = {
  /** When true, dashed stroke animates continuously */
  active: boolean;
  caption?: string;
  variant?: FlowArrowVariant;
  /** `right` = points right (desktop); mobile CSS may rotate */
  direction?: 'right' | 'down';
  className?: string;
};

export function HowItWorksAnimatedArrow({
  active,
  caption,
  variant = 'indigo-emerald',
  direction = 'right',
  className = '',
}: Props) {
  const uid = useId().replace(/:/g, '');
  const v = VARIANT_STOPS[variant];
  const gid = `how-fa-g-${uid}`;
  const mid = `how-fa-m-${uid}`;

  const horizontal = direction === 'right';

  return (
    <div
      className={`how-flow-arrow ${active ? 'how-flow-arrow--on' : ''} ${className}`.trim()}
      aria-hidden
    >
      {horizontal ? (
        <svg className="how-flow-arrow__svg how-flow-arrow__svg--h" viewBox="0 0 92 36" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={v.a} />
              <stop offset="45%" stopColor={v.b} />
              <stop offset="100%" stopColor={v.c} />
            </linearGradient>
            <marker id={mid} markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
              <path d="M0 0 L9 4.5 L0 9 Z" fill={v.head} />
            </marker>
          </defs>
          <path
            className="how-flow-arrow__path"
            d="M3 18 L78 18"
            stroke={`url(#${gid})`}
            markerEnd={`url(#${mid})`}
          />
        </svg>
      ) : (
        <svg className="how-flow-arrow__svg how-flow-arrow__svg--v" viewBox="0 0 36 88" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id={gid} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={v.a} />
              <stop offset="45%" stopColor={v.b} />
              <stop offset="100%" stopColor={v.c} />
            </linearGradient>
            <marker id={mid} markerWidth="9" markerHeight="9" refX="4.5" refY="8" orient="auto">
              <path d="M0 0 L9 4.5 L0 9 Z" fill={v.head} />
            </marker>
          </defs>
          <path
            className="how-flow-arrow__path"
            d="M18 3 L18 78"
            stroke={`url(#${gid})`}
            markerEnd={`url(#${mid})`}
          />
        </svg>
      )}
      {caption ? <span className="how-flow-arrow__caption">{caption}</span> : null}
    </div>
  );
}
