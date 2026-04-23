'use client'

import Link from 'next/link'
import { HomepageFieldsGroup } from '@/lib/homepage'

interface CertificationProps {
  data?: HomepageFieldsGroup | null
}

export default function Certification({ data }: CertificationProps) {
  const section = data?.certificationProgram
  if (!section) return null

  const features = [
    {
      title: section.certificationProgramCard1Heading,
      para: section.certificationProgramCard1Para,
    },
    {
      title: section.certificationProgramCard2Heading,
      para: section.certificationProgramCard2Para,
    },
    {
      title: section.certificationProgramCard3Heading,
      para: section.certificationProgramCard3Para,
    },
  ].filter(f => f.title || f.para)

  const buttonUrl =
    section.certificationButtonLink?.nodes?.[0]?.uri || '#'

  const icon = section.certificationProgramIcon?.node

  return (
    <section className="certification-section py-5">
      <div className="container text-center">

        {section.certificationProgramHeading && (
          <h2 className="component-heading mb-3 scroll-animate scroll-animate--slide-up">
            {section.certificationProgramHeading}
          </h2>
        )}

        {section.certificationProgramPara && (
          <p className="regular-para home-cert-para scroll-animate scroll-animate--slide-up scroll-animate--delay-1">
            {section.certificationProgramPara}
          </p>
        )}

        <div className="row justify-content-center g-5 mb-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`col-md-4 scroll-animate scroll-animate--slide-up scroll-animate--delay-${index + 1}`}
            >
              <div className="d-flex flex-column align-items-center">

                {/* ✅ Same image method as other components */}
                {icon?.sourceUrl && (
                  <div className="certification-icon mb-4">
                    <img
                      src={icon.sourceUrl}
                      alt={icon.altText || ''}
                      className="img-fluid"
                    />
                  </div>
                )}

                {feature.title && (
                  <h5 className="home-page-inner-points mb-3">
                    {feature.title}
                  </h5>
                )}

                {feature.para && (
                  <p className="regular-para mb-0">
                    {feature.para}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {section.certificationButtonText && (
          <Link
            href={buttonUrl}
            className="btn btn--primary scroll-animate scroll-animate--slide-up scroll-animate--delay-4"
          >
            {section.certificationButtonText}
          </Link>
        )}

      </div>
    </section>
  )
}