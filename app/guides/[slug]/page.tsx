import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import GuideHero from "@/components/guides/GuideHero";
import GuideIntroSection from "@/components/guides/GuideIntroSection";

import { getGuideBySlug, getGuidesForFilter } from "@/lib/guides";
import { mapGuideHero, mapGuideIntro } from "@/lib/guidesMapper";
import { notFound } from "next/navigation";

export default async function GuideDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const [guideData, allGuidesData] = await Promise.all([
        getGuideBySlug(slug),
        getGuidesForFilter(),
    ]);

    if (!guideData?.guide) notFound();

    const hero = mapGuideHero(guideData.guide);
    const intro = mapGuideIntro(guideData.guide);

    // Build allGuides list for dropdowns
    const allGuides = (allGuidesData?.guides?.nodes ?? []).map((g: any) => ({
        slug: g.slug,
        title: g.title,
        industrySlugs: (g.industries?.nodes ?? []).map((t: any) => t.slug),
        industryNames: (g.industries?.nodes ?? []).map((t: any) => t.name),
    }));

    // Default industry = current guide’s first industry (fallback to allGuides match)
    const guideIndustries = guideData.guide?.industries?.nodes ?? [];
    const fromGuide = guideIndustries?.[0]?.slug ?? "";
    const fromAll = allGuides.find((g: any) => g.slug === slug)?.industrySlugs?.[0] ?? "";
    const defaultIndustrySlug = fromGuide || fromAll || "";

    return (
        <>
            <Header />
            <GuideHero hero={hero} />
            <GuideIntroSection
                intro={intro}
                allGuides={allGuides}
                currentGuideSlug={slug}
                defaultIndustrySlug={defaultIndustrySlug}
            />
            <Footer />
        </>
    );
}
