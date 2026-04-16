'use client';

import './landingHeroVideo.css';

import React, { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_SRC = '/video/vd1.mp4';

type LandingCenterVideoProps = {
  videoSrc?: string;
  ariaLabel?: string;
};

export function LandingCenterVideo({ videoSrc = DEFAULT_SRC, ariaLabel = 'Product preview' }: LandingCenterVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const sync = () => setIsPlaying(!v.paused);
    v.addEventListener('play', sync);
    v.addEventListener('pause', sync);
    sync();
    return () => {
      v.removeEventListener('play', sync);
      v.removeEventListener('pause', sync);
    };
  }, [videoSrc]);

  const togglePlayback = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  }, []);

  return (
    <div className="landing-hero-video-wrap">
      <div className="landing-hero-video-frame">
        <video
          ref={videoRef}
          className="landing-hero-video-el"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={ariaLabel}
        />
        <div className="landing-hero-video-controls">
          <button
            type="button"
            className="landing-hero-video-play"
            onClick={togglePlayback}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" aria-hidden>
                <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
                <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M9 6.5v11L18 12 9 6.5z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
