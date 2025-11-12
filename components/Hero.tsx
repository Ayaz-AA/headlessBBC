'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HomepageFields } from '@/lib/wordpress'

interface HeroProps {
  data?: HomepageFields | null
}

export default function Hero({ data }: HeroProps) {
  // Use WordPress data if available, otherwise fall back to defaults
  const badgeText = data?.heroBadgeText || 'AI-Powered Career Matching'
  // ACF field hero_title is nested in heroSection group
  const heroTitle = data?.heroSection?.heroTitle || ''
  const headingLine1 = data?.heroHeadingLine1 || 'Start Your Career'
  const headingLine2 = data?.heroHeadingLine2 || 'and Maximize Your'
  const headingLine3 = data?.heroHeadingLine3 || 'Earnings Potential'
  const subheading = data?.heroSubheading || 'With Bootcamps & Certifications'
  const description = data?.heroDescription || 'Based on your personality type, existing strengths and where you want to take your career, we will match you to the top ranking bootcamp and certification school in your area.'
  const primaryButtonText = data?.heroPrimaryButtonText || 'Search Programs'
  const primaryButtonLink = data?.heroPrimaryButtonLink || '#search-programs'
  const secondaryButtonText = data?.heroSecondaryButtonText || 'Learn More'
  const secondaryButtonLink = data?.heroSecondaryButtonLink || '#learn-more'
  const heroImage = data?.heroImage
  const heroImageUrl = heroImage?.sourceUrl || '/assets/hero-portrait.png'
  const heroImageAlt = heroImage?.altText || 'Student with backpack'

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
            <span className="hero__badge-text">{badgeText}</span>
            <span className="hero__badge-text badge-text2">{heroTitle}</span>
          </div>
          <h1 className="hero__heading">
            <span className="hero__heading-line">{headingLine1}</span>
            <span className="hero__heading-line">{headingLine2}</span>
            <span className="hero__heading-line hero__heading-line--highlight">{headingLine3}</span>
          </h1>
          <p className="hero__subheading">{subheading}</p>
          <p className="hero__description">{description}</p>
          <div className="hero__actions">
            <Link href={primaryButtonLink} className="btn btn--primary">
              {primaryButtonText}
              <Image src="/assets/icon-arrow-right.svg" alt="" className="btn__icon" width={16} height={16} aria-hidden="true" />
            </Link>
            <Link href={secondaryButtonLink} className="btn btn--secondary">{secondaryButtonText}</Link>
          </div>
        </div>
        <div className="hero__image-wrapper">
          <div className="hero__decorative-circles">
            <div className="hero__circle hero__circle--1"></div>
            <div className="hero__circle hero__circle--2"></div>
            <div className="hero__circle hero__circle--3"></div>
          </div>
          <Image 
            src={heroImageUrl} 
            alt={heroImageAlt} 
            className="hero__image" 
            width={heroImage?.mediaDetails?.width || 600} 
            height={heroImage?.mediaDetails?.height || 800} 
          />
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

