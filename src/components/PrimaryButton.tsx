import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  /** Stretch to parent width; default is a centered pill up to `maxWidth`. */
  fullWidth?: boolean;
};

export function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  fullWidth = false,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        fullWidth ? styles.buttonFullWidth : styles.buttonSized,
        (disabled || loading) && styles.buttonDisabled,
        style,
      ]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonSized: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 360,
  },
  buttonFullWidth: {
    alignSelf: 'stretch',
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
