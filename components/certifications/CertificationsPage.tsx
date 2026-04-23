"use client";

import { useEffect, useMemo, useState } from "react";
import type { CertificationVM, CertificationsHeroVM } from "@/lib/certifications";
import CertificationsHero from "./CertificationsHero";
import CertificationsGrid from "./CertificationsGrid";
import MatchMeCta from "../global/MatchMeCta";

type Props = {
    hero?: CertificationsHeroVM | null;
    certifications: CertificationVM[];

    initialIndustrySlug?: string; // "healthcare" | "it"
    showAllIndustriesOption?: boolean; // default true
    lockedIndustry?: boolean; // default false
    matchMeCta?: any;
};

const PAGE_SIZE = 9;

export default function CertificationsPage({
    hero,
    certifications,
    initialIndustrySlug,
    showAllIndustriesOption = true,
    lockedIndustry = false,
    matchMeCta,
}: Props) {
    // UI state
    const [industrySlug, setIndustrySlug] = useState<string>(initialIndustrySlug ?? "all");
    const [certSlug, setCertSlug] = useState<string>("");

    // Applied state (Search button)
    const [appliedIndustry, setAppliedIndustry] = useState<string>(initialIndustrySlug ?? "all");
    const [appliedCertSlug, setAppliedCertSlug] = useState<string>("");

    // Load more state
    const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

    const normalizeHash = (h: string) =>
        decodeURIComponent((h || "").replace(/^#/, "")).trim();

    // ✅ Hash deep-link support: /certifications#Kubernetes (or #kubernetes)
    useEffect(() => {
        if (typeof window === "undefined") return;

        const normalizeHash = (h: string) =>
            decodeURIComponent((h || "").replace(/^#/, "")).trim();

        const run = () => {
            const hash = normalizeHash(window.location.hash);
            if (!hash) return;

            // Find target by anchorId (case-insensitive)
            const target = certifications.find(
                (c) => (c.anchorId || "").toLowerCase() === hash.toLowerCase()
            );
            if (!target) return;

            // ✅ IMPORTANT: DO NOT filter to only one cert
            // (leave appliedCertSlug as-is, but make sure it doesn't hide the target)
            // If currently filtered by a cert, clear it so list stays normal.
            setAppliedCertSlug("");
            setCertSlug("");

            // Decide which industry list we should use for calculating the index.
            // If current appliedIndustry hides the target, fall back to "all".
            const currentIndustry = appliedIndustry || "all";
            const targetInCurrentIndustry =
                currentIndustry === "all" || target.categorySlugs.includes(currentIndustry);

            let industryToUse = currentIndustry;

            if (!targetInCurrentIndustry) {
                // If industry is locked, we can't change it — just bail.
                if (lockedIndustry) return;

                // Otherwise show all so the list remains full (your desired behavior)
                industryToUse = "all";
                setAppliedIndustry("all");
                setIndustrySlug("all");
            }

            // Build the same list order you render (sorted by title)
            let list = [...certifications];

            if (industryToUse !== "all") {
                list = list.filter((c) => c.categorySlugs.includes(industryToUse));
            }

            list.sort((a, b) => a.title.localeCompare(b.title));

            // Find index of the target in that list
            const idx = list.findIndex((c) => c.slug === target.slug);
            if (idx < 0) return;

            // ✅ Make sure pagination includes it (but don't show *only* it)
            const needed = Math.ceil((idx + 1) / PAGE_SIZE) * PAGE_SIZE;
            setVisibleCount((prev) => Math.max(prev, needed));

            // Scroll after the new items render
            window.setTimeout(() => {
                const el = document.getElementById(target.anchorId || hash);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 200);
        };

        run();
        window.addEventListener("hashchange", run);
        return () => window.removeEventListener("hashchange", run);
    }, [certifications, appliedIndustry, lockedIndustry]);


    const industries = useMemo(() => {
        if (lockedIndustry && initialIndustrySlug) {
            const firstMatch = certifications.find((c) =>
                c.categorySlugs.includes(initialIndustrySlug)
            );
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
                            className="btn btn--primary"
                            onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                        >
                            Load More
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