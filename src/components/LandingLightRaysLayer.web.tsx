'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const LightRays = dynamic(() => import('@/components/lightRays/LightRays'), {
  ssr: false,
  loading: () => null,
});

export function LandingLightRaysLayer() {
  return (
    <View style={styles.wrap} pointerEvents="none">
      <LightRays
        raysOrigin="top-center"
        raysColor="#6b9cff"
        raysSpeed={0.85}
        lightSpread={0.92}
        rayLength={2.2}
        fadeDistance={1.15}
        saturation={0.75}
        mouseInfluence={0.12}
        noiseAmount={0.04}
        distortion={0.02}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});
