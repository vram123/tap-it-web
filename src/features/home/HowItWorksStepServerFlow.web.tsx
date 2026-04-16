'use client';

import './howItWorksServerFlow.css';

import { HowItWorksAnimatedArrow } from '@/features/home/HowItWorksAnimatedArrow';
import { useHowStepFlowNear } from '@/features/home/useHowStepFlowNear';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const ROTATE_MS = 2200;

function randHex(len: number): string {
  const c = '0123456789abcdef';
  let s = '';
  for (let i = 0; i < len; i++) s += c[Math.floor(Math.random() * 16)];
  return s;
}

function randB64ish(len: number): string {
  const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let s = '';
  for (let i = 0; i < len; i++) s += c[Math.floor(Math.random() * c.length)];
  return s;
}

function buildRandomHandoffUrl(): string {
  const templates = [
    () => `https://api.tapit.io/v1/handoff/${randHex(8)}`,
    () => `https://link.tapit.io/l/${randB64ish(10)}`,
    () => `https://secure.tapit.io/resolve?sid=${randHex(12)}`,
    () => `https://nbn.tapit.io/r/${randHex(6)}/token/${randB64ish(8)}`,
    () => `https://edge.tapit.io/go?id=${randHex(16)}`,
    () => `https://tap.it/h/${randB64ish(12)}`,
    () => `https://svc.tapit.io/link/${randHex(4)}-${randHex(4)}/verify`,
  ];
  return templates[Math.floor(Math.random() * templates.length)]();
}

function ServerRackIcon() {
  return (
    <svg className="how-server-flow__server-svg" viewBox="0 0 56 52" aria-hidden>
      <rect x="8" y="4" width="40" height="44" rx="4" fill="rgba(0,0,0,0.35)" stroke="currentColor" strokeWidth="1.2" />
      <rect x="12" y="9" width="32" height="10" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(167,243,208,0.35)" />
      <circle className="led led--1" cx="16" cy="14" r="2" fill="#34d399" />
      <rect x="22" y="12" width="18" height="4" rx="1" fill="rgba(167,243,208,0.2)" />
      <rect x="12" y="22" width="32" height="10" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(167,243,208,0.35)" />
      <circle className="led led--2" cx="16" cy="27" r="2" fill="#34d399" />
      <rect x="22" y="25" width="18" height="4" rx="1" fill="rgba(167,243,208,0.2)" />
      <rect x="12" y="35" width="32" height="10" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(167,243,208,0.35)" />
      <circle className="led led--3" cx="16" cy="40" r="2" fill="#34d399" />
      <rect x="22" y="38" width="18" height="4" rx="1" fill="rgba(167,243,208,0.2)" />
    </svg>
  );
}

export function HowItWorksStepServerFlow() {
  const { ref, near, reduceMotion, arrowAnimate } = useHowStepFlowNear();
  const [tick, setTick] = useState(0);

  const url = useMemo(() => buildRandomHandoffUrl(), [tick]);
  const bump = useCallback(() => setTick(t => t + 1), []);

  useEffect(() => {
    if (!near || reduceMotion) return;
    const id = window.setInterval(bump, ROTATE_MS);
    return () => clearInterval(id);
  }, [near, reduceMotion, bump]);

  return (
    <div ref={ref} className={`how-server-flow ${near ? 'how-server-flow--on' : ''}`}>
      <span className="how-server-flow__sr" id="how-server-flow-label">
        Animated example: your link is sent securely to Tapit servers. Sample request URLs rotate for demonstration.
      </span>

      <div role="region" aria-labelledby="how-server-flow-label">
        <div className="how-server-flow__grid">
          <div>
            <div className="how-server-flow__label">Your link (example)</div>
            <div className="how-server-flow__url-card">
              <p key={url} className={`how-server-flow__url-text ${near && !reduceMotion ? 'how-server-flow__url-text--enter' : ''}`}>
                {url}
              </p>
            </div>
          </div>

          <HowItWorksAnimatedArrow active={arrowAnimate} caption="Secure handoff" variant="indigo-emerald" />

          <div>
            <div className="how-server-flow__label">Tapit server</div>
            <div className="how-server-flow__server-card">
              <ServerRackIcon />
              <p className="how-server-flow__server-title">Our cloud</p>
            </div>
          </div>
        </div>

        <p className="how-server-flow__hint">
          {reduceMotion
            ? 'Demo URLs are fictional — your real destination is stored and verified on our systems.'
            : 'Random example endpoints cycle to suggest how your URL reaches our servers — then we encode your card.'}
        </p>

        <p className="how-server-flow__sr" aria-live="polite" aria-atomic="true">
          Example handoff URL: {url}
        </p>
      </div>
    </div>
  );
}
