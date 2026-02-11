import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import CertificationsPage from "@/components/certifications/CertificationsPage";
import HashScroller from "@/components/certifications/HashScroller";
import { getCertifications, getCertificationsHero } from "@/lib/certifications";

export const revalidate = 300;

export default async function CertificationsItPage() {
    const [certs, hero] = await Promise.all([
        getCertifications(200),
        getCertificationsHero("it-certifications"),
    ]);

    return (
        <>
            <Header />

            {/* For navbar links like /certifications/it#azure-admin */}
            <HashScroller offset={120} />

            <CertificationsPage
                certifications={certs}
                hero={hero}
                initialIndustrySlug="it"
                lockedIndustry
                showAllIndustriesOption={false}
            />

            <Footer />
        </>
    );
}
