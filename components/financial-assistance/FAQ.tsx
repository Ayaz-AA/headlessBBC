// components/financial-assistance/FAQ.tsx

interface FAQItem {
    question?: string
    answer?: string
}

interface FAQProps {
    heading?: string
    items: FAQItem[]
}

export default function FAQ({ heading, items }: FAQProps) {
    if (!heading && !items?.length) return null

    return (
        <section className="container py-5 finance-faq-section">
            {heading && <h2 className="mb-4 text-center finance-faq-heading">{heading}</h2>}

            <div className="accordion finance-faq-accordion" id="financeFaq">
                {items.map((item, idx) => {
                    const collapseId = `faq-collapse-${idx}`
                    const headingId = `faq-heading-${idx}`
                    return (
                        <div className="accordion-item finance-faq-item" key={idx}>
                            <h2 className="accordion-header" id={headingId}>
                                <button
                                    className={
                                        'accordion-button finance-faq-button ' +
                                        (idx === 0 ? '' : 'collapsed')
                                    }
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#${collapseId}`}
                                    aria-expanded={idx === 0 ? 'true' : 'false'}
                                    aria-controls={collapseId}
                                >
                                    {item.question}
                                </button>
                            </h2>
                            <div
                                id={collapseId}
                                className={
                                    'accordion-collapse collapse ' +
                                    (idx === 0 ? 'show' : '')
                                }
                                aria-labelledby={headingId}
                                data-bs-parent="#financeFaq"
                            >
                                <div className="accordion-body regular-para">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
