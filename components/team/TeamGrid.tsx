// components/team/TeamGrid.tsx
import TeamCard from './TeamCard'

export interface TeamMemberViewModel {
    id?: string
    name?: string
    roleText?: string
    photoUrl?: string
    photoAlt?: string
    roleImageUrl?: string
    roleImageAlt?: string
}

interface TeamGridProps {
    members: TeamMemberViewModel[]
    label?: string
    heading?: string
    intro?: string
}

export default function TeamGrid({ members, label, heading, intro }: TeamGridProps) {
    return (
        <section className="team-section container text-center mt-5 p-lg-5 p-3">


            {label && <div className="team-card-badge badge d-flex justify-content-between align-items-center mb-3 mx-auto">
                <div className="me-2">
                    <img
                        src="/assets/Icon-badge.png"
                        alt="icon"
                        className=""
                    />
                </div>
                <span>{label}</span>
            </div>}
            {heading && <h2 className='team-intro-heading'>{heading}</h2>}
            {intro && <p className="team-intro">{intro}</p>}

            <div className="row g-4 mt-4">
                {members.map((m, idx) => (
                    <div key={m.id ?? idx} className="col-12 col-md-6 col-lg-4">
                        <TeamCard {...m} />
                    </div>
                ))}
            </div>

        </section>
    )
}
