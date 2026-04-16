'use client';

import { useEffect, useRef, useState } from 'react';

export function useHowStepFlowNear() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => {
        const e = entries[0];
        setNear(Boolean(e?.isIntersecting && e.intersectionRatio >= 0.08));
      },
      { root: null, rootMargin: '0px 0px -6% 0px', threshold: [0, 0.06, 0.1, 0.2] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, near, reduceMotion, arrowAnimate: near && !reduceMotion };
}
