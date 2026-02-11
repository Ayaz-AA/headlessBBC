"use client";

import type { CertificationsHeroVM } from "@/lib/certifications";
import CertificationsFilterBar from "./CertificationsFilterBar";

type Industry = { slug: string; name: string };
type CertOption = { slug: string; title: string };

type Props = {
    hero?: CertificationsHeroVM | null;

    industries: Industry[];
    industrySlug: string;
    onIndustryChange: (v: string) => void;

    certifications: CertOption[];
    certSlug: string;
    onCertChange: (v: string) => void;

    onSearch: () => void;

    lockedIndustry?: boolean;
    showAllIndustriesOption?: boolean;
};

export default function CertificationsHero({
    hero,

    industries,
    industrySlug,
    onIndustryChange,

    certifications,
    certSlug,
    onCertChange,

    onSearch,

    lockedIndustry = false,
    showAllIndustriesOption = true,
}: Props) {
    return (
        <section className="team-hero py-5 programs-hero">
            <div className="container text-center">
                {/* CMS HERO */}
                {hero?.heroLabel && (
                    <div className="team-badge badge d-inline-flex align-items-center mb-3">
                        <img src="/assets/Icon-badge.png" alt="icon" className="me-2" />
                        <span>{hero.heroLabel}</span>
                    </div>
                )}

                {hero?.heroHeading && (
                    <h1 className="team-hero__titles mb-3">{hero.heroHeading}</h1>
                )}

                {hero?.heroParagraph && (
                    <p className="regular-para mb-4 mx-auto" style={{ maxWidth: "900px" }}>
                        {hero.heroParagraph}
                    </p>
                )}

                {/* SAME FILTER BAR AS PROGRAMS */}
                <div className="certifications-filterbar">
                    <CertificationsFilterBar
                        industries={industries}
                        industrySlug={industrySlug}
                        onIndustryChange={onIndustryChange}
                        showAllIndustriesOption={showAllIndustriesOption}
                        lockedIndustry={lockedIndustry}
                        certifications={certifications}
                        certificationSlug={certSlug}
                        onCertificationChange={onCertChange}
                        onSearch={onSearch}
                    />
                </div>
            </div>
        </section>
    );
}
