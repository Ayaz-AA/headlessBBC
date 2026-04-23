'use client'

import Link from 'next/link'
import { HomepageFieldsGroup } from '@/lib/homepage'

interface GuideProps {
  data?: HomepageFieldsGroup | null
}

export default function Guide({ data }: GuideProps) {
  const section = data?.personalizedBootcamp
  if (!section) return null

  const steps = [
    {
      title: section.personalizedBootcampCard1Heading,
      para: section.personalizedBootcampCard1Para,
    },
    {
      title: section.personalizedBootcampCard2Heading,
      para: section.personalizedBootcampCard2Para,
    },
    {
      title: section.personalizedBootcampCard3Heading,
      para: section.personalizedBootcampCard3Para,
    },
    {
      title: section.personalizedBootcampCard4Heading,
      para: section.personalizedBootcampCard4Para,
    },
    {
      title: section.personalizedBootcampCard5Heading,
      para: section.personalizedBootcampCard5Para,
    },
  ].filter(step => step.title || step.para)

  return (
    <section className="guide-section py-5 bg-white">
      <div className="container">

        {section.personalizedBootcampHeading && (
          <h2 className="component-heading scroll-animate scroll-animate--slide-up">
            {section.personalizedBootcampHeading}
          </h2>
        )}

        {section.personalizedBootcampPara && (
          <p className="regular-para scroll-animate scroll-animate--slide-up scroll-animate--delay-1">
            {section.personalizedBootcampPara}
          </p>
        )}

        <div className="d-flex flex-column gap-4 mb-5">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`guide-item d-flex flex-column flex-md-row align-items-start gap-3 gap-md-4 scroll-animate scroll-animate--slide-up scroll-animate--delay-${index + 1}`}
            >
              {/* NUMBER */}
              <div className="guide-number">
                {index + 1}
              </div>

              {/* TEXT */}
              <div className="guide-content">
                {step.title && (
                  <h5 className="home-page-inner-points mb-2">
                    {step.title}
                  </h5>
                )}

                {step.para && (
                  <p className="regular-para mb-0">
                    {step.para}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="scroll-animate scroll-animate--slide-up scroll-animate--delay-5">
          <Link
            href="/career-assessment"
            className="btn btn--primary"
          >
            Find My Bootcamp
          </Link>
        </div>

      </div>
    </section>
  )
}