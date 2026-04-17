'use client';

import { useAppPreferences } from '@/features/appPreferences/AppPreferencesContext';
import { scaleText } from '@/features/appPreferences/textSize';
import { useUserProfileOptional } from '@/features/profile/UserProfileContext';
import Ionicons from '@react-native-vector-icons/ionicons';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from '@/lib/expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { OnboardingPagerProvider } from './OnboardingPagerContext';
import { LinkStoryScrollView } from './story/LinkStoryScrollView';
import {
  StoryPageChooseLink,
  StoryPageEmbed,
  StoryPageServer,
  StoryPageShip,
  StoryPageTry,
} from './story/NfcOnboardingPages';
import { TapitBottomNav, TAPIT_TABS, type TapitTab } from './TapitBottomNav';
import { TapitOnboardingThemeProvider, useTapitOnboardingTheme } from './TapitOnboardingThemeContext';
import type { TapitPalette } from './theme';

function parseParam(v: string | string[] | undefined): string {
  if (typeof v === 'string' && v.trim()) return v.trim();
  if (Array.isArray(v) && v[0]) return String(v[0]).trim();
  return '';
}

type TapitHomeScreenProps = {
  /** When set, shows a bar to return to the main dashboard (e.g. from /card-journey). */
  showExitToDashboard?: boolean;
  onExitToDashboard?: () => void;
};

type PageRow = { key: TapitTab };

function PagerPage({
  children,
  index,
  scrollX,
  width,
}: {
  children: React.ReactNode;
  index: number;
  scrollX: SharedValue<number>;
  width: number;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const t = (scrollX.value - index * width) / width;
    const scale = interpolate(t, [-1, 0, 1], [0.9, 1, 0.9], Extrapolation.CLAMP);
    const opacity = interpolate(t, [-1, 0, 1], [0.52, 1, 0.52], Extrapolation.CLAMP);
    const translateY = interpolate(t, [-1, 0, 1], [20, 0, 20], Extrapolation.CLAMP);
    const rotateZ = interpolate(t, [-1, 0, 1], [3.2, 0, -3.2], Extrapolation.CLAMP);
    return {
      opacity,
      transform: [{ scale }, { translateY }, { rotateZ: `${rotateZ}deg` }],
    };
  });

  return (
    <Animated.View style={[{ width }, animatedStyle]} collapsable={false}>
      {children}
    </Animated.View>
  );
}

