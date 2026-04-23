'use client'

import Link from 'next/link'
import { HomepageFieldsGroup } from '@/lib/homepage'

interface BootcampsProps {
  data?: HomepageFieldsGroup | null
}

export default function Bootcamps({ data }: BootcampsProps) {
  const section = data?.featuredBootcamp
  if (!section) return null

  const cards = [
    {
      title: section.bootcamp1Title,
      industry: section.bootcamp1Industry,
      duration: section.bootcamp1Duration,
      schedule: section.bootcamp1Schedule,
      link: section.bootcamp1Link?.nodes?.[0]?.uri,
      image: section.bootcamp1Image?.node,
    },
    {
      title: section.bootcamp2Title,
      industry: section.bootcamp2Industry,
      duration: section.bootcamp2Duration,
      schedule: section.bootcamp2Schedule,
      link: section.bootcamp2Link?.nodes?.[0]?.uri,
      image: section.bootcamp2Image?.node,
    },
    {
      title: section.bootcamp3Title,
      industry: section.bootcamp3Industry,
      duration: section.bootcamp3Duration,
      schedule: section.bootcamp3Schedule,
      link: section.bootcamp3Link?.nodes?.[0]?.uri,
      image: section.bootcamp3Image?.node,
    },
  ].filter((card) => card.title)

  if (!cards.length) return null

  const viewAllHref = section.featuredMainButtonUrl?.nodes?.[0]?.uri || '/programs'

  return (
    <section className="bootcamps">
      <div className="bootcamps__container">
        {/* HEADER */}
        <div className="bootcamps__header scroll-animate scroll-animate--slide-up d-flex flex-column flex-md-row align-items-start align-items-md-end justify-content-between gap-3">
          <div className="w-100">
            <h2 className="component-heading mb-2">{section.featuredSectionHeading}</h2>
            <p className="regular-para mb-0">{section.featuredPara}</p>
          </div>

          <Link
            href={viewAllHref}
            className="btn--secondary btn d-none d-md-inline-flex flex-shrink-0"
          >
            {section.featuredMainButton || 'View All Programs'}
            <i className="fa-solid fa-arrow-right ms-2" />
          </Link>
        </div>

        {/* GRID */}
        <div className="row g-3 mt-1">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`col-12 col-md-6 col-lg-4 scroll-animate scroll-animate--slide-up scroll-animate--delay-${index + 1}`}
            >
              <article className="bbc-card card h-100">
                {/* IMAGE */}
                <div className="bbc-card__media">
                  {card.image?.sourceUrl ? (
                    <img
                      src={card.image.sourceUrl}
                      alt={card.image.altText ?? card.title ?? ''}
                      className="bbc-card__img"
                    />
                  ) : (
                    <div className="bbc-card__placeholder">Program</div>
                  )}

                  {card.industry && (
                    <div className="bbc-card__badges">
                      <span className="bbc-card__badge">{card.industry}</span>
                    </div>
                  )}
                </div>

                {/* BODY */}
                <div className="card-body bbc-card__body px-4 py-3">
                  <h3 className="bbc-card__title">{card.title}</h3>

                  <div className="bbc-card__meta">
                    {card.duration && (
                      <span className="bbc-card__meta-item">
                        <i className="fa-regular fa-calendar" />
                        <span>{card.duration}</span>
                      </span>
                    )}

                    {card.schedule && (
                      <span className="bbc-card__meta-item">
                        <i className="fa-regular fa-clock" />
                        <span>{card.schedule}</span>
                      </span>
                    )}
                  </div>

                  <div className="bbc-card__footer">
                    <Link
                      href={card.link || '/programs'}
                      className="btn--secondary btn w-100"
                    >
                      <span>{section.featuredCardsButton || 'Learn More'}</span>
                      <i className="fa-solid fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* MOBILE CTA */}
        <div className="d-md-none text-center mt-3">
          <Link href={viewAllHref} className="btn--secondary btn mx-auto">
            {section.featuredMainButton || 'View All Programs'}
            <i className="fa-solid fa-arrow-right ms-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}