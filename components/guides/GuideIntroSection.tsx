"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import GuidesFilterBar from "@/components/guides/GuidesFilterBar";
import type { GuideIntroVM } from "@/lib/guidesMapper";

type GuideForFilter = {
    slug: string;
    title: string;
    industrySlugs: string[];
    industryNames: string[];
};

export default function GuideIntroSection({
    intro,
    allGuides,
    currentGuideSlug,
    defaultIndustrySlug,
}: {
    intro: GuideIntroVM;
    allGuides: GuideForFilter[];
    currentGuideSlug: string;
    defaultIndustrySlug: string;
}) {
    const router = useRouter();

    // ✅ default selections
    const [industrySlug, setIndustrySlug] = useState(defaultIndustrySlug);
    const [guideSlug, setGuideSlug] = useState(currentGuideSlug);

    // ✅ industries list (no "all")
    const industries = useMemo(() => {
        const map = new Map<string, string>();
        for (const g of allGuides) {
            g.industrySlugs.forEach((slug, idx) => {
                map.set(slug, g.industryNames[idx] ?? slug);
            });
        }
        return Array.from(map.entries())
            .map(([slug, name]) => ({ slug, name }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [allGuides]);

    // ✅ guides filtered by industry
    const guidesForIndustry = useMemo(() => {
        return allGuides
            .filter((g) => g.industrySlugs.includes(industrySlug))
            .map((g) => ({ slug: g.slug, title: g.title }))
            .sort((a, b) => a.title.localeCompare(b.title));
    }, [allGuides, industrySlug]);

    // ✅ reset guide if industry changes and guide not valid
    useEffect(() => {
        const stillValid = allGuides.some(
            (g) => g.slug === guideSlug && g.industrySlugs.includes(industrySlug)
        );
        if (!stillValid) {
            setGuideSlug("");
        }
    }, [industrySlug]); // eslint-disable-line react-hooks/exhaustive-deps

    const onSearch = () => {
        if (!guideSlug) return;
        router.push(`/guides/${guideSlug}`);
    };

    return (
        <section className="guide-intro py-4 py-md-5">
            <div className="container py-4">
                <div className="row g-4 g-lg-5 align-items-center justify-content-between">
                    {/* LEFT */}
                    <div className="col-12 col-lg-7">
                        {!!intro.title && <h2 className="team-intro-heading ">{intro.title}</h2>}

                        {!!intro.topDescription && (
                            <p className="regular-para mt-2">{intro.topDescription}</p>
                        )}

                        <div className="mt-3">
                            <GuidesFilterBar
                                industries={industries}
                                industrySlug={industrySlug}
                                onIndustryChange={setIndustrySlug}
                                guides={guidesForIndustry}
                                guideSlug={guideSlug}
                                onGuideChange={setGuideSlug}
                                onSearch={onSearch}
                                showAllIndustriesOption={false}
                                showAllGuidesOption={false}
                            />
                        </div>

                        {!!intro.bottomDescription && (
                            <p className="regular-para mt-3 mb-0">{intro.bottomDescription}</p>
                        )}
                    </div>

                    {/* RIGHT */}
                    <div className="col-12 col-lg-4 offset-lg-1 guide-intro__rightlist">
                        {!!intro.rightListHtml && (
                            <div
                                className=""
                                dangerouslySetInnerHTML={{ __html: intro.rightListHtml }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
