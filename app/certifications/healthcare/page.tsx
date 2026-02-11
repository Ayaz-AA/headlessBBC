import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import CertificationsPage from "@/components/certifications/CertificationsPage";
import { getCertifications, getCertificationsHero } from "@/lib/certifications";

export const revalidate = 300;

export default async function CertificationsHealthcarePage() {
    const [certs, hero] = await Promise.all([
        getCertifications(200),
        getCertificationsHero("healthcare-certifications"),
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
            />
            <Footer />
        </>
    );
}
