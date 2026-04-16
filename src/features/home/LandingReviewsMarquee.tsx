import type { LandingReviewItem } from '@/features/home/landingMockReviews';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export type { LandingReviewItem };

export type LandingReviewsMarqueeProps = {
  title: string;
  lead: string;
  reviews: readonly LandingReviewItem[];
};

function ReviewCard({ name, role, quote }: LandingReviewItem) {
  return (
    <View style={styles.card}>
      <View accessible={false} importantForAccessibility="no-hide-descendants">
        <Text style={styles.stars}>★★★★★</Text>
      </View>
      <Text style={styles.quote}>&ldquo;{quote}&rdquo;</Text>
      <View style={styles.meta}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
    </View>
  );
}

export function LandingReviewsMarquee({ title, lead, reviews }: LandingReviewsMarqueeProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [segmentW, setSegmentW] = useState(0);
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  const onFirstSegmentLayout = (e: LayoutChangeEvent) => {
    const w = Math.ceil(e.nativeEvent.layout.width);
    if (w > 0) setSegmentW(w);
  };

  useEffect(() => {
    if (segmentW <= 0) return;
    translateX.setValue(0);
    animRef.current?.stop();
    const msPerPx = 42;
    const duration = Math.min(95000, Math.max(28000, segmentW * msPerPx));
    const loop = Animated.loop(
      Animated.timing(translateX, {
        toValue: -segmentW,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animRef.current = loop;
    loop.start();
    return () => loop.stop();
  }, [segmentW, translateX]);

  return (
    <View style={styles.section}>
      <View style={styles.intro}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.lead}>{lead}</Text>
      </View>
      <View style={styles.viewport}>
        <Animated.View style={[styles.track, { transform: [{ translateX }] }]}>
          <View style={styles.segment} onLayout={onFirstSegmentLayout}>
            {reviews.map((r, i) => (
              <ReviewCard key={`a-${i}`} {...r} />
            ))}
          </View>
          <View style={styles.segment}>
            {reviews.map((r, i) => (
              <ReviewCard key={`b-${i}`} {...r} />
            ))}
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    paddingTop: 36,
    paddingBottom: 40,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  intro: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f4f4f5',
    letterSpacing: -0.3,
    textAlign: 'center',
    marginBottom: 10,
  },
  lead: {
    fontSize: 14,
    color: '#a1a1aa',
    lineHeight: 21,
    textAlign: 'center',
    maxWidth: 520,
  },
  viewport: {
    overflow: 'hidden',
    width: '100%',
  },
  track: {
    flexDirection: 'row',
  },
  segment: {
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  card: {
    width: 280,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(15,15,18,0.72)',
    padding: 16,
    gap: 10,
  },
  stars: {
    fontSize: 12,
    letterSpacing: 2,
    color: 'rgba(251, 191, 36, 0.95)',
  },
  quote: {
    fontSize: 14,
    lineHeight: 21,
    color: '#e4e4e7',
  },
  meta: {
    marginTop: 4,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fafafa',
  },
  role: {
    fontSize: 12,
    color: '#71717a',
    marginTop: 2,
  },
});
