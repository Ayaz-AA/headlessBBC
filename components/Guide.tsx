'use client'

import Link from 'next/link'

export default function Guide() {
  return (
    <section className="guide">
      <div className="guide__container">
        <h2 className="guide__heading scroll-animate scroll-animate--slide-up">Your Guide to Personalized Bootcamp Match</h2>
        <p className="guide__description scroll-animate scroll-animate--slide-up scroll-animate--delay-1">
          Embarking on a learning adventure is an exciting step towards a rewarding career. But with so many programs available, how do you know which one is right for you? Our platform is designed to take the guesswork out of the equation. We leverage advanced algorithms and a team of admissions and industry experts to analyze your goals, background, and preferences. The result? A curated list of bootcamps perfectly suited to your ambitions.
        </p>
        <div className="guide__steps">
          <div className="guide__step scroll-animate scroll-animate--slide-up scroll-animate--delay-1">
            <div className="guide__step-number">1</div>
            <div className="guide__step-content">
              <h3 className="guide__step-title">Personalized Recommendations, Just for You</h3>
              <p className="guide__step-description">Say goodbye to generic advice and cookie-cutter solutions. Our platform considers your individual strengths, interests, and career aspirations to provide tailored recommendations. Whether you&apos;re passionate about coding, user experience, data analysis, or entrepreneurship, we&apos;ve got you covered.</p>
            </div>
          </div>
          <div className="guide__step scroll-animate scroll-animate--slide-up scroll-animate--delay-2">
            <div className="guide__step-number">2</div>
            <div className="guide__step-content">
              <h3 className="guide__step-title">Comprehensive Information, In One Place</h3>
              <p className="guide__step-description">Gone are the days of scouring the internet for hours on end to gather information about different bootcamps. Our platform brings everything you need into one user-friendly interface. Compare program details, curriculum, instructors, job placement rates, and alumni testimonials with ease.</p>
            </div>
          </div>
          <div className="guide__step scroll-animate scroll-animate--slide-up scroll-animate--delay-3">
            <div className="guide__step-number">3</div>
            <div className="guide__step-content">
              <h3 className="guide__step-title">Diverse Range Of Bootcamps</h3>
              <p className="guide__step-description">We understand that everyone&apos;s journey is unique. That&apos;s why we&apos;ve curated a diverse selection of bootcamp options spanning various fields and skill levels. From intensive coding camps to immersive design workshops and cutting-edge business programs, you&apos;re sure to find the perfect fit.</p>
            </div>
          </div>
          <div className="guide__step scroll-animate scroll-animate--slide-up scroll-animate--delay-4">
            <div className="guide__step-number">4</div>
            <div className="guide__step-content">
              <h3 className="guide__step-title">Support Every Step of the Way</h3>
              <p className="guide__step-description">Choosing a bootcamp is just the beginning. Throughout your learning journey, we&apos;re here to support you. Connect with mentors, access resources, and join a community of like-minded learners who are all working towards their goals.</p>
            </div>
          </div>
          <div className="guide__step scroll-animate scroll-animate--slide-up scroll-animate--delay-5">
            <div className="guide__step-number">5</div>
            <div className="guide__step-content">
              <h3 className="guide__step-title">Forge Your Future</h3>
              <p className="guide__step-description">Your career success is our ultimate goal. By selecting the right bootcamp, you&apos;re setting yourself up for a future filled with exciting opportunities. We&apos;re here to empower you to reach your potential and achieve the dreams you&apos;ve always envisioned.</p>
            </div>
          </div>
        </div>
        <div className="guide__cta scroll-animate scroll-animate--slide-up">
          <p className="guide__cta-text">Don&apos;t let indecision hold you back from the incredible possibilities that await. Join us on a journey of exploration and growth – let&apos;s find your perfect bootcamp match together!</p>
          <Link href="#find-bootcamp" className="btn btn--primary">Find My Bootcamp</Link>
        </div>
      </div>
    </section>
  )
}

