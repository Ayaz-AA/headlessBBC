// app/programs/[slug]/page.tsx
import { notFound } from "next/navigation";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

import RolePlpFilterBar from "@/components/programs/RolePlpFilterBar";
import FeaturedProgramsWithFlyout from "@/components/programs/FeaturedProgramsWithFlyout";

import {
    getRolePlpBySlug,
    mapRolePlpToVM,
    getAllRolesForPlpFilter,
    mapRolesToPlpFilterVM,
} from "@/lib/rolePlp";

export default async function RolePlpPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    if (!slug) return notFound();

    const [rolePlpData, rolesData] = await Promise.all([
        getRolePlpBySlug(slug),
        getAllRolesForPlpFilter(),
    ]);

    const vm = mapRolePlpToVM(rolePlpData);
    if (!vm) return notFound();

    const filterVm = mapRolesToPlpFilterVM(rolesData);

    // kicker like: "BUSINESS, PRODUCT MANAGEMENT BOOTCAMP"
    const kicker =
        vm.industryName && vm.name
            ? `${vm.industryName.toUpperCase()}, ${vm.name.toUpperCase()} BOOTCAMP`
            : vm.name
                ? `${vm.name.toUpperCase()} BOOTCAMP`
                : "";

    return (
        <>
            <Header />

            <main>
                {/* HERO + FILTER BAR */}
                <section className="hero  hero-background ">
                    <div className="container text-center py-5">
                        {vm.heroLabel ? (
                            <div className="badge   mx-auto">{vm.heroLabel}</div>
                        ) : null}

                        <h1 className="hero__titles">
                            <span className="hero__title-line1">{vm.heroTitleLine1 ?? vm.name}</span>{" "}
                            {vm.heroTitleLine2 ? (
                                <span className="hero__title-line2">{vm.heroTitleLine2}</span>
                            ) : null}{" "}
                            {vm.heroTitleLine3 ? (
                                <span className="hero__title-line1">{vm.heroTitleLine3}</span>
                            ) : null}
                        </h1>

                        {vm.heroDescription ? (
                            <p className="hero__intro mx-auto">{vm.heroDescription}</p>
                        ) : null}

                        <div className="row justify-content-center mt-4">
                            <div className="col-12 col-lg-10 col-xl-8">
                                <RolePlpFilterBar
                                    currentIndustrySlug={vm.industrySlug ?? ""}
                                    currentRoleSlug={slug}
                                    industries={filterVm.industries}
                                    roles={filterVm.roles}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* BODY + FEATURED */}
                <section className="container py-5">
                    {/* Body heading/para centered like design */}
                    <div className="text-center plp-bodyIntro">
                        <div className="badge   mx-auto">Programs</div>

                        {vm.bodyHeading ? <h2 className="component-heading mt-3">{vm.bodyHeading}</h2> : null}
                        {vm.bodyPara ? (
                            <p className="regular-para mt-2 mx-auto plp-bodyIntro__para">{vm.bodyPara}</p>
                        ) : null}
                    </div>

                    {/* Featured Programs section */}
                    <div className="text-center mt-5">
                        <div className="badge   mx-auto">Featured Programs</div>
                        <h2 className="component-heading mt-3">Featured Programs</h2>
                    </div>

                    {/* ✅ ONLY THIS PART CHANGES */}
                    {vm.programs.length > 0 ? (
                        <FeaturedProgramsWithFlyout programs={vm.programs} kicker={kicker} />
                    ) : (
                        <div className="alert alert-light border mt-4">
                            No programs found for this role yet.
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}
