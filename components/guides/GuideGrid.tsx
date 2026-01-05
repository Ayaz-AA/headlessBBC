import GuideCard from "./GuideCard";
import type { GuideVM } from "./GuidesPage";

export default function GuideGrid({ guides }: { guides: GuideVM[] }) {
    return (
        <div className="row g-4 mt-2">
            {guides.map((g) => (
                <div key={g.id} className="col-12 col-lg-6">
                    <GuideCard guide={g} />
                </div>
            ))}
        </div>
    );
}
