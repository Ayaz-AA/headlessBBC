// components/editorial-policy/Hero.tsx

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
        <section className="editorial-hero mx-4 mt-3 py-5 px-0 hero-bg">
            <div className="container d-flex flex-lg-row flex-column  gap-3">
                <div className="col-lg-8">
                    {label && (
                        <div className="team-badge badge d-flex justify-content-between align-items-center mb-3">
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
                    <h1 className="team-hero__titles">
                        {titleLine1 && (
                            <div className="team-hero__title-line1">
                                {titleLine1}

                            </div>
                        )}
                        {titleLine2 && <span className="team-hero__title-line2">{titleLine2}</span>}
                    </h1>

                    {intro && <p className="team-hero__intro">{intro}</p>}
                </div>

                <div className="col-lg-4 ">
                    {imageUrl && (
                        <div className="w-100">
                            <img src={imageUrl} alt={imageAlt || ''} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
