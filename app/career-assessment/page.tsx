import Header from "@/components/global/Header";
import ShortFooter from "@/components/global/ShortFooter";
import CareerAssessmentFlow from "@/components/assessment/CareerAssessmentFlow";

import { getPrograms, mapProgramNodeToVM } from "@/lib/programs";
import { getRolesTree } from "@/lib/roles";
import { getCareerAssessmentCopy } from "@/lib/careerAssessmentCopy";

export default async function CareerAssessmentPage() {
    const [programsData, rolesData, copyData]: any = await Promise.all([
        getPrograms(),
        getRolesTree(),
        getCareerAssessmentCopy(),
    ]);

    const programs = (programsData?.programs?.nodes ?? []).map(mapProgramNodeToVM);
    const industries = rolesData?.roles?.nodes ?? [];
    const copy = copyData?.page?.careerAssessmentCopy ?? null;

    return (
        <>
            <Header />
            <CareerAssessmentFlow programs={programs} industries={industries} copy={copy} />
            <ShortFooter />
        </>
    );
}
