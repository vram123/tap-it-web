'use client';

import { PageContainer } from '@/components/WebMaxWidth';
import { SettingsSubpageHeader } from '@/components/SettingsSubpageHeader';
import { useAppPreferences } from '@/features/appPreferences/AppPreferencesContext';
import { TEXT_SIZE_LEVELS, scaleText } from '@/features/appPreferences/textSize';
import { useUserProfile } from '@/features/profile/UserProfileContext';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AccessibilitySettingsScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useUserProfile();
  const { preferences, setPreferences, s } = useAppPreferences();

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.bg }]} edges={['bottom']}>
      <SettingsSubpageHeader title={s.accessibilityTitle} />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 32 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <PageContainer style={styles.pageInner}>
        <Text style={[styles.lead, { color: colors.muted }]}>{s.accessibilityLead}</Text>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.row, styles.rowBorder, { borderBottomColor: colors.border }]}>
            <View style={styles.rowText}>
              <Text style={[styles.title, { color: colors.text }]}>{s.reduceMotion}</Text>
              <Text style={[styles.sub, { color: colors.muted }]}>{s.reduceMotionSub}</Text>
            </View>
            <Switch
              value={preferences.reduceMotion}
              onValueChange={(v) => setPreferences({ reduceMotion: v })}
              trackColor={{ false: colors.border, true: `${colors.accent}88` }}
              thumbColor={preferences.reduceMotion ? colors.accent : '#f4f4f5'}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={[styles.title, { color: colors.text }]}>{s.largerText}</Text>
              <Text style={[styles.sub, { color: colors.muted }]}>{s.largerTextSub}</Text>
            </View>
          </View>
          <View style={styles.sizePicker}>
            {TEXT_SIZE_LEVELS.map((level) => {
              const selected = preferences.textSizeLevel === level;
              return (
                <Pressable
                  key={level}
                  onPress={() => setPreferences({ textSizeLevel: level })}
                  style={[
                    styles.sizeOption,
                    {
                      borderColor: selected ? colors.accent : colors.border,
                      backgroundColor: selected ? `${colors.accent}20` : colors.surface,
                    },
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  accessibilityLabel={`Set text size level ${level}`}
                >
                  <Text style={[styles.sizeOptionText, { color: selected ? colors.accent : colors.text }]}>{level}</Text>
                </Pressable>
              );
            })}
          </View>
          <View style={[styles.previewCard, { borderColor: colors.border }]}>
            <Text
              style={[
                styles.previewTitle,
                { color: colors.text, fontSize: scaleText(16, preferences.textSizeLevel) },
              ]}
            >
              Text size preview
            </Text>
            <Text
              style={[
                styles.previewBody,
                { color: colors.muted, fontSize: scaleText(13, preferences.textSizeLevel) },
              ]}
            >
              This is how body text will appear across key screens.
            </Text>
          </View>
        </View>
        </PageContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingTop: 16 },
  pageInner: { paddingHorizontal: 20 },
  lead: { fontSize: 14, lineHeight: 20, marginBottom: 16 },
  card: { borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  rowBorder: { borderBottomWidth: StyleSheet.hairlineWidth },
  rowText: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  sub: { fontSize: 13, lineHeight: 18 },
  sizePicker: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingBottom: 14 },
  sizeOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeOptionText: { fontSize: 14, fontWeight: '700' },
  previewCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  previewTitle: { fontWeight: '700' },
  previewBody: { lineHeight: 20 },
});
