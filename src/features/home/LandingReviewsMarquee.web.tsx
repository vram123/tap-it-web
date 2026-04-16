'use client';

import './landingReviewsMarquee.css';

import type { LandingReviewItem } from '@/features/home/landingMockReviews';
import React from 'react';

export type LandingReviewsMarqueeProps = {
  title: string;
  lead: string;
  reviews: readonly LandingReviewItem[];
};

function ReviewCard({ name, role, quote }: LandingReviewItem) {
  return (
    <article className="landing-reviews-marquee__card">
      <div className="landing-reviews-marquee__stars" aria-hidden>
        ★★★★★
      </div>
      <p className="landing-reviews-marquee__quote">&ldquo;{quote}&rdquo;</p>
      <div className="landing-reviews-marquee__meta">
        <p className="landing-reviews-marquee__name">{name}</p>
        <p className="landing-reviews-marquee__role">{role}</p>
      </div>
    </article>
  );
}

function ReviewRow({ reviews, duplicate }: { reviews: readonly LandingReviewItem[]; duplicate?: boolean }) {
  return (
    <div
      className={
        duplicate
          ? 'landing-reviews-marquee__group landing-reviews-marquee__group--duplicate'
          : 'landing-reviews-marquee__group'
      }
      aria-hidden={duplicate}
    >
      {reviews.map((r, i) => (
        <ReviewCard key={`${duplicate ? 'd' : 'a'}-${i}-${r.name}`} {...r} />
      ))}
    </div>
  );
}

export function LandingReviewsMarquee({ title, lead, reviews }: LandingReviewsMarqueeProps) {
  return (
    <section className="landing-reviews-marquee" aria-labelledby="landing-reviews-heading">
      <div className="landing-reviews-marquee__intro">
        <h2 id="landing-reviews-heading">{title}</h2>
        <p>{lead}</p>
      </div>
      <div className="landing-reviews-marquee__viewport">
        <div className="landing-reviews-marquee__track">
          <ReviewRow reviews={reviews} />
          <ReviewRow reviews={reviews} duplicate />
        </div>
      </div>
    </section>
  );
}
