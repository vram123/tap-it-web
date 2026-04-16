'use client';

import { useAppPreferences } from '@/features/appPreferences/AppPreferencesContext';
import { router } from '@/lib/expo-router';
import Ionicons from '@react-native-vector-icons/ionicons';
import React, { useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { AppThemeColors } from '@/features/profile/profileTypes';
import { HOW_IT_WORKS_IMAGES } from './howItWorksSteps';

type HowItWorksSectionProps = {
  colors: AppThemeColors;
  journeyParams: Record<string, string>;
};

export function HowItWorksSection({ colors, journeyParams }: HowItWorksSectionProps) {
  const { u } = useAppPreferences();
  const l = u.landing;
  const o = u.onboarding;

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

  const goJourney = () => {
    router.push({ pathname: '/card-journey', params: journeyParams });
  };

  return (
    <View style={styles.block}>
      <View style={styles.headingRow}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{l.howTitle}</Text>
          <Text style={[styles.sectionHint, { color: colors.muted }]}>{l.howLead}</Text>
        </View>
        <Pressable
          onPress={goJourney}
          style={({ pressed }) => [
            styles.explorePill,
            { borderColor: colors.border, backgroundColor: colors.surface },
            pressed && { opacity: 0.88 },
          ]}
          accessibilityRole="button"
          accessibilityLabel={u.shop.howItWorksA11y}
        >
          <Text style={[styles.explorePillText, { color: colors.accent }]}>{u.shop.howItWorksCta}</Text>
          <Ionicons name="arrow-forward" size={16} color={colors.accent} />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {steps.map((step, i) => (
          <View
            key={step.key}
            style={[styles.card, { borderColor: colors.border, backgroundColor: colors.surface }]}
          >
            <View style={styles.cardTop}>
              <Text style={[styles.stepBadge, { color: colors.muted }]}>
                {l.stepMeta} {i + 1}
              </Text>
              <Image
                source={HOW_IT_WORKS_IMAGES[step.key]}
                style={styles.cardImage}
                resizeMode="contain"
                accessibilityLabel=""
              />
            </View>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{step.title}</Text>
            <Text style={[styles.cardBody, { color: colors.muted }]}>{step.body}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginBottom: 28,
    gap: 14,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  sectionHint: {
    fontSize: 13,
    lineHeight: 18,
  },
  explorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  explorePillText: {
    fontSize: 13,
    fontWeight: '700',
  },
  row: {
    gap: 12,
    paddingRight: 8,
    paddingBottom: 4,
  },
  card: {
    width: 220,
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    gap: 8,
  },
  cardTop: {
    gap: 8,
  },
  stepBadge: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  cardImage: {
    width: '100%',
    height: 96,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  cardBody: {
    fontSize: 13,
    lineHeight: 18,
  },
});
