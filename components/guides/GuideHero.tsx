import type { GuideHeroVM } from "@/lib/guidesMapper";

export default function GuideHero({ hero }: { hero: GuideHeroVM }) {
    return (
        <section className="team-hero py-5 hero-bg programs-hero mx-4 mt-3 py-5 px-0 rounded-4">
            <div className="container d-flex flex-column flex-lg-row gap-4 align-items-center">
                <div className="col-lg-7 col-12">
                    {!!hero.label && (
                        <div className="team-badge badge d-flex justify-content-between align-items-center mb-3">
                            <div className="me-2">
                                <img src="/assets/Icon-badge.png" alt="icon" />
                            </div>
                            <span>{hero.label}</span>
                        </div>
                    )}

                    <h1 className="team-hero__titles mb-3">
                        {!!hero.titleLine1 && <div className="team-hero__title-line1">{hero.titleLine1}</div>}
                        {!!hero.titleLine2 && <span className="team-hero__title-line2">{hero.titleLine2}</span>}
                    </h1>

                    {!!hero.description && <p className="regular-para mb-0">{hero.description}</p>}
                </div>

                {!!hero.imageUrl && (
                    <div className="offset-lg-1 col-lg-4 col-12">
                        <img
                            src={hero.imageUrl}
                            alt={hero.imageAlt || "Guide hero image"}
                            className="img-fluid rounded-4 shadow-sm"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
