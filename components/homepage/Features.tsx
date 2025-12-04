'use client'

import { HomepageFields } from '@/lib/wordpress'

interface FeaturesProps {
  data?: HomepageFields | null
}

export default function Features({ data }: FeaturesProps) {
  return (
    <section className="features">
      <div className="features__container">
        <div className="features__header scroll-animate scroll-animate--slide-up">
          <h2 className="features__heading">A Proven Roadmap for Growth</h2>
          <p className="features__subheading">We connect you with the resources you need to approach your next career move with confidence</p>
        </div>
        <div className="features__grid">
          <div className="feature-card scroll-animate scroll-animate--slide-up scroll-animate--delay-1">
            <div className="feature-card__icon feature-card__icon--orange">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 14C16.7614 14 19 11.7614 19 9C19 6.23858 16.7614 4 14 4C11.2386 4 9 6.23858 9 9C9 11.7614 11.2386 14 14 14Z" fill="currentColor"/>
                <path d="M14 16C10.134 16 7 17.567 7 19.5V22H21V19.5C21 17.567 17.866 16 14 16Z" fill="currentColor"/>
                <path d="M20 9C20 11.2091 18.2091 13 16 13C13.7909 13 12 11.2091 12 9C12 6.79086 13.7909 5 16 5C18.2091 5 20 6.79086 20 9Z" fill="currentColor" opacity="0.6"/>
                <path d="M16 15C12.6863 15 10 16.3431 10 18V20H22V18C22 16.3431 19.3137 15 16 15Z" fill="currentColor" opacity="0.6"/>
              </svg>
            </div>
            <h3 className="feature-card__title">Personalized Matching</h3>
            <p className="feature-card__description">AI-powered algorithm matches your personality, strengths, and career goals to the perfect bootcamp.</p>
          </div>
          <div className="feature-card scroll-animate scroll-animate--slide-up scroll-animate--delay-2">
            <div className="feature-card__icon feature-card__icon--blue">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M14 8V14L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="feature-card__title">Fast-Track Learning</h3>
            <p className="feature-card__description">Complete industry-recognized programs in 12-24 weeks and start your new career quickly.</p>
          </div>
          <div className="feature-card scroll-animate scroll-animate--slide-up scroll-animate--delay-3">
            <div className="feature-card__icon feature-card__icon--orange">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2L16.5 10L24 12.5L16.5 15L14 23L11.5 15L4 12.5L11.5 10L14 2Z" fill="currentColor"/>
                <path d="M14 6L15.5 11L20 12.5L15.5 14L14 19L12.5 14L8 12.5L12.5 11L14 6Z" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            <h3 className="feature-card__title">Top-Ranked Programs</h3>
            <p className="feature-card__description">Access only the highest-rated bootcamps and certification programs in your area.</p>
          </div>
          <div className="feature-card scroll-animate scroll-animate--slide-up scroll-animate--delay-4">
            <div className="feature-card__icon feature-card__icon--blue">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="10" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M8 20C8 16.6863 10.6863 14 14 14C17.3137 14 20 16.6863 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 18L14 20L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="feature-card__title">Career Support</h3>
            <p className="feature-card__description">Get ongoing support from career coaches and connect with a community of learners.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

