// app/programs/[slug]/page.tsx
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

export default function ProgramDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    return (
        <>
            <Header />
            <main className="container py-5">
                <h1 className="mb-2">Program detail coming soon</h1>
                <p className="text-muted">Slug: {params.slug}</p>
            </main>
            <Footer />
        </>
    );
}