function TapitHomeScreenInner({ showExitToDashboard = false, onExitToDashboard }: TapitHomeScreenProps) {
  const { u, preferences } = useAppPreferences();
  const T = useTapitOnboardingTheme();
  const insets = useSafeAreaInsets();
  const { width: pageWidth } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && pageWidth >= 1024;
  const frameWidth = isDesktopWeb ? Math.min(pageWidth - 64, 1200) : pageWidth;
  const params = useLocalSearchParams<{ displayName?: string | string[]; guest?: string | string[] }>();
  const [activeTab, setActiveTab] = useState<TapitTab>('link');
  const scrollX = useSharedValue(0);
  const listRef = useRef<FlatList<PageRow> | null>(null);

  const guestRaw = parseParam(params.guest).toLowerCase();
  const isGuest = guestRaw === '1' || guestRaw === 'true' || guestRaw === 'yes';

  const data = useMemo<PageRow[]>(() => TAPIT_TABS.map((tab) => ({ key: tab })), []);

  const styles = useMemo(
    () => {
      const s = (size: number) => scaleText(size, preferences.textSizeLevel);
      return StyleSheet.create({
        root: {
          flex: 1,
          backgroundColor: T.bg,
        },
        desktopFrameOuter: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 16,
          paddingVertical: 16,
        },
        desktopFrame: {
          width: frameWidth,
          flex: 1,
          borderRadius: 20,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: T.border,
          backgroundColor: T.bg,
          ...(Platform.OS === 'web'
            ? {
                boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
              }
            : null),
        },
        guestRibbon: {
          backgroundColor: T.surface,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: T.border,
        },
        guestRibbonText: {
          fontSize: s(12),
          fontWeight: '600',
          color: T.muted,
          textAlign: 'center',
        },
        exitBar: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: T.border,
        },
        exitBarText: {
          fontSize: s(16),
          fontWeight: '600',
          color: T.text,
        },
        listWrap: {
          flex: 1,
          width: frameWidth,
          alignSelf: 'center',
        },
        pageScroll: {
          flex: 1,
        },
        pageScrollContent: {
          flexGrow: 1,
          paddingHorizontal: isDesktopWeb ? 32 : 20,
          paddingTop: isDesktopWeb ? 18 : 12,
        },
        nextWrap: {
          paddingHorizontal: 16,
          paddingTop: 6,
          paddingBottom: 2,
          alignItems: 'center',
        },
        nextBtn: {
          minWidth: 120,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: T.border,
          backgroundColor: T.surface,
          paddingVertical: 10,
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 8,
        },
        nextBtnText: {
          fontSize: s(14),
          fontWeight: '700',
          color: T.text,
        },
      });
    },
    [T, frameWidth, isDesktopWeb, preferences.textSizeLevel],
  );

  const lastPagerIndex = useRef(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const onMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e.nativeEvent.contentOffset.x;
      const idx = Math.round(x / frameWidth);
      const tab = TAPIT_TABS[idx];
      if (!tab) return;
      setActiveTab(tab);
      if (idx !== lastPagerIndex.current) {
        lastPagerIndex.current = idx;
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
          void Haptics.selectionAsync();
        }
      }
    },
    [frameWidth],
  );

  const onTabFromNav = useCallback((tab: TapitTab) => {
    setActiveTab(tab);
    const idx = TAPIT_TABS.indexOf(tab);
    lastPagerIndex.current = idx;
    listRef.current?.scrollToIndex({ index: idx, animated: true, viewPosition: 0 });
  }, []);
  const onNext = useCallback(() => {
    const idx = TAPIT_TABS.indexOf(activeTab);
    const next = TAPIT_TABS[idx + 1];
    if (!next) return;
    onTabFromNav(next);
  }, [activeTab, onTabFromNav]);

  useEffect(() => {
    if (!showExitToDashboard) return;
    const idx = TAPIT_TABS.indexOf(activeTab);
    if (idx < 0) return;
    scrollX.value = idx * frameWidth;
  }, [activeTab, frameWidth, scrollX, showExitToDashboard]);

  const renderTabContent = useCallback(
    (index: number) => {
      if (index === 0) return <StoryPageChooseLink />;
      if (index === 1) return <StoryPageServer />;
      if (index === 2) return <StoryPageEmbed />;
      if (index === 3) return <StoryPageShip />;
      return <StoryPageTry onGoToShop={() => router.push('/shop')} />;
    },
    [],
  );

  const renderItem = useCallback(
    ({ index }: { index: number }) => {
      const scrollContent = [styles.pageScrollContent, { paddingBottom: 24 + insets.bottom }];
      const page = (
        <PagerPage index={index} scrollX={scrollX} width={frameWidth}>
          {index === 0 ? (
            <LinkStoryScrollView style={styles.pageScroll} contentContainerStyle={scrollContent}>
              <StoryPageChooseLink />
            </LinkStoryScrollView>
          ) : (
            <ScrollView
              style={styles.pageScroll}
              contentContainerStyle={scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
            >
              {index === 1 ? <StoryPageServer /> : null}
              {index === 2 ? <StoryPageEmbed /> : null}
              {index === 3 ? <StoryPageShip /> : null}
              {index === 4 ? <StoryPageTry onGoToShop={() => router.push('/shop')} /> : null}
            </ScrollView>
          )}
        </PagerPage>
      );
      return page;
    },
    [frameWidth, insets.bottom, scrollX, styles.pageScroll, styles.pageScrollContent],
  );

  const getItemLayout = useCallback(
    (_data: ArrayLike<PageRow> | null | undefined, index: number) => ({
      length: frameWidth,
      offset: frameWidth * index,
      index,
    }),
    [frameWidth],
  );

  return (
    <SafeAreaView style={[styles.root, { paddingTop: insets.top }]} edges={['top']}>
      <View style={isDesktopWeb ? styles.desktopFrameOuter : { flex: 1 }}>
        <View style={isDesktopWeb ? styles.desktopFrame : { flex: 1 }}>
          {isGuest ? (
            <View style={styles.guestRibbon}>
              <Text style={styles.guestRibbonText}>{u.common.guestRibbon}</Text>
            </View>
          ) : null}
          {showExitToDashboard && onExitToDashboard ? (
            <Pressable
              onPress={onExitToDashboard}
              style={({ pressed }) => [styles.exitBar, pressed && { opacity: 0.75 }]}
              accessibilityRole="button"
              accessibilityLabel={u.onboarding.exitBarA11y}
            >
              <Ionicons name="chevron-back" size={22} color={T.text} />
              <Text style={styles.exitBarText}>{u.onboarding.exitHome}</Text>
            </Pressable>
          ) : null}
          <OnboardingPagerProvider value={{ scrollX, pageWidth: frameWidth }}>
            <View style={styles.listWrap}>
              {showExitToDashboard ? (
                TAPIT_TABS.indexOf(activeTab) === 0 ? (
                  <LinkStoryScrollView
                    style={styles.pageScroll}
                    contentContainerStyle={[styles.pageScrollContent, { paddingBottom: 24 + insets.bottom }]}
                  >
                    {renderTabContent(0)}
                  </LinkStoryScrollView>
                ) : (
                  <ScrollView
                    style={styles.pageScroll}
                    contentContainerStyle={[styles.pageScrollContent, { paddingBottom: 24 + insets.bottom }]}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                  >
                    {renderTabContent(TAPIT_TABS.indexOf(activeTab))}
                  </ScrollView>
                )
              ) : (
                <Animated.FlatList
                  ref={listRef}
                  data={data}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onScroll={onScroll}
                  scrollEventThrottle={16}
                  keyboardShouldPersistTaps="handled"
                  onMomentumScrollEnd={onMomentumScrollEnd}
                  getItemLayout={getItemLayout}
                  initialNumToRender={5}
                  windowSize={5}
                  decelerationRate="fast"
                  onScrollToIndexFailed={(info) => {
                    const wait = new Promise((r) => setTimeout(r, 100));
                    void wait.then(() => {
                      listRef.current?.scrollToIndex({ index: info.index, animated: false });
                    });
                  }}
                />
              )}
            </View>
          </OnboardingPagerProvider>
          <View style={{ paddingBottom: insets.bottom }}>
            {showExitToDashboard && TAPIT_TABS.indexOf(activeTab) < TAPIT_TABS.length - 1 ? (
              <View style={styles.nextWrap}>
                <Pressable
                  onPress={onNext}
                  style={({ pressed }) => [styles.nextBtn, pressed && { opacity: 0.75 }]}
                  accessibilityRole="button"
                  accessibilityLabel="Next step"
                >
                  <Text style={styles.nextBtnText}>Next</Text>
                  <Ionicons name="arrow-forward" size={16} color={T.text} />
                </Pressable>
              </View>
            ) : null}
            <TapitBottomNav active={activeTab} onChange={onTabFromNav} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export function TapitHomeScreen(props: TapitHomeScreenProps) {
  const profile = useUserProfileOptional();
  const colorMode = profile?.profile.colorMode ?? 'dark';
  return (
    <TapitOnboardingThemeProvider colorMode={colorMode}>
      <TapitHomeScreenInner {...props} />
    </TapitOnboardingThemeProvider>
  );
}
