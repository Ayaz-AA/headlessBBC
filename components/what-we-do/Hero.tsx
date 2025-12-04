// components/what-we-do/Hero.tsx

interface HeroProps {
    label?: string
    titleLine1?: string
    titleLine2?: string
    intro?: string
    imageUrl?: string
    imageAlt?: string
}

export default function Hero({
    label,
    titleLine1,
    titleLine2,
    intro,
    imageUrl,
    imageAlt,
}: HeroProps) {
    return (
        <section className="team-hero py-5 hero-bg py-5">
            <div className="container d-flex flex-lg-row flex-column gap-4">
                <div className="col-lg-6">
                    {label && (
                        <div className="team-badge badge d-inline-flex align-items-center mb-3">
                            <img
                                src="/assets/Icon-badge.png"
                                alt=""
                                className="me-2"
                                width={20}
                                height={20}
                            />
                            <span>{label}</span>
                        </div>
                    )}

                    {titleLine1 && <h1 className="team-hero__title-line1">{titleLine1}</h1>}
                    {titleLine2 && <h1 className="team-hero__title-line2">{titleLine2}</h1>}

                    {intro && <p className="team-hero__intro">{intro}</p>}
                </div>

                <div className="col-lg-5 offset-lg-1 text-lg-end mt-4 mt-lg-0">
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={imageAlt || ''}
                            className="img-fluid"
                        />
                    )}
                </div>
            </div>
        </section>
    )
}
