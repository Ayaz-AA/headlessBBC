import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import GuidesPage from "@/components/guides/GuidesPage";
import { getGuides, mapGuideNodeToVM } from "@/lib/guides";
import { getGuidesListingHero, mapGuidesHero } from "@/lib/guidesHero";

export default async function GuidesListingPage() {
    const [guidesData, heroData]: any = await Promise.all([
        getGuides(),
        getGuidesListingHero(), // <-- must match your WP page slug
    ]);

    const guides = (guidesData?.guides?.nodes ?? []).map(mapGuideNodeToVM);
    const hero = mapGuidesHero(heroData);

    return (
        <>
            <Header />
            <GuidesPage guides={guides} hero={hero} />
            <Footer />
        </>
    );
}
