import type { CertificationVM } from "@/lib/certifications";
import CertificationCard from "./CertificationCard";

export default function CertificationsGrid({ items }: { items: CertificationVM[] }) {
    if (!items?.length) return <p className="text-muted">No certifications found.</p>;

    return (
        <div className="d-flex flex-column gap-3">
            {items.map((c) => (
                <CertificationCard key={c.id} cert={c} />
            ))}
        </div>
    );
}
