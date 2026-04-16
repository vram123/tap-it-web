'use client';

import './howItWorksUrlStack.css';

import { brandLabel, type UrlBrand, UrlBrandIcon } from '@/features/home/howItWorksUrlBrandIcons';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type UrlSample = {
  id: string;
  brand: UrlBrand;
  kind: string;
  url: string;
};

const URL_POOL: UrlSample[] = [
  { id: 'ig1', brand: 'instagram', kind: 'Social', url: 'https://www.instagram.com/tapitcards' },
  { id: 'ig2', brand: 'instagram', kind: 'Social', url: 'https://www.instagram.com/yourstudio' },
  { id: 'li1', brand: 'linkedin', kind: 'Professional', url: 'https://www.linkedin.com/in/yourname' },
  { id: 'li2', brand: 'linkedin', kind: 'Professional', url: 'https://www.linkedin.com/company/acme-events' },
  { id: 'g1', brand: 'google', kind: 'Reviews', url: 'https://g.page/your-business/review' },
  { id: 'g2', brand: 'google', kind: 'Reviews', url: 'https://www.google.com/maps?cid=your-place-id' },
  { id: 'yelp', brand: 'yelp', kind: 'Reviews', url: 'https://www.yelp.com/biz/your-storefront' },
  { id: 'site', brand: 'website', kind: 'Website', url: 'https://www.yourbrand.com/book' },
  { id: 'cal', brand: 'calendly', kind: 'Booking', url: 'https://calendly.com/you/intro' },
  { id: 'gh', brand: 'github', kind: 'Portfolio', url: 'https://github.com/yourhandle' },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const DEPTH = 5;
const LOOP_MS = 2600;

export function HowItWorksStepOneUrlStack() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [head, setHead] = useState(0);

  const items = useMemo(() => shuffle(URL_POOL).slice(0, Math.max(DEPTH + 2, 7)), []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
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

  useEffect(() => {
    if (!near || reduceMotion) return;
    const id = window.setInterval(() => {
      setHead(h => (h + 1) % items.length);
    }, LOOP_MS);
    return () => clearInterval(id);
  }, [near, reduceMotion, items.length]);

  const front = items[head % items.length];

  return (
    <div ref={wrapRef} className="how-flow__url-stack-wrap">
      <span className="how-flow__url-stack-sr" id="how-url-stack-label">
        Animated examples of links your NFC card can open. The front card cycles through sample destinations.
      </span>

      <div
        className={`how-url-stack-auto ${near ? 'how-url-stack-auto--on' : ''}`}
        role="region"
        aria-labelledby="how-url-stack-label"
        aria-live="polite"
      >
        <div className="how-url-stack-auto__deck" aria-hidden>
          {Array.from({ length: DEPTH }, (_, depth) => {
            const item = items[(head + depth) % items.length];
            return (
              <div
                key={depth}
                className="how-url-stack-auto__layer"
                data-depth={depth}
                style={{ zIndex: DEPTH - depth }}
              >
                <div
                  className={`how-url-stack-auto__card ${depth === 0 ? 'how-url-stack-auto__card--front' : ''}`}
                  data-depth={depth}
                >
                  <div key={`${head}-${depth}-${item.id}`} className="how-url-stack-auto__card-inner">
                    <div className="how-url-stack__row">
                      <div className="how-url-stack__icon-wrap" aria-hidden>
                        <UrlBrandIcon brand={item.brand} className="how-url-stack__icon" />
                      </div>
                      <div className="how-url-stack__col">
                        <div className="how-url-stack__kind">
                          {brandLabel(item.brand)} · {item.kind}
                        </div>
                        <div className="how-url-stack__url">{item.url}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="how-flow__url-stack-live" aria-live="polite" aria-atomic="true">
          Now showing: {brandLabel(front.brand)}, {front.kind}. {front.url}
        </p>

        <p className="how-url-stack__hint">
          {reduceMotion ? 'Sample destinations (animation reduced).' : 'Sample links cycle automatically — any URL you choose can live on your card.'}
        </p>
      </div>
    </div>
  );
}
