import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import ProgramsPage from "@/components/programs/ProgramsPage";
import { getPrograms, mapProgramNodeToVM } from "@/lib/programs";
import { getProgramsListingHero, mapProgramsHero } from "@/lib/programsHero";

export default async function BusinessProgramsPage() {
    const [programsData, heroData]: any = await Promise.all([
        getPrograms(),
        getProgramsListingHero("business-programs"),
    ]);

    const programs = (programsData?.programs?.nodes ?? []).map(mapProgramNodeToVM);
    const hero = mapProgramsHero(heroData);

    return (
        <>
            <Header />
            <ProgramsPage
                pageTitle="Business Programs"
                initialIndustrySlug="business"
                programs={programs}
                hero={hero}
                showAllIndustriesOption={false}
                lockedIndustry={true}
            />
            <Footer />
        </>
    );
}
