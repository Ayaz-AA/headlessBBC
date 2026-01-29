"use client";

import Link from "next/link";
import SelectDropdown, { SelectOption } from "@/components/programs/SelectDropdown";

type HeroData = {
    heroLabel?: string | null;
    titleLine1?: string | null;
    titleLine2?: string | null;
    heroDescription?: string | null;
    heroCtaLabel?: string | null;
    heroCtaHref?: string | null;
    heroImageUrl?: string | null;
    heroImageAlt?: string | null;
};

type Props = {
    hero: HeroData;
    overrideLabel?: string;
    overrideTitleLine2?: string;

    // Filter props
    industries: SelectOption[];
    industrySlug: string;
    onIndustryChange: (v: string) => void;

    topicOptions: SelectOption[];
    topicSlug: string;
    onTopicChange: (v: string) => void;

    onSearch: () => void;
};

export default function BlogHero({
    hero,
    overrideLabel,
    overrideTitleLine2,
    industries,
    industrySlug,
    onIndustryChange,
    topicOptions,
    topicSlug,
    onTopicChange,
    onSearch,
}: Props) {
    const ctaHref = hero.heroCtaHref || "#";

    return (
        <section className="team-hero py-5 hero-bg programs-hero">
            <div className="container d-flex flex-lg-row flex-column gap-4">
                {/* Left content */}
                <div className="col-lg-8 col-12">
                    {(overrideLabel || hero.heroLabel) && (
                        <div className="team-badge badge d-flex justify-content-between align-items-center mb-3">
                            <div className="me-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/assets/Icon-badge.png" alt="icon" />
                            </div>
                            <span>{overrideLabel || hero.heroLabel}</span>
                        </div>
                    )}

                    <h1 className="team-hero__titles mb-3">
                        {hero.titleLine1 && (
                            <div className="team-hero__title-line1">{hero.titleLine1}</div>
                        )}
                        {(overrideTitleLine2 || hero.titleLine2) && (
                            <span className="team-hero__title-line2">
                                {overrideTitleLine2 || hero.titleLine2}
                            </span>
                        )}
                    </h1>

                    {hero.heroDescription && (
                        <p className="regular-para mb-4">{hero.heroDescription}</p>
                    )}

                    {hero.heroCtaLabel && hero.heroCtaHref && (
                        <div className="mb-4">
                            <Link href={ctaHref} className="btn plp-featuredCard__btn">
                                {hero.heroCtaLabel}{" "}
                                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                            </Link>
                        </div>
                    )}

                    <div>
                        <div className="programs-filterbar-card">
                            <div className="programs-filterbar-head mb-0">
                                <div className="programs-filterbar-icon" aria-hidden="true">
                                    <img src="/assets/filter-icon.png" alt="" height="20.41" width="19.5" />
                                </div>
                                <div>
                                    <div className="programs-filterbar-title">Filter Blogs</div>
                                    <div className="programs-filterbar-subtitle">I&apos;m looking for Blogs</div>
                                </div>
                            </div>

                            <div className="programs-filterbar-controls pb-4">
                                <div className="programs-filterbar-field">
                                    <div className="programs-filterbar-label">Industry</div>
                                    <SelectDropdown
                                        label=""
                                        value={industrySlug}
                                        options={industries}
                                        placeholder="All Industries"
                                        onChange={(v) => {
                                            onIndustryChange(v);
                                            onTopicChange(""); // reset topic when industry changes
                                        }}
                                    />
                                </div>

                                <div className="programs-filterbar-field">
                                    <div className="programs-filterbar-label">Topics</div>
                                    <SelectDropdown
                                        label=""
                                        value={topicSlug}
                                        options={topicOptions}
                                        disabled={industrySlug === "all"}
                                        placeholder="All Topics"
                                        onChange={onTopicChange}
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="programs-filterbar-btn"
                                    onClick={onSearch}
                                >
                                    <span className="programs-filterbar-btn-icon" aria-hidden="true">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <span>Search here</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right image */}
                <div className="col-lg-4 col-12">
                    {hero.heroImageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={hero.heroImageUrl} alt={hero.heroImageAlt || ""} />
                    )}
                </div>
            </div>
        </section>
    );
}
