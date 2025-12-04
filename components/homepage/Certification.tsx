'use client'

import Link from 'next/link'
import { HomepageFields } from '@/lib/wordpress'

interface CertificationProps {
  data?: HomepageFields | null
}

export default function Certification({ data }: CertificationProps) {
  return (
    <section className="certification">
      <div className="certification__container">
        <h2 className="certification__heading scroll-animate scroll-animate--slide-up">What is a Certification Program?</h2>
        <p className="certification__description scroll-animate scroll-animate--slide-up scroll-animate--delay-1">
          A certification is a formal recognition awarded to students who demonstrate specific skills or knowledge. Every certification we provide validates your expertise and provides you with a competitive edge in the industry.
        </p>
        <div className="certification__features">
          <div className="certification__feature scroll-animate scroll-animate--slide-up scroll-animate--delay-1">
            <div className="certification__feature-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20L18 26L28 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="certification__feature-title">Comprehensive Standards</h3>
            <p className="certification__feature-description">We make sure you&apos;re acknowledged for your in-depth knowledge, not just your surface-level information. Our certifications equip active learners with both theoretical knowledge and practical applications.</p>
          </div>
          <div className="certification__feature scroll-animate scroll-animate--slide-up scroll-animate--delay-2">
            <div className="certification__feature-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20L18 26L28 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="certification__feature-title">Rigorous Evaluation Process</h3>
            <p className="certification__feature-description">Our certifications stand out due to the meticulous assessment. Backed by proficient examiners and a cohesive system of evaluation, each certification helps improve your earning power and sets you apart in employers&apos; eyes.</p>
          </div>
          <div className="certification__feature scroll-animate scroll-animate--slide-up scroll-animate--delay-3">
            <div className="certification__feature-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20L18 26L28 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="certification__feature-title">Industry-Relevant Credentials</h3>
            <p className="certification__feature-description">Ditch generic qualifications. Our certifications are tailored for today&apos;s market needs, ensuring that you are recognized as a specialist in your domain. You&apos;ll command respect for your specialized skill set in your profession.</p>
          </div>
        </div>
        <Link href="#all-certifications" className="btn btn--primary scroll-animate scroll-animate--slide-up scroll-animate--delay-4">View All Certifications</Link>
      </div>
    </section>
  )
}

