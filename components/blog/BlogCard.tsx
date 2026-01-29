import Link from "next/link";

export type BlogCardVM = {
    title: string;
    slug: string;
    excerpt?: string;
    date?: string;
    authorName?: string;
    featuredImage?: { url?: string; alt?: string };

    // from blogTopics nodes
    topics?: Array<{
        name: string;
        slug: string;
        parent?: { name: string; slug: string } | null;
    }>;
};

function stripHtml(html = "") {
    return html.replace(/<[^>]*>/g, "").trim();
}

function pickChildTopic(topics: BlogCardVM["topics"]) {
    return (topics ?? []).find((t) => !!t?.parent?.slug) ?? null;
}

function pickIndustry(topics: BlogCardVM["topics"]) {
    // Prefer the parent of the child topic (Industry: IT/Business/Healthcare)
    const child = pickChildTopic(topics);
    if (child?.parent) return child.parent;

    // fallback: a top-level term with no parent
    const top = (topics ?? []).find((t) => !t?.parent);
    return top ? { name: top.name, slug: top.slug } : null;
}

export default function BlogCard({ blog }: { blog: BlogCardVM }) {
    const childTopic = pickChildTopic(blog.topics);
    const industry = pickIndustry(blog.topics);

    // ✅ URL you want (Option A): /blog/<topic>/<post>
    // If no child topic exists, fallback to /blog/<post> (still works)
    const href = childTopic
        ? `/blog/${childTopic.slug}/${blog.slug}`
        : `/blog/${blog.slug}`;

    const imgUrl = blog.featuredImage?.url;
    const imgAlt = blog.featuredImage?.alt ?? "";

    const dateText = blog.date
        ? new Date(blog.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "";

    const excerptText = blog.excerpt ? stripHtml(blog.excerpt) : "";

    return (
        <article className="program-card">
            <div className="program-card__media">
                {imgUrl ? (
                    <Link href={href} aria-label={blog.title}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="program-card__img" src={imgUrl} alt={imgAlt} />
                    </Link>
                ) : (
                    <div className="program-card__placeholder">
                        <Link href={href} className="text-decoration-none">
                            Read
                        </Link>
                    </div>
                )}

                {!!industry?.name && (
                    <div className="program-card__badges">
                        <span className="program-card__badge">{industry.name}</span>
                    </div>
                )}
            </div>

            <div className="p-3 program-card__body">
                <p className="program-card__meta">
                    {!!dateText && (
                        <span className="program-card__meta-item">

                            {dateText}
                        </span>
                    )}
                    <span >|</span>
                    {!!blog.authorName && (
                        <span className="program-card__meta-item">

                            {blog.authorName}
                        </span>
                    )}
                </p>
                <h3 className="program-card__title">
                    <Link href={href} className="text-decoration-none text-reset">
                        {blog.title}
                    </Link>
                </h3>

                <p className="blog-card-des mb-0" style={{ fontSize: 14, lineHeight: 1.5 }}>
                    {excerptText}
                </p>



                <div className="program-card__footer ">
                    <Link href={href} className="blog-card__btn d-flex
                align-items-center">
                        <span className="text-decoration-underline me-2">Read More</span>   <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
