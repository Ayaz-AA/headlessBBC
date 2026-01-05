import GuidesFilterBar from "./GuidesFilterBar";

type GuidesHeroData = {
    herolabel?: string;
    herotitleline1?: string;
    herotitleline2?: string;
    herodescription?: string;
    heroimage?: { node?: { sourceUrl?: string; altText?: string | null } };
};

type Industry = { slug: string; name: string };
type GuideOption = { slug: string; title: string };

type Props = {
    hero?: GuidesHeroData;

    industries: Industry[];
    industrySlug: string;
    onIndustryChange: (v: string) => void;

    guides: GuideOption[];
    guideSlug: string;
    onGuideChange: (v: string) => void;

    onSearch: () => void;
};

export default function GuidesHero({
    hero,
    industries,
    industrySlug,
    onIndustryChange,
    guides,
    guideSlug,
    onGuideChange,
    onSearch,
}: Props) {
    const imageUrl = hero?.heroimage?.node?.sourceUrl;
    const imageAlt = hero?.heroimage?.node?.altText ?? "Hero image";

    return (
        <section className="team-hero py-5 hero-bg programs-hero">
            <div className="container d-flex flex-lg-row flex-column gap-4">
                {/* Left content */}
                <div className="col-lg-7 col-12">
                    {hero?.herolabel && (
                        <div className="team-badge badge d-flex justify-content-between align-items-center mb-3">
                            <div className="me-2">
                                <img src="/assets/Icon-badge.png" alt="icon" />
                            </div>
                            <span>{hero.herolabel}</span>
                        </div>
                    )}

                    <h1 className="team-hero__titles mb-3">
                        {hero?.herotitleline1 && (
                            <span className="team-hero__title-line1">{hero.herotitleline1}</span>
                        )}
                        {hero?.herotitleline2 && (
                            <span className="team-hero__title-line2">{hero.herotitleline2}</span>
                        )}
                    </h1>

                    {hero?.herodescription && <p className="regular-para mb-4">{hero.herodescription}</p>}

                    <GuidesFilterBar
                        industries={industries}
                        industrySlug={industrySlug}
                        onIndustryChange={(v) => {
                            onIndustryChange(v);
                            onGuideChange("");
                        }}
                        guides={guides}
                        guideSlug={guideSlug}
                        onGuideChange={onGuideChange}
                        onSearch={onSearch}
                    />
                </div>

                {/* Right image */}
                <div className="offset-lg-1 col-lg-4 col-12">
                    {imageUrl && <img src={imageUrl} alt={imageAlt} />}
                </div>
            </div>
        </section>
    );
}
