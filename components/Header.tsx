'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="header__announcement">
        <div className="header__announcement-container">
          <div className="header__announcement-left">
            <svg className="header__goal-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="#ff8a1f" strokeWidth="1.5" fill="none" opacity="0.8" />
              <circle cx="12" cy="12" r="6" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.9" />
              <circle cx="12" cy="12" r="3" fill="#ff8a1f" opacity="0.8" />
            </svg>
            <p className="header__announcement-text">
              Not sure where to start? Take our Career Assessment to find your perfect course!
            </p>
            <Link href="#assessment" className="header__assessment-button">
              <span>Start Assessment</span>
              <Image src="/assets/icon-arrow-right.svg" alt="" className="header__arrow-icon" width={14} height={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="header__social-icons">
            <Link href="#" className="header__social-icon" aria-label="Facebook">
              <Image src="/assets/icon-facebook.svg" alt="" width={15} height={15} />
            </Link>
            <Link href="#" className="header__social-icon" aria-label="Twitter">
              <Image src="/assets/icon-twitter.svg" alt="" width={15} height={15} />
            </Link>
            <Link href="#" className="header__social-icon" aria-label="LinkedIn">
              <Image src="/assets/icon-linkedin.svg" alt="" width={15} height={15} />
            </Link>
            <Link href="#" className="header__social-icon" aria-label="Instagram">
              <Image src="/assets/icon-instagram.svg" alt="" width={15} height={15} />
            </Link>
          </div>
        </div>
      </div>
      <div className="header__main">
        <div className="header__main-container">
          <Link href="/" className="header__logo" aria-label="Best BootCamps Home">
            <Image src="/assets/logo-best-bootcamps.png" alt="Best BootCamps" width={200} height={48} />
          </Link>
          <nav className="header__nav" role="navigation" aria-label="Main navigation">
            <Link href="#bootcamps" className="header__nav-link">Find Bootcamps</Link>
            <Link href="#certificates" className="header__nav-link">Find Certificates</Link>
            <Link href="#resources" className="header__nav-link">Resources</Link>
            <Link href="#about" className="header__nav-link">About Us</Link>
          </nav>
          <div className="header__actions">
            <button className="header__search" aria-label="Search">
              <Image src="/assets/icon-search.svg" alt="" className="header__search-icon" width={16} height={16} />
            </button>
            <Link href="#get-started" className="header__cta-button">Get Started</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

