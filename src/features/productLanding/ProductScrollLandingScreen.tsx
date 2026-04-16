'use client';

import { BackgroundLandingPage } from '@/components/BackgroundLandingPage';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { WebMaxWidth } from '@/components/WebMaxWidth';
import { CardScrollStack } from '@/features/productLanding/CardScrollStack';
import { CARD_SCROLL_FRAME_COUNT } from '@/features/productLanding/cardScrollFrames';
import { PRODUCT_SCROLL_SECTIONS } from '@/features/productLanding/productScrollSections';
import { router } from '@/lib/expo-router';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { useAnimatedRef, useScrollOffset } from 'react-native-reanimated';

export function ProductScrollLandingScreen() {
  const { width, height } = useWindowDimensions();
  const wide = width >= 920;
  const sectionH = useMemo(
    () => Math.max(300, Math.min(460, Math.round(height * 0.4))),
    [height],
  );
  const cardMaxW = wide ? Math.min(380, width * 0.38) : Math.min(340, width - 48);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useScrollOffset(scrollRef);

  const sections = (
    <>
      {PRODUCT_SCROLL_SECTIONS.map((s, i) => (
        <View key={s.title} style={[styles.sectionBlock, { minHeight: sectionH }]}>
          <Text style={styles.stepTag}>
            {i + 1} / {CARD_SCROLL_FRAME_COUNT}
          </Text>
          <Text style={styles.sectionTitle}>{s.title}</Text>
          <Text style={styles.sectionBody}>{s.body}</Text>
        </View>
      ))}
      <View style={styles.footer}>
        <PrimaryButton title="Create account" onPress={() => router.push('/(auth)/register')} />
        <PrimaryButton
          title="Log in"
          onPress={() => router.push('/(auth)/login')}
          style={styles.secondaryBtn}
        />
        <Pressable
          onPress={() => router.push('/')}
          style={({ pressed }) => [styles.textLinkWrap, pressed && { opacity: 0.75 }]}
          accessibilityRole="button"
          accessibilityLabel="Back to main landing"
        >
          <Text style={styles.textLink}>← Main landing</Text>
        </Pressable>
      </View>
    </>
  );

  const cardBlock = (
    <View style={[styles.cardColumn, wide && styles.cardColumnWide]}>
      <Text style={styles.pageKicker}>Scroll the story</Text>
      <Text style={styles.pageTitle}>How Tap-it works</Text>
      <Text style={styles.pageLead}>
        Scroll to rotate through real product angles — then jump in when you are ready.
      </Text>
      <CardScrollStack scrollY={scrollY} sectionH={sectionH} maxWidth={cardMaxW} />
      {!wide ? <Text style={styles.hint}>Scroll below to move through each view ↓</Text> : null}
    </View>
  );

  return (
    <Screen contentMaxWidth={wide ? 1280 : 1040}>
      <BackgroundLandingPage>
        {wide ? (
          <View style={styles.split}>
            <View style={styles.splitLeft}>{cardBlock}</View>
            <Animated.ScrollView
              ref={scrollRef}
              style={styles.splitScroll}
              contentContainerStyle={styles.scrollContent}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
            >
              <WebMaxWidth maxWidth={520}>{sections}</WebMaxWidth>
            </Animated.ScrollView>
          </View>
        ) : (
          <View style={styles.narrowOuter}>
            {cardBlock}
            <Animated.ScrollView
              ref={scrollRef}
              style={styles.narrowScroll}
              contentContainerStyle={styles.scrollContent}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
            >
              <WebMaxWidth maxWidth={720}>{sections}</WebMaxWidth>
            </Animated.ScrollView>
          </View>
        )}
      </BackgroundLandingPage>
    </Screen>
  );
}

const styles = StyleSheet.create({
  split: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 0,
    gap: 8,
  },
  splitLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 8,
    minWidth: 280,
  },
  splitScroll: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
  },
  narrowOuter: {
    flex: 1,
    minHeight: 0,
  },
  narrowScroll: {
    flex: 1,
    minHeight: 0,
  },
  scrollContent: {
    paddingBottom: 48,
    paddingTop: 8,
  },
  cardColumn: {
    gap: 10,
    paddingBottom: 16,
    alignItems: 'stretch',
  },
  cardColumnWide: {
    paddingTop: 8,
  },
  pageKicker: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(161,161,170,0.95)',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fafafa',
    letterSpacing: -0.4,
  },
  pageLead: {
    fontSize: 14,
    lineHeight: 21,
    color: '#a1a1aa',
    marginBottom: 4,
  },
  hint: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(129, 180, 255, 0.85)',
    textAlign: 'center',
    marginTop: 4,
  },
  sectionBlock: {
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  stepTag: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: 'rgba(161,161,170,0.9)',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#f4f4f5',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  sectionBody: {
    fontSize: 15,
    lineHeight: 23,
    color: '#d4d4d8',
  },
  footer: {
    gap: 12,
    marginTop: 28,
    paddingTop: 8,
    alignItems: 'stretch',
  },
  secondaryBtn: {
    backgroundColor: '#2a2a30',
  },
  textLinkWrap: {
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  textLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#93c5fd',
  },
});
