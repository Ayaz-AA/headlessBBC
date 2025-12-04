// components/what-we-do/Commitment.tsx

interface CommitmentProps {
    heading?: string
    paragraph?: string
    imageUrl?: string
    imageAlt?: string
}

export default function Commitment({
    heading,
    paragraph,
    imageUrl,
    imageAlt,
}: CommitmentProps) {
    if (!heading && !paragraph && !imageUrl) return null

    return (
        <section className="commitment-wrapper py-5">
            <div className="container mx-auto row align-items-center">
                <div className="col-lg-5 text-lg-end mt-4 mt-lg-0">
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={imageAlt || ''}
                            className="img-fluid"
                        />
                    )}
                </div>
                <div className="col-lg-7 ps-lg-5 ps-0">
                    {heading && <h2 className="team-intro-heading">{heading}</h2>}
                    {paragraph && <p className="regular-para">{paragraph}</p>}
                </div>

            </div>
        </section>
    )
}
