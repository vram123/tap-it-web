'use client';

import ShopScreen from '@/features/shop/ShopScreen';
import { isShopUiEnabled } from '@/features/shop/shopFeature';
import { Redirect } from '@/lib/expo-router';
import React from 'react';

export default function ShopRoute() {
  if (!isShopUiEnabled()) {
    return <Redirect href="/home" />;
  }
  return <ShopScreen />;
}
