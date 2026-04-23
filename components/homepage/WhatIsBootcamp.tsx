'use client'

import { HomepageFieldsGroup } from '@/lib/homepage'

interface WhatIsBootcampProps {
  data?: HomepageFieldsGroup | null
}

export default function WhatIsBootcamp({ data }: WhatIsBootcampProps) {
  const section = data?.whatIsABootcamp
  if (!section) return null

  const cards = [
    {
      title: section.bootcampSectionCard1Heading,
      description: section.bootcampSectionCard1Para,
      icon: section.bootcampSectionCard1Icon?.node,
    },
    {
      title: section.bootcampSectionCard2Heading,
      description: section.bootcampSectionCard2Para,
      icon: section.bootcampSectionCard2Icon?.node,
    },
    {
      title: section.bootcampSectionCard3Heading,
      description: section.bootcampSectionCard3Para,
      icon: section.bootcampSectionCard3Icon?.node,
    },
  ].filter((card) => card.title)

  if (!cards.length) return null

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          {/* CONTENT */}
          <div className="col-12 col-lg-7 order-1 scroll-animate scroll-animate--slide-up">
            {section.bootcampSectionHeading && (
              <h2 className="mb-3 component-heading">
                {section.bootcampSectionHeading}
              </h2>
            )}

            {section.bootcampSectionPara && (
              <p className="regular-para mb-4">
                {section.bootcampSectionPara}
              </p>
            )}

            {/* MOBILE IMAGE */}
            {section.bootcampSectionImage?.node?.sourceUrl && (
              <div className="d-flex d-lg-none justify-content-center mb-4">
                <div className="what-is-a-bootcamp-image-wrapper">
                  <span className="glow-blue-br" aria-hidden="true" />
                  <span className="glow-orange-tl" aria-hidden="true" />
                  <img
                    src={section.bootcampSectionImage.node.sourceUrl}
                    alt={section.bootcampSectionImage.node.altText ?? ''}
                    className="img-fluid what-is-a-bootcamp-image"
                  />
                </div>
              </div>
            )}

            <div className="d-flex flex-column gap-4">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`scroll-animate scroll-animate--slide-up scroll-animate--delay-${index + 1}`}
                >
                  <div className="d-flex flex-column flex-md-row align-items-start gap-3">
                    {card.icon?.sourceUrl && (
                      <div
                        className={`what-is-a-bootcamp-icon flex-shrink-0 ${index === 1 ? 'what-is-a-bootcamp-icon--alt' : ''
                          }`}
                      >
                        <img
                          src={card.icon.sourceUrl}
                          alt={card.icon.altText ?? ''}
                          width={40}
                          height={40}
                        />
                      </div>
                    )}

                    <div className="flex-grow-1">
                      <h5 className="mb-2 home-page-inner-points">
                        {card.title}
                      </h5>
                      <p className="regular-para mb-0">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP IMAGE */}
          <div className="col-12 col-lg-5 order-2 d-none d-lg-flex justify-content-end scroll-animate scroll-animate--slide-up scroll-animate--delay-2">
            {section.bootcampSectionImage?.node?.sourceUrl && (
              <div className="what-is-a-bootcamp-image-wrapper">
                <span className="glow-blue-br" aria-hidden="true" />
                <span className="glow-orange-tl" aria-hidden="true" />
                <img
                  src={section.bootcampSectionImage.node.sourceUrl}
                  alt={section.bootcampSectionImage.node.altText ?? ''}
                  className="img-fluid what-is-a-bootcamp-image"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}