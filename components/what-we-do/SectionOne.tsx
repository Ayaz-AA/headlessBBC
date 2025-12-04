// components/what-we-do/SectionOne.tsx

interface SectionOneProps {
    heading?: string
    paragraph?: string
    imageUrl?: string
    imageAlt?: string
    paragraph2: string
}

export default function SectionOne({
    heading,
    paragraph,
    imageUrl,
    imageAlt,
    paragraph2,
}: SectionOneProps) {
    if (!heading && !paragraph && !imageUrl) return null

    return (
        <section className=" team-section container text-center mt-5 p-lg-5 p-3 py-5">

            <div>
                {heading && <h2 className="team-intro-heading">{heading}</h2>}
                {paragraph && <p className="team-intro">{paragraph}</p>}
            </div>
            <div className="mt-lg-5 mt-4">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={imageAlt || ''}
                        className="img-fluid rounded-4 shadow"
                    />
                )}
            </div>
            {paragraph && <p className="team-intro mt-5">{paragraph2}</p>}
        </section>
    )
}
