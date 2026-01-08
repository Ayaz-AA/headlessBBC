import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { notFound } from "next/navigation";
import ProgramPdpPage from "@/components/programPdp/ProgramPdpPage";
import { getProgramPdpBySlug, mapProgramPdpToVM } from "@/lib/programPdp";

export default async function ProgramPdpRoute({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const data = await getProgramPdpBySlug(slug);
    const program = mapProgramPdpToVM(data);

    if (!program) return notFound();

    return (
        <>
            <Header />
            <ProgramPdpPage program={program} />
            <Footer />
        </>
    );
}
