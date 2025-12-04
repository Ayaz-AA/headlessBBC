// components/what-we-do/SectionTwoCards.tsx

interface CardData {
    heading?: string
    text?: string
    iconUrl?: string
    iconAlt?: string
}

interface SectionTwoProps {
    heading?: string
    paragraph?: string
    cards: CardData[]
}

export default function SectionTwoCards({
    heading,
    paragraph,
    cards,
}: SectionTwoProps) {
    if (!heading && !paragraph && !cards?.length) return null

    return (
        <section className="what-we-do">
            <div className="container py-5 d-flex flex-lg-row flex-column align-items-center mt-5 g-4">
                <div className="col-lg-5 col-12">
                    {heading && <h2 className="team-intro-heading mb-3">{heading}</h2>}
                    {paragraph && <p className="regular-para">{paragraph}</p>}
                </div>
                <div className="col-lg-6 offset-lg-1 col-12">
                    {cards.map((card, idx) => (
                        <div key={idx} className="">
                            <div className="what-card h-100 p-4 rounded-4 shadow-sm bg-white d-flex mb-3">
                                <div className="col-1">
                                    {card.iconUrl && (
                                        <img
                                            src={card.iconUrl}
                                            alt={card.iconAlt || ''}
                                            className="mb-3"
                                            width={40}
                                            height={40}
                                        />
                                    )}</div>
                                <div className="col-11 ps-3">
                                    {card.heading && (
                                        <h3 className="what-we-do-card-heading mb-2">{card.heading}</h3>
                                    )}
                                    {card.text && <p className="regular-para">{card.text}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
