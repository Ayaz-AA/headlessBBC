"use client";

import { useEffect, useMemo, useState } from "react";
import ProgramGrid from "./ProgramGrid";
import ProgramsHero from "./ProgramsHero";
import MatchMeCta from "@/components/global/MatchMeCta";


export type ProgramVM = {
    id: string;
    title: string;
    slug: string;
    industrySlugs: string[];
    industryNames: string[];
    programLength?: string;
    programType?: string;
    imageUrl?: string;
    imageAlt?: string;
};

type HeroVM = {
    heroLabel?: string;
    heroTitleLine1?: string;
    heroTitleLine2?: string;
    heroDescription?: string;
    heroImage?: {
        node?: { sourceUrl?: string; altText?: string | null };
    };
};

type Props = {
    pageTitle: string;
    initialIndustrySlug?: string; // "it" | "business" | "healthcare"
    programs: ProgramVM[];
    hero?: HeroVM;

    // for /programs pages:
    showAllIndustriesOption?: boolean; // default true
    lockedIndustry?: boolean; // default false
    matchMeCta?: {
        enabled: boolean;
        title: string;
        description?: string;
        buttonLabel: string;
        buttonHref: string;
        imageUrl?: string;
        imageAlt?: string;
    } | null;
};

const PAGE_SIZE = 9;

export default function ProgramsPage({
    pageTitle,
    initialIndustrySlug,
    programs,
    hero,
    showAllIndustriesOption = true,
    lockedIndustry = false,
    matchMeCta,
}: Props) {
    // UI state (dropdowns)
    const [industrySlug, setIndustrySlug] = useState<string>(initialIndustrySlug ?? "all");
    const [programSlug, setProgramSlug] = useState<string>("");

    // Applied state (when user clicks Search)
    const [appliedIndustry, setAppliedIndustry] = useState<string>(initialIndustrySlug ?? "all");
    const [appliedProgramSlug, setAppliedProgramSlug] = useState<string>("");

    // ✅ Load more state
    const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

    const industries = useMemo(() => {
        // If this is a locked industry page, show only that industry
        if (lockedIndustry && initialIndustrySlug) {
            // find a nice name for that slug from any program
            const name =
                programs.find((p) => p.industrySlugs.includes(initialIndustrySlug))?.industryNames[
                programs.find((p) => p.industrySlugs.includes(initialIndustrySlug))?.industrySlugs.indexOf(
                    initialIndustrySlug
                ) ?? 0
                ] ?? initialIndustrySlug.toUpperCase();

            return [{ slug: initialIndustrySlug, name }];
        }

        // All Programs page -> build unique list from programs
        const map = new Map<string, string>();
        for (const p of programs) {
            p.industrySlugs.forEach((slug, idx) => {
                map.set(slug, p.industryNames[idx] ?? slug);
            });
        }
        return Array.from(map.entries())
            .map(([slug, name]) => ({ slug, name }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [programs, lockedIndustry, initialIndustrySlug]);

    const programOptions = useMemo(() => {
        // Only build options when a real industry is selected (NOT "all")
        if (!industrySlug || industrySlug === "all") return [];

        const list = programs
            .filter((p) => p.industrySlugs.includes(industrySlug))
            .map((p) => ({ slug: p.slug, title: p.title }))
            .sort((a, b) => a.title.localeCompare(b.title));

        // unique by slug
        const seen = new Set<string>();
        return list.filter((x) => (seen.has(x.slug) ? false : (seen.add(x.slug), true)));
    }, [programs, industrySlug]);

    const onSearch = () => {
        setAppliedIndustry(industrySlug);
        setAppliedProgramSlug(programSlug);

        // ✅ reset pagination on new search
        setVisibleCount(PAGE_SIZE);
    };

    const filtered = useMemo(() => {
        let result = [...programs];

        // filter by industry (if not all)
        if (appliedIndustry !== "all") {
            result = result.filter((p) => p.industrySlugs.includes(appliedIndustry));
        }

        // filter by program slug (if selected)
        if (appliedProgramSlug) {
            result = result.filter((p) => p.slug === appliedProgramSlug);
        }

        // always alphabetical
        result.sort((a, b) => a.title.localeCompare(b.title));
        return result;
    }, [programs, appliedIndustry, appliedProgramSlug]);

    // ✅ Also reset pagination if filters auto-apply (your existing behavior on All Programs page)
    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [appliedIndustry, appliedProgramSlug]);

    // ✅ only show a slice based on visibleCount
    const visiblePrograms = useMemo(() => {
        return filtered.slice(0, visibleCount);
    }, [filtered, visibleCount]);

    const canLoadMore = visibleCount < filtered.length;

    return (
        <main>
            <ProgramsHero
                hero={hero}
                industries={industries}
                industrySlug={industrySlug}
                onIndustryChange={(v) => {
                    setIndustrySlug(v);
                    setProgramSlug("");
                    setAppliedProgramSlug("");

                    // ✅ Auto-apply industry change ONLY on All Programs page
                    // (i.e. not locked pages like /programs/it, /programs/business, etc.)
                    if (!lockedIndustry) {
                        setAppliedIndustry(v);
                        // ✅ reset pagination when auto-applying
                        setVisibleCount(PAGE_SIZE);
                    }
                }}
                showAllIndustriesOption={showAllIndustriesOption}
                lockedIndustry={lockedIndustry}
                programs={programOptions}
                programSlug={programSlug}
                onProgramChange={setProgramSlug}
                onSearch={onSearch}
            />

            <div className="container programs-wrapper pb-5">
                <p className="text-muted mt-3">
                    Showing {visiblePrograms.length} of {filtered.length} program{filtered.length === 1 ? "" : "s"}
                </p>

                <ProgramGrid programs={visiblePrograms} />

                {canLoadMore && (
                    <div className="d-flex justify-content-center mt-4">
                        <button
                            type="button"
                            className="btn btn--primary p-3"
                            onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length))}
                        >
                            Load more programs
                        </button>
                    </div>
                )}
            </div>
            {matchMeCta?.enabled && (
                <MatchMeCta
                    title={matchMeCta.title}
                    description={matchMeCta.description}
                    ctaLabel={matchMeCta.buttonLabel}
                    ctaHref={matchMeCta.buttonHref}
                    imageSrc={matchMeCta.imageUrl}
                    imageAlt={matchMeCta.imageAlt}
                />
            )}
        </main>
    );
}
