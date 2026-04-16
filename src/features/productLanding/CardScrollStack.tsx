'use client';

import { CARD_SCROLL_FRAMES } from '@/features/productLanding/cardScrollFrames';
import type { SharedValue } from 'react-native-reanimated';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Image, StyleSheet, View } from 'react-native';

function CardFrameLayer({
  index,
  scrollY,
  sectionH,
}: {
  index: number;
  scrollY: SharedValue<number>;
  sectionH: number;
}) {
  const style = useAnimatedStyle(() => {
    const y = scrollY.value;
    return {
      opacity: interpolate(
        y,
        [(index - 1) * sectionH, index * sectionH, (index + 1) * sectionH],
        [0, 1, 0],
        Extrapolation.CLAMP,
      ),
    };
  });

  return (
    <Animated.View style={[styles.frameAbs, style]} pointerEvents="none">
      <Image
        source={CARD_SCROLL_FRAMES[index]}
        style={styles.frameImg}
        resizeMode="contain"
        accessibilityLabel=""
      />
    </Animated.View>
  );
}

type Props = {
  scrollY: SharedValue<number>;
  sectionH: number;
  maxWidth: number;
};

export function CardScrollStack({ scrollY, sectionH, maxWidth }: Props) {
  return (
    <View style={[styles.stage, { maxWidth }]}>
      {CARD_SCROLL_FRAMES.map((_, i) => (
        <CardFrameLayer key={i} index={i} scrollY={scrollY} sectionH={sectionH} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    width: '100%',
    aspectRatio: 1,
    maxHeight: 420,
    alignSelf: 'center',
    position: 'relative',
  },
  frameAbs: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frameImg: {
    width: '100%',
    height: '100%',
  },
});
