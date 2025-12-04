// components/editorial-policy/CoreValues.tsx

interface CoreBlock {
    heading?: string
    para?: string
    imageUrl?: string
    imageAlt?: string
}

interface CoreValuesProps {
    mainHeading?: string
    blocks: CoreBlock[]
}

export default function CoreValues({ mainHeading, blocks }: CoreValuesProps) {
    if (!mainHeading && !blocks?.length) return null

    return (
        <section className="container">
            {mainHeading && <h2 className="mb-4 team-intro-heading">{mainHeading}</h2>}

            {blocks.map((block, idx) => {
                // idx = 0 → section 1, idx = 1 → section 2, etc.
                const isEvenSection = (idx + 1) % 2 === 0
                // even sections: image left, content right
                // odd sections: content left, image right

                return (
                    <div
                        key={idx}
                        className={`row align-items-center py-4 mt-3 `}
                    >
                        {/* IMAGE COLUMN */}
                        <div
                            className={
                                'col-lg-6 mt-3 mt-lg-0 ' +
                                (isEvenSection ? 'order-lg-1 text-lg-start' : 'order-lg-2 text-lg-end')
                            }
                        >
                            {block.imageUrl && (
                                <img
                                    src={block.imageUrl}
                                    alt={block.imageAlt || ''}
                                    className="img-fluid"
                                />
                            )}
                        </div>

                        {/* CONTENT COLUMN */}
                        <div
                            className={
                                'col-lg-6 ' +
                                (isEvenSection ? 'order-lg-2' : 'order-lg-1')
                            }
                        >
                            {block.heading && <h3 className="h4 text-muted">{block.heading}</h3>}
                            {block.para && <p className="mt-2 mb-0 regular-para ">{block.para}</p>}
                        </div>
                    </div>
                )
            })}
        </section>
    )
}
