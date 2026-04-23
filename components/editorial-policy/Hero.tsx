import BaseHero from "@/components/ui/BaseHero";

interface HeroProps {
    label?: string;
    titleLine1?: string;
    titleLine2?: string;
    intro?: string;
    imageUrl?: string;
    imageAlt?: string;
}

export default function Hero({
    label,
    titleLine1,
    titleLine2,
    intro,
    imageUrl,
    imageAlt,
}: HeroProps) {
    return (
        <BaseHero
            label={label}
            titleLine1={titleLine1}
            titleLine2={titleLine2}
            intro={intro}
            imageUrl={imageUrl}
            imageAlt={imageAlt}
            layout="8-4"
            className="editorial-hero mx-4 mt-3 px-0"
        />
    );
}