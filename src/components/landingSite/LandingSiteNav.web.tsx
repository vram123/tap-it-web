'use client';

import './landingSiteChrome.css';

import type { UiStrings } from '@/i18n/ui/types';
import React from 'react';

type LandingSiteNavProps = {
  landing: UiStrings['landing'];
};

export function LandingSiteNav({ landing: l }: LandingSiteNavProps) {
  return (
    <header className="landing-site-nav">
      <div className="landing-site-nav__inner">
        <a className="landing-site-nav__brand" href="/">
          {l.navBrand}
        </a>
        <nav className="landing-site-nav__links" aria-label={l.navAriaLabel}>
          <a className="landing-site-nav__link" href="/shop">
            {l.navShop}
          </a>
          <a className="landing-site-nav__link" href="/link-page">
            {l.navCustomPage}
          </a>
          <a className="landing-site-nav__link" href="/settings/support">
            {l.navResources}
          </a>
          <div className="landing-site-nav__cart-group">
            <div className="landing-site-nav__chart" aria-hidden>
              {[10, 18, 13, 20, 15].map((h, i) => (
                <span key={i} className="landing-site-nav__chart-bar" style={{ height: `${h}px` }} />
              ))}
            </div>
            <a className="landing-site-nav__link" href="/shop">
              {l.navCart}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
