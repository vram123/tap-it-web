import { HOW_IT_WORKS_IMAGES } from '@/features/home/howItWorksSteps';
import React from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export type HowItWorksScrollStep = {
  key: keyof typeof HOW_IT_WORKS_IMAGES;
  stepLabel: string;
  title: string;
  body: string;
};

export type HowItWorksScrollSectionProps = {
  steps: HowItWorksScrollStep[];
  sectionTitle: string;
  sectionLead: string;
  tagline: string;
};

export function HowItWorksScrollSection({
  steps,
  sectionTitle,
  sectionLead,
  tagline,
}: HowItWorksScrollSectionProps) {
  const { width } = useWindowDimensions();
  const wide = width >= 880;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      <Text style={styles.sectionLead}>{sectionLead}</Text>
      <View style={[styles.stepsGrid, wide && styles.stepsGridWide]}>
        {steps.map(step => (
          <View key={step.key} style={[styles.stepCard, wide ? styles.stepCardWide : styles.stepCardNarrow]}>
            <Text style={styles.stepMeta}>{step.stepLabel}</Text>
            <Image
              source={HOW_IT_WORKS_IMAGES[step.key]}
              style={styles.stepImage}
              resizeMode="contain"
              accessibilityLabel=""
            />
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepBody}>{step.body}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.tagline}>{tagline}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
    paddingTop: 8,
    paddingHorizontal: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f4f4f5',
    letterSpacing: -0.3,
  },
  sectionLead: {
    fontSize: 14,
    color: '#a1a1aa',
    lineHeight: 21,
    marginBottom: 8,
  },
  stepsGrid: {
    gap: 14,
    paddingBottom: 24,
  },
  tagline: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: '800',
    color: '#e4e4e7',
    letterSpacing: -0.4,
    textAlign: 'center',
    paddingBottom: 32,
  },
  stepsGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 14,
  },
  stepCard: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(15,15,18,0.65)',
    padding: 14,
    gap: 8,
  },
  stepCardNarrow: {
    width: '100%',
  },
  stepCardWide: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 200,
    maxWidth: 320,
  },
  stepMeta: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: 'rgba(161,161,170,0.95)',
  },
  stepImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    backgroundColor: 'rgba(120,120,120,0.08)',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fafafa',
  },
  stepBody: {
    fontSize: 13,
    color: '#a1a1aa',
    lineHeight: 19,
  },
});
