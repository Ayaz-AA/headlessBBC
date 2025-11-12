'use client'

import Image from 'next/image'
import { HomepageFields } from '@/lib/wordpress'

interface AboutProps {
  data?: HomepageFields | null
}

export default function About({ data }: AboutProps) {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__content scroll-animate scroll-animate--slide-up">
          <div className="about__badge">
            <svg className="about__badge-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="#ff8a1f" strokeWidth="1.5" fill="none" opacity="0.8" />
              <circle cx="12" cy="12" r="6" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.9" />
              <circle cx="12" cy="12" r="3" fill="#ff8a1f" opacity="0.8" />
            </svg>
            <span className="about__badge-text">About Us</span>
          </div>
          <h2 className="about__heading">Learn in Weeks. Succeed for Decades.</h2>
          <div className="about__description">
            <p>It&apos;s not always easy to take your first step - or your next step - toward the career you deserve.</p>
            <p>Whether you&apos;re comparing paths or learning opportunities Best Bootcamps is your advocate in education. We&apos;ll connect you with resources you need to approach your next career move with confidence.</p>
          </div>
        </div>
        <div className="about__partners-wrapper scroll-animate scroll-animate--slide-up scroll-animate--delay-1">
          <div className="about__decorative-circles">
            <div className="about__circle about__circle--1"></div>
            <div className="about__circle about__circle--2"></div>
            <div className="about__circle about__circle--3"></div>
            <div className="about__circle about__circle--4"></div>
          </div>
          <div className="about__partners">
            <div className="about__partner-logo">
              <Image src="/assets/logo-workforce.png" alt="Workforce" width={200} height={37} />
            </div>
            <div className="about__partner-logo">
              <Image src="/assets/logo-quickstart.png" alt="QuickStart" width={200} height={37} />
            </div>
            <div className="about__partner-logo">
              <Image src="/assets/logo-healthtech.png" alt="HealthTech" width={200} height={37} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

