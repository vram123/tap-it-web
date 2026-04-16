'use client';

import { BackgroundLandingPage } from '@/components/BackgroundLandingPage';
import { LandingScrollRail } from '@/components/LandingScrollRail';
import { LandingHeroCTAs } from '@/components/landingHero/LandingHeroCTAs';
import { LandingSiteFooter } from '@/components/landingSite/LandingSiteFooter';
import { LandingSiteNav } from '@/components/landingSite/LandingSiteNav';
import { Screen } from '@/components/Screen';
import { LandingCenterVideo } from '@/features/home/LandingCenterVideo';
import { HowItWorksScrollSection } from '@/features/home/HowItWorksScrollSection';
import { LANDING_MOCK_REVIEWS } from '@/features/home/landingMockReviews';
import { LandingReviewsMarquee } from '@/features/home/LandingReviewsMarquee';
import { useAppPreferences } from '@/features/appPreferences/AppPreferencesContext';
import { router } from '@/lib/expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

export default function Index() {
  const { u } = useAppPreferences();
  const l = u.landing;
  const o = u.onboarding;
  const { width } = useWindowDimensions();
  const wide = width >= 880;
  const isWeb = Platform.OS === 'web';

  const scrollRef = useRef<ScrollView>(null);
  const scrollRaf = useRef<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [viewportH, setViewportH] = useState(0);
  const [contentH, setContentH] = useState(0);
  const onScrollWeb = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    if (scrollRaf.current != null) return;
    scrollRaf.current = requestAnimationFrame(() => {
      scrollRaf.current = null;
      setScrollY(y);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (scrollRaf.current != null) cancelAnimationFrame(scrollRaf.current);
    };
  }, []);

  const steps = useMemo(
    () =>
      [
        { key: 'link' as const, title: o.storyChooseCallout, body: o.storyChooseBody1 },
        { key: 'server' as const, title: o.storyServerCallout, body: o.storyServerBody1 },
        { key: 'embed' as const, title: o.storyEmbedCallout, body: o.storyEmbedBody1 },
        { key: 'ship' as const, title: o.storyShipCallout, body: o.storyShipBody1 },
        { key: 'try' as const, title: o.storyTryCallout, body: o.storyTryBody },
      ] as const,
    [o],
  );

  const scrollSteps = useMemo(
    () =>
      steps.map((s, i) => ({
        key: s.key,
        stepLabel: `${l.stepMeta} ${i + 1}`,
        title: s.title,
        body: s.body,
      })),
    [steps, l.stepMeta],
  );

  return (
    <Screen fullBleed>
      <BackgroundLandingPage>
        {isWeb ? (
          <LandingScrollRail
            scrollRef={scrollRef}
            scrollY={scrollY}
            viewportH={viewportH}
            contentH={contentH}
            progressAria={l.scrollProgressAria}
          />
        ) : null}
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, isWeb && styles.scrollContentWeb]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onLayout={isWeb ? e => setViewportH(e.nativeEvent.layout.height) : undefined}
          onScroll={isWeb ? onScrollWeb : undefined}
          scrollEventThrottle={isWeb ? 16 : undefined}
          onContentSizeChange={isWeb ? (_, h) => setContentH(h) : undefined}
        >
          {isWeb ? <LandingSiteNav landing={l} /> : null}
          <View style={styles.heroShell}>
            <View style={styles.heroInner}>
              <View style={styles.heroCopy}>
                <View style={styles.kickerRule} accessible={false} importantForAccessibility="no" />
                <Text style={styles.kicker}>{l.kicker}</Text>
                <Text style={styles.title}>{l.title}</Text>
                <Text style={styles.subtitle}>{l.subtitle}</Text>
                <LandingHeroCTAs wide={wide} createLabel={l.createAccount} logInLabel={l.logIn} />
                <Pressable
                  onPress={() =>
                    router.replace({
                      pathname: '/home',
                      params: { guest: '1', displayName: u.common.guestDisplayName },
                    })
                  }
                  style={({ pressed }) => [styles.guestBtn, pressed && { opacity: 0.7 }]}
                  accessibilityRole="button"
                  accessibilityLabel={l.guestA11y}
                >
                  <Text style={styles.guestBtnText}>{l.guestExplore}</Text>
                </Pressable>
              </View>
            </View>
            <LandingCenterVideo ariaLabel={l.heroCardA11y} />
          </View>

          <HowItWorksScrollSection
            steps={scrollSteps}
            sectionTitle={l.howTitle}
            sectionLead={l.howLead}
            tagline={l.oneTapTagline}
          />

          <LandingReviewsMarquee
            title={l.reviewsTitle}
            lead={l.reviewsLead}
            reviews={LANDING_MOCK_REVIEWS}
          />

          {isWeb ? <LandingSiteFooter landing={l} /> : null}
        </ScrollView>
      </BackgroundLandingPage>
    </Screen>
  );
}

const H_PAD = Platform.OS === 'web' ? 32 : 24;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: Platform.OS === 'web' ? 28 : 20,
    paddingBottom: 56,
  },
  scrollContentWeb: {
    paddingRight: 24,
  },
  heroShell: {
    width: '100%',
    paddingHorizontal: H_PAD,
    marginBottom: 36,
  },
  heroInner: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    gap: 20,
    paddingBottom: 8,
  },
  heroCopy: {
    gap: 14,
    maxWidth: 620,
  },
  kickerRule: {
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(129, 140, 248, 0.85)',
    marginBottom: 2,
  },
  kicker: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(196, 200, 255, 0.88)',
  },
  title: {
    fontSize: Platform.OS === 'web' ? 44 : 36,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: Platform.OS === 'web' ? 50 : 42,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 17,
    color: '#b4b4bd',
    lineHeight: 26,
    marginTop: 2,
    maxWidth: 520,
  },
  guestBtn: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingVertical: 10,
  },
  guestBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a1a1aa',
    textDecorationLine: 'underline',
  },
});
