import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import CertificationsPage from "@/components/certifications/CertificationsPage";
import { getCertifications, getCertificationsHero } from "@/lib/certifications";
import { getGlobalMatchMeCta } from "@/lib/globalCtas";

export const revalidate = 300;

export default async function CertificationsHealthcarePage() {
    const [certs, hero, matchMeCta] = await Promise.all([
        getCertifications(200),
        getCertificationsHero("healthcare-certifications"),
        getGlobalMatchMeCta(),
    ]);

    return (
        <>
            <Header />
            <CertificationsPage
                certifications={certs}
                hero={hero}
                initialIndustrySlug="healthcare"
                lockedIndustry
                showAllIndustriesOption={false}
                matchMeCta={matchMeCta}
            />
            <Footer />
        </>
    );
}
