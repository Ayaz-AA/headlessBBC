import BaseHero from "@/components/ui/BaseHero";
import GuidesFilterBar from "./GuidesFilterBar";

type GuidesHeroData = {
    herolabel?: string;
    herotitleline1?: string;
    herotitleline2?: string;
    herodescription?: string;
    heroimage?: { node?: { sourceUrl?: string; altText?: string | null } };
};

type Industry = { slug: string; name: string };
type GuideOption = { slug: string; title: string };

type Props = {
    hero?: GuidesHeroData;

    industries: Industry[];
    industrySlug: string;
    onIndustryChange: (v: string) => void;

    guides: GuideOption[];
    guideSlug: string;
    onGuideChange: (v: string) => void;

    onSearch: () => void;
};

export default function GuidesHero({
    hero,
    industries,
    industrySlug,
    onIndustryChange,
    guides,
    guideSlug,
    onGuideChange,
    onSearch,
}: Props) {
    const imageUrl = hero?.heroimage?.node?.sourceUrl;
    const imageAlt = hero?.heroimage?.node?.altText ?? "Hero image";

    return (
        <BaseHero
            label={hero?.herolabel}
            titleLine1={hero?.herotitleline1}
            titleLine2={hero?.herotitleline2}
            intro={hero?.herodescription}
            imageUrl={imageUrl}
            imageAlt={imageAlt}
            layout="7-4-offset-1"
            className=" hero-background"
        >
            <GuidesFilterBar
                industries={industries}
                industrySlug={industrySlug}
                onIndustryChange={(v) => {
                    onIndustryChange(v);
                    onGuideChange("");
                }}
                guides={guides}
                guideSlug={guideSlug}
                onGuideChange={onGuideChange}
                onSearch={onSearch}
            />
        </BaseHero>
    );
}