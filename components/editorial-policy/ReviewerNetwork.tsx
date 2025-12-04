// components/editorial-policy/ReviewerNetwork.tsx

interface ReviewerNetworkProps {
    heading?: string
    para?: string
    highlightedPara?: string
}

export default function ReviewerNetwork({
    heading,
    para,
    highlightedPara,
}: ReviewerNetworkProps) {
    if (!heading && !para && !highlightedPara) return null

    const reviewerExpertise = [
        'Admissions',
        'Financial Aid',
        'Student Mental Health',
        'Anti-bias Experts',
        'Business & Accounting',
        'Career Advisors & Counselors',
        'Coding Bootcamp Specialists',
        'Admissions Experts',
        'Computer Scientists',
        'Counselors & Psychologists',
        'Diversity, Equity & Inclusion',
        'Financial Aid Specialists',
        'Mental Health Professionals',
        'Nursing & Healthcare Experts',
        'Public Health Specialists',
        'ROTC Specialists',
        'Social Work Professionals',
    ]

    return (
        <section className="container py-5">
            {heading && <h2 className="mb-3 team-intro-heading">{heading}</h2>}
            {para && <p className="mb-2 regular-para ">{para}</p>}
            <div className="reviewer-network-grid" aria-label="Reviewer network expertise areas">
                {reviewerExpertise.map((expertise) => (
                    <span key={expertise} className="reviewer-network-pill">
                        <span className="reviewer-network-dot" aria-hidden="true" />
                        {expertise}
                    </span>
                ))}
            </div>
            {highlightedPara && (
                <p className="highlighted-para regular-para p-4">{highlightedPara}</p>
            )}
        </section>
    )
}
