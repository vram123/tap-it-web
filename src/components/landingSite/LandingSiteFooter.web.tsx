'use client';

import './landingSiteChrome.css';

import { HELP_CENTER_URL, PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from '@/constants/legalLinks';
import type { UiStrings } from '@/i18n/ui/types';
import React, { FormEvent, useState } from 'react';

type LandingSiteFooterProps = {
  landing: UiStrings['landing'];
};

export function LandingSiteFooter({ landing: l }: LandingSiteFooterProps) {
  const [thanks, setThanks] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setThanks(true);
  };

  const marquee = `${l.footerMarquee}  ·  `;

  return (
    <footer className="landing-site-footer">
      <div className="landing-site-footer__marquee" aria-hidden>
        <div className="landing-site-footer__marquee-track">
          <span className="landing-site-footer__marquee-group">{marquee.repeat(4)}</span>
          <span className="landing-site-footer__marquee-group">{marquee.repeat(4)}</span>
        </div>
      </div>

      <div className="landing-site-footer__main">
        <div className="landing-site-footer__col">
          <h3>{l.footerHeadingAccount}</h3>
          <ul className="landing-site-footer__list">
            <li>
              <a href="/register">{l.createAccount}</a>
            </li>
            <li>
              <a href="/login">{l.logIn}</a>
            </li>
            <li>
              <a href="/my-cards">{l.footerLinkMyCards}</a>
            </li>
          </ul>
        </div>

        <div className="landing-site-footer__col">
          <h3>{l.footerHeadingShop}</h3>
          <ul className="landing-site-footer__list">
            <li>
              <a href="/shop">{l.footerLinkShopHome}</a>
            </li>
            <li>
              <a href="/shop">{l.footerLinkPricing}</a>
            </li>
            <li>
              <a href="/link-page">{l.footerLinkCustom}</a>
            </li>
          </ul>
        </div>

        <div className="landing-site-footer__col">
          <h3>{l.footerHeadingResources}</h3>
          <ul className="landing-site-footer__list">
            <li>
              <a href={HELP_CENTER_URL} target="_blank" rel="noreferrer">
                {l.footerLinkHelp}
              </a>
            </li>
            <li>
              <a href={TERMS_OF_SERVICE_URL} target="_blank" rel="noreferrer">
                {l.footerLinkTerms}
              </a>
            </li>
            <li>
              <a href={PRIVACY_POLICY_URL} target="_blank" rel="noreferrer">
                {l.footerLinkPrivacy}
              </a>
            </li>
          </ul>
        </div>

        <div className="landing-site-footer__col landing-site-footer__newsletter">
          <h3>{l.footerNewsletterTitle}</h3>
          <p>{l.footerNewsletterSub}</p>
          <form className="landing-site-footer__form" onSubmit={onSubmit} noValidate>
            <label htmlFor="landing-footer-email" className="sr-only">
              {l.footerEmailPlaceholder}
            </label>
            <input
              id="landing-footer-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder={l.footerEmailPlaceholder}
            />
            <button type="submit">{l.footerSubmit}</button>
            {thanks ? <p className="landing-site-footer__thanks">{l.footerThanks}</p> : null}
          </form>
        </div>
      </div>

      <div className="landing-site-footer__bottom">
        <div className="landing-site-footer__bottom-inner">
          <div className="landing-site-footer__legal">
            <span>{l.footerCopyright}</span>
          </div>
          <div className="landing-site-footer__legal">
            <a href={TERMS_OF_SERVICE_URL} target="_blank" rel="noreferrer">
              {l.footerLinkTerms}
            </a>
            <a href={PRIVACY_POLICY_URL} target="_blank" rel="noreferrer">
              {l.footerLinkPrivacy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
