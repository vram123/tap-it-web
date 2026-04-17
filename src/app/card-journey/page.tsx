'use client';

import { TapitHomeScreen } from '@/features/tapitOnboarding/TapitHomeScreen';
import { router } from '@/lib/expo-router';
import React from 'react';

export default function CardJourneyScreen() {
  return <TapitHomeScreen showExitToDashboard onExitToDashboard={() => router.back()} />;
}
