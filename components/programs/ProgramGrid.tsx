import ProgramCard from "./ProgramCard";
import type { ProgramVM } from "./ProgramsPage";

export default function ProgramGrid({ programs }: { programs: ProgramVM[] }) {
    return (
        <div className="row g-3 mt-1">
            {programs.map((p) => (
                <div key={p.id} className="col-12 col-md-6 col-lg-4">
                    <ProgramCard program={p} />
                </div>
            ))}
        </div>
    );
}
