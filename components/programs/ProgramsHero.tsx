import BaseHero from "@/components/ui/BaseHero";
import ProgramsFilterBar from "./ProgramsFilterBar";

type HeroData = {
    heroLabel?: string;
    heroTitleLine1?: string;
    heroTitleLine2?: string;
    heroDescription?: string;
    heroImage?: {
        node?: { sourceUrl?: string; altText?: string | null };
    };
};

type Industry = { slug: string; name: string };
type ProgramOption = { slug: string; title: string };

type Props = {
    hero?: HeroData;

    industries: Industry[];
    industrySlug: string;
    onIndustryChange: (v: string) => void;
    showAllIndustriesOption?: boolean;
    lockedIndustry?: boolean;

    programs: ProgramOption[];
    programSlug: string;
    onProgramChange: (v: string) => void;

    onSearch: () => void;
};

export default function ProgramsHero({
    hero,
    industries,
    industrySlug,
    onIndustryChange,
    showAllIndustriesOption,
    lockedIndustry,
    programs,
    programSlug,
    onProgramChange,
    onSearch,
}: Props) {
    const imageUrl = hero?.heroImage?.node?.sourceUrl;
    const imageAlt = hero?.heroImage?.node?.altText ?? "Hero image";

    return (
        <BaseHero
            label={hero?.heroLabel}
            titleLine1={hero?.heroTitleLine1}
            titleLine2={hero?.heroTitleLine2}
            intro={hero?.heroDescription}
            imageUrl={imageUrl}
            imageAlt={imageAlt}
            layout="8-4"
            className=" hero-background"
        >
            <ProgramsFilterBar
                industries={industries}
                industrySlug={industrySlug}
                onIndustryChange={onIndustryChange}
                showAllIndustriesOption={showAllIndustriesOption}
                lockedIndustry={lockedIndustry}
                programs={programs}
                programSlug={programSlug}
                onProgramChange={onProgramChange}
                onSearch={onSearch}
            />
        </BaseHero>
    );
}