'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__badge">
            <svg className="hero__badge-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="#ff8a1f" strokeWidth="1.5" fill="none" opacity="0.8" />
              <circle cx="12" cy="12" r="6" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.9" />
              <circle cx="12" cy="12" r="3" fill="#ff8a1f" opacity="0.8" />
            </svg>
            <span className="hero__badge-text">AI-Powered Career Matching</span>
          </div>
          <h1 className="hero__heading">
            <span className="hero__heading-line">Start Your Career</span>
            <span className="hero__heading-line">and Maximize Your</span>
            <span className="hero__heading-line hero__heading-line--highlight">Earnings Potential</span>
          </h1>
          <p className="hero__subheading">With Bootcamps & Certifications</p>
          <p className="hero__description">
            Based on your personality type, existing strengths and where you want to take your career, we will match you to the top ranking bootcamp and certification school in your area.
          </p>
          <div className="hero__actions">
            <Link href="#search-programs" className="btn btn--primary">
              Search Programs
              <Image src="/assets/icon-arrow-right.svg" alt="" className="btn__icon" width={16} height={16} aria-hidden="true" />
            </Link>
            <Link href="#learn-more" className="btn btn--secondary">Learn More</Link>
          </div>
        </div>
        <div className="hero__image-wrapper">
          <div className="hero__decorative-circles">
            <div className="hero__circle hero__circle--1"></div>
            <div className="hero__circle hero__circle--2"></div>
            <div className="hero__circle hero__circle--3"></div>
          </div>
          <Image src="/assets/hero-portrait.png" alt="Student with backpack" className="hero__image" width={600} height={800} />
          <div className="hero__overlay-card">
            <svg className="hero__overlay-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="#ff8a1f" strokeWidth="1.5" fill="none" opacity="0.8" />
              <circle cx="12" cy="12" r="6" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.9" />
              <circle cx="12" cy="12" r="3" fill="#ff8a1f" opacity="0.8" />
            </svg>
            <p className="hero__overlay-text">Discover your potential. Design your future.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

