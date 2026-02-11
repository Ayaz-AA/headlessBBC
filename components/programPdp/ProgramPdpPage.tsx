// src/components/programPdp/ProgramPdpPage.tsx
import PdpTabs from "./PdpTabs";
import HubSpotForm from "@/components/hubspot/HubSpotForm";
import type { ProgramPdpVM } from "@/lib/programPdp";
import { HUBSPOT } from "@/lib/hubspotConfig";

function TitleStyled({ title }: { title: string }) {
    const parts = title.trim().split(/\s+/);
    if (parts.length <= 1) return <span className="pdp-title__secondary">{title}</span>;

    const last = parts.pop()!;
    const first = parts.join(" ");

    return (
        <>
            <span className="pdp-title__primary">{first}</span>{" "}
            <span className="pdp-title__secondary">{last}</span>
        </>
    );
}

function HtmlBlock({ html, className }: { html?: string; className?: string }) {
    if (!html) return null;
    return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function ProgramPdpPage({ program }: { program: ProgramPdpVM }) {
    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "outcomes", label: "Outcomes" },
        { id: "payments", label: "Payments" },
        { id: "career", label: "Career Outlook" },
        { id: "faq", label: "FAQ" },
    ];

    //const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? "";
    //const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID ?? "";

    const portalId = HUBSPOT.portalId;
    const formId = HUBSPOT.formId;
    const region = HUBSPOT.region;
    // ✅ Provider logo ONLY (clickable if URL exists)
    const providerLogoOnly = program.providerLogoUrl ? (
        <img
            src={program.providerLogoUrl}
            alt={program.providerLogoAlt ?? program.providerName ?? "Provider"}
            className="pdp-provider-logo"
        />
    ) : null;

    // ✅ Metrics bar: only render tiles that have a value
    const metrics = [
        {
            key: "provider",
            label: "Offered by",
            icon: null,
            value: program.providerLogoUrl, // only show if logo exists
            render: (
                <div className="pdp-metric__value pdp-metric__value--provider">
                    {program.providerUrl ? (
                        <a
                            href={program.providerUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="pdp-provider-link"
                            aria-label={program.providerName ? `Visit ${program.providerName}` : "Visit provider"}
                        >
                            {providerLogoOnly}
                        </a>
                    ) : (
                        providerLogoOnly
                    )}
                </div>
            ),
        },
        {
            key: "length",
            label: "Program length",
            icon: <i className="fa-regular fa-clock" aria-hidden="true" />,
            value: program.programLength,
            render: <div className="pdp-metric__value">{program.programLength}</div>,
        },
        {
            key: "track",
            label: "Learning Track",
            icon: <i className="fa-solid fa-clock-rotate-left" aria-hidden="true" />,
            value: program.programType,
            render: <div className="pdp-metric__value">{program.programType}</div>,
        },
        {
            key: "salary",
            label: "Avg Salary",
            icon: <i className="fa-solid fa-dollar-sign" aria-hidden="true" />,
            value: program.averageSalary,
            render: <div className="pdp-metric__value">{program.averageSalary}</div>,
        },
    ].filter((m) => Boolean(m.value));

    // ✅ Overview accordion items using YOUR CSS class names
    const overviewAccordions = [
        {
            key: "eligibility",
            title: program.overviewEligibilityTitle || "Eligibility",
            html: program.overviewEligibilityHtml,
            variant: "blue" as const,
            icon: <i className="fa-solid fa-graduation-cap" aria-hidden="true" />,
        },
        {
            key: "resources",
            title: program.overviewStudentResourcesTitle || "Student Resources",
            html: program.overviewStudentResourcesHtml,
            variant: "purple" as const,
            icon: <i className="fa-solid fa-book" aria-hidden="true" />,
        },
        {
            key: "jobs",
            title: program.overviewJobOpportunitiesTitle || "Job Opportunities",
            html: program.overviewJobOpportunitiesHtml,
            variant: "green" as const,
            icon: <i className="fa-solid fa-briefcase" aria-hidden="true" />,
        },
    ].filter((x) => Boolean(x.html));

    return (
        <main className="pdp-page">
            {/* HERO */}
            <section className="pdp-hero hero-bg">
                <div className="container">
                    <h1 className="pdp-title">
                        <TitleStyled title={program.title} />
                    </h1>

                    {program.heroShortDescription && (
                        <p className="pdp-subtitle">{program.heroShortDescription}</p>
                    )}

                    {/* Image card ONLY (white border is only around image) */}
                    <div className="pdp-hero__imageWrap">
                        <img
                            src="/assets/pdp-header.png"
                            alt="Program hero"
                            className="pdp-hero__image"
                        />
                    </div>

                    {/* Metrics overlaps image and sits ABOVE it */}
                    <div className="pdp-hero__meta">
                        <div
                            className="pdp-metrics pdp-metrics--hero"
                            style={{ gridTemplateColumns: `repeat(${metrics.length}, 1fr)` }}
                        >
                            {metrics.map((m) => (
                                <div className={`pdp-metric pdp-metric--${m.key}`} key={m.key}>
                                    <div className="d-flex align-items-center"> {m.icon && <div className="pdp-metric__icon">{m.icon}</div>}

                                        <div className="ms-2 pdp-metric__label">{m.label}</div></div>
                                    <div> {m.render}</div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* BODY */}
            <section className="pdp-body">
                <div className="container">
                    <PdpTabs sections={tabs} />

                    <div className="row g-4 pdp-grid">
                        {/* MAIN */}
                        <div className="col-lg-8 order-2 order-lg-1">
                            {/* OVERVIEW */}
                            <section id="overview" className="pdp-section">
                                <h2 className="pdp-section__title">
                                    {program.overviewHeading ?? "Program Overview"}
                                </h2>

                                {program.overviewParagraph && (
                                    <p className="pdp-section__para">{program.overviewParagraph}</p>
                                )}

                                {overviewAccordions.length > 0 && (
                                    <div className="pdp-accordionList">
                                        {overviewAccordions.map((item) => (
                                            <details
                                                key={item.key}
                                                className={`pdp-accordion pdp-accordion--${item.variant}`}
                                                open={item.key === "eligibility"}
                                            >
                                                <summary>
                                                    <span className="pdp-accordion__left">
                                                        <span
                                                            className={`pdp-accordion__icon pdp-accordion__icon--${item.variant}`}
                                                        >
                                                            {item.icon}
                                                        </span>
                                                        <span className="pdp-accordion__title">{item.title}</span>
                                                    </span>

                                                    <span className="pdp-accordion__chev">
                                                        <i className="fa-solid fa-chevron-down" aria-hidden="true" />
                                                    </span>
                                                </summary>

                                                <div className="pdp-accordion__content">
                                                    <div
                                                        className="pdp-wysiwyg"
                                                        dangerouslySetInnerHTML={{ __html: item.html! }}
                                                    />
                                                </div>
                                            </details>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* LEARNING OUTCOMES */}
                            <section id="outcomes" className="pdp-section">
                                <h2 className="pdp-section__title">
                                    {program.learningOutcomesHeading ?? "Learning Outcomes"}
                                </h2>
                                {program.learningOutcomesParagraph && (
                                    <p className="pdp-section__para">{program.learningOutcomesParagraph}</p>
                                )}
                                <HtmlBlock
                                    html={program.learningOutcomesListHtml}
                                    className="pdp-wysiwyg pdp-checklist"
                                />
                            </section>

                            {/* PAYMENTS */}
                            <section id="payments" className="pdp-section">
                                <h2 className="pdp-section__title">Bestbootcamp Payment Advantages</h2>

                                <div className="pdp-priceCard">
                                    <div>
                                        <div className="pdp-priceCard__label">Starting price is</div>
                                        <div className="pdp-priceCard__price">{program.startingPrice ?? ""}</div>
                                    </div>
                                    <div className="pdp-priceCard__icon">
                                        <i className="fa-solid fa-dollar-sign" aria-hidden="true" />
                                    </div>
                                </div>

                                <div className="pdp-paymentsGrid">
                                    <div className="pdp-card">
                                        <div className="pdp-card__head">
                                            <span className="pdp-card__icon pdp-card__icon--orange">
                                                <i className="fa-solid fa-list-check" aria-hidden="true" />
                                            </span>
                                            <h3 className="pdp-card__title">Immersive Programming Features</h3>
                                        </div>
                                        <HtmlBlock html={program.featuresListHtml} className="pdp-wysiwyg pdp-list" />
                                    </div>

                                    <div className="pdp-paymentsStack">
                                        <div className="pdp-card">
                                            <div className="pdp-card__head">
                                                <span className="pdp-card__icon pdp-card__icon--orange">
                                                    <i className="fa-solid fa-credit-card" aria-hidden="true" />
                                                </span>
                                                <h3 className="pdp-card__title">Payment Methods</h3>
                                            </div>
                                            <HtmlBlock
                                                html={program.paymentMethodsListHtml}
                                                className="pdp-wysiwyg pdp-list"
                                            />
                                        </div>

                                        <div className="pdp-card">
                                            <div className="pdp-card__head">
                                                <span className="pdp-card__icon pdp-card__icon--green">
                                                    <i className="fa-solid fa-file-invoice-dollar" aria-hidden="true" />
                                                </span>
                                                <h3 className="pdp-card__title">Payment Plans</h3>
                                            </div>
                                            <HtmlBlock html={program.paymentPlansHtml} className="pdp-wysiwyg pdp-para" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* CAREER OUTLOOK */}
                            <section id="career" className="pdp-section">
                                <h2 className="pdp-section__title">
                                    {program.careerOutlookHeading ?? "Career Outlook"}
                                </h2>
                                {program.careerOutlookIntro && (
                                    <p className="pdp-section__para">{program.careerOutlookIntro}</p>
                                )}

                                <div className="pdp-careerGrid">
                                    {(program.careerCards ?? []).map((c, idx) => (
                                        <article key={`${c.title}-${idx}`} className="pdp-careerCard">
                                            {c.imageUrl && (
                                                <img
                                                    src={c.imageUrl}
                                                    alt={c.imageAlt ?? c.title}
                                                    className="pdp-careerCard__img"
                                                />
                                            )}

                                            <div className="pdp-careerCard__body">
                                                <h3 className="pdp-careerCard__title">{c.title}</h3>

                                                {c.salaryRange && (
                                                    <div className="pdp-careerCard__salary">
                                                        <i className="fa-solid fa-dollar-sign" aria-hidden="true" />
                                                        <span>{c.salaryRange}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </article>
                                    ))}
                                </div>

                            </section>

                            {/* SKILLS */}
                            <section className="pdp-section">
                                <h2 className="pdp-section__title">{program.skillsHeading ?? "Skills You'll Gain"}</h2>
                                <HtmlBlock html={program.skillsListHtml} className="pdp-wysiwyg pdp-skills" />
                            </section>

                            {/* CERTIFICATIONS */}
                            {(program.certificationsName ||
                                program.certificationsIntro ||
                                program.certificationsImageUrl) && (
                                    <section className="pdp-section">
                                        <h2 className="pdp-section__title">
                                            {program.certificationsHeading ?? "Certifications"}
                                        </h2>

                                        <div className="pdp-certCard">
                                            {program.certificationsImageUrl && (
                                                <img
                                                    src={program.certificationsImageUrl}
                                                    alt={
                                                        program.certificationsImageAlt ??
                                                        program.certificationsName ??
                                                        "Certification"
                                                    }
                                                    className="pdp-certCard__img"
                                                />
                                            )}

                                            <div>
                                                {program.certificationsName && (
                                                    <div className="pdp-certCard__name">
                                                        {program.certificationsName}
                                                    </div>
                                                )}

                                                {program.certificationsIntro && (
                                                    <div className="pdp-certCard__desc">
                                                        {program.certificationsIntro}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </section>
                                )}

                            {/* FAQ */}
                            <section id="faq" className="pdp-section">
                                <h2 className="pdp-section__title">
                                    {program.faqsHeading ?? "Frequently Asked Questions"}
                                </h2>

                                <div className="pdp-faqList">
                                    {program.faqs.map((f, idx) => (
                                        <details key={idx} className="pdp-faq">
                                            <summary>
                                                <span>{f.q}</span>
                                                <i className="fa-solid fa-chevron-down pdp-faq__chev" aria-hidden="true" />
                                            </summary>
                                            <div className="pdp-faq__answer">{f.a}</div>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* SIDEBAR */}
                        {/* SIDEBAR */}
                        <div className="col-lg-4 order-1 order-lg-2">
                            <aside className="pdp-sidebar">
                                <div className="pdp-enroll">
                                    {/* <div className="pdp-enroll__head">
                                        <div className="pdp-enroll__title">Enroll Today</div>
                                        <div className="pdp-enroll__subtitle">Start your career journey</div>
                                    </div> */}

                                    {/* ✅ THIS is what was missing */}
                                    <div className="pdp-enroll__body">
                                        {portalId && formId ? (
                                            <HubSpotForm
                                                portalId={portalId}
                                                formId={formId}
                                                // region={process.env.NEXT_PUBLIC_HUBSPOT_REGION ?? "na1"}
                                                region={region}
                                                portfolio={program.providerName ?? ""}
                                                learningInterest={program.title ?? ""}
                                                // if your internal names differ, update these:
                                                portfolioFieldName="portfolio"
                                                learningInterestFieldName="learning_interest"
                                                instanceId="sidebar"
                                            />
                                        ) : (
                                            <div className="pdp-enroll__placeholder">
                                                Missing env vars:{" "}
                                                <code>NEXT_PUBLIC_HUBSPOT_PORTAL_ID</code> /{" "}
                                                <code>NEXT_PUBLIC_HUBSPOT_FORM_ID</code>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </aside>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
