import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import GuideHero from "@/components/guides/GuideHero";
import GuideIntroSection from "@/components/guides/GuideIntroSection";
import GuideOverview from "@/components/guides/GuideOverview";
import SalarySection from "@/components/guides/SalarySection";
import FAQSection from "@/components/guides/FAQSection";
import { getGuideBySlug, getGuidesForFilter, } from "@/lib/guides";
import ProgramPromoSection from "@/components/guides/ProgramPromoSection";
import { mapGuideHero, mapGuideIntro, mapCareerOverview, mapGuideSalary, mapProgramPromo, mapGuideFAQ } from "@/lib/guidesMapper";
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
    const overview = mapCareerOverview(guideData.guide);
    const salary = mapGuideSalary(guideData.guide);
    const promo = mapProgramPromo(guideData.guide);
    const faq = mapGuideFAQ(guideData.guide);
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
            <GuideOverview data={overview} />
            <SalarySection data={salary} />
            <ProgramPromoSection data={promo} />
            <FAQSection heading={faq.heading} items={faq.items} />
            <Footer />
        </>
    );
}
