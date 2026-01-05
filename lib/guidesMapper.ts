export type GuideHeroVM = {
    label?: string;
    titleLine1?: string;
    titleLine2?: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
};

export function mapGuideHero(node: any): GuideHeroVM {
    const hero = node?.guideDetailPage?.guideHero;

    // ACF hero image (aliased to heroImage)
    const acfImg = hero?.heroImage?.node;

    // Fallback to featured image
    const featuredImg = node?.featuredImage?.node;

    const img = acfImg?.sourceUrl ? acfImg : featuredImg;

    return {
        label: hero?.heroLabel ?? "Guides",
        titleLine1: hero?.heroTitleLine1 ?? node?.title ?? "",
        titleLine2: hero?.heroTitleLine2 ?? "",
        description: hero?.heroDescription ?? "",
        imageUrl: img?.sourceUrl ?? "",
        imageAlt: img?.altText ?? node?.title ?? "Guide hero image",
    };
}
// intro section
export type GuideIntroVM = {
    title?: string;
    topDescription?: string | null;
    bottomDescription?: string | null;
    rightListHtml?: string | null;
};

export function mapGuideIntro(node: any): GuideIntroVM {
    const intro = node?.guideDetailPage?.guideIntro;

    return {
        title: intro?.title ?? "",
        topDescription: intro?.topdescription ?? null,
        bottomDescription: intro?.bottomdescription ?? null,
        rightListHtml: intro?.rightlist ?? null,
    };
}
