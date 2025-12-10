import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import ProgramsPage from "@/components/programs/ProgramsPage";
import { getPrograms, mapProgramNodeToVM } from "@/lib/programs";
import { getProgramsListingHero, mapProgramsHero } from "@/lib/programsHero";

export default async function HealthcareProgramsPage() {
    const [programsData, heroData]: any = await Promise.all([
        getPrograms(),
        getProgramsListingHero("healthcare-programs"),
    ]);

    const programs = (programsData?.programs?.nodes ?? []).map(mapProgramNodeToVM);
    const hero = mapProgramsHero(heroData);

    return (
        <>
            <Header />
            <ProgramsPage
                pageTitle="Healthcare Programs"
                initialIndustrySlug="healthcare"
                programs={programs}
                hero={hero}
                showAllIndustriesOption={false}
                lockedIndustry={true}
            />
            <Footer />
        </>
    );
}
