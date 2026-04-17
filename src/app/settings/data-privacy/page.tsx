'use client';

import { PageContainer } from '@/components/WebMaxWidth';
import { SettingsSubpageHeader } from '@/components/SettingsSubpageHeader';
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from '@/constants/legalLinks';
import { useAppPreferences } from '@/features/appPreferences/AppPreferencesContext';
import { useUserProfile } from '@/features/profile/UserProfileContext';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Linking, Platform } from 'react-native';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

function openExternal(url: string) {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }

  try {
    void Linking.openURL(url);
  } catch {
    Alert.alert('Cannot open link', 'Check the URL and try again.');
  }
}

export default function DataPrivacySettingsScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useUserProfile();
  const { preferences, setPreferences, s } = useAppPreferences();
  const toggleTrackColor = { false: colors.border, true: `${colors.accent}88` };
  const toggleThumb = (enabled: boolean) => (enabled ? colors.accent : '#f4f4f5');

  const handleExportData = () => {
    Alert.alert(
      'Export my data',
      'A secure download link will be sent to your email within 24 hours (demo behavior).',
    );
  };

  const handleDeleteRequest = () => {
    Alert.alert(
      'Request account deletion',
      'This starts a 30-day deletion workflow and you can cancel during that period (demo behavior).',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit request',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Request submitted', 'We recorded your deletion request for review.');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.bg }]} edges={['bottom']}>
      <SettingsSubpageHeader title={s.dataPrivacyTitle} />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 32 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <PageContainer style={styles.pageInner}>
          <Text style={[styles.lead, { color: colors.muted }]}>{s.dataPrivacyLead}</Text>

          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.row}>
              <View style={styles.rowText}>
                <Text style={[styles.title, { color: colors.text }]}>{s.improveService}</Text>
                <Text style={[styles.sub, { color: colors.muted }]}>{s.improveServiceSub}</Text>
              </View>
              <Switch
                value={preferences.useDataToImprove}
                onValueChange={(v) => setPreferences({ useDataToImprove: v })}
                trackColor={toggleTrackColor}
                thumbColor={toggleThumb(preferences.useDataToImprove)}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.row}>
              <View style={styles.rowText}>
                <Text style={[styles.title, { color: colors.text }]}>Share crash diagnostics</Text>
                <Text style={[styles.sub, { color: colors.muted }]}>
                  Send error logs so we can investigate incidents faster.
                </Text>
              </View>
              <Switch
                value={preferences.shareCrashReports}
                onValueChange={(v) => setPreferences({ shareCrashReports: v })}
                trackColor={toggleTrackColor}
                thumbColor={toggleThumb(preferences.shareCrashReports)}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.row}>
              <View style={styles.rowText}>
                <Text style={[styles.title, { color: colors.text }]}>Allow personalization</Text>
                <Text style={[styles.sub, { color: colors.muted }]}>
                  Use your activity to tailor recommendations and in-app content.
                </Text>
              </View>
              <Switch
                value={preferences.allowPersonalizedContent}
                onValueChange={(v) => setPreferences({ allowPersonalizedContent: v })}
                trackColor={toggleTrackColor}
                thumbColor={toggleThumb(preferences.allowPersonalizedContent)}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.row}>
              <View style={styles.rowText}>
                <Text style={[styles.title, { color: colors.text }]}>Marketing email consent</Text>
                <Text style={[styles.sub, { color: colors.muted }]}>
                  Receive product updates and promotional messages by email.
                </Text>
              </View>
              <Switch
                value={preferences.allowMarketingEmails}
                onValueChange={(v) => setPreferences({ allowMarketingEmails: v })}
                trackColor={toggleTrackColor}
                thumbColor={toggleThumb(preferences.allowMarketingEmails)}
              />
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.title, { color: colors.text, marginBottom: 8 }]}>Your privacy rights</Text>
            <Text style={[styles.sub, { color: colors.muted }]}>
              You can request a copy of your data or ask us to delete your account information.
            </Text>

            <Pressable
              onPress={handleExportData}
              style={({ pressed }) => [
                styles.actionButton,
                { borderColor: colors.border, backgroundColor: colors.bg },
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text style={[styles.actionButtonText, { color: colors.text }]}>Request data export</Text>
            </Pressable>

            <Pressable
              onPress={handleDeleteRequest}
              style={({ pressed }) => [
                styles.actionButton,
                { borderColor: 'rgba(248,113,113,0.5)', backgroundColor: 'rgba(248,113,113,0.08)' },
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text style={styles.deleteActionText}>Request account deletion</Text>
            </Pressable>
          </View>

          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.title, { color: colors.text }]}>Privacy outcomes you can expect</Text>
            <Text style={[styles.readableSubhead, { color: colors.text }]}>Data minimization</Text>
            <Text style={[styles.sub, { color: colors.muted }]}>
              We only collect information needed to run the service, secure accounts, and improve reliability.
            </Text>

            <Text style={[styles.readableSubhead, { color: colors.text }]}>Purpose limitation</Text>
            <Text style={[styles.sub, { color: colors.muted }]}>
              Your data is used only for core product functionality, support, fraud prevention, and approved
              preferences shown above.
            </Text>

            <Text style={[styles.readableSubhead, { color: colors.text }]}>Retention controls</Text>
            <Text style={[styles.sub, { color: colors.muted }]}>
              Data is retained only as long as needed for legal, security, and operational requirements, then deleted
              or anonymized.
            </Text>

            <Text style={[styles.readableSubhead, { color: colors.text }]}>User rights and transparency</Text>
            <Text style={[styles.sub, { color: colors.muted }]}>
              You can request export, correction, and deletion, and review our legal documents at any time.
            </Text>

            <Text style={[styles.readableSubhead, { color: colors.text }]}>Security safeguards</Text>
            <Text style={[styles.sub, { color: colors.muted }]}>
              We apply encryption in transit, access controls, and monitoring practices to reduce unauthorized access
              risk.
            </Text>
          </View>

          <Pressable
            onPress={() => openExternal(TERMS_OF_SERVICE_URL)}
            style={({ pressed }) => [
              styles.linkRow,
              { backgroundColor: colors.surface, borderColor: colors.border },
              pressed && { opacity: 0.85 },
            ]}
          >
            <Ionicons name="document-text-outline" size={22} color={colors.accent} />
            <Text style={[styles.linkTitle, { color: colors.text }]}>{s.termsOfService}</Text>
            <Ionicons name="open-outline" size={20} color={colors.muted} />
          </Pressable>

          <Pressable
            onPress={() => openExternal(PRIVACY_POLICY_URL)}
            style={({ pressed }) => [
              styles.linkRow,
              { backgroundColor: colors.surface, borderColor: colors.border },
              pressed && { opacity: 0.85 },
            ]}
          >
            <Ionicons name="lock-closed-outline" size={22} color={colors.accent} />
            <Text style={[styles.linkTitle, { color: colors.text }]}>{s.privacyPolicy}</Text>
            <Ionicons name="open-outline" size={20} color={colors.muted} />
          </Pressable>

          <Text style={[styles.note, { color: colors.muted }]}>
            Legal pages open in your default browser. Privacy requests are verified before completion.
          </Text>
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
  card: { borderRadius: 14, borderWidth: 1, padding: 16, marginBottom: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  rowText: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  sub: { fontSize: 13, lineHeight: 18 },
  divider: { height: 1, marginVertical: 14 },
  actionButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  actionButtonText: { fontSize: 14, fontWeight: '600' },
  deleteActionText: { fontSize: 14, fontWeight: '700', color: '#f87171' },
  readableSubhead: { fontSize: 14, fontWeight: '700', marginTop: 14, marginBottom: 4 },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
  linkTitle: { flex: 1, fontSize: 16, fontWeight: '600' },
  note: { fontSize: 12, lineHeight: 17, marginTop: 8 },
});
