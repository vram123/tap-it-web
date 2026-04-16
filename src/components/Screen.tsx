import { FORM_PAGE_MAX_WIDTH } from '@/constants/layout';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  /** Centered column max width for web (default ~720px). */
  contentMaxWidth?: number;
  /** Edge-to-edge width (no max-width cap); use for full-bleed landing/marketing. */
  fullBleed?: boolean;
};

export function Screen({
  children,
  style,
  contentMaxWidth = FORM_PAGE_MAX_WIDTH,
  fullBleed = false,
}: ScreenProps) {
  return (
    <SafeAreaView style={[styles.screen, fullBleed && styles.screenFullBleed, style]}>
      <View style={[styles.inner, fullBleed ? styles.innerFullBleed : { maxWidth: contentMaxWidth }]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f0f12',
    paddingVertical: 20,
    alignItems: 'center',
  },
  screenFullBleed: {
    alignItems: 'stretch',
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  inner: {
    flex: 1,
    width: '100%',
    minHeight: 0,
    paddingHorizontal: 24,
  },
  innerFullBleed: {
    paddingHorizontal: 0,
    width: '100%',
    alignSelf: 'stretch',
  },
});
