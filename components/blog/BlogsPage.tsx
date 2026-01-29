"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import BlogGrid from "@/components/blog/BlogGrid";
import BlogHero from "@/components/blog/BlogHero";
import Pagination from "@/components/blog/Pagination";

type HeroVM = {
    heroLabel?: string | null;
    titleLine1?: string | null;
    titleLine2?: string | null;
    heroDescription?: string | null;
    heroCtaLabel?: string | null;
    heroCtaHref?: string | null;
    heroImageUrl?: string | null;
    heroImageAlt?: string | null;
};

type BlogCardVM = {
    title: string;
    slug: string;
    excerpt?: string;
    date?: string;
    authorName?: string;
    featuredImage?: { url?: string; alt?: string };
    topics?: Array<{
        name: string;
        slug: string;
        parent?: { name: string; slug: string } | null;
    }>;
};

type TopicTerm = {
    name: string;
    slug: string;
    parent?: { node?: { slug: string; name: string } } | null;
};

type Props = {
    hero: HeroVM;
    blogs: BlogCardVM[];
    pageInfo?: { hasNextPage?: boolean; endCursor?: string };
    activeTopicSlug?: string;
    allTopics: TopicTerm[];

    currentPage: number;
    basePath: string;
    totalPages: number;
};

export default function BlogsPage({
    hero,
    blogs,
    activeTopicSlug,
    allTopics,
    currentPage,
    basePath,
    totalPages,
}: Props) {
    const router = useRouter();

    /**
     * ✅ Determine what the current route slug represents:
     * - If activeTopicSlug is a PARENT industry term => industry = activeTopicSlug, topic = ""
     * - If it’s a CHILD topic term => industry = parentSlug, topic = activeTopicSlug
     * - If no slug (blog index) => industry = "all", topic = ""
     */
    const routeSelection = useMemo(() => {
        if (!activeTopicSlug) {
            return { industry: "all", topic: "" };
        }

        const term = allTopics.find((t) => t.slug === activeTopicSlug);

        // If the term exists and has NO parent => it's a parent industry
        const isParentIndustry = !!term && !term.parent?.node?.slug;

        if (isParentIndustry) {
            return { industry: activeTopicSlug, topic: "" };
        }

        // Otherwise treat it as a child topic
        const parentSlug = term?.parent?.node?.slug ?? "all";
        return { industry: parentSlug, topic: activeTopicSlug };
    }, [activeTopicSlug, allTopics]);

    // ✅ Init state from routeSelection
    const [industry, setIndustry] = useState<string>(routeSelection.industry);
    const [topic, setTopic] = useState<string>(routeSelection.topic);

    // ✅ Keep dropdowns in sync when route changes
    useEffect(() => {
        setIndustry(routeSelection.industry);
        setTopic(routeSelection.topic);
    }, [routeSelection]);

    // Build industry list from taxonomy
    const industries = useMemo(() => {
        const map = new Map<string, string>();

        allTopics.forEach((t) => {
            const p = t?.parent?.node;
            if (p?.slug) map.set(p.slug, p.name);
        });

        return [
            { value: "all", label: "All Industries" },
            ...Array.from(map.entries())
                .map(([slug, name]) => ({ value: slug, label: name }))
                .sort((a, b) => a.label.localeCompare(b.label)),
        ];
    }, [allTopics]);

    // Topics list depends on industry
    const topicOptions = useMemo(() => {
        if (!industry || industry === "all") {
            return [{ value: "", label: "All Topics" }];
        }

        const list = allTopics
            .filter((t) => t?.parent?.node?.slug === industry)
            .map((t) => ({ value: t.slug, label: t.name }))
            .sort((a, b) => a.label.localeCompare(b.label));

        return [{ value: "", label: "All Topics" }, ...list];
    }, [allTopics, industry]);

    /**
     * ✅ Updated Search behavior:
     * - If topic selected -> /blog/<topicSlug>
     * - Else if industry selected -> /blog/<industrySlug>
     * - Else -> /blog
     */
    const onSearch = () => {
        const topicSlug = (topic || "").trim();
        const industrySlug = (industry || "").trim();

        if (topicSlug) {
            router.push(`/blog/${encodeURIComponent(topicSlug)}`);
            return;
        }

        if (industrySlug && industrySlug !== "all") {
            router.push(`/blog/${encodeURIComponent(industrySlug)}`);
            return;
        }

        router.push(`/blog`);
    };

    return (
        <main>
            <BlogHero
                hero={hero}
                industries={industries}
                industrySlug={industry}
                onIndustryChange={(v: string) => {
                    setIndustry(v);
                    setTopic(""); // reset topic when industry changes
                }}
                topicOptions={topicOptions}
                topicSlug={topic}
                onTopicChange={setTopic}
                onSearch={onSearch}
            />

            <section className="container py-5">
                {blogs?.length ? (
                    <>
                        <BlogGrid blogs={blogs as any} />

                        {totalPages > 1 ? (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                basePath={basePath}
                            />
                        ) : null}
                    </>
                ) : (
                    <div className="bbc-empty">
                        <h3 className="bbc-empty__title">No blogs yet for this selection</h3>
                        <p className="bbc-empty__text">
                            We are working on new content — please check back soon.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}
