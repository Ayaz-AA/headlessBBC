import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import ProgramsPage from "@/components/programs/ProgramsPage";
import { getPrograms, mapProgramNodeToVM } from "@/lib/programs";
import { getProgramsListingHero } from "@/lib/programsHero";

export default async function HealthcareProgramsPage() {
    const [programsData, hero] = await Promise.all([
        getPrograms(),
        getProgramsListingHero("healthcare-programs"),
    ]);

    const programs = (programsData?.programs?.nodes ?? []).map(mapProgramNodeToVM);

    return (
        <>
            <Header />
            <ProgramsPage
                pageTitle="Healthcare Programs"
                initialIndustrySlug="healthcare"
                programs={programs}
                hero={hero}
            />
            <Footer />
        </>
    );
}
