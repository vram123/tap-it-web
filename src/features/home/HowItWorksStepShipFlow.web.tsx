'use client';

import './howItWorksStepFlows.css';

import { HowItWorksAnimatedArrow } from '@/features/home/HowItWorksAnimatedArrow';
import { useHowStepFlowNear } from '@/features/home/useHowStepFlowNear';
import React from 'react';

export function HowItWorksStepShipFlow() {
  const { ref, near, reduceMotion, arrowAnimate } = useHowStepFlowNear();

  return (
    <div ref={ref} className={`how-step-flow how-step-flow--ship ${near ? 'how-step-flow--on' : ''}`}>
      <span className="how-step-flow__sr" id="how-ship-flow-label">
        Visual: programmed cards are packed and sent to you in protective mailers.
      </span>

      <div role="region" aria-labelledby="how-ship-flow-label">
        <div className="how-step-flow__grid">
          <div>
            <div className="how-step-flow__label">Ready cards</div>
            <div className="how-step-flow__panel how-ship__bundle">
              <div className="how-ship__cards">
                <div className="how-ship__card-piece how-ship__card-piece--back" />
                <div className="how-ship__card-piece how-ship__card-piece--front" />
              </div>
            </div>
          </div>

          <HowItWorksAnimatedArrow active={arrowAnimate} caption="Pack & ship" variant="sky-rose" />

          <div>
            <div className="how-step-flow__label">In the mail</div>
            <div className="how-step-flow__panel how-ship__mail">
              <div className="how-ship__envelope">
                <div className="how-ship__env-body" />
                <div className="how-ship__env-flap" />
                <div className="how-ship__motion" aria-hidden>
                  <svg width="140" height="22" viewBox="0 0 140 22" preserveAspectRatio="none">
                    <path
                      className="how-ship__motion-line"
                      d="M-10 14 C 30 4, 50 18, 75 11 S 120 6, 150 12"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="how-step-flow__hint">
          {reduceMotion
            ? 'Orders ship in protective packaging — tracking-style motion is decorative only.'
            : 'Cards leave protected — the moving lines suggest your order on its way.'}
        </p>
      </div>
    </div>
  );
}
