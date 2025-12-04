// components/editorial-policy/SecondSection.tsx

interface SecondSectionProps {
    heading?: string
    para?: string
    para2?: string
    innerHeading?: string
    innerPara?: string
    innerPara2?: string
}

export default function SecondSection({
    heading,
    para,
    para2,
    innerHeading,

    innerPara2,
}: SecondSectionProps) {
    if (!heading && !para && !innerHeading) return null

    return (
        <section className="container py-5 p-0">
            {heading && <h2 className="team-intro-heading mb-3">{heading}</h2>}
            {para && <p className="mb-2 regular-para ">{para}</p>}

            <div className="crucial-wrapper p-5 text-white">
                {(innerHeading || innerPara2) && (

                    <div className="p-4 crucial-section-desktop">
                        {innerHeading && <h3 className="crucial-heading mb-4">{innerHeading}</h3>}

                        {innerPara2 && <p className="regular-para  text-white ">{innerPara2}</p>}
                    </div>

                )}
            </div>
            {para2 && <p className="mt-4 regular-para ">{para2}</p>}
        </section>
    )
}
