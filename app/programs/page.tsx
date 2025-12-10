import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import ProgramsPage from "@/components/programs/ProgramsPage";
import { getPrograms, mapProgramNodeToVM } from "@/lib/programs";
import { getProgramsListingHero, mapProgramsHero } from "@/lib/programsHero";

export default async function AllProgramsPage() {
    const [programsData, heroData]: any = await Promise.all([
        getPrograms(),
        getProgramsListingHero("all-programs"),
    ]);

    const programs = (programsData?.programs?.nodes ?? []).map(mapProgramNodeToVM);
    const hero = mapProgramsHero(heroData);

    return (
        <>
            <Header />
            <ProgramsPage
                pageTitle="All Programs"
                programs={programs}
                hero={hero}
                showAllIndustriesOption={true}
                lockedIndustry={false}
            />
            <Footer />
        </>
    );
}
