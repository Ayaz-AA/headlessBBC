'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__column">
            <Image src="/assets/logo-best-bootcamps.png" alt="Best BootCamps" className="footer__logo" width={200} height={56} />
            <p className="footer__description">Connecting ambitious learners with top-ranking bootcamps and certification programs to accelerate career success.</p>
            <div className="footer__social">
              <Link href="#" className="footer__social-link" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C4.477 0 0 4.477 0 10C0 14.991 3.657 19.128 8.438 19.878V12.89H5.898V10H8.438V7.797C8.438 5.291 9.93 3.907 12.215 3.907C13.309 3.907 14.453 4.102 14.453 4.102V6.562H13.193C11.95 6.562 11.563 7.333 11.563 8.124V10H14.336L13.893 12.89H11.563V19.878C16.343 19.128 20 14.991 20 10C20 4.477 15.523 0 10 0Z" fill="currentColor"/>
                </svg>
              </Link>
              <Link href="#" className="footer__social-link" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.716 4.825C18.033 5.108 17.3 5.3 16.533 5.391C17.316 4.883 17.916 4.108 18.216 3.191C17.483 3.658 16.65 3.991 15.75 4.158C15.05 3.425 14.033 2.925 12.883 2.925C10.75 2.925 9.016 4.658 9.016 6.791C9.016 7.058 9.05 7.325 9.116 7.575C6.216 7.425 3.666 6.008 1.916 4.008C1.633 4.458 1.466 4.991 1.466 5.575C1.466 6.658 2.016 7.608 2.85 8.158C2.216 8.141 1.616 7.975 1.083 7.708V7.75C1.083 9.608 2.35 11.191 4.033 11.541C3.75 11.608 3.45 11.641 3.15 11.641C2.933 11.641 2.716 11.625 2.516 11.591C2.95 13.141 4.316 14.291 5.983 14.325C4.716 15.375 3.083 16.008 1.283 16.008C1.016 16.008 0.75 15.991 0.483 15.975C2.15 17.091 4.116 17.725 6.216 17.725C12.883 17.725 16.716 11.7 16.716 6.391C16.716 6.225 16.716 6.058 16.7 5.891C17.45 5.358 18.216 4.825 18.716 4.825Z" fill="currentColor"/>
                </svg>
              </Link>
              <Link href="#" className="footer__social-link" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.333 0H1.667C0.75 0 0 0.75 0 1.667V18.333C0 19.25 0.75 20 1.667 20H18.333C19.25 20 20 19.25 20 18.333V1.667C20 0.75 19.25 0 18.333 0ZM6.25 16.667H3.333V7.5H6.25V16.667ZM4.792 6.25C3.917 6.25 3.208 5.542 3.208 4.667C3.208 3.792 3.917 3.083 4.792 3.083C5.667 3.083 6.375 3.792 6.375 4.667C6.375 5.542 5.667 6.25 4.792 6.25ZM16.667 16.667H13.75V12.083C13.75 11.042 13.75 9.75 12.375 9.75C10.958 9.75 10.792 10.875 10.792 12.042V16.667H7.875V7.5H10.625V8.708C10.958 8.125 11.75 7.458 13.125 7.458C15.958 7.458 16.667 9.458 16.667 12.5V16.667Z" fill="currentColor"/>
                </svg>
              </Link>
              <Link href="#" className="footer__social-link" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C7.284 0 6.944 0.01 5.878 0.048C4.815 0.088 4.08 0.222 3.44 0.42C2.796 0.618 2.24 0.88 1.69 1.43C1.14 1.98 0.878 2.536 0.68 3.18C0.482 3.82 0.348 4.555 0.308 5.618C0.27 6.684 0.26 7.024 0.26 9.74C0.26 12.456 0.27 12.796 0.308 13.862C0.348 14.925 0.482 15.66 0.68 16.3C0.878 16.944 1.14 17.5 1.69 18.05C2.24 18.6 2.796 18.862 3.44 19.06C4.08 19.258 4.815 19.392 5.878 19.432C6.944 19.47 7.284 19.48 10 19.48C12.716 19.48 13.056 19.47 14.122 19.432C15.185 19.392 15.92 19.258 16.56 19.06C17.204 18.862 17.76 18.6 18.31 18.05C18.86 17.5 19.122 16.944 19.32 16.3C19.518 15.66 19.652 14.925 19.692 13.862C19.73 12.796 19.74 12.456 19.74 9.74C19.74 7.024 19.73 6.684 19.692 5.618C19.652 4.555 19.518 3.82 19.32 3.18C19.122 2.536 18.86 1.98 18.31 1.43C17.76 0.88 17.204 0.618 16.56 0.42C15.92 0.222 15.185 0.088 14.122 0.048C13.056 0.01 12.716 0 10 0ZM10 1.802C12.708 1.802 13.026 1.81 14.076 1.848C15.024 1.884 15.544 2.014 15.888 2.14C16.36 2.31 16.72 2.516 17.13 2.926C17.54 3.336 17.746 3.696 17.916 4.168C18.042 4.512 18.172 5.032 18.208 5.98C18.246 7.03 18.254 7.348 18.254 10.056C18.254 12.764 18.246 13.082 18.208 14.132C18.172 15.08 18.042 15.6 17.916 15.944C17.746 16.416 17.54 16.776 17.13 17.186C16.72 17.596 16.36 17.802 15.888 17.972C15.544 18.098 15.024 18.228 14.076 18.264C13.026 18.302 12.708 18.31 10 18.31C7.292 18.31 6.974 18.302 5.924 18.264C4.976 18.228 4.456 18.098 4.112 17.972C3.64 17.802 3.28 17.596 2.87 17.186C2.46 16.776 2.254 16.416 2.084 15.944C1.958 15.6 1.828 15.08 1.792 14.132C1.754 13.082 1.746 12.764 1.746 10.056C1.746 7.348 1.754 7.03 1.792 5.98C1.828 5.032 1.958 4.512 2.084 4.168C2.254 3.696 2.46 3.336 2.87 2.926C3.28 2.516 3.64 2.31 4.112 2.14C4.456 2.014 4.976 1.884 5.924 1.848C6.974 1.81 7.292 1.802 10 1.802ZM10 4.865C7.44 4.865 5.365 6.94 5.365 9.5C5.365 12.06 7.44 14.135 10 14.135C12.56 14.135 14.635 12.06 14.635 9.5C14.635 6.94 12.56 4.865 10 4.865ZM10 12.333C8.62 12.333 7.5 11.213 7.5 9.833C7.5 8.453 8.62 7.333 10 7.333C11.38 7.333 12.5 8.453 12.5 9.833C12.5 11.213 11.38 12.333 10 12.333ZM14.408 3.408C14.408 4.08 13.86 4.628 13.188 4.628C12.516 4.628 11.968 4.08 11.968 3.408C11.968 2.736 12.516 2.188 13.188 2.188C13.86 2.188 14.408 2.736 14.408 3.408Z" fill="currentColor"/>
                </svg>
              </Link>
            </div>
          </div>
          <div className="footer__column">
            <h3 className="footer__column-title">Programs</h3>
            <ul className="footer__links">
              <li><Link href="#bootcamps">Find Bootcamps</Link></li>
              <li><Link href="#certificates">Find Certificates</Link></li>
              <li><Link href="#all-programs">All Programs</Link></li>
              <li><Link href="#assessment">Career Assessment</Link></li>
            </ul>
          </div>
          <div className="footer__column">
            <h3 className="footer__column-title">Resources</h3>
            <ul className="footer__links">
              <li><Link href="#career-guides">Career Guides</Link></li>
              <li><Link href="#blog">Blog</Link></li>
              <li><Link href="#success-stories">Success Stories</Link></li>
              <li><Link href="#faqs">FAQs</Link></li>
            </ul>
          </div>
          <div className="footer__column">
            <h3 className="footer__column-title">Company</h3>
            <ul className="footer__links">
              <li><Link href="#about">About Us</Link></li>
              <li><Link href="#contact">Contact</Link></li>
              <li><Link href="#reviews">Reviews</Link></li>
              <li><Link href="#partnerships">Partnerships</Link></li>
            </ul>
          </div>
          <div className="footer__column">
            <h3 className="footer__column-title">Legal</h3>
            <ul className="footer__links">
              <li><Link href="#privacy">Privacy Policy</Link></li>
              <li><Link href="#terms">Terms of Service</Link></li>
              <li><Link href="#cookies">Cookie Policy</Link></li>
              <li><Link href="#accessibility">Accessibility</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copyright">© 2025 Best Bootcamps. All rights reserved.</p>
          <p className="footer__legal">Privacy Policy & Editorial policy</p>
        </div>
      </div>
    </footer>
  )
}

