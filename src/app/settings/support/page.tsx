'use client';

import { PageContainer } from '@/components/WebMaxWidth';
import { SettingsSubpageHeader } from '@/components/SettingsSubpageHeader';
import { HELP_CENTER_URL, SUPPORT_EMAIL } from '@/constants/legalLinks';
import { useAppPreferences } from '@/features/appPreferences/AppPreferencesContext';
import { useUserProfile } from '@/features/profile/UserProfileContext';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Linking } from 'react-native';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

async function openExternal(url: string) {
  try {
    const can = await Linking.canOpenURL(url);
    if (!can) {
      Alert.alert('Cannot open link', url);
      return;
    }
    await Linking.openURL(url);
  } catch {
    Alert.alert('Cannot open link', 'Check the URL and try again.');
  }
}

export default function SupportSettingsScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useUserProfile();
  const { s } = useAppPreferences();

  const templateBody = `Hello, my name is ...\n\nI have a question/concern about ...`;
  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('TapIt support')}&body=${encodeURIComponent(templateBody)}`;

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.bg }]} edges={['bottom']}>
      <SettingsSubpageHeader title={s.supportTitle} />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 32 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <PageContainer style={styles.pageInner}>
        <Text style={[styles.lead, { color: colors.muted }]}>
          For any questions or concerns, please email us at {SUPPORT_EMAIL}.
        </Text>

        

        <Pressable
          onPress={() => void openExternal(mailto)}
          style={({ pressed }) => [
            styles.row,
            { backgroundColor: colors.surface, borderColor: colors.border },
            pressed && { opacity: 0.85 },
          ]}
        >
          <Ionicons name="mail-outline" size={22} color={colors.accent} />
          <Text style={[styles.title, { color: colors.text }]}>{s.contactSupport}</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.muted} />
        </Pressable>

        <Pressable
          onPress={() => void openExternal(HELP_CENTER_URL)}
          style={({ pressed }) => [
            styles.row,
            { backgroundColor: colors.surface, borderColor: colors.border },
            pressed && { opacity: 0.85 },
          ]}
        >
          <Ionicons name="globe-outline" size={22} color={colors.accent} />
          <Text style={[styles.title, { color: colors.text }]}>{s.helpCenter}</Text>
          <Ionicons name="open-outline" size={20} color={colors.muted} />
        </Pressable>
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
  templateTitle: { fontSize: 13, fontWeight: '700', marginBottom: 6, textTransform: 'uppercase' },
  templateBody: { fontSize: 14, lineHeight: 20, marginBottom: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
  title: { flex: 1, fontSize: 16, fontWeight: '600' },
});
