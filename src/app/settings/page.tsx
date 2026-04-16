'use client';

import { PageContainer } from '@/components/WebMaxWidth';
import { SettingsSubpageHeader } from '@/components/SettingsSubpageHeader';
import type { AppThemeColors } from '@/features/profile/profileTypes';
import { useAppPreferences } from '@/features/appPreferences/AppPreferencesContext';
import { clearAccessToken } from '@/features/auth/session';
import { useUserProfile } from '@/features/profile/UserProfileContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { router } from '@/lib/expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

/** @types/react-native-vector-icons does not expose `glyphMap` on Ionicons; names match the bundled JSON map. */
type IoniconName = Extract<
  keyof typeof import('react-native-vector-icons/glyphmaps/Ionicons.json'),
  string
>;

type RowProps = {
  title: string;
  subtitle?: string;
  onPress: () => void;
  colors: AppThemeColors;
  icon: IoniconName;
  destructive?: boolean;
};

function SettingsRow({ title, subtitle, onPress, colors, icon, destructive }: RowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: colors.surface, borderColor: colors.border },
        pressed && { opacity: 0.85 },
      ]}
    >
      <View style={[styles.rowIcon, { backgroundColor: destructive ? 'rgba(248,113,113,0.15)' : `${colors.accent}22` }]}>
        <Ionicons name={icon} size={20} color={destructive ? '#f87171' : colors.accent} />
      </View>
      <View style={styles.rowText}>
        <Text style={[styles.rowTitle, { color: destructive ? '#f87171' : colors.text }]}>{title}</Text>
        {subtitle ? <Text style={[styles.rowSub, { color: colors.muted }]}>{subtitle}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
    </Pressable>
  );
}

export default function SettingsIndexScreen() {
  const insets = useSafeAreaInsets();
  const { colors, resetProfileStorage } = useUserProfile();
  const { s } = useAppPreferences();

  const logOut = () => {
    Alert.alert(s.logOutConfirmTitle, s.logOutConfirmBody, [
      { text: s.cancel, style: 'cancel' },
      {
        text: s.logOut,
        style: 'destructive',
        onPress: async () => {
          await clearAccessToken();
          await resetProfileStorage();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.bg }]} edges={['bottom']}>
      <SettingsSubpageHeader title={s.settingsScreenTitle} />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 24 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <PageContainer style={styles.pageInner}>
        <Text style={[styles.intro, { color: colors.muted }]}>{s.settingsIntro}</Text>
        <SettingsRow
          title={s.account}
          subtitle={s.accountSub}
          icon="person-circle-outline"
          colors={colors}
          onPress={() => router.push('/settings/account')}
        />
        <SettingsRow
          title={s.notifications}
          subtitle={s.notificationsSub}
          icon="notifications-outline"
          colors={colors}
          onPress={() => router.push('/settings/notifications')}
        />
        <SettingsRow
          title={s.dataPrivacy}
          subtitle={s.dataPrivacySub}
          icon="shield-checkmark-outline"
          colors={colors}
          onPress={() => router.push('/settings/data-privacy')}
        />
        <SettingsRow
          title={s.accessibility}
          subtitle={s.accessibilitySub}
          icon="accessibility-outline"
          colors={colors}
          onPress={() => router.push('/settings/accessibility')}
        />
        <SettingsRow
          title={s.language}
          subtitle={s.languageSub}
          icon="language-outline"
          colors={colors}
          onPress={() => router.push('/settings/language')}
        />
        <SettingsRow
          title={s.support}
          subtitle={s.supportSub}
          icon="help-circle-outline"
          colors={colors}
          onPress={() => router.push('/settings/support')}
        />
        <SettingsRow
          title={s.logOut}
          subtitle={s.logOutSub}
          icon="log-out-outline"
          colors={colors}
          destructive
          onPress={logOut}
        />
        </PageContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingTop: 16 },
  pageInner: { paddingHorizontal: 20 },
  intro: { fontSize: 14, lineHeight: 20, marginBottom: 18 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: { flex: 1 },
  rowTitle: { fontSize: 16, fontWeight: '700' },
  rowSub: { fontSize: 13, marginTop: 2, lineHeight: 18 },
});
