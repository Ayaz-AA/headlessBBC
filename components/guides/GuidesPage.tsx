"use client";

import { useMemo, useState } from "react";
import GuidesHero from "./GuidesHero";
import GuideGrid from "./GuideGrid";

export type GuideVM = {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    imageUrl?: string;
    imageAlt?: string;
    industrySlugs: string[];
    industryNames: string[];
};

// Matches your GraphQL hero fields
type HeroVM = {
    herolabel?: string;
    herotitleline1?: string;
    herotitleline2?: string;
    herodescription?: string;
    heroimage?: { node?: { sourceUrl?: string; altText?: string | null } };
};

type Props = {
    guides: GuideVM[];
    hero?: HeroVM;
};

const PAGE_SIZE = 6;

export default function GuidesPage({ guides, hero }: Props) {
    // UI selections
    const [industrySlug, setIndustrySlug] = useState<string>("all");
    const [guideSlug, setGuideSlug] = useState<string>("");

    // Applied guide refinement (only after Search)
    const [appliedGuideSlug, setAppliedGuideSlug] = useState<string>("");

    // Pagination count for current result-set
    const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

    // Industries list for dropdown
    const industries = useMemo(() => {
        const map = new Map<string, string>();
        for (const g of guides) {
            g.industrySlugs.forEach((slug, idx) => {
                map.set(slug, g.industryNames[idx] ?? slug);
            });
        }
        return Array.from(map.entries())
            .map(([slug, name]) => ({ slug, name }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [guides]);

    // Guide dropdown options depend on selected industry (UI selection)
    const guideOptions = useMemo(() => {
        if (!industrySlug || industrySlug === "all") return [];

        const list = guides
            .filter((g) => g.industrySlugs.includes(industrySlug))
            .map((g) => ({ slug: g.slug, title: g.title }))
            .sort((a, b) => a.title.localeCompare(b.title));

        const seen = new Set<string>();
        return list.filter((x) => (seen.has(x.slug) ? false : (seen.add(x.slug), true)));
    }, [guides, industrySlug]);

    // ✅ Industry filters immediately; guide refinement only when Search is clicked
    const filtered = useMemo(() => {
        let result = [...guides];

        // instant industry filter
        if (industrySlug !== "all") {
            result = result.filter((g) => g.industrySlugs.includes(industrySlug));
        }

        // applied guide refinement (after Search)
        if (appliedGuideSlug) {
            result = result.filter((g) => g.slug === appliedGuideSlug);
        }

        result.sort((a, b) => a.title.localeCompare(b.title));
        return result;
    }, [guides, industrySlug, appliedGuideSlug]);

    const visibleGuides = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

    const canLoadMore = filtered.length > visibleCount;

    // Search only applies the Guide selection
    const onSearch = () => {
        setAppliedGuideSlug(guideSlug);
        setVisibleCount(PAGE_SIZE);
    };

    // When industry changes:
    // - apply industry immediately
    // - clear guide selection AND applied guide refinement
    // - reset pagination
    const onIndustryChange = (v: string) => {
        setIndustrySlug(v);
        setGuideSlug("");
        setAppliedGuideSlug("");
        setVisibleCount(PAGE_SIZE);
    };

    return (
        <main>
            <GuidesHero
                hero={hero}
                industries={industries}
                industrySlug={industrySlug}
                onIndustryChange={onIndustryChange}
                guides={guideOptions}
                guideSlug={guideSlug}
                onGuideChange={setGuideSlug}
                onSearch={onSearch}
            />

            <div className="container guides-wrapper pb-5">
                <p className="text-muted mt-3">
                    Showing {filtered.length} guide{filtered.length === 1 ? "" : "s"}
                </p>

                <GuideGrid guides={visibleGuides} />

                {canLoadMore && (
                    <div className="d-flex justify-content-center mt-4">
                        <button
                            type="button"
                            className="guides-loadmore-btn"
                            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                        >
                            Load More Cards
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
