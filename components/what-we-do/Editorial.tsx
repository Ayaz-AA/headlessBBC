// components/what-we-do/Editorial.tsx

interface EditorialProps {
    heading?: string
    paragraph?: string
    linkLine?: string
    linkText?: string
    imageUrl?: string
    imageAlt?: string
}

export default function Editorial({
    heading,
    paragraph,
    linkLine,
    linkText,
    imageUrl,
    imageAlt,
}: EditorialProps) {
    if (!heading && !paragraph && !imageUrl) return null

    return (
        <section className="my-5 editorial-sec container">
            <div className="row align-items-center py-5 editorial-img-side">
                <div className="col-lg-7 ">
                    {heading && <h2 className="orange-sec-heading">{heading}</h2>}
                    {paragraph && <p className="mt-3 text-black">{paragraph}</p>}
                    <div className="d-flex align-items-center fw-semibold ">
                        <div className="text-muted"> {linkLine && <span>{linkLine}</span>}</div>
                        <div>{linkText && (
                            <a href="#" className="orange-clr ms-1">
                                {linkText}
                            </a>
                        )}</div></div>
                </div>

                <div className="col-lg-4 offset-lg-1 text-lg-end mt-4 mt-lg-0 ">
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={imageAlt || ''}
                            className="img-fluid"
                        />
                    )}
                </div>
            </div>
        </section>
    )
}
