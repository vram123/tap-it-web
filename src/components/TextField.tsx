import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';

type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
  containerStyle?: ViewStyle;
  /** When set, overrides default dark-theme label/input colors */
  labelColor?: string;
  inputBackgroundColor?: string;
  inputBorderColor?: string;
  inputTextColor?: string;
  /** Multiline / bio-style field with bounded height (100% of parent, not viewport). */
  minInputHeight?: number;
  maxInputHeight?: number;
};

export function TextField({
  label,
  error,
  containerStyle,
  labelColor,
  inputBackgroundColor,
  inputBorderColor,
  inputTextColor,
  minInputHeight,
  maxInputHeight,
  multiline,
  ...inputProps
}: TextFieldProps) {
  const isMultiline = Boolean(multiline);
  const minH = minInputHeight ?? (isMultiline ? 100 : undefined);
  const maxH = maxInputHeight ?? (isMultiline ? 200 : undefined);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelColor ? { color: labelColor } : null]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          isMultiline && styles.inputMultiline,
          minH != null ? { minHeight: minH } : null,
          maxH != null ? { maxHeight: maxH } : null,
          error ? styles.inputError : null,
          inputBackgroundColor ? { backgroundColor: inputBackgroundColor } : null,
          inputBorderColor ? { borderColor: error ? '#f87171' : inputBorderColor } : null,
          inputTextColor ? { color: inputTextColor } : null,
        ]}
        placeholderTextColor="#71717a"
        multiline={multiline}
        textAlignVertical={isMultiline ? 'top' : undefined}
        {...inputProps}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e4e4e7',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#18181c',
    borderWidth: 1,
    borderColor: '#2a2a30',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#e4e4e7',
    width: '100%',
    alignSelf: 'stretch',
  },
  inputMultiline: {
    paddingTop: 12,
  },
  inputError: {
    borderColor: '#f87171',
  },
  errorText: {
    fontSize: 12,
    color: '#f87171',
    marginTop: 4,
  },
});
