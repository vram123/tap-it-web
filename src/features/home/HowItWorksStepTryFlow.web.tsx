'use client';

import './howItWorksStepFlows.css';

import { HowItWorksAnimatedArrow } from '@/features/home/HowItWorksAnimatedArrow';
import { useHowStepFlowNear } from '@/features/home/useHowStepFlowNear';
import React from 'react';

export function HowItWorksStepTryFlow() {
  const { ref, near, reduceMotion, arrowAnimate } = useHowStepFlowNear();

  return (
    <div ref={ref} className={`how-step-flow how-step-flow--try ${near ? 'how-step-flow--on' : ''}`}>
      <span className="how-step-flow__sr" id="how-try-flow-label">
        Visual: tap the NFC card to a phone to open your link, similar to contactless pay.
      </span>

      <div role="region" aria-labelledby="how-try-flow-label">
        <div className="how-step-flow__grid">
          <div>
            <div className="how-step-flow__label">Your card</div>
            <div className="how-step-flow__panel how-try__nfc">
              <div className="how-try__mini-card">
                <div className="how-try__mini-chip" />
              </div>
            </div>
          </div>

          <HowItWorksAnimatedArrow active={arrowAnimate} caption="NFC tap" variant="cyan-fuchsia" />

          <div>
            <div className="how-step-flow__label">Their phone</div>
            <div className="how-step-flow__panel how-try__phone">
              <div className="how-try__phone-frame">
                <div className="how-try__phone-screen">
                  <div className="how-try__waves">
                    <span className="how-try__wave" />
                    <span className="how-try__wave" />
                    <span className="how-try__wave" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="how-step-flow__hint">
          {reduceMotion
            ? 'In real life, a tap opens your page instantly — like Apple Pay, but for your link.'
            : 'Waves show the phone reading the chip when the card gets close.'}
        </p>
      </div>
    </div>
  );
}
