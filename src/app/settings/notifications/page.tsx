'use client';

import { PageContainer } from '@/components/WebMaxWidth';
import { SettingsSubpageHeader } from '@/components/SettingsSubpageHeader';
import { useAppPreferences } from '@/features/appPreferences/AppPreferencesContext';
import { useUserProfile } from '@/features/profile/UserProfileContext';
import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NotificationsSettingsScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useUserProfile();
  const { preferences, setPreferences, s } = useAppPreferences();

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.bg }]} edges={['bottom']}>
      <SettingsSubpageHeader title={s.notificationsTitle} />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 32 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <PageContainer style={styles.pageInner}>
        <Text style={[styles.lead, { color: colors.muted }]}>{s.notificationsLead}</Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={[styles.title, { color: colors.text }]}>{s.muteAll}</Text>
              <Text style={[styles.sub, { color: colors.muted }]}>{s.muteAllSub}</Text>
            </View>
            <Switch
              value={preferences.notificationsMuted}
              onValueChange={(v) => setPreferences({ notificationsMuted: v })}
              trackColor={{ false: colors.border, true: `${colors.accent}88` }}
              thumbColor={preferences.notificationsMuted ? colors.accent : '#f4f4f5'}
            />
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
  card: { borderRadius: 14, borderWidth: 1, padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  rowText: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  sub: { fontSize: 13, lineHeight: 18 },
});
