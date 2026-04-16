export type LandingReviewItem = {
  name: string;
  role: string;
  quote: string;
};

/** Demo testimonials for the landing marquee (not tied to real users). */
export const LANDING_MOCK_REVIEWS: readonly LandingReviewItem[] = [
  {
    name: 'Sarah Chen',
    role: 'Product designer',
    quote: 'Meetup handouts finally worked — one tap and they were on my portfolio.',
  },
  {
    name: 'Marcus J.',
    role: 'Café owner',
    quote: 'Customers leave Google reviews without hunting for our listing. Huge for us.',
  },
  {
    name: 'Elena R.',
    role: 'Freelance developer',
    quote: 'Best icebreaker at conferences — tap and they have my Calendly.',
  },
  {
    name: 'Jordan K.',
    role: 'Realtor',
    quote: 'Open-house cards point straight to listings; saves on maps tripled.',
  },
  {
    name: 'Priya S.',
    role: 'Event planner',
    quote: 'NFC place cards on tables — guests RSVP from a single tap.',
  },
  {
    name: 'Alex T.',
    role: 'Musician',
    quote: 'Spotify and tour dates on one card. Fans actually use it.',
  },
  {
    name: 'Chris Wu',
    role: 'Startup founder',
    quote: 'Pitch nights used to be “find me on LinkedIn.” Now it is one tap.',
  },
  {
    name: 'Morgan Lee',
    role: 'Photographer',
    quote: 'My gallery link on a black card feels premium — clients comment every time.',
  },
] as const;
