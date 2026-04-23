"use client";

import Link from "next/link";
import BaseHero from "@/components/ui/BaseHero";
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
        <BaseHero
            label={overrideLabel || hero.heroLabel || ""}
            titleLine1={hero.titleLine1 || ""}
            titleLine2={overrideTitleLine2 || hero.titleLine2 || ""}
            intro={hero.heroDescription || ""}
            imageUrl={hero.heroImageUrl || ""}
            imageAlt={hero.heroImageAlt || ""}
            layout="8-4"
            className=" hero-background"
            actions={
                hero.heroCtaLabel && hero.heroCtaHref ? (
                    <Link href={ctaHref} className="btn btn--secondary hero-btn">
                        {hero.heroCtaLabel}
                        <i className="fa-solid fa-arrow-right ms-2" />
                    </Link>
                ) : null
            }
        >
            {/* FILTER BAR */}
            <div className="custom-filterbar-card mt-4">
                <div className="custom-filterbar-head mb-0">
                    <div className="custom-filterbar-icon">
                        <img
                            src="/assets/filter-icon.png"
                            alt=""
                            height="20"
                            width="20"
                        />
                    </div>
                    <div>
                        <div className="custom-filterbar-title">
                            Filter Blogs
                        </div>
                        <div className="custom-filterbar-subtitle">
                            I&apos;m looking for Blogs
                        </div>
                    </div>
                </div>

                <div className="custom-filterbar-controls pb-4">
                    <div className="custom-filterbar-field">
                        <div className="custom-filterbar-label">
                            Industry
                        </div>
                        <SelectDropdown
                            label=""
                            value={industrySlug}
                            options={industries}
                            placeholder="All Industries"
                            onChange={(v) => {
                                onIndustryChange(v);
                                onTopicChange("");
                            }}
                        />
                    </div>

                    <div className="custom-filterbar-field">
                        <div className="custom-filterbar-label">
                            Topics
                        </div>
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
                        className="custom-filterbar-btn"
                        onClick={onSearch}
                    >
                        <i className="fa-solid fa-magnifying-glass me-2" />
                        Search here
                    </button>
                </div>
            </div>
        </BaseHero>
    );
}