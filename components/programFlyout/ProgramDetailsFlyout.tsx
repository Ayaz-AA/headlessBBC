// src/components/programs/ProgramDetailsFlyout.tsx
"use client";

import { useEffect } from "react";
import type { FeaturedProgramCardVM } from "@/lib/rolePlp";

import HubSpotForm from "@/components/hubspot/HubSpotForm";
import { HUBSPOT } from "@/lib/hubspotConfig";

function HtmlBlock({ html, className }: { html?: string; className?: string }) {
    if (!html) return null;
    return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function toKicker(programTitle: string) {
    // "Medical Coding Bootcamp" -> "MEDICAL CODING BOOTCAMP"
    return (programTitle || "").trim().toUpperCase();
}

export default function ProgramDetailsFlyout({
    open,
    program,
    onClose,
}: {
    open: boolean;
    program: FeaturedProgramCardVM | null;
    onClose: () => void;
}) {
    // lock background scroll
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    // ESC closes
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open || !program) return null;

    const providerName = program.providerName ?? "Provider";
    const providerLogo = program.providerLogoUrl ?? "";
    const providerLogoAlt = program.providerLogoAlt ?? providerName;

    const kicker = program?.programTitle ? toKicker(program.programTitle) : "";

    // Intro paragraph in design:
    // prefer heroShortDescription; fallback to overviewParagraph
    const intro = program.heroShortDescription || program.overviewParagraph || "";

    const showCert =
        !!program.certificationName?.trim() ||
        !!program.certificationsIntro ||
        !!program.certificationsImageUrl;

    return (
        <div
            className="flyout-overlay"
            role="dialog"
            aria-modal="true"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="flyout-panel" onMouseDown={(e) => e.stopPropagation()}>
                {/* HEADER BAR (matches design) */}
                <div className="flyout-topbar">
                    <div className="flyout-topbar__left">
                        <div className="flyout-providerPill">
                            <div className="flyout-providerPill__logoWrap">
                                {providerLogo ? (
                                    <img
                                        src={providerLogo}
                                        alt={providerLogoAlt}
                                        className="flyout-providerPill__logo"
                                    />
                                ) : (
                                    <div className="flyout-providerPill__logoFallback" aria-hidden="true">
                                        {providerName.slice(0, 1)}
                                    </div>
                                )}
                            </div>

                            <div className="flyout-providerPill__text">
                                <div className="flyout-providerPill__name">{providerName}</div>
                                <div className="flyout-providerPill__kicker">{kicker}</div>
                            </div>
                        </div>
                    </div>

                    <button className="flyout-close" type="button" onClick={onClose} aria-label="Close">
                        <i className="fa-solid fa-xmark" aria-hidden="true" />
                    </button>
                </div>

                <div className="flyout-body">
                    <div className="flyout-grid">
                        <div className="flyout-main">
                            {/* Title + subtitle */}
                            <h2 className="flyout-title">{program.programTitle}</h2>
                            <div className="flyout-subtitleSmall">School Highlight</div>

                            {/* Pills row */}
                            <div className="flyout-pills">
                                <span className="flyout-pill flyout-pill--online">
                                    <i className="fa-solid fa-wifi" aria-hidden="true" />
                                    <span>Online</span>
                                </span>

                                {program.programLength ? (
                                    <span className="flyout-pill flyout-pill--length">
                                        <i className="fa-regular fa-clock" aria-hidden="true" />
                                        <span>{program.programLength.trim()}</span>
                                    </span>
                                ) : null}
                            </div>

                            {/* Intro paragraph */}
                            {intro ? <p className="flyout-intro">{intro}</p> : null}

                            {/* Accordions - NONE open by default */}
                            <div className="flyout-accordionList">
                                {/* ABOUT */}
                                <details className="flyout-accordion">
                                    <summary>
                                        <span>About This Program</span>
                                        <i className="fa-solid fa-chevron-down flyout-chev" aria-hidden="true" />
                                    </summary>
                                    <div className="flyout-accordion__content">
                                        {/* heading + paragraph (same typography as PDP) */}
                                        {program.overviewHeading ? (
                                            <h3 className="pdp-section__title">{program.overviewHeading}</h3>
                                        ) : null}

                                        {program.overviewParagraph ? (
                                            <p className="pdp-section__para">{program.overviewParagraph}</p>
                                        ) : null}

                                        {/* ✅ PDP-style 3 colored accordions */}
                                        {(() => {
                                            const items = [
                                                {
                                                    key: "eligibility",
                                                    title: program.overviewEligibilityTitle || "Eligibility",
                                                    html: program.overviewEligibilityHtml,
                                                    variant: "blue",
                                                    icon: <i className="fa-solid fa-graduation-cap" aria-hidden="true" />,
                                                },
                                                {
                                                    key: "resources",
                                                    title: program.overviewStudentResourcesTitle || "Student Resources",
                                                    html: program.overviewStudentResourcesHtml,
                                                    variant: "purple",
                                                    icon: <i className="fa-solid fa-book" aria-hidden="true" />,
                                                },
                                                {
                                                    key: "jobs",
                                                    title: program.overviewJobOpportunitiesTitle || "Job Opportunities",
                                                    html: program.overviewJobOpportunitiesHtml,
                                                    variant: "green",
                                                    icon: <i className="fa-solid fa-briefcase" aria-hidden="true" />,
                                                },
                                            ].filter((x) => Boolean(x.html));

                                            if (items.length === 0) return null;

                                            return (
                                                <div className="pdp-accordionList">
                                                    {items.map((item) => (
                                                        <details
                                                            key={item.key}
                                                            className={`p-0 pdp-accordion pdp-accordion--${item.variant}`}
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

                                                            <div className="px-3 pdp-accordion__content">
                                                                <div
                                                                    className="pdp-wysiwyg"
                                                                    dangerouslySetInnerHTML={{ __html: item.html as string }}
                                                                />
                                                            </div>
                                                        </details>
                                                    ))}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </details>

                                {/* OUTCOMES + PAYMENTS (combined like design) */}
                                {(
                                    program.learningOutcomesHeading ||
                                    program.learningOutcomesParagraph ||
                                    program.learningOutcomesListHtml ||
                                    program.startingPrice ||
                                    program.featuresListHtml ||
                                    program.paymentMethodsListHtml ||
                                    program.paymentPlansHtml
                                ) ? (
                                    <details className="flyout-accordion">
                                        <summary>
                                            <span>Outcomes and Payment Advantage</span>
                                            <i className="fa-solid fa-chevron-down flyout-chev" aria-hidden="true" />
                                        </summary>

                                        <div className="flyout-accordion__content">
                                            {/* ✅ Learning Outcomes */}
                                            {(program.learningOutcomesHeading ||
                                                program.learningOutcomesParagraph ||
                                                program.learningOutcomesListHtml) && (
                                                    <div className="flyout-block">
                                                        <h3 className="pdp-section__title">
                                                            {program.learningOutcomesHeading ?? "Learning Outcomes"}
                                                        </h3>

                                                        {program.learningOutcomesParagraph ? (
                                                            <p className="pdp-section__para">{program.learningOutcomesParagraph}</p>
                                                        ) : null}

                                                        <HtmlBlock
                                                            html={program.learningOutcomesListHtml}
                                                            className="pdp-wysiwyg pdp-checklist"
                                                        />
                                                    </div>
                                                )}

                                            {/* ✅ Bestbootcamp Payment Advantages */}
                                            {(program.startingPrice ||
                                                program.featuresListHtml ||
                                                program.paymentMethodsListHtml ||
                                                program.paymentPlansHtml) && (
                                                    <div className="flyout-block mt-4">
                                                        <h3 className="pdp-section__title">Bestbootcamp Payment Advantages</h3>

                                                        {/* Price Card */}
                                                        {program.startingPrice ? (
                                                            <div className="pdp-priceCard">
                                                                <div>
                                                                    <div className="pdp-priceCard__label">Starting price is</div>
                                                                    <div className="pdp-priceCard__price">{program.startingPrice}</div>
                                                                </div>
                                                                <div className="pdp-priceCard__icon">
                                                                    <i className="fa-solid fa-dollar-sign" aria-hidden="true" />
                                                                </div>
                                                            </div>
                                                        ) : null}

                                                        {/* Grid same as PDP */}
                                                        <div className="pdp-paymentsGrid mt-3">
                                                            {/* Immersive Programming Features */}
                                                            {program.featuresListHtml ? (
                                                                <div className="pdp-card">
                                                                    <div className="pdp-card__head">
                                                                        <span className="pdp-card__icon pdp-card__icon--orange">
                                                                            <i className="fa-solid fa-list-check" aria-hidden="true" />
                                                                        </span>
                                                                        <h3 className="pdp-card__title">Immersive Programming Features</h3>
                                                                    </div>
                                                                    <HtmlBlock html={program.featuresListHtml} className="pdp-wysiwyg pdp-list" />
                                                                </div>
                                                            ) : null}

                                                            <div className="pdp-paymentsStack">
                                                                {/* Payment Methods */}
                                                                {program.paymentMethodsListHtml ? (
                                                                    <div className="pdp-card">
                                                                        <div className="pdp-card__head">
                                                                            <span className="pdp-card__icon pdp-card__icon--orange">
                                                                                <i className="fa-solid fa-credit-card" aria-hidden="true" />
                                                                            </span>
                                                                            <h3 className="pdp-card__title">Payment Methods</h3>
                                                                        </div>
                                                                        <HtmlBlock html={program.paymentMethodsListHtml} className="pdp-wysiwyg pdp-list" />
                                                                    </div>
                                                                ) : null}

                                                                {/* Payment Plans */}
                                                                {program.paymentPlansHtml ? (
                                                                    <div className="pdp-card">
                                                                        <div className="pdp-card__head">
                                                                            <span className="pdp-card__icon pdp-card__icon--green">
                                                                                <i className="fa-solid fa-file-invoice-dollar" aria-hidden="true" />
                                                                            </span>
                                                                            <h3 className="pdp-card__title">Payment Plans</h3>
                                                                        </div>
                                                                        <HtmlBlock html={program.paymentPlansHtml} className="pdp-wysiwyg pdp-para" />
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    </details>
                                ) : null}

                                {/* CAREER + SKILLS (combined like design) */}
                                {(program.careerOutlookHeading ||
                                    program.careerOutlookIntro ||
                                    (program.careerCards?.length ?? 0) > 0 ||
                                    !!program.skillsListHtml) && (
                                        <details className="flyout-accordion">
                                            <summary>
                                                <span>Career Outlook and Skills you will gain</span>
                                                <i className="fa-solid fa-chevron-down flyout-chev" aria-hidden="true" />
                                            </summary>
                                            <div className="flyout-accordion__content">
                                                {program.careerOutlookHeading ? (
                                                    <h3 className="pdp-section__title">{program.careerOutlookHeading}</h3>
                                                ) : null}
                                                {program.careerOutlookIntro ? (
                                                    <p className="pdp-section__para">{program.careerOutlookIntro}</p>
                                                ) : null}

                                                {(program.careerCards ?? []).length > 0 ? (
                                                    <div className="pdp-careerGrid">
                                                        {(program.careerCards ?? []).map((c, idx) => (
                                                            <article key={`${c.title}-${idx}`} className="pdp-careerCard">
                                                                {c.imageUrl ? (
                                                                    <img
                                                                        src={c.imageUrl}
                                                                        alt={c.imageAlt ?? c.title}
                                                                        className="pdp-careerCard__img"
                                                                    />
                                                                ) : null}

                                                                <div className="pdp-careerCard__body">
                                                                    <h3 className="pdp-careerCard__title">{c.title}</h3>
                                                                    {c.salaryRange ? (
                                                                        <div className="pdp-careerCard__salary">
                                                                            <i className="fa-solid fa-dollar-sign" aria-hidden="true" />
                                                                            <span>{c.salaryRange}</span>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            </article>
                                                        ))}
                                                    </div>
                                                ) : null}

                                                {program.skillsListHtml ? (
                                                    <>
                                                        <div className="flyout-subsection__title">
                                                            {program.skillsHeading ?? "Skills You'll Gain"}
                                                        </div>
                                                        <HtmlBlock html={program.skillsListHtml} className="pdp-wysiwyg pdp-skills" />
                                                    </>
                                                ) : null}
                                            </div>
                                        </details>
                                    )}

                                {/* Certifications (only if exists) */}
                                {showCert ? (
                                    <details className="flyout-accordion">
                                        <summary>
                                            <span>{program.certificationsHeading ?? "Certifications"}</span>
                                            <i className="fa-solid fa-chevron-down flyout-chev" aria-hidden="true" />
                                        </summary>
                                        <div className="flyout-accordion__content">
                                            <div className="pdp-certCard">
                                                {program.certificationsImageUrl ? (
                                                    <img
                                                        src={program.certificationsImageUrl}
                                                        alt={program.certificationsImageAlt ?? program.certificationName ?? "Certification"}
                                                        className="pdp-certCard__img"
                                                    />
                                                ) : null}

                                                <div>
                                                    {program.certificationName ? (
                                                        <div className="pdp-certCard__name">{program.certificationName}</div>
                                                    ) : null}

                                                    {program.certificationsIntro ? (
                                                        <div className="pdp-certCard__desc">{program.certificationsIntro}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </details>
                                ) : null}

                                {/* FAQ (label like design) */}
                                {(program.faqs?.length ?? 0) > 0 ? (
                                    <details className="flyout-accordion">
                                        <summary>
                                            <span>We have got answers</span>
                                            <i className="fa-solid fa-chevron-down flyout-chev" aria-hidden="true" />
                                        </summary>
                                        <div className="flyout-accordion__content">
                                            <div className="pdp-faqList">
                                                {program.faqs.map((f, idx) => (
                                                    <details key={idx} className="pdp-faq">
                                                        <summary>
                                                            <span>{f.q}</span>
                                                            <span className="pdp-faq__chev">
                                                                <i className="fa-solid fa-chevron-down" aria-hidden="true" />
                                                            </span>
                                                        </summary>
                                                        <div className="pdp-faq__answer">{f.a}</div>
                                                    </details>
                                                ))}
                                            </div>
                                        </div>
                                    </details>
                                ) : null}
                            </div>
                        </div>

                        {/* RIGHT SIDEBAR (HubSpot form instead of placeholder) */}
                        <aside className="flyout-sidebar">
                            <div className="pdp-sidebar">
                                <div className="pdp-enroll">
                                    <div className="pdp-enroll__body">
                                        <HubSpotForm
                                            portalId={HUBSPOT.portalId}
                                            formId={HUBSPOT.formId}
                                            region={HUBSPOT.region}
                                            portfolio={program.providerName ?? ""}
                                            learningInterest={program.programTitle ?? ""}  // ✅ correct field for flyout
                                            portfolioFieldName="portfolio"
                                            learningInterestFieldName="learning_interest"
                                            instanceId="flyout" // ✅ unique id for this embed
                                        />
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}
