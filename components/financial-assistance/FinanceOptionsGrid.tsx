// components/financial-assistance/FinanceOptionsGrid.tsx

type ImageNode = {
    node?: {
        sourceUrl?: string
        altText?: string
    }
}

export interface FinanceOptionsData {
    mainHeading?: string
    mainPara?: string

    heading1?: string
    para1?: string
    icon1?: ImageNode

    heading2?: string
    para2?: string
    icon2?: ImageNode

    heading3?: string
    para3?: string
    icon3?: ImageNode

    heading4?: string
    para4?: string
    icon4?: ImageNode

    heading5?: string
    para5?: string
    icon5?: ImageNode

    heading6?: string
    para6?: string
    icon6?: ImageNode
    section6Link: string
    section6LinkText: string

    heading7?: string
    icon7?: ImageNode

    heading8?: string
    para8?: string
    icon8?: ImageNode

    noteHeading?: string
    notePara?: string
    noteIcon?: ImageNode

    section7Link1?: string
    section7Link1Text?: string
    section7Link1Para?: string

    section7Link2?: string
    section7Link2Text?: string
    section7Link2Para?: string
}

function Icon({ img }: { img?: ImageNode }) {
    const url = img?.node?.sourceUrl
    if (!url) return null
    return (
        <div className="mb-3">
            <img src={url} alt={img?.node?.altText || ""} width={32} height={32} />
        </div>
    )
}

function CardShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="finance-card finance-card--default h-100 rounded-4 text-start p-4">
            {children}
        </div>
    )
}

function LinkBlock({
    href,
    title,
    para,
}: {
    href?: string
    title?: string
    para?: string
}) {
    if (!href && !title && !para) return null
    return (
        <div className="mt-3">
            {title && (
                <div className="fw-semibold" style={{ fontSize: 14 }}>
                    {href ? (
                        <a href={href} className="text-decoration-none">
                            {title}
                        </a>
                    ) : (
                        title
                    )}
                </div>
            )}
            {para && <p className="mb-0 text-muted" style={{ fontSize: 14 }}>{para}</p>}
        </div>
    )
}

export default function FinanceOptionsGrid({ finance }: { finance: FinanceOptionsData }) {
    if (!finance?.mainHeading && !finance?.heading1) return null

    return (
        <section className="container py-5 text-center">
            {finance?.mainHeading && <h2 className="mb-2">{finance.mainHeading}</h2>}
            {finance?.mainPara && <p className="mb-5 text-muted">{finance.mainPara}</p>}

            <div className="row g-4">
                {/* Card 1 */}
                <div className="col-12 col-md-6 col-lg-4">
                    <CardShell>
                        <Icon img={finance.icon1} />
                        {finance.heading1 && <h3 className="h5 mb-2">{finance.heading1}</h3>}
                        {finance.para1 && <p className="mb-0 text-muted">{finance.para1}</p>}
                    </CardShell>
                </div>

                {/* Card 2 */}
                <div className="col-12 col-md-6 col-lg-4">
                    <CardShell>
                        <Icon img={finance.icon2} />
                        {finance.heading2 && <h3 className="h5 mb-2">{finance.heading2}</h3>}
                        {finance.para2 && <p className="mb-0 text-muted">{finance.para2}</p>}
                    </CardShell>
                </div>

                {/* Card 3 */}
                <div className="col-12 col-md-6 col-lg-4">
                    <CardShell>
                        <Icon img={finance.icon3} />
                        {finance.heading3 && <h3 className="h5 mb-2">{finance.heading3}</h3>}
                        {finance.para3 && <p className="mb-0 text-muted">{finance.para3}</p>}
                    </CardShell>
                </div>

                {/* Card 4 */}
                <div className="col-12 col-md-6 col-lg-4">
                    <CardShell>
                        <Icon img={finance.icon4} />
                        {finance.heading4 && <h3 className="h5 mb-2">{finance.heading4}</h3>}
                        {finance.para4 && <p className="mb-0 text-muted">{finance.para4}</p>}
                    </CardShell>
                </div>

                {/* Card 5 */}
                <div className="col-12 col-md-6 col-lg-4">
                    <CardShell>
                        <Icon img={finance.icon5} />
                        {finance.heading5 && <h3 className="h5 mb-2">{finance.heading5}</h3>}
                        {finance.para5 && <p className="mb-0 text-muted">{finance.para5}</p>}
                    </CardShell>
                </div>

                {/* Card 6 */}
                <div className="col-12 col-md-6 col-lg-4">
                    <CardShell>
                        <Icon img={finance.icon6} />
                        {finance.heading6 && <h3 className="h5 mb-2">{finance.heading6}</h3>}
                        {(finance.para6 || finance.section6Link || finance.section6LinkText) && (
                            <p className="mb-0 text-muted" style={{ fontSize: 14 }}>
                                {finance.section6Link && (
                                    <a
                                        href={finance.section6Link}
                                        className="finance-card__inline-link text-muted"
                                    >
                                        {finance.section6LinkText || finance.section6Link}
                                    </a>
                                )}
                                {finance.para6 && (
                                    <>
                                        {' '}
                                        {finance.para6}
                                    </>
                                )}
                            </p>
                        )}
                    </CardShell>
                </div>

                {/* Card 7 (WIDE): More Resources + links on left, note on right */}
                <div className="col-12 col-md-12 col-lg-8">
                    <CardShell>
                        <div className="row g-4 align-items-stretch">
                            {/* Left */}
                            <div className="col-12 col-md-7">
                                <Icon img={finance.icon7} />
                                {finance.heading7 && <h3 className="h5 mb-2">{finance.heading7}</h3>}

                                {/* You have two separate paras (one per link block) */}
                                <LinkBlock
                                    href={finance.section7Link1}
                                    title={finance.section7Link1Text}
                                    para={finance.section7Link1Para}
                                />
                                <LinkBlock
                                    href={finance.section7Link2}
                                    title={finance.section7Link2Text}
                                    para={finance.section7Link2Para}
                                />
                            </div>

                            {/* Right Note */}
                            <div className="col-12 col-md-5 d-flex">
                                {(finance.noteHeading || finance.notePara) && (
                                    <div className="finance-card__note w-100 p-4 my-auto">
                                        <div className="text-center text-muted">
                                            {finance.noteIcon?.node?.sourceUrl && (
                                                <img
                                                    src={finance.noteIcon.node.sourceUrl}
                                                    alt={finance.noteIcon.node.altText || ""}
                                                    width={34}
                                                    height={34}
                                                    className="mx-auto"
                                                />
                                            )}
                                            <div>
                                                {finance.noteHeading && (
                                                    <div className="finance-card__note-label">{finance.noteHeading}</div>
                                                )}
                                                {finance.notePara && (
                                                    <div className="finance-card__note-text">{finance.notePara}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardShell>
                </div>

                {/* Card 8 */}
                <div className="col-12 col-md-6 col-lg-4">
                    <CardShell>
                        <Icon img={finance.icon8} />
                        {finance.heading8 && <h3 className="h5 mb-2">{finance.heading8}</h3>}
                        {finance.para8 && <p className="mb-0 text-muted">{finance.para8}</p>}
                    </CardShell>
                </div>
            </div>
        </section>
    )
}
