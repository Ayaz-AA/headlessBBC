// components/team/Hero.tsx
interface HeroProps {
    label?: string
    titleLine1?: string
    titleLine2?: string
    intro?: string
    imageUrl?: string
    imageAlt?: string
}

export default function Hero({ label, titleLine1, titleLine2, intro, imageUrl, imageAlt }: HeroProps) {
    return (
        <section className="team-hero py-5 hero-bg">
            <div className="container d-flex flex-lg-row flex-column gap-4">
                <div className="col-lg-8">
                    {label && (
                        <div className="team-badge badge d-flex justify-content-between align-items-center mb-3">
                            <div className="me-2">
                                <img
                                    src="/assets/Icon-badge.png"
                                    alt="icon"
                                    className=""
                                />
                            </div>
                            <span>{label}</span>
                        </div>
                    )}
                    {/* {label && <p className="team-badge">{label}</p>} */}
                    <h1 className="team-hero__titles">
                        {titleLine1 && (
                            <div className="team-hero__title-line1">
                                {titleLine1}

                            </div>
                        )}
                        {titleLine2 && <span className="team-hero__title-line2">{titleLine2}</span>}
                    </h1>
                    {intro && <p className="team-hero__intro ">{intro}</p>}
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
