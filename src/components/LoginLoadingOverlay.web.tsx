'use client';

import CountUp from '@/components/CountUp';
import { useAppPreferences } from '@/features/appPreferences/AppPreferencesContext';
import React from 'react';

type Props = {
  visible: boolean;
};

const overlay: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 100_000,
  backgroundColor: 'rgba(2, 6, 18, 0.94)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
};

const percentRow: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  gap: 4,
};

const percentValue: React.CSSProperties = {
  fontSize: 56,
  fontWeight: 800,
  letterSpacing: -2,
  color: '#f4f4f5',
  fontVariantNumeric: 'tabular-nums',
};

const percentSign: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  color: 'rgba(161, 161, 170, 0.95)',
};

const subline: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 600,
  color: '#a1a1aa',
  marginTop: 8,
  textAlign: 'center',
  maxWidth: 280,
  lineHeight: 22,
};

const barTrack: React.CSSProperties = {
  width: 'min(280px, 80vw)',
  height: 4,
  borderRadius: 999,
  backgroundColor: 'rgba(255,255,255,0.08)',
  overflow: 'hidden',
  marginTop: 20,
};

const barFill: React.CSSProperties = {
  height: '100%',
  width: '72%',
  borderRadius: 999,
  background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
  opacity: 0.85,
};

export function LoginLoadingOverlay({ visible }: Props) {
  const { u } = useAppPreferences();

  if (!visible) {
    return null;
  }

  return (
    <div style={overlay} role="status" aria-live="polite" aria-busy="true">
      <div style={percentRow}>
        <CountUp
          to={100}
          from={0}
          duration={2.4}
          delay={0.08}
          separator=","
          startWhen={visible}
          style={percentValue}
        />
        <span style={percentSign}>%</span>
      </div>
      <p style={subline}>{u.login.loadingOverlay}</p>
      <div style={barTrack} aria-hidden>
        <div style={barFill} />
      </div>
    </div>
  );
}
