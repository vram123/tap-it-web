'use client';

import GlassSurface from '@/components/glassSurface/GlassSurface';
import { router } from '@/lib/expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import './landingHeroGlass.css';

type LandingHeroCTAsProps = {
  wide: boolean;
  createLabel: string;
  logInLabel: string;
};

const sharedGlass = {
  width: '100%' as const,
  height: 52,
  borderRadius: 999,
  borderWidth: 0.08,
  brightness: 52,
  opacity: 0.9,
  blur: 12,
  displace: 0.48,
  distortionScale: -175,
  redOffset: 0,
  greenOffset: 10,
  blueOffset: 18,
};

export function LandingHeroCTAs({ wide, createLabel, logInLabel }: LandingHeroCTAsProps) {
  return (
    <View style={[styles.ctaRow, wide && styles.ctaRowWide]}>
      <View style={[styles.slot, wide && styles.slotWide]}>
        <GlassSurface
          {...sharedGlass}
          backgroundOpacity={0.11}
          saturation={1.32}
          mixBlendMode="screen"
          brightness={56}
          opacity={0.94}
          className="landing-glass-cta landing-glass-cta--primary"
        >
          <button
            type="button"
            className="landing-glass-cta__btn"
            onClick={() => router.push('/(auth)/register')}
          >
            {createLabel}
          </button>
        </GlassSurface>
      </View>
      <View style={[styles.slot, wide && styles.slotWide]}>
        <GlassSurface
          {...sharedGlass}
          backgroundOpacity={0.06}
          saturation={1.05}
          mixBlendMode="normal"
          brightness={38}
          opacity={0.94}
          displace={0.26}
          distortionScale={-142}
          className="landing-glass-cta landing-glass-cta--ghost"
        >
          <button
            type="button"
            className="landing-glass-cta__btn landing-glass-cta__btn--ghost"
            onClick={() => router.push('/(auth)/login')}
          >
            {logInLabel}
          </button>
        </GlassSurface>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ctaRow: {
    marginTop: 12,
    gap: 12,
    alignItems: 'center',
    width: '100%',
  },
  ctaRowWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  slot: {
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
  },
  slotWide: {
    flex: 1,
    minWidth: 140,
    maxWidth: 320,
    alignSelf: 'stretch',
  },
});
