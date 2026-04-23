import BaseHero from "@/components/ui/BaseHero";
import type { GuideHeroVM } from "@/lib/guidesMapper";

export default function GuideHero({ hero }: { hero: GuideHeroVM }) {
    return (
        <BaseHero
            label={hero.label}
            titleLine1={hero.titleLine1}
            titleLine2={hero.titleLine2}
            intro={hero.description}
            imageUrl={hero.imageUrl}
            imageAlt={hero.imageAlt || "Guide hero image"}
            layout="7-4-offset-1"
            className=" hero-background mx-4 mt-3 px-0 rounded-4"
        />
    );
}