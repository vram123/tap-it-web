import React from 'react';

type LandingCenterVideoProps = {
  videoSrc?: string;
  ariaLabel?: string;
};

/** Web-only centered hero video; native builds render nothing. */
export function LandingCenterVideo(_props: LandingCenterVideoProps) {
  return null;
}
