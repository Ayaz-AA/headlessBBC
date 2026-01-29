import BlogCard, { BlogCardVM } from "./BlogCard";

export default function BlogGrid({ blogs }: { blogs: BlogCardVM[] }) {
    return (
        <div className="row g-4">
            {blogs.map((b) => (
                <div key={b.slug} className="col-12 col-md-6 col-lg-4">
                    <BlogCard blog={b} />
                </div>
            ))}
        </div>
    );
}
