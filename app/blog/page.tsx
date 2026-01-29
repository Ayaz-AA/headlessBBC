import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

import BlogsPage from "@/components/blog/BlogsPage";
import { getBlogsListingHero, getBlogsAll, getBlogTopics, getTotalBlogPages } from "@/lib/blogs";

export const revalidate = 300;

const BLOGS_PAGE_ID = "1252";
const PER_PAGE = 12;
const totalPages = await getTotalBlogPages(PER_PAGE);

function mapBlogCardVM(b: any) {
    return {
        title: b?.title ?? "",
        slug: b?.slug ?? "",
        excerpt: b?.excerpt ?? "",
        date: b?.date ?? "",
        authorName: b?.blogFields?.authorName ?? "",
        featuredImage: {
            url: b?.featuredImage?.node?.sourceUrl ?? "",
            alt: b?.featuredImage?.node?.altText ?? "",
        },
        topics: (b?.blogTopics?.nodes ?? []).map((t: any) => ({
            name: t?.name ?? "",
            slug: t?.slug ?? "",
            parent: t?.parent?.node
                ? { name: t.parent.node.name, slug: t.parent.node.slug }
                : null,
        })),
    };
}

function mapHero(heroRes: any) {
    const h = heroRes?.page?.blogListingHero;
    return {
        heroLabel: h?.heroLabel ?? null,
        titleLine1: h?.titleLine1 ?? null,
        titleLine2: h?.titleLine2 ?? null,
        heroDescription: h?.heroDescription ?? null,
        heroCtaLabel: h?.heroCtaLabel ?? null,
        heroCtaHref: h?.heroCtaLink?.edges?.[0]?.node?.uri ?? null,
        heroImageUrl: h?.heroImage?.node?.sourceUrl ?? null,
        heroImageAlt: h?.heroImage?.node?.altText ?? "",
    };
}

type PageProps = {
    searchParams?: Promise<{ page?: string }>;
};

export default async function BlogIndexPage({ searchParams }: PageProps) {
    const sp = (await searchParams) ?? {};
    const pageNum = Math.max(1, Number(sp.page ?? "1") || 1);

    // Cursor-walk to reach requested page
    let after: string | null = null;
    for (let i = 1; i < pageNum; i++) {
        const step: any = await getBlogsAll(PER_PAGE, after);
        const end = step?.blogs?.pageInfo?.endCursor ?? null;
        if (!end) break; // no more pages
        after = end;
    }

    const [heroRes, blogsRes, topicsRes]: any = await Promise.all([
        getBlogsListingHero(BLOGS_PAGE_ID),
        getBlogsAll(PER_PAGE, after),
        getBlogTopics(),
    ]);

    const hero = mapHero(heroRes);

    const nodes = blogsRes?.blogs?.nodes ?? [];
    const blogs = nodes.map(mapBlogCardVM);
    const pageInfo = blogsRes?.blogs?.pageInfo;

    const allTopics = topicsRes?.blogTopics?.nodes ?? [];

    return (
        <>
            <Header />
            <BlogsPage
                hero={hero}
                blogs={blogs}
                pageInfo={pageInfo}
                allTopics={allTopics}
                currentPage={pageNum}
                basePath="/blog"
                totalPages={totalPages}
            />
            <Footer />
        </>
    );
}
