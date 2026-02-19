'use client'

import Link from 'next/link'
import type { HomepageFieldsGroup } from '@/lib/homepage'

interface HeroProps {
  data?: HomepageFieldsGroup | null
}

export default function Hero({ data }: HeroProps) {
  const hero = data?.heroSection

  const label = hero?.heroLabel?.trim() || ''
  const titleLine1 = hero?.titleLine1?.trim() || ''
  const titleLine2 = hero?.titleLine2?.trim() || ''
  const subtitle = hero?.heroSubtitle?.trim() || ''
  const intro = hero?.heroParagraph?.trim() || ''

  const button1Text = hero?.button1Text?.trim() || ''
  const button1Url = hero?.button1Url?.trim() || '#'

  const button2Text = hero?.button2Text?.trim() || ''
  const button2Url = hero?.button2Url?.trim() || '#'

  const imageUrl = hero?.heroImage?.node?.sourceUrl || ''
  const imageAlt = hero?.heroImage?.node?.altText || ''

  return (
    <section className="team-hero hero-bg">
      <div className="container py-5 d-flex flex-lg-row flex-column gap-4 align-items-center">

        {/* Left */}
        <div className="col-lg-6 ">
          {(label || subtitle) && (
            <div className="team-badge badge d-flex justify-content-between align-items-center mb-3">
              <div className="me-2">
                <img src="/assets/Icon-badge.png" alt="icon" />
              </div>
              <span>{label || subtitle}</span>
            </div>
          )}

          <h1 className="team-hero__titles">
            {titleLine1 && <div className="team-hero__title-line1">{titleLine1}</div>}
            {titleLine2 && <span className="team-hero__title-line2">{titleLine2}</span>}
          </h1>
          <div className="hero__subtitle pb-3">{subtitle}</div>

          {intro && <p className="team-hero__intro">{intro}</p>}

          {(button1Text || button2Text) && (
            <div className="d-flex gap-3 mt-4 align-items-center">
              <div> {button1Text && (
                <Link href={button1Url} className="btn btn--primary py-2 px-4">
                  {button1Text}
                </Link>
              )}</div>
              <div> {button2Text && (
                <Link href={button2Url} className="btn py-2 mt-0 plp-featuredCard__btn">
                  {button2Text}
                </Link>
              )}</div>

            </div>
          )}
        </div>

        {/* Right */}
        <div className="col-lg-6 d-flex justify-content-end">
          {imageUrl && (

            <img
              src={imageUrl}
              alt={imageAlt}
              className="img-fluid"
              loading="lazy"
            />

          )}
        </div>

      </div>
    </section>
  )
}
