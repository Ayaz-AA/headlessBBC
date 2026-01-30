// components/team/TeamGrid.tsx
import TeamCard from "./TeamCard";

export interface TeamMemberViewModel {
    id?: string;
    name?: string;
    roleText?: string;
    photoUrl?: string;
    photoAlt?: string;
    roleImageUrl?: string;
    roleImageAlt?: string;
    linkedinUrl?: string;
}

interface TeamGridProps {
    members: TeamMemberViewModel[];
    label?: string;
    heading?: string;
    intro?: string;

    // ✅ add this
    missionText?: string;
}

export default function TeamGrid({
    members,
    label,
    heading,
    intro,
    missionText,
}: TeamGridProps) {
    return (
        <section className="team-section container text-center my-5 p-lg-5 p-3">
            {label && (
                <div className="team-card-badge badge d-flex justify-content-between align-items-center mb-3 mx-auto">
                    <div className="me-2">
                        <img src="/assets/Icon-badge.png" alt="icon" className="" />
                    </div>
                    <span>{label}</span>
                </div>
            )}

            {heading && <h2 className="team-intro-heading">{heading}</h2>}
            {intro && <p className="team-intro">{intro}</p>}

            <div className="row g-4 mt-4">
                {members.map((m, idx) => (
                    <div key={m.id ?? idx} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
                        <TeamCard {...m} />
                    </div>
                ))}
            </div>

            {/* ✅ Bottom mission INSIDE same container */}
            {missionText && (
                <div className="team-mission team-mission--inside mt-4 pt-4">
                    <p className="team-mission__text mb-0">{missionText}</p>
                </div>
            )}
        </section>
    );
}
