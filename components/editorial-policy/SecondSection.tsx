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
        <section className="container py-5 px-3 px-md-4 px-lg-0">
            {heading && <h2 className="component-heading mb-3">{heading}</h2>}
            {para && <p className="mb-4 regular-para">{para}</p>}

            <div className="crucial-wrapper p-3 p-md-4 p-lg-5 text-white">
                {(innerHeading || innerPara2) && (
                    <div className="crucial-section-desktop p-4 p-md-4">
                        {innerHeading && <h3 className="crucial-heading mb-3 mb-md-4">{innerHeading}</h3>}
                        {innerPara2 && <p className="regular-para text-white mb-0">{innerPara2}</p>}
                    </div>
                )}
            </div>

            {para2 && <p className="mt-4 regular-para">{para2}</p>}
        </section>
    )
}