import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

import BlogsPage from "@/components/blog/BlogsPage";
import {
    getBlogsListingHero,
    getBlogsByTopic,
    getBlogTopics,
    getTotalTopicPages,
    getBlogBySlug,
    getPrimaryChildTopicSlug,
} from "@/lib/blogs";

import { notFound, redirect } from "next/navigation";

export const revalidate = 300;

const BLOGS_PAGE_ID = "1252";
const PER_PAGE = 9;

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
            parent: t?.parent?.node ? { name: t.parent.node.name, slug: t.parent.node.slug } : null,
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
    params: Promise<{ topic: string }>;
    searchParams?: Promise<{ page?: string }>;
};

export default async function BlogTopicPage({ params, searchParams }: PageProps) {
    const { topic } = await params;
    const sp = (await searchParams) ?? {};
    const pageNum = Math.max(1, Number(sp.page ?? "1") || 1);

    /**
     * ✅ KEY FIX:
     * This route "/blog/[topic]" must also handle WP-style "/blog/<slug>".
     *
     * We check whether `topic` is:
     *  - a valid BlogTopic slug -> render topic listing
     *  - otherwise, if it is a Post slug -> redirect to /blog/<canonicalTopic>/<slug>
     */

    // 1) Check if this "topic" is actually a real blog topic by attempting to fetch the topic node.
    // We only need 1 item to know the topic exists.
    const topicProbe: any = await getBlogsByTopic(topic, 1, null);
    const topicExists = !!topicProbe?.blogTopic;

    if (!topicExists) {
        // 2) Not a topic => maybe it's a post slug (WP default /blog/<slug>)
        const postRes: any = await getBlogBySlug(topic);
        const blog = postRes?.blog;

        if (blog) {
            const canonicalTopic = getPrimaryChildTopicSlug(blog);

            // If you found a canonical topic, redirect to the "pretty" URL
            if (canonicalTopic) {
                redirect(`/blog/${canonicalTopic}/${blog.slug}`);
            }

            // fallback (if no topic terms found for some reason)
            redirect(`/blog/${blog.slug}`);
        }

        // 3) Neither topic nor post => 404
        return notFound();
    }

    // ✅ If we got here, it's a REAL topic page — run your existing pagination logic.

    // Cursor-walk to reach requested page for this topic
    let after: string | null = null;
    for (let i = 1; i < pageNum; i++) {
        const step: any = await getBlogsByTopic(topic, PER_PAGE, after);
        const end = step?.blogTopic?.blogs?.pageInfo?.endCursor ?? null;
        if (!end) break;
        after = end;
    }

    const [heroRes, byTopicRes, topicsRes]: any = await Promise.all([
        getBlogsListingHero(BLOGS_PAGE_ID),
        getBlogsByTopic(topic, PER_PAGE, after),
        getBlogTopics(),
    ]);

    const hero = mapHero(heroRes);

    const nodes = byTopicRes?.blogTopic?.blogs?.nodes ?? [];
    const blogs = nodes.map(mapBlogCardVM);
    const pageInfo = byTopicRes?.blogTopic?.blogs?.pageInfo;

    const allTopics = topicsRes?.blogTopics?.nodes ?? [];
    const totalPages = await getTotalTopicPages(topic, PER_PAGE);

    return (
        <>
            <Header />
            <BlogsPage
                hero={hero}
                blogs={blogs}
                pageInfo={pageInfo}
                activeTopicSlug={topic}
                allTopics={allTopics}
                currentPage={pageNum}
                basePath={`/blog/${topic}`}
                totalPages={totalPages}
            />
            <Footer />
        </>
    );
}
