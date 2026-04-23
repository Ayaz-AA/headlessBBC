// export type GuideHeroVM = {
//     label?: string;
//     titleLine1?: string;
//     titleLine2?: string;
//     description?: string;
//     imageUrl?: string;
//     imageAlt?: string;
// };

// export function mapGuideHero(node: any): GuideHeroVM {
//     const hero = node?.guideDetailPage?.guideHero;

//     // ACF hero image (aliased to heroImage)
//     const acfImg = hero?.heroImage?.node;

//     // Fallback to featured image
//     const featuredImg = node?.featuredImage?.node;

//     const img = acfImg?.sourceUrl ? acfImg : featuredImg;

//     return {
//         label: hero?.heroLabel ?? "Guides",
//         titleLine1: hero?.heroTitleLine1 ?? node?.title ?? "",
//         titleLine2: hero?.heroTitleLine2 ?? "",
//         description: hero?.heroDescription ?? "",
//         imageUrl: img?.sourceUrl ?? "",
//         imageAlt: img?.altText ?? node?.title ?? "Guide hero image",
//     };
// }
// // intro section
// export type GuideIntroVM = {
//     title?: string;
//     topDescription?: string | null;
//     bottomDescription?: string | null;
//     rightListHtml?: string | null;
// };

// export function mapGuideIntro(node: any): GuideIntroVM {
//     const intro = node?.guideDetailPage?.guideIntro;

//     return {
//         title: intro?.title ?? "",
//         topDescription: intro?.topdescription ?? null,
//         bottomDescription: intro?.bottomdescription ?? null,
//         rightListHtml: intro?.rightlist ?? null,
//     };
// }
// export type CareerOverviewVM = {
//     title?: string;
//     descriptionHtml?: string | null;
//     responsibilitiesIntro?: string | null;
//     responsibilitiesListHtml?: string | null;
// };
// export function mapCareerOverview(node: any): CareerOverviewVM {
//     const section = node?.guideDetailPage?.careerOverviewSection;

//     return {
//         title: section?.title ?? "",
//         descriptionHtml: section?.description ?? null,
//         responsibilitiesIntro: section?.responsibilitiesIntro ?? null,
//         responsibilitiesListHtml: section?.responsibilitiesList ?? null,
//     };
// }
// =========================
// HERO SECTION
// =========================
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

    const acfImg = hero?.heroImage?.node;
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

// =========================
// INTRO SECTION
// =========================
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

// =========================
// CAREER OVERVIEW
// =========================
export type CareerOverviewVM = {
    title?: string;
    descriptionHtml?: string | null;
    responsibilitiesIntro?: string | null;
    responsibilitiesListHtml?: string | null;
};

export function mapCareerOverview(node: any): CareerOverviewVM {
    const section = node?.guideDetailPage?.careerOverviewSection;

    return {
        title: section?.title ?? "",
        descriptionHtml: section?.description ?? null,
        responsibilitiesIntro: section?.responsibilitiesIntro ?? null,
        responsibilitiesListHtml: section?.responsibilitiesList ?? null,
    };
}

// =========================
// SALARY SECTION (NEW)
// =========================
export type SalaryRow = {
    industry: string;
    salary: string;
};

export type GuideSalaryVM = {
    heading?: string;
    description?: string | null;
    medianSalary?: string;
    medianSalaryLink?: {
        url?: string;
        title?: string;
        target?: string;
    };
    tableTitle?: string;
    topRow?: {
        col1: string;
        col2: string;
    };
    rows: SalaryRow[];
    source?: string;
};

// 🔧 Parse top row (column labels)
function parseTopRow(text?: string) {
    if (!text) return { col1: "", col2: "" };

    const [col1, col2] = text.split("|").map((s) => s.trim());

    return {
        col1: col1 || "",
        col2: col2 || "",
    };
}

// 🔧 Parse textarea rows
function parseRows(text?: string): SalaryRow[] {
    if (!text) return [];

    return text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const [industry, salary] = line.split("|").map((s) => s.trim());

            return {
                industry: industry || "",
                salary: salary || "",
            };
        });
}

// 🔷 Main Salary Mapper
export function mapGuideSalary(node: any): GuideSalaryVM | null {
    const sec = node?.guideDetailPage?.salarySection;

    if (!sec) return null;

    return {
        heading: sec?.heading ?? "",
        description: sec?.description ?? null,
        medianSalary: sec?.medianSalary ?? "",
        medianSalaryLink: sec?.medianSalaryLink ?? null,
        tableTitle: sec?.tableTitle ?? "",
        topRow: parseTopRow(sec?.topRow),
        rows: parseRows(sec?.salaryRows),
        source: sec?.tableSource ?? "",
    };
}
export function mapProgramPromo(node: any) {
    const section = node?.guideDetailPage?.programPromoSection;
    return {
        heading: section?.heading ?? "",
        description:
            node?.guideDetailPage?.programPromoSection?.description ?? "",
        industry:
            node?.industries?.nodes?.[0]?.slug ?? "",
    };
}
export type GuideFAQItem = {
    question: string;
    answerHtml: string;
};

export type GuideFAQVM = {
    heading?: string;
    items: GuideFAQItem[];
};

export function mapGuideFAQ(node: any): GuideFAQVM {
    const section = node?.guideDetailPage?.faqSection;

    const items = [
        {
            question: section?.faq1Question,
            answerHtml: section?.faq1Answer,
        },
        {
            question: section?.faq2Question,
            answerHtml: section?.faq2Answer,
        },
        {
            question: section?.faq3Question,
            answerHtml: section?.faq3Answer,
        },
        {
            question: section?.faq4Question,
            answerHtml: section?.faq4Answer,
        },
    ].filter(
        (item) => item.question && item.answerHtml
    );

    return {
        heading: section?.heading ?? "",
        items,
    };
}