'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Bootcamps() {
  return (
    <section className="bootcamps">
      <div className="bootcamps__container">
        <div className="bootcamps__header scroll-animate scroll-animate--slide-up">
          <div>
            <h2 className="bootcamps__heading">Featured Bootcamps</h2>
            <p className="bootcamps__subheading">Grow on your own time with flexible learning options</p>
          </div>
          <Link href="#all-programs" className="btn btn--outline">
            View All Programs
            <Image src="/assets/icon-arrow-right.svg" alt="" className="btn__icon" width={16} height={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="bootcamps__grid">
          <div className="bootcamp-card scroll-animate scroll-animate--slide-up scroll-animate--delay-1">
            <div className="bootcamp-card__image-wrapper">
              <div className="bootcamp-card__image-placeholder"></div>
              <span className="bootcamp-card__badge">Healthcare</span>
            </div>
            <div className="bootcamp-card__content">
              <h3 className="bootcamp-card__title">Surgical Technologist Bootcamp</h3>
              <div className="bootcamp-card__meta">
                <span className="bootcamp-card__meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                    <path d="M2 6h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <path d="M5 2v4M11 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <circle cx="6" cy="9.5" r="0.8" fill="currentColor"/>
                    <circle cx="8" cy="9.5" r="0.8" fill="currentColor"/>
                    <circle cx="10" cy="9.5" r="0.8" fill="currentColor"/>
                    <circle cx="6" cy="12" r="0.8" fill="currentColor"/>
                    <circle cx="8" cy="12" r="0.8" fill="currentColor"/>
                    <circle cx="10" cy="12" r="0.8" fill="currentColor"/>
                  </svg>
                  16 Weeks
                </span>
                <span className="bootcamp-card__meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                    <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Full-Time
                </span>
              </div>
              <Link href="#learn-more" className="btn btn--outline btn--small">
                Learn More
                <Image src="/assets/icon-arrow-right.svg" alt="" className="btn__icon" width={14} height={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="bootcamp-card scroll-animate scroll-animate--slide-up scroll-animate--delay-2">
            <div className="bootcamp-card__image-wrapper">
              <div className="bootcamp-card__image-placeholder"></div>
              <span className="bootcamp-card__badge">Business</span>
            </div>
            <div className="bootcamp-card__content">
              <h3 className="bootcamp-card__title">UI/UX Design</h3>
              <div className="bootcamp-card__meta">
                <span className="bootcamp-card__meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                    <path d="M2 6h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <path d="M5 2v4M11 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <circle cx="6" cy="9.5" r="0.8" fill="currentColor"/>
                    <circle cx="8" cy="9.5" r="0.8" fill="currentColor"/>
                    <circle cx="10" cy="9.5" r="0.8" fill="currentColor"/>
                    <circle cx="6" cy="12" r="0.8" fill="currentColor"/>
                    <circle cx="8" cy="12" r="0.8" fill="currentColor"/>
                    <circle cx="10" cy="12" r="0.8" fill="currentColor"/>
                  </svg>
                  24 Weeks
                </span>
                <span className="bootcamp-card__meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                    <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Part-Time
                </span>
              </div>
              <Link href="#learn-more" className="btn btn--outline btn--small">
                Learn More
                <Image src="/assets/icon-arrow-right.svg" alt="" className="btn__icon" width={14} height={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="bootcamp-card scroll-animate scroll-animate--slide-up scroll-animate--delay-3">
            <div className="bootcamp-card__image-wrapper">
              <div className="bootcamp-card__image-placeholder"></div>
              <span className="bootcamp-card__badge">Technology</span>
            </div>
            <div className="bootcamp-card__content">
              <h3 className="bootcamp-card__title">Full Stack Development</h3>
              <div className="bootcamp-card__meta">
                <span className="bootcamp-card__meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                    <path d="M2 6h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <path d="M5 2v4M11 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <circle cx="6" cy="9.5" r="0.8" fill="currentColor"/>
                    <circle cx="8" cy="9.5" r="0.8" fill="currentColor"/>
                    <circle cx="10" cy="9.5" r="0.8" fill="currentColor"/>
                    <circle cx="6" cy="12" r="0.8" fill="currentColor"/>
                    <circle cx="8" cy="12" r="0.8" fill="currentColor"/>
                    <circle cx="10" cy="12" r="0.8" fill="currentColor"/>
                  </svg>
                  20 Weeks
                </span>
                <span className="bootcamp-card__meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                    <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Full-Time
                </span>
              </div>
              <Link href="#learn-more" className="btn btn--outline btn--small">
                Learn More
                <Image src="/assets/icon-arrow-right.svg" alt="" className="btn__icon" width={14} height={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

