'use client'

import { HomepageFieldsGroup } from '@/lib/homepage'

interface FeaturesProps {
  data?: HomepageFieldsGroup | null
}

export default function Features({ data }: FeaturesProps) {
  if (!data?.roadmap) return null

  const {
    roadmapHeading,
    roadmapParagraph,
    rm1stCardHeading,
    rm1stCardPara,
    rm1stCardIcon,
    rm2ndCardHeading,
    rm2ndCardPara,
    rm2ndCardIcon,
    rm3rdCardHeading,
    rm3rdCardPara,
    rm3rdCardIcon,
  } = data.roadmap

  const cards = [
    {
      title: rm1stCardHeading,
      description: rm1stCardPara,
      icon: rm1stCardIcon,
      color: 'orange',
    },
    {
      title: rm2ndCardHeading,
      description: rm2ndCardPara,
      icon: rm2ndCardIcon,
      color: 'blue',
    },
    {
      title: rm3rdCardHeading,
      description: rm3rdCardPara,
      icon: rm3rdCardIcon,
      color: 'orange',
    },

  ].filter(card => card.title && card.description) // prevent empty cards

  return (
    <section className="features py-5">
      <div className="container">

        <div className="text-center mb-5">
          {roadmapHeading && (
            <h2 className="component-heading mb-3">
              {roadmapHeading}
            </h2>
          )}
          {roadmapParagraph && (
            <p className="regular-para mx-auto">
              {roadmapParagraph}
            </p>
          )}
        </div>

        {/* Bootstrap Grid */}
        <div className="row g-4">
          {cards.map((card, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 ">
              <div className="feature-card h-100">

                {card.icon?.node?.sourceUrl && (
                  <div
                    className={`feature-card__icon ${card.color === 'orange'
                      ? 'feature-card__icon--orange'
                      : 'feature-card__icon--blue'
                      }`}
                  >
                    <img
                      src={card.icon.node.sourceUrl}
                      alt={card.icon.node.altText ?? ''}
                    />
                  </div>
                )}

                <h3 className="feature-card__title">
                  {card.title}
                </h3>

                <p className="card-para">
                  {card.description}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}