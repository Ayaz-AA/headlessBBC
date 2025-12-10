import ProgramsFilterBar from "./ProgramsFilterBar";

type HeroData = {
    heroLabel?: string;
    heroTitleLine1?: string;
    heroTitleLine2?: string;
    heroDescription?: string;
    heroImage?: {
        node?: { sourceUrl?: string; altText?: string | null };
    };
};

type Industry = { slug: string; name: string };
type ProgramOption = { slug: string; title: string };

type Props = {
    hero?: HeroData;

    // filter props
    industries: Industry[];
    industrySlug: string;
    onIndustryChange: (v: string) => void;
    showAllIndustriesOption?: boolean;
    lockedIndustry?: boolean;

    programs: ProgramOption[];
    programSlug: string;
    onProgramChange: (v: string) => void;

    onSearch: () => void;
};

export default function ProgramsHero({
    hero,
    industries,
    industrySlug,
    onIndustryChange,
    showAllIndustriesOption,
    lockedIndustry,
    programs,
    programSlug,
    onProgramChange,
    onSearch,
}: Props) {
    const imageUrl = hero?.heroImage?.node?.sourceUrl;
    const imageAlt = hero?.heroImage?.node?.altText ?? "Hero image";

    return (
        <section className="team-hero py-5 hero-bg programs-hero">
            <div className="container d-flex flex-lg-row flex-column gap-4 ">
                {/* Left content */}
                <div className="col-lg-8 col-12">
                    {hero?.heroLabel && (
                        <div className="team-badge badge d-flex justify-content-between align-items-center mb-3">
                            <div className="me-2">
                                <img src="/assets/Icon-badge.png" alt="icon" />
                            </div>
                            <span>{hero.heroLabel}</span>
                        </div>
                    )}

                    <h1 className="team-hero__titles mb-3">
                        {hero?.heroTitleLine1 && (
                            <div className="team-hero__title-line1">{hero.heroTitleLine1}</div>
                        )}
                        {hero?.heroTitleLine2 && (
                            <span className="team-hero__title-line2">{hero.heroTitleLine2}</span>
                        )}
                    </h1>

                    {hero?.heroDescription && <p className="regular-para mb-4">{hero.heroDescription}</p>}

                    <div>
                        <ProgramsFilterBar
                            industries={industries}
                            industrySlug={industrySlug}
                            onIndustryChange={onIndustryChange}
                            showAllIndustriesOption={showAllIndustriesOption}
                            lockedIndustry={lockedIndustry}
                            programs={programs}
                            programSlug={programSlug}
                            onProgramChange={onProgramChange}
                            onSearch={onSearch}
                        />
                    </div>
                </div>

                {/* Right image */}
                <div className="col-lg-4 col-12">
                    {imageUrl && (

                        <img
                            src={imageUrl}
                            alt={imageAlt}


                        />

                    )}
                </div>
            </div>
        </section>
    );
}
