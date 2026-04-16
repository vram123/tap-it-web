import { FORM_PAGE_MAX_WIDTH } from '@/constants/layout';
import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

export { FORM_PAGE_MAX_WIDTH };

type WebMaxWidthProps = {
  children: React.ReactNode;
  /** Max width in px; content stays centered on large screens. */
  maxWidth?: number;
  style?: ViewStyle;
};

/**
 * Constrains content width on desktop while staying full-width on phones.
 */
export function WebMaxWidth({ children, maxWidth = FORM_PAGE_MAX_WIDTH, style }: WebMaxWidthProps) {
  return <View style={[styles.wrap, { maxWidth }, style]}>{children}</View>;
}

/** Centered main column for forms and profile-style pages (~720px). */
export function PageContainer({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <WebMaxWidth maxWidth={FORM_PAGE_MAX_WIDTH} style={style}>
      {children}
    </WebMaxWidth>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    alignSelf: 'center',
  },
});
