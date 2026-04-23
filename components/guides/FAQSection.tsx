"use client";

interface FAQItem {
    question?: string;
    answerHtml?: string; // ✅ WYSIWYG support
}

interface FAQProps {
    heading?: string;
    items: FAQItem[];
}

export default function FAQSection({ heading, items }: FAQProps) {
    if (!heading && !items?.length) return null;

    return (
        <section className="container py-5 custom-faq-section">

            {heading && (
                <h2 className="mb-4 text-center component-heading">
                    {heading}
                </h2>
            )}

            <div className="accordion custom-faq-accordion" id="guideFaq">

                {items.map((item, idx) => {
                    const collapseId = `guide-faq-collapse-${idx}`;
                    const headingId = `guide-faq-heading-${idx}`;

                    return (
                        <div className="accordion-item custom-faq-item" key={idx}>

                            <h2 className="accordion-header" id={headingId}>
                                <button
                                    className="accordion-button custom-faq-button collapsed" /* ✅ ALWAYS CLOSED */
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#${collapseId}`}
                                    aria-expanded="false" /* ✅ ALWAYS FALSE */
                                    aria-controls={collapseId}
                                >
                                    {item.question}
                                </button>
                            </h2>

                            <div
                                id={collapseId}
                                className="accordion-collapse collapse" /* ❌ removed 'show' */
                                aria-labelledby={headingId}
                                data-bs-parent="#guideFaq"
                            >
                                <div
                                    className="accordion-body regular-para"
                                    dangerouslySetInnerHTML={{
                                        __html: item.answerHtml || "",
                                    }}
                                />
                            </div>

                        </div>
                    );
                })}
            </div>
        </section>
    );
}