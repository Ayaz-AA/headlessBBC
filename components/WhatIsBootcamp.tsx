'use client'

import bootcampImage from '../src/assets/whatisbootcamp.png'
import { HomepageFields } from '@/lib/wordpress'

interface WhatIsBootcampProps {
  data?: HomepageFields | null
}

export default function WhatIsBootcamp({ data }: WhatIsBootcampProps) {
  return (
    <section className="what-is-bootcamp">
      <div className="what-is-bootcamp__container">
        <div className="what-is-bootcamp__content scroll-animate scroll-animate--slide-up">
          <h2 className="what-is-bootcamp__heading">What is a Bootcamp?</h2>
          <p className="what-is-bootcamp__description">
            A bootcamp is an intensive, dynamic training program designed to take you from elementary to expert in record time. Each bootcamp we offer is geared toward helping you achieve your career goals faster, for less money, on your time.
          </p>
          <div className="what-is-bootcamp__features">
            <div className="what-is-bootcamp__feature scroll-animate scroll-animate--slide-up scroll-animate--delay-1">
              <div className="what-is-bootcamp__feature-number">01</div>
              <div className="what-is-bootcamp__feature-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 20L18 26L28 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="what-is-bootcamp__feature-content">
                <h3 className="what-is-bootcamp__feature-title">Intensive Learning Environment</h3>
                <p className="what-is-bootcamp__feature-description">Dive straight into hands-on learning without any fluff. If you&apos;re ready to roll up your sleeves, our expert instructors are ready to help.</p>
              </div>
            </div>
            <div className="what-is-bootcamp__feature scroll-animate scroll-animate--slide-up scroll-animate--delay-2">
              <div className="what-is-bootcamp__feature-number">02</div>
              <div className="what-is-bootcamp__feature-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 20L18 26L28 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="what-is-bootcamp__feature-content">
                <h3 className="what-is-bootcamp__feature-title">Highly Focused Curriculum</h3>
                <p className="what-is-bootcamp__feature-description">The people set our programs apart from the rest. Join dedicated, licensed instructors and a taught-knit community of fellow learners ready to ascend the career ladder. Be prepared to challenge yourself, and your fellow learners, as you quickly develop in-demand skills.</p>
              </div>
            </div>
            <div className="what-is-bootcamp__feature scroll-animate scroll-animate--slide-up scroll-animate--delay-3">
              <div className="what-is-bootcamp__feature-number">03</div>
              <div className="what-is-bootcamp__feature-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 20L18 26L28 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="what-is-bootcamp__feature-content">
                <h3 className="what-is-bootcamp__feature-title">Real-World Skills</h3>
                <p className="what-is-bootcamp__feature-description">Forget tedious memorization or theory. Everything a bootcamp teaches is vital to a successful career, without any unnecessary lessons in between. You&apos;ll graduate with full confidence in yourself and newfound abilities in your chosen field.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="what-is-bootcamp__image scroll-animate scroll-animate--slide-up scroll-animate--delay-1">
          <img 
            src={typeof bootcampImage === 'string' ? bootcampImage : bootcampImage.src} 
            alt="Bootcamp illustration" 
            className="what-is-bootcamp__image-placeholder"
          />
        </div>
      </div>
    </section>
  )
}

