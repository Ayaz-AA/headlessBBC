import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { notFound, redirect } from "next/navigation";

import { getBlogBySlug, getPrimaryChildTopicSlug } from "@/lib/blogs";

type PageProps = {
    params: Promise<{ topic: string; slug: string }>;
};

export default async function BlogDetailPage({ params }: PageProps) {
    // ✅ Next.js 16: params is a Promise
    const { topic, slug } = await params;

    // Fetch blog by its slug (post slug)
    const data: any = await getBlogBySlug(slug);
    const blog = data?.blog;
    if (!blog) return notFound();

    // Canonical topic = child topic slug (the one with a parent)
    const canonicalTopic = getPrimaryChildTopicSlug(blog);

    // If the URL topic doesn't match canonical, redirect to correct URL
    if (canonicalTopic && canonicalTopic !== topic) {
        redirect(`/blog/${canonicalTopic}/${slug}`);
    }

    const authorName = blog?.blogFields?.authorName ?? "";
    const dateText = blog?.date
        ? new Date(blog.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "";

    const imgUrl = blog?.featuredImage?.node?.sourceUrl ?? "";
    const imgAlt = blog?.featuredImage?.node?.altText ?? "";

    return (
        <>
            <Header />

            <main className="container py-5">
                <a href="/blog" className="text-decoration-none d-inline-block mb-3 back-blog-button w-100 pb-3">
                    ← Back to All Blogs
                </a>

                <h1 className="mb-2 blog-title">{blog.title}</h1>

                <div className="text-muted mb-4" style={{ fontSize: 14 }}>
                    {authorName ? `By ${authorName}  ` : ""}
                    <i className="fa-regular fa-calendar ms-3 me-2"></i>{dateText}
                </div>

                {imgUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imgUrl}
                        alt={imgAlt}
                        style={{ width: "100%", borderRadius: 12 }}
                    />
                ) : null}

                <div className="mt-4 blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
            </main>

            <Footer />
        </>
    );
}
