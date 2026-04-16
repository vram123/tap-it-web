'use client';

import './howItWorksStepFlows.css';

import { HowItWorksAnimatedArrow } from '@/features/home/HowItWorksAnimatedArrow';
import { useHowStepFlowNear } from '@/features/home/useHowStepFlowNear';
import React from 'react';

function VerifyIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="rgba(192, 132, 252, 0.92)"
        d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 16l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"
      />
    </svg>
  );
}

export function HowItWorksStepEmbedFlow() {
  const { ref, near, reduceMotion, arrowAnimate } = useHowStepFlowNear();

  return (
    <div ref={ref} className={`how-step-flow how-step-flow--embed ${near ? 'how-step-flow--on' : ''}`}>
      <span className="how-step-flow__sr" id="how-embed-flow-label">
        Visual: your link is verified, then encoded onto the NFC chip on your card.
      </span>

      <div role="region" aria-labelledby="how-embed-flow-label">
        <div className="how-step-flow__grid">
          <div>
            <div className="how-step-flow__label">Verify & test</div>
            <div className="how-step-flow__panel how-embed__verify">
              <VerifyIcon />
              <p className="how-embed__checksum">SHA-256 ✓ · NDEF OK · tap test passed</p>
            </div>
          </div>

          <HowItWorksAnimatedArrow active={arrowAnimate} caption="Encode on chip" variant="violet-amber" />

          <div>
            <div className="how-step-flow__label">Your card</div>
            <div className="how-step-flow__panel how-embed__card">
              <div className="how-embed__card-skin">
                <div className="how-embed__chip" />
                <div className="how-embed__scan" />
              </div>
            </div>
          </div>
        </div>

        <p className="how-step-flow__hint">
          {reduceMotion
            ? 'We verify your URL, write it to the chip, and run a live tap check before shipping.'
            : 'Animation shows verification on the left, then your link fused into the physical NFC card.'}
        </p>
      </div>
    </div>
  );
}
