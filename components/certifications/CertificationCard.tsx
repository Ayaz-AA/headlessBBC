"use client";

import Link from "next/link";
import { pickUrlFromConnection } from "@/lib/wordpress";
import type { CertificationVM } from "@/lib/certifications";

function normalizeInternalPath(url: string) {
    let u = (url || "").trim();
    if (!u) return "";

    // Convert absolute WP URL to path
    if (/^https?:\/\//i.test(u)) {
        try {
            const parsed = new URL(u);
            u = parsed.pathname || "/";
        } catch {
            return url;
        }
    }

    if (!u.startsWith("/")) u = `/${u}`;

    // 🔥 FIX: convert /program/ to /programs/
    if (u.startsWith("/program/")) {
        u = u.replace("/program/", "/programs/");
    }

    return u;
}


export default function CertificationCard({ cert }: { cert: CertificationVM }) {
    const learnType = (cert.learnMoreType ?? "").toLowerCase();
    const isExternal = learnType === "external";

    const internal = pickUrlFromConnection(cert.linkedProgram);
    const internalHref = internal ? normalizeInternalPath(internal) : "";
    const externalHref = (cert.externalUrl ?? "").trim();

    const learnMoreHref =
        learnType === "external" ? externalHref : learnType === "internal_plp" ? internalHref : "";

    const hasMeta = !!(cert.duration || cert.cost);

    return (
        <article
            id={cert.anchorId || undefined}
            className="cert-list-card"
        >
            {/* Left logo panel */}
            <div className="cert-list-card__media">
                {cert.imageUrl ? (
                    <img
                        className="cert-list-card__logo"
                        src={cert.imageUrl}
                        alt={cert.imageAlt || cert.title}
                    />
                ) : (
                    <div className="cert-list-card__logo cert-list-card__logo--placeholder" aria-hidden="true" />
                )}
            </div>

            {/* Middle content */}
            <div className="cert-list-card__body">
                <h3 className="cert-list-card__title mb-2">{cert.title}</h3>

                {cert.excerpt && (
                    <div
                        className="regular-para"
                        dangerouslySetInnerHTML={{ __html: cert.excerpt }}
                    />
                )}

                {hasMeta && (
                    <div className="cert-list-card__meta">
                        {cert.duration && (
                            <span className="cert-list-card__metaItem">
                                <i className="fa-regular fa-clock" aria-hidden="true" />
                                <span>{cert.duration}</span>
                            </span>
                        )}
                        {cert.cost && (
                            <span className="cert-list-card__metaItem">
                                <i className="fa-solid fa-tag" aria-hidden="true" />
                                <span>{cert.cost}</span>
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Right CTA */}
            <div className="cert-list-card__cta">
                {learnMoreHref ? (
                    isExternal ? (
                        <a
                            className="plp-featuredCard__btn"
                            href={learnMoreHref}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn More <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                        </a>
                    ) : (
                        <Link className="plp-featuredCard__btn" href={learnMoreHref}>
                            Learn More <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                        </Link>
                    )
                ) : (
                    <button className="plp-featuredCard__btn" disabled>
                        Learn More <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                    </button>
                )}
            </div>

        </article>
    );
}
