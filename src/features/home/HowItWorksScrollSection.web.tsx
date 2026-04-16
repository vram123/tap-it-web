'use client';

import './howItWorksScroll.css';

import { HowItWorksStepEmbedFlow } from '@/features/home/HowItWorksStepEmbedFlow';
import { HowItWorksStepOneUrlStack } from '@/features/home/HowItWorksStepOneUrlStack';
import { HowItWorksStepServerFlow } from '@/features/home/HowItWorksStepServerFlow';
import { HowItWorksStepShipFlow } from '@/features/home/HowItWorksStepShipFlow';
import { HowItWorksStepTryFlow } from '@/features/home/HowItWorksStepTryFlow';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export type HowItWorksScrollStep = {
  key: string;
  stepLabel: string;
  title: string;
  body: string;
};

export type HowItWorksScrollSectionProps = {
  steps: HowItWorksScrollStep[];
  sectionTitle: string;
  sectionLead: string;
  /** Shown below the steps with a scroll-triggered animation (e.g. “One tap is all it takes”). */
  tagline: string;
};

export function HowItWorksScrollSection({
  steps,
  sectionTitle,
  sectionLead,
  tagline,
}: HowItWorksScrollSectionProps) {
  const [active, setActive] = useState(0);
  const [taglineOn, setTaglineOn] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    stepRefs.current = stepRefs.current.slice(0, steps.length);
  }, [steps.length]);

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          const el = e.target as HTMLDivElement;
          if (e.isIntersecting) {
            el.classList.add('is-visible');
          }
        });

        const visible = entries
          .filter(e => e.isIntersecting && e.intersectionRatio >= 0.12)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const best = visible[0];
        if (best?.target) {
          const idx = els.indexOf(best.target as HTMLDivElement);
          if (idx >= 0) setActive(idx);
        }
      },
      {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0, 0.06, 0.12, 0.2, 0.35, 0.55, 0.75, 0.9],
      },
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [steps.length]);

  useEffect(() => {
    const el = taglineRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setTaglineOn(true);
      },
      { root: null, rootMargin: '0px', threshold: 0.22 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [tagline]);

  const scrollToStep = useCallback((index: number) => {
    const el = stepRefs.current[index];
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  const taglineChars = tagline.split('');
  const stepsNavLabel = `${sectionTitle} — step navigation`;

  return (
    <section className="how-flow" aria-labelledby="how-flow-heading">
      <div className="how-flow__intro">
        <h2 id="how-flow-heading">{sectionTitle}</h2>
        <p>{sectionLead}</p>
      </div>

      <div className="how-flow__split">
        <nav className="how-flow__rail" aria-label={stepsNavLabel}>
          <div className="how-flow__rail-inner">
            <ol className="how-flow__rail-list">
              {steps.map((step, i) => (
                <li key={step.key}>
                  <button
                    type="button"
                    className={`how-flow__rail-btn ${i === active ? 'is-active' : ''}`}
                    onClick={() => scrollToStep(i)}
                    aria-current={i === active ? 'step' : undefined}
                  >
                    <span className="how-flow__rail-num" aria-hidden>
                      {i + 1}
                    </span>
                    <span className="how-flow__rail-caption">{step.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="how-flow__list" role="presentation">
          {steps.map((step, i) => (
            <div
              key={step.key}
              ref={el => {
                stepRefs.current[i] = el;
              }}
              className={`how-flow__step ${i === active ? 'is-active' : ''}`}
              role="article"
            >
              <div className="how-flow__badge" aria-hidden>
                {i + 1}
              </div>
              <div className="how-flow__body">
                <div className="how-flow__meta">{step.stepLabel}</div>
                <h3 className="how-flow__title">{step.title}</h3>
                <p className="how-flow__text">{step.body}</p>
                {step.key === 'link' ? <HowItWorksStepOneUrlStack /> : null}
                {step.key === 'server' ? <HowItWorksStepServerFlow /> : null}
                {step.key === 'embed' ? <HowItWorksStepEmbedFlow /> : null}
                {step.key === 'ship' ? <HowItWorksStepShipFlow /> : null}
                {step.key === 'try' ? <HowItWorksStepTryFlow /> : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="how-flow__tagline-wrap">
        <p
          ref={taglineRef}
          className={`how-flow__tagline ${taglineOn ? 'how-flow__tagline--in' : ''}`}
          aria-live="polite"
        >
          {taglineChars.map((ch, i) => (
            <span
              key={`t-${i}`}
              className="how-flow__tagline-char"
              style={{ animationDelay: `${i * 0.052}s` }}
            >
              {ch === ' ' ? '\u00a0' : ch}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
