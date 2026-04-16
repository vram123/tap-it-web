import React from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

type FormSectionProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  borderColor: string;
  backgroundColor: string;
  titleColor: string;
  subtitleColor: string;
  style?: ViewStyle;
};

/**
 * Groups form fields in a padded card (Stripe / Notion–style) without changing theme colors.
 */
export function FormSection({
  title,
  subtitle,
  children,
  borderColor,
  backgroundColor,
  titleColor,
  subtitleColor,
  style,
}: FormSectionProps) {
  return (
    <View style={[styles.wrap, { borderColor, backgroundColor }, style]}>
      {title ? <Text style={[styles.title, { color: titleColor }]}>{title}</Text> : null}
      {subtitle ? <Text style={[styles.subtitle, { color: subtitleColor }]}>{subtitle}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
});
