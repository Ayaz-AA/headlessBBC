"use client";

import { useMemo, useState } from "react";
import type { CertificationVM, CertificationsHeroVM } from "@/lib/certifications";
import CertificationsHero from "./CertificationsHero";
import CertificationsGrid from "./CertificationsGrid";

type Props = {
    hero?: CertificationsHeroVM | null;
    certifications: CertificationVM[];

    initialIndustrySlug?: string; // "healthcare" | "it"
    showAllIndustriesOption?: boolean; // default true
    lockedIndustry?: boolean; // default false
};

const PAGE_SIZE = 9;

export default function CertificationsPage({
    hero,
    certifications,
    initialIndustrySlug,
    showAllIndustriesOption = true,
    lockedIndustry = false,
}: Props) {
    // UI state
    const [industrySlug, setIndustrySlug] = useState<string>(initialIndustrySlug ?? "all");
    const [certSlug, setCertSlug] = useState<string>("");

    // Applied state (Search button)
    const [appliedIndustry, setAppliedIndustry] = useState<string>(initialIndustrySlug ?? "all");
    const [appliedCertSlug, setAppliedCertSlug] = useState<string>("");

    // Load more state
    const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

    const industries = useMemo(() => {
        if (lockedIndustry && initialIndustrySlug) {
            const firstMatch = certifications.find((c) => c.categorySlugs.includes(initialIndustrySlug));
            const idx = firstMatch?.categorySlugs.indexOf(initialIndustrySlug) ?? 0;
            const name = firstMatch?.categoryNames[idx] ?? initialIndustrySlug.toUpperCase();
            return [{ slug: initialIndustrySlug, name }];
        }

        const map = new Map<string, string>();
        for (const c of certifications) {
            c.categorySlugs.forEach((slug, idx) => {
                map.set(slug, c.categoryNames[idx] ?? slug);
            });
        }
        return Array.from(map.entries())
            .map(([slug, name]) => ({ slug, name }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [certifications, lockedIndustry, initialIndustrySlug]);

    const certOptions = useMemo(() => {
        if (!industrySlug || industrySlug === "all") return [];
        const list = certifications
            .filter((c) => c.categorySlugs.includes(industrySlug))
            .map((c) => ({ slug: c.slug, title: c.shortName || c.title }))
            .sort((a, b) => a.title.localeCompare(b.title));

        const seen = new Set<string>();
        return list.filter((x) => (seen.has(x.slug) ? false : (seen.add(x.slug), true)));
    }, [certifications, industrySlug]);

    const onSearch = () => {
        setAppliedIndustry(industrySlug);
        setAppliedCertSlug(certSlug);
        setVisibleCount(PAGE_SIZE);
    };

    const filtered = useMemo(() => {
        let result = [...certifications];

        if (appliedIndustry !== "all") {
            result = result.filter((c) => c.categorySlugs.includes(appliedIndustry));
        }
        if (appliedCertSlug) {
            result = result.filter((c) => c.slug === appliedCertSlug);
        }

        result.sort((a, b) => a.title.localeCompare(b.title));
        return result;
    }, [certifications, appliedIndustry, appliedCertSlug]);

    const visible = filtered.slice(0, visibleCount);
    const canLoadMore = visibleCount < filtered.length;

    return (
        <main>
            <CertificationsHero
                hero={hero}
                industries={industries}
                industrySlug={industrySlug}
                onIndustryChange={(v) => {
                    setIndustrySlug(v);
                    setCertSlug("");
                    setAppliedCertSlug("");

                    // mirror Programs: auto-apply industry only on All page
                    if (!lockedIndustry) {
                        setAppliedIndustry(v);
                        setVisibleCount(PAGE_SIZE);
                    }
                }}
                certifications={certOptions}
                certSlug={certSlug}
                onCertChange={setCertSlug}
                onSearch={onSearch}
                lockedIndustry={lockedIndustry}
                showAllIndustriesOption={showAllIndustriesOption}
            />

            <div className="container pb-5">
                <p className="text-muted mt-3">
                    Showing {filtered.length} certification{filtered.length === 1 ? "" : "s"}
                </p>

                <CertificationsGrid items={visible} />

                {canLoadMore && (
                    <div className="text-center mt-4">
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
