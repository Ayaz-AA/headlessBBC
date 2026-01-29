// src/components/programs/FeaturedProgramCard.tsx
"use client";

import type { FeaturedProgramCardVM } from "@/lib/rolePlp";

export default function FeaturedProgramCard({
    kicker,
    program,
    onLearnMore,
}: {
    kicker: string;
    program: FeaturedProgramCardVM;
    onLearnMore: (program: FeaturedProgramCardVM) => void;
}) {
    const title = program.providerName ?? program.programTitle;
    const hasCert = !!program.certificationName?.trim();

    return (
        <div className="plp-featuredCard">
            {/* LEFT */}
            <div className="plp-featuredCard__left">
                {kicker ? <div className="plp-featuredCard__kicker">{kicker}</div> : null}

                <h3 className="plp-featuredCard__title">{title}</h3>

                {program.heroShortDescription ? (
                    <p className="plp-featuredCard__desc">{program.heroShortDescription}</p>
                ) : null}

                {/* ✅ show ONLY if certification exists */}
                {hasCert ? (
                    <div className="plp-featuredCard__certPill">
                        <span className="plp-featuredCard__certIcon" aria-hidden="true">
                            <i className="fa-solid fa-certificate" />
                        </span>

                        <span className="plp-featuredCard__certText">
                            <span className="plp-featuredCard__certLabel">Certificate</span>
                            <span className="plp-featuredCard__certName">{program.certificationName}</span>
                        </span>
                    </div>
                ) : null}

                {/* meta chips */}
                <div className="plp-featuredCard__chips">
                    {program.programType ? (
                        <div className="plp-featuredCard__chip">
                            <span className="plp-featuredCard__chipIcon" aria-hidden="true">
                                <i className="fa-solid fa-globe" />
                            </span>
                            <span>
                                <span className="plp-featuredCard__chipLabel">Program</span>
                                <span className="plp-featuredCard__chipValue">{program.programType}</span>
                            </span>
                        </div>
                    ) : null}

                    {program.programLength ? (
                        <div className="plp-featuredCard__chip">
                            <span className="plp-featuredCard__chipIcon plp-featuredCard__chipIcon--purple" aria-hidden="true">
                                <i className="fa-regular fa-clock" />
                            </span>
                            <span>
                                <span className="plp-featuredCard__chipLabel">Duration</span>
                                <span className="plp-featuredCard__chipValue">{program.programLength}</span>
                            </span>
                        </div>
                    ) : null}
                </div>

                {/* ✅ NO URL change */}
                <button
                    type="button"
                    className="plp-featuredCard__btn"
                    onClick={() => onLearnMore(program)}
                >
                    Learn More <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </button>
            </div>

            {/* RIGHT (provider logo tile) */}
            <div className="plp-featuredCard__right">
                <div className="plp-featuredCard__logoBox">
                    {program.providerLogoUrl ? (
                        <img
                            className="plp-featuredCard__logo"
                            src={program.providerLogoUrl}
                            alt={program.providerLogoAlt || program.providerName || "Provider logo"}
                            loading="lazy"
                        />
                    ) : (
                        <div className="plp-featuredCard__logoFallback">{program.providerName ?? "Provider"}</div>
                    )}
                </div>
            </div>
        </div>
    );
}
