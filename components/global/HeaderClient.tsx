"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import type {
    BootcampMegaMenuParentTerm,
    CertificationsMegaMenuParentTerm,
    HeaderNavItem,
} from "@/lib/wordpress";

type MobileView =
    | "main"
    | "bootcampsIndustry"
    | "certsIndustry";

type DesktopMenuKey = "bootcamps" | "certificates" | "resources" | "about" | null;

type MobileAccordionKey = "bootcamps" | "certs" | "resources" | "about" | null;

/** UI for industry cards */
const INDUSTRY_UI: Record<
    string,
    { subtitle: string; iconClass: string; iconBg: string; iconColor: string }
> = {
    it: {
        subtitle: "Tech & Software Development",
        iconClass: "fa-solid fa-code",
        iconBg: "rgba(239, 246, 255, 1)",
        iconColor: "rgba(21, 93, 252, 1)",
    },
    healthcare: {
        subtitle: "Medical & Health Services",
        iconClass: "fa-regular fa-heart",
        iconBg: "rgba(255, 241, 242, 1)",
        iconColor: "rgba(236, 0, 63, 1)",
    },
    business: {
        subtitle: "Management & Finance",
        iconClass: "fa-solid fa-briefcase",
        iconBg: "rgba(255, 251, 235, 1)",
        iconColor: "rgba(225, 113, 0, 1)",
    },
};

const DEFAULT_INDUSTRY_UI = {
    subtitle: "",
    iconClass: "fa-solid fa-building",
    iconBg: "#F3F4F6",
    iconColor: "#6B7280",
};

// Bootcamps routing helpers
const industryUrl = (industrySlug: string) => `/programs/${industrySlug}`;
const childUrl = (industrySlug: string, childSlug: string) =>
    `/programs/${industrySlug}?category=${encodeURIComponent(childSlug)}`;

// Certifications landing
const certificationsLandingUrl = "/certifications";
const certificationIndustryUrl = (industrySlug: string) =>
    `/certifications/${industrySlug}`;

const isExternalUrl = (url?: string | null) => !!url && /^https?:\/\//i.test(url);
const withHashFallback = (url?: string | null) => (url && url.trim() ? url : "#");

/** Build list items from "label/url" field pairs */
function buildPairs(
    pairs: Array<[label?: string | null, url?: string | null]>
): Array<{ label: string; url: string }> {
    return pairs
        .filter(([label]) => !!label && String(label).trim().length > 0)
        .map(([label, url]) => ({
            label: String(label),
            url: withHashFallback(url),
        }));
}

const SIMPLE_DROPDOWN_ICONS: Record<
    string,
    { iconClass: string; iconBg: string; iconColor: string }
> = {
    blog: {
        iconClass: "fa-regular fa-file-lines",
        iconBg: "rgba(239, 246, 255, 1)",
        iconColor: "rgba(21, 93, 252, 1)",
    },
    "financial-assistant": {
        iconClass: "fa-solid fa-dollar-sign",
        iconBg: "rgba(236, 253, 245, 1)",
        iconColor: "rgba(5, 150, 105, 1)",
    },
    guides: {
        iconClass: "fa-regular fa-rectangle-list",
        iconBg: "rgba(245, 243, 255, 1)",
        iconColor: "rgba(124, 58, 237, 1)",
    },

    "team-and-strategy": {
        iconClass: "fa-regular fa-user",
        iconBg: "rgba(239, 246, 255, 1)",
        iconColor: "rgba(21, 93, 252, 1)",
    },
    "editing-policy": {
        iconClass: "fa-regular fa-circle-check",
        iconBg: "rgba(255, 247, 237, 1)",
        iconColor: "rgba(234, 88, 12, 1)",
    },
    "what-we-do": {
        iconClass: "fa-regular fa-compass",
        iconBg: "rgba(236, 253, 245, 1)",
        iconColor: "rgba(5, 150, 105, 1)",
    },
};

function slugify(input?: string | null) {
    if (!input) return "";
    return String(input)
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export default function HeaderClient({
    bootcampParents,
    certificationParents,
    resourcesItems,
    aboutItems,
}: {
    bootcampParents: BootcampMegaMenuParentTerm[];
    certificationParents: CertificationsMegaMenuParentTerm[];
    resourcesItems: HeaderNavItem[];
    aboutItems: HeaderNavItem[];
}) {
    const [openDesktopMenu, setOpenDesktopMenu] = useState<DesktopMenuKey>(null);

    // Bootcamps selection
    const [activeSlug, setActiveSlug] = useState<string | null>(null);

    // Certificates selection
    const [activeCertSlug, setActiveCertSlug] = useState<string | null>(null);

    // Mobile
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileView, setMobileView] = useState<MobileView>("main");
    const [mobileAccordionOpen, setMobileAccordionOpen] = useState<MobileAccordionKey>(null);

    const [mobileActiveSlug, setMobileActiveSlug] = useState<string | null>(null);
    const [mobileActiveCertSlug, setMobileActiveCertSlug] = useState<string | null>(null);

    const desktopMenuRef = useRef<HTMLDivElement | null>(null);

    const isBootcampsOpen = openDesktopMenu === "bootcamps";
    const isCertificatesOpen = openDesktopMenu === "certificates";
    const isResourcesOpen = openDesktopMenu === "resources";
    const isAboutOpen = openDesktopMenu === "about";

    // Close desktop dropdown on outside click
    useEffect(() => {
        const handler = (e: PointerEvent) => {
            if (!openDesktopMenu) return;
            const el = desktopMenuRef.current;
            if (!el) return;

            const path = e.composedPath?.() ?? [];
            const clickedInside = path.includes(el);

            if (!clickedInside) {
                setOpenDesktopMenu(null);
                setActiveSlug(null);
                setActiveCertSlug(null);
            }
        };

        window.addEventListener("pointerdown", handler, true);
        return () => window.removeEventListener("pointerdown", handler, true);
    }, [openDesktopMenu]);

    // ESC closes everything
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Escape") return;

            setOpenDesktopMenu(null);
            setActiveSlug(null);
            setActiveCertSlug(null);

            setMobileOpen(false);
            setMobileView("main");
            setMobileAccordionOpen(null);
            setMobileActiveSlug(null);
            setMobileActiveCertSlug(null);
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const activeParent = useMemo(() => {
        if (!activeSlug) return null;
        return bootcampParents.find((p) => p.slug === activeSlug) ?? null;
    }, [bootcampParents, activeSlug]);

    const activeCertParent = useMemo(() => {
        if (!activeCertSlug) return null;
        return certificationParents.find((p) => p.slug === activeCertSlug) ?? null;
    }, [certificationParents, activeCertSlug]);

    const mobileParent = useMemo(() => {
        if (!mobileActiveSlug) return null;
        return bootcampParents.find((p) => p.slug === mobileActiveSlug) ?? null;
    }, [bootcampParents, mobileActiveSlug]);

    const mobileCertParent = useMemo(() => {
        if (!mobileActiveCertSlug) return null;
        return certificationParents.find((p) => p.slug === mobileActiveCertSlug) ?? null;
    }, [certificationParents, mobileActiveCertSlug]);

    // Bootcamps derived
    const children = activeParent?.children?.nodes ?? [];
    const extras = activeParent?.bootcampMegaMenuExtras ?? {};

    const bootcampPopularTopics = useMemo(
        () =>
            buildPairs([
                [extras.popularTopic1Label, extras.popularTopic1Url],
                [extras.popularTopic2Label, extras.popularTopic2Url],
                [extras.popularTopic3Label, extras.popularTopic3Url],
            ]),
        [extras]
    );

    const bootcampFeaturedBlogs = useMemo(() => {
        if (!activeParent) return [];
        return [
            {
                title: extras.featuredBlog1Title,
                url: withHashFallback(extras.featuredBlog1Url),
                img: extras.featuredBlog1Image?.node?.sourceUrl,
                alt: extras.featuredBlog1Image?.node?.altText ?? undefined,
            },
            {
                title: extras.featuredBlog2Title,
                url: withHashFallback(extras.featuredBlog2Url),
                img: extras.featuredBlog2Image?.node?.sourceUrl,
                alt: extras.featuredBlog2Image?.node?.altText ?? undefined,
            },
        ].filter((x) => x.title);
    }, [activeParent, extras]);

    /** Mobile Featured Blogs for Bootcamps Industry screen */
    const mobileBootcampFeaturedBlogs = useMemo(() => {
        if (!mobileParent) return [];
        const ex = mobileParent.bootcampMegaMenuExtras ?? {};
        return [
            {
                title: ex.featuredBlog1Title,
                url: withHashFallback(ex.featuredBlog1Url),
                img: ex.featuredBlog1Image?.node?.sourceUrl,
                alt: ex.featuredBlog1Image?.node?.altText ?? undefined,
            },
            {
                title: ex.featuredBlog2Title,
                url: withHashFallback(ex.featuredBlog2Url),
                img: ex.featuredBlog2Image?.node?.sourceUrl,
                alt: ex.featuredBlog2Image?.node?.altText ?? undefined,
            },
        ].filter((b) => b.title);
    }, [mobileParent]);

    // Certificates derived
    const certExtras = activeCertParent?.certificationsMegaMenu ?? null;

    const topCertifications = useMemo(() => {
        if (!certExtras) return [];
        return buildPairs([
            [certExtras.topcert1label, certExtras.topcert1url],
            [certExtras.topcert2label, certExtras.topcert2url],
            [certExtras.topcert3label, certExtras.topcert3url],
            [certExtras.topcert4label, certExtras.topcert4url],
        ]);
    }, [certExtras]);

    const certPopularTopics = useMemo(() => {
        if (!certExtras) return [];
        return buildPairs([
            [certExtras.populartopic1label, certExtras.populartopic1url],
            [certExtras.populartopic2label, certExtras.populartopic2url],
            [certExtras.populartopic3label, certExtras.populartopic3url],
            [certExtras.populartopic4label, certExtras.populartopic4url],
        ]);
    }, [certExtras]);

    const toggleDesktopMenu = (key: Exclude<DesktopMenuKey, null>) => {
        setOpenDesktopMenu((prev) => {
            const next = prev === key ? null : key;

            if (next === "bootcamps") setActiveSlug(null);
            if (next === "certificates") setActiveCertSlug(null);

            if (prev === "bootcamps" && next !== "bootcamps") setActiveSlug(null);
            if (prev === "certificates" && next !== "certificates") setActiveCertSlug(null);

            return next;
        });
    };

    const Arrow = ({ isOpen }: { isOpen: boolean }) => (
        <i className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"} ms-1`} aria-hidden="true"></i>
    );

    const SmartLink = ({
        href,
        children,
        className,
        onClick,
    }: {
        href: string;
        children: React.ReactNode;
        className?: string;
        onClick?: () => void;
    }) => {
        const safeHref = withHashFallback(href);

        if (isExternalUrl(safeHref)) {
            return (
                <a href={safeHref} className={className} target="_blank" rel="noopener noreferrer" onClick={onClick}>
                    {children}
                </a>
            );
        }
        return (
            <Link href={safeHref} className={className} onClick={onClick}>
                {children}
            </Link>
        );
    };

    /**
     * ✅ Desktop Resources/About dropdown:
     * - width exactly 256px
     * - positioned exactly under parent
     * - not constrained by container border
     */
    const renderDesktopSimpleDropdown = (items: HeaderNavItem[]) => {
        return (
            <div className="bb-simple-flyout d-none d-lg-block">
                <div className="bb-simple-flyout-panel border rounded-4 shadow-sm p-3 bg-white">
                    <div className="d-grid gap-3">
                        {(items ?? []).slice(0, 3).map((item, idx) => {
                            const title = item?.title ?? "";
                            const subtitle = item?.subtitle ?? "";
                            const href = withHashFallback(item?.url ?? "#");

                            const key = slugify(title);
                            const icon =
                                SIMPLE_DROPDOWN_ICONS[key] ?? {
                                    iconClass: "fa-regular fa-circle",
                                    iconBg: "rgba(243, 244, 246, 1)",
                                    iconColor: "rgba(107, 114, 128, 1)",
                                };

                            return (
                                <SmartLink
                                    key={idx}
                                    href={href}
                                    className="bb-simple-dropdown-item text-decoration-none"
                                    onClick={() => setOpenDesktopMenu(null)}
                                >
                                    <div className="d-flex align-items-center gap-3 py-2 rounded-3 bb-simple-dropdown-card">
                                        <div
                                            className="bb-simple-dropdown-icon"
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 12,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                background: icon.iconBg,
                                            }}
                                        >
                                            <i className={icon.iconClass} style={{ color: icon.iconColor }} />
                                        </div>

                                        <div className="flex-grow-1">
                                            <div className="fw-semibold">{title}</div>
                                            {subtitle ? <div className="bb-industry-card-subtitle">{subtitle}</div> : null}
                                        </div>
                                    </div>
                                </SmartLink>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    // Mobile open/close
    const openMobile = () => {
        setMobileOpen(true);
        setMobileView("main");
        setMobileAccordionOpen(null);
        setMobileActiveSlug(null);
        setMobileActiveCertSlug(null);
    };

    const closeMobile = () => {
        setMobileOpen(false);
        setMobileView("main");
        setMobileAccordionOpen(null);
        setMobileActiveSlug(null);
        setMobileActiveCertSlug(null);
    };

    const toggleMobileAccordion = (key: Exclude<MobileAccordionKey, null>) => {
        setMobileAccordionOpen((prev) => (prev === key ? null : key));
    };

    const openMobileIndustry = (slug: string) => {
        setMobileActiveSlug(slug);
        setMobileView("bootcampsIndustry");
    };

    const openMobileCertIndustry = (slug: string) => {
        setMobileActiveCertSlug(slug);
        setMobileView("certsIndustry");
    };

    return (
        <header className="border-bottom bg-white position-sticky top-0 bb-header position-relative bb-header-overflow">
            <div className="container py-3">
                <div className="d-flex align-items-center justify-content-between">
                    <Link href="/" className="text-decoration-none fw-bold text-dark">
                        <Image src="/assets/logo-bestbootcamps.png" alt="Best Bootcamps" width={207.92} height={48} priority />
                    </Link>

                    {/* Desktop nav + dropdowns */}
                    <div className="d-none d-lg-block" ref={desktopMenuRef}>
                        <nav className="d-lg-flex gap-4 align-items-center bb-desktop-nav">
                            <button
                                type="button"
                                className="btn btn-link text-decoration-none main-menu-items p-2"
                                onClick={() => toggleDesktopMenu("bootcamps")}
                                style={isBootcampsOpen ? { color: "var(--header-orange-dark)" } : undefined}
                            >
                                Find Bootcamps <Arrow isOpen={isBootcampsOpen} />
                            </button>

                            <button
                                type="button"
                                className="btn btn-link text-decoration-none main-menu-items p-2"
                                onClick={() => toggleDesktopMenu("certificates")}
                                style={isCertificatesOpen ? { color: "var(--header-orange-dark)" } : undefined}
                            >
                                Find Certificates <Arrow isOpen={isCertificatesOpen} />
                            </button>

                            {/* ✅ Resources anchored under its parent */}
                            <div className="bb-desktop-anchor">
                                <button
                                    type="button"
                                    className="btn btn-link text-decoration-none main-menu-items p-2"
                                    onClick={() => toggleDesktopMenu("resources")}
                                    style={isResourcesOpen ? { color: "var(--header-orange-dark)" } : undefined}
                                >
                                    Resources <Arrow isOpen={isResourcesOpen} />
                                </button>

                                {isResourcesOpen ? renderDesktopSimpleDropdown(resourcesItems) : null}
                            </div>

                            {/* ✅ About anchored under its parent */}
                            <div className="bb-desktop-anchor">
                                <button
                                    type="button"
                                    className="btn btn-link text-decoration-none main-menu-items p-2"
                                    onClick={() => toggleDesktopMenu("about")}
                                    style={isAboutOpen ? { color: "var(--header-orange-dark)" } : undefined}
                                >
                                    About Us <Arrow isOpen={isAboutOpen} />
                                </button>

                                {isAboutOpen ? renderDesktopSimpleDropdown(aboutItems) : null}
                            </div>
                        </nav>

                        {/* DESKTOP MEGA DROPDOWNS (unchanged) */}
                        {openDesktopMenu && (
                            <div>
                                {/* BOOTCAMPS */}
                                {isBootcampsOpen && (
                                    <div className="bb-mega-dropdown bb-bootcamps-dropdown d-none d-lg-block my-0">
                                        <div className="container">
                                            <div className="border rounded-4 shadow-sm p-4 bg-white">
                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                    <div className="regular-para">Explore by Category</div>
                                                    <Link href="/programs" className="btn drp-down-button" onClick={() => setOpenDesktopMenu(null)}>
                                                        View All Programs
                                                    </Link>
                                                </div>

                                                <div className="row g-3">
                                                    {bootcampParents.map((p) => {
                                                        const ui = INDUSTRY_UI[p.slug] ?? DEFAULT_INDUSTRY_UI;

                                                        return (
                                                            <div key={p.id} className="col-12 col-md-4">
                                                                <button
                                                                    type="button"
                                                                    className={`w-100 text-start p-3 rounded-3 bb-industry-card ${activeSlug === p.slug ? "bb-industry-card-active" : ""
                                                                        }`}
                                                                    onClick={() => setActiveSlug(p.slug)}
                                                                >
                                                                    <div className="d-flex flex-column gap-2">
                                                                        <div className="bb-industry-icon" style={{ background: ui.iconBg }}>
                                                                            <i className={ui.iconClass} style={{ color: ui.iconColor }} />
                                                                        </div>
                                                                        <div className="bb-industry-card-title">{p.name}</div>
                                                                        {ui.subtitle ? <div className="bb-industry-card-subtitle">{ui.subtitle}</div> : null}
                                                                    </div>
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {activeParent && (
                                                    <div className="row g-4 mt-3">
                                                        <div className="col-12 col-lg-4">
                                                            <div className="dropdown-headings mb-2 d-flex align-items-center gap-2">
                                                                <i className="fa-solid fa-book-open"></i>
                                                                <span>Popular Programs</span>
                                                            </div>
                                                            <div className="list-group">
                                                                {children.map((c) => (
                                                                    <Link
                                                                        key={c.id}
                                                                        href={childUrl(activeParent.slug, c.slug)}
                                                                        className="list-group-item list-group-item-action"
                                                                        onClick={() => setOpenDesktopMenu(null)}
                                                                    >
                                                                        {c.name}
                                                                    </Link>
                                                                ))}
                                                            </div>

                                                            <div className="mt-3">
                                                                <Link
                                                                    href={industryUrl(activeParent.slug)}
                                                                    className="btn drp-down-button w-100"
                                                                    onClick={() => setOpenDesktopMenu(null)}
                                                                >
                                                                    All {activeParent.name} Programs
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-lg-4">
                                                            <div className="dropdown-headings mb-2 d-flex align-items-center gap-2">
                                                                <i className="fas fa-lightbulb"></i>
                                                                <span>Popular Topics</span>
                                                            </div>
                                                            <div className="list-group">
                                                                {bootcampPopularTopics.map((t, idx) =>
                                                                    t.url !== "#" ? (
                                                                        <Link
                                                                            key={idx}
                                                                            href={t.url}
                                                                            className="list-group-item list-group-item-action"
                                                                            onClick={() => setOpenDesktopMenu(null)}
                                                                        >
                                                                            {t.label}
                                                                        </Link>
                                                                    ) : (
                                                                        <div key={idx} className="list-group-item">
                                                                            {t.label}
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                            <Link
                                                                href="/topics"
                                                                className="btn w-100 mt-3 view-all-topics-button"
                                                                onClick={() => setOpenDesktopMenu(null)}
                                                            >
                                                                View All
                                                            </Link>
                                                        </div>

                                                        <div className="col-12 col-lg-4">
                                                            <div className="dropdown-headings mb-2 d-flex align-items-center gap-2">
                                                                <i className="fas fa-file-alt"></i>
                                                                <span>Featured Blog</span>
                                                            </div>
                                                            <div className="row g-3">
                                                                {bootcampFeaturedBlogs.map((b, idx) => (
                                                                    <div key={idx} className="col-12">
                                                                        <div className="bb-featured-blog-card">
                                                                            {b.img && (
                                                                                <div className="bb-featured-blog-image-wrapper">
                                                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                                    <img
                                                                                        src={b.img}
                                                                                        alt={b.alt || b.title || "Featured blog"}
                                                                                        className="bb-featured-blog-image"
                                                                                    />
                                                                                    {b.title && (
                                                                                        <div className="bb-featured-blog-overlay">
                                                                                            <div className="bb-featured-blog-title">{b.title}</div>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                            <SmartLink
                                                                                href={b.url}
                                                                                className="bb-featured-blog-readmore"
                                                                                onClick={() => setOpenDesktopMenu(null)}
                                                                            >
                                                                                Read More
                                                                            </SmartLink>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CERTIFICATES */}
                                {isCertificatesOpen && (
                                    <div className="bb-mega-dropdown bb-certificates-dropdown d-none d-lg-block my-0">
                                        <div className="container">
                                            <div className="border rounded-4 shadow-sm p-4 bg-white">
                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                    <div className="regular-para">Explore by Category</div>
                                                    <Link
                                                        href={certificationsLandingUrl}
                                                        className="btn drp-down-button "
                                                        onClick={() => setOpenDesktopMenu(null)}
                                                    >
                                                        View All Certifications
                                                    </Link>
                                                </div>

                                                <div className="row g-3">
                                                    {certificationParents.map((p) => {
                                                        const ui = INDUSTRY_UI[p.slug] ?? DEFAULT_INDUSTRY_UI;

                                                        return (
                                                            <div key={p.id} className="col-12 col-md-6">
                                                                <button
                                                                    type="button"
                                                                    className={`w-100 text-start p-3 rounded-3 bb-industry-card ${activeCertSlug === p.slug ? "bb-industry-card-active" : ""
                                                                        }`}
                                                                    onClick={() => setActiveCertSlug(p.slug)}
                                                                >
                                                                    <div className="d-flex flex-column gap-2">
                                                                        <div className="bb-industry-icon" style={{ background: ui.iconBg }}>
                                                                            <i className={ui.iconClass} style={{ color: ui.iconColor }} />
                                                                        </div>
                                                                        <div className="bb-industry-card-title">{p.name}</div>
                                                                        {ui.subtitle ? <div className="bb-industry-card-subtitle">{ui.subtitle}</div> : null}
                                                                    </div>
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {activeCertParent ? (
                                                    <div className="row g-4 mt-3">
                                                        <div className="col-12 col-lg-6">
                                                            <div className="dropdown-headings mb-2 d-flex align-items-center gap-2">
                                                                <i className="fas fa-certificate"></i>
                                                                <span>Top Certifications</span>
                                                            </div>
                                                            <div className="list-group">
                                                                {topCertifications.map((c, idx) =>
                                                                    c.url !== "#" ? (
                                                                        <SmartLink
                                                                            key={idx}
                                                                            href={c.url}
                                                                            className="list-group-item list-group-item-action"
                                                                            onClick={() => setOpenDesktopMenu(null)}
                                                                        >
                                                                            {c.label}
                                                                        </SmartLink>
                                                                    ) : (
                                                                        <div key={idx} className="list-group-item">
                                                                            {c.label} <span className="text-muted">(add URL)</span>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                            <div className="mt-3">
                                                                <Link
                                                                    href={certificationIndustryUrl(activeCertParent.slug)}
                                                                    className="btn drp-down-button w-100"
                                                                    onClick={() => setOpenDesktopMenu(null)}
                                                                >
                                                                    All {activeCertParent.name} Certifications
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-lg-6">
                                                            <div className="dropdown-headings mb-2 d-flex align-items-center gap-2">
                                                                <i className="fas fa-lightbulb"></i>
                                                                <span>Popular Topics</span>
                                                            </div>
                                                            <div className="list-group">
                                                                {certPopularTopics.map((t, idx) =>
                                                                    t.url !== "#" ? (
                                                                        <SmartLink
                                                                            key={idx}
                                                                            href={t.url}
                                                                            className="list-group-item list-group-item-action"
                                                                            onClick={() => setOpenDesktopMenu(null)}
                                                                        >
                                                                            {t.label}
                                                                        </SmartLink>
                                                                    ) : (
                                                                        <div key={idx} className="list-group-item">
                                                                            {t.label} <span className="text-muted">(add URL)</span>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                            <Link
                                                                href="/topics"
                                                                className="btn w-100 mt-3  view-all-topics-button"
                                                                onClick={() => setOpenDesktopMenu(null)}
                                                            >
                                                                View All
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Desktop CTA */}
                    <div className="d-none d-lg-block">
                        <Link href="/career-assessment" className="btn btn--primary py-2 px-4">
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="btn btn-outline-secondary d-lg-none"
                        onClick={openMobile}
                        aria-label="Open menu"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* MOBILE MENU (redesigned to match screenshot) */}
            {mobileOpen && (
                <div className="bbm-overlay" role="dialog" aria-modal="true">
                    <div className="bbm-panel">
                        {/* Top bar */}
                        <div className="bbm-top">
                            <div className="bbm-brand">
                                <Image
                                    src="/assets/logo-bestbootcamps.png"
                                    alt="Best Bootcamps"
                                    width={150}
                                    height={35}
                                    priority
                                />
                            </div>
                            <button className="bbm-close" onClick={closeMobile} aria-label="Close menu">
                                ×
                            </button>
                        </div>

                        {/* CONTENT */}
                        <div className="bbm-body">
                            {/* MAIN (Accordion) */}
                            {mobileView === "main" && (
                                <>
                                    {/* Find Bootcamps */}
                                    <button
                                        type="button"
                                        className="bbm-acc-btn"
                                        onClick={() => toggleMobileAccordion("bootcamps")}
                                    >
                                        <span>Find Bootcamps</span>
                                        <i
                                            className={`fa-solid fa-chevron-down bbm-chevron ${mobileAccordionOpen === "bootcamps" ? "is-open" : ""
                                                }`}
                                        />
                                    </button>

                                    {mobileAccordionOpen === "bootcamps" && (
                                        <div className="bbm-acc-panel">


                                            <div className="bbm-card-list">
                                                {bootcampParents.map((p) => {
                                                    const ui = INDUSTRY_UI[p.slug] ?? DEFAULT_INDUSTRY_UI;
                                                    return (
                                                        <button
                                                            key={p.id}
                                                            type="button"
                                                            className="bbm-industry-card"
                                                            onClick={() => openMobileIndustry(p.slug)}
                                                        >
                                                            <span className="bbm-industry-icon" style={{ background: ui.iconBg }}>
                                                                <i className={ui.iconClass} style={{ color: ui.iconColor }} />
                                                            </span>
                                                            <span className="bbm-industry-text">
                                                                <span className="bbm-industry-name">{p.name}</span>
                                                                <span className="bbm-industry-sub">{ui.subtitle || ""}</span>
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <Link href="/programs" className="mt-2 btn drp-down-button w-100" onClick={closeMobile}>
                                                View All Programs
                                            </Link>
                                        </div>
                                    )}

                                    {/* Certifications */}
                                    <button
                                        type="button"
                                        className="bbm-acc-btn"
                                        onClick={() => toggleMobileAccordion("certs")}
                                    >
                                        <span>Certifications</span>
                                        <i
                                            className={`fa-solid fa-chevron-down bbm-chevron ${mobileAccordionOpen === "certs" ? "is-open" : ""
                                                }`}
                                        />
                                    </button>

                                    {mobileAccordionOpen === "certs" && (
                                        <div className="bbm-acc-panel">


                                            <div className="bbm-card-list">
                                                {certificationParents.map((p) => {
                                                    const ui = INDUSTRY_UI[p.slug] ?? DEFAULT_INDUSTRY_UI;
                                                    return (
                                                        <button
                                                            key={p.id}
                                                            type="button"
                                                            className="bbm-industry-card"
                                                            onClick={() => openMobileCertIndustry(p.slug)}
                                                        >
                                                            <span className="bbm-industry-icon" style={{ background: ui.iconBg }}>
                                                                <i className={ui.iconClass} style={{ color: ui.iconColor }} />
                                                            </span>
                                                            <span className="bbm-industry-text">
                                                                <span className="bbm-industry-name">{p.name}</span>
                                                                <span className="bbm-industry-sub">{ui.subtitle || ""}</span>
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <Link href={certificationsLandingUrl} className="btn drp-down-button w-100 mt-2" onClick={closeMobile}>
                                                View All Certifications
                                            </Link>
                                        </div>
                                    )}

                                    {/* Resources */}
                                    <button
                                        type="button"
                                        className="bbm-acc-btn"
                                        onClick={() => toggleMobileAccordion("resources")}
                                    >
                                        <span>Resources</span>
                                        <i
                                            className={`fa-solid fa-chevron-down bbm-chevron ${mobileAccordionOpen === "resources" ? "is-open" : ""
                                                }`}
                                        />
                                    </button>

                                    {mobileAccordionOpen === "resources" && (
                                        <div className="bbm-acc-panel">
                                            <div className="bbm-link-list">
                                                {(resourcesItems ?? []).slice(0, 3).map((it, idx) => {
                                                    const key = slugify(it?.title ?? "");
                                                    const icon =
                                                        SIMPLE_DROPDOWN_ICONS[key] ?? {
                                                            iconClass: "fa-regular fa-circle",
                                                            iconBg: "rgba(243, 244, 246, 1)",
                                                            iconColor: "rgba(107, 114, 128, 1)",
                                                        };

                                                    return (
                                                        <SmartLink
                                                            key={idx}
                                                            href={withHashFallback(it.url)}
                                                            className="bbm-link-row"
                                                            onClick={closeMobile}
                                                        >
                                                            <span className="bbm-link-ic" style={{ background: icon.iconBg }}>
                                                                <i className={icon.iconClass} style={{ color: icon.iconColor }} />
                                                            </span>
                                                            <span className="bbm-link-txt">
                                                                <span className="bbm-link-title">{it.title ?? "Untitled"}</span>
                                                                {it.subtitle ? <span className="bbm-link-sub">{it.subtitle}</span> : null}
                                                            </span>
                                                        </SmartLink>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* About Us */}
                                    <button
                                        type="button"
                                        className="bbm-acc-btn"
                                        onClick={() => toggleMobileAccordion("about")}
                                    >
                                        <span>About Us</span>
                                        <i
                                            className={`fa-solid fa-chevron-down bbm-chevron ${mobileAccordionOpen === "about" ? "is-open" : ""
                                                }`}
                                        />
                                    </button>

                                    {mobileAccordionOpen === "about" && (
                                        <div className="bbm-acc-panel">
                                            <div className="bbm-link-list">
                                                {(aboutItems ?? []).slice(0, 3).map((it, idx) => {
                                                    const key = slugify(it?.title ?? "");
                                                    const icon =
                                                        SIMPLE_DROPDOWN_ICONS[key] ?? {
                                                            iconClass: "fa-regular fa-circle",
                                                            iconBg: "rgba(243, 244, 246, 1)",
                                                            iconColor: "rgba(107, 114, 128, 1)",
                                                        };

                                                    return (
                                                        <SmartLink
                                                            key={idx}
                                                            href={withHashFallback(it.url)}
                                                            className="bbm-link-row"
                                                            onClick={closeMobile}
                                                        >
                                                            <span className="bbm-link-ic" style={{ background: icon.iconBg }}>
                                                                <i className={icon.iconClass} style={{ color: icon.iconColor }} />
                                                            </span>
                                                            <span className="bbm-link-txt">
                                                                <span className="bbm-link-title">{it.title ?? "Untitled"}</span>
                                                                {it.subtitle ? <span className="bbm-link-sub">{it.subtitle}</span> : null}
                                                            </span>
                                                        </SmartLink>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <Link href="/career-assessment" className="btn btn--primary w-100" onClick={closeMobile}>
                                        Get Started
                                    </Link>
                                </>
                            )}

                            {/* BOOTCAMPS INDUSTRY VIEW */}
                            {mobileView === "bootcampsIndustry" && mobileParent && (
                                <>
                                    <div className="bbm-subtop">
                                        <button
                                            className="bbm-subheadings"
                                            onClick={() => {
                                                setMobileView("main");
                                                setMobileActiveSlug(null);
                                                setMobileAccordionOpen("bootcamps");
                                            }}
                                            type="button"
                                        >
                                            <i className="fa-solid fa-chevron-left me-2"></i> Back to categories
                                        </button>

                                    </div>

                                    <div className="bbm-page-title">{mobileParent.name}</div>

                                    <div className="bbm-block">
                                        <div className="bbm-subheadings mb-2"><i className="fa-solid fa-book-open me-2"></i> Popular Programs</div>
                                        <div className="bbm-list">
                                            {(mobileParent.children?.nodes ?? []).map((c) => (
                                                <Link
                                                    key={c.id}
                                                    href={childUrl(mobileParent.slug, c.slug)}
                                                    className="bbm-list-item"
                                                    onClick={closeMobile}
                                                >
                                                    {c.name}
                                                </Link>
                                            ))}
                                        </div>

                                        <Link
                                            href={industryUrl(mobileParent.slug)}
                                            className="btn drp-down-button w-100 "
                                            onClick={closeMobile}
                                        >
                                            All {mobileParent.name} Programs
                                        </Link>
                                    </div>

                                    <div className="bbm-block">
                                        <div className="bbm-subheadings mb-2"> <i className="fas fa-lightbulb me-2"></i> Popular Topics</div>
                                        <div className="bbm-list">
                                            {buildPairs([
                                                [
                                                    mobileParent.bootcampMegaMenuExtras?.popularTopic1Label,
                                                    mobileParent.bootcampMegaMenuExtras?.popularTopic1Url,
                                                ],
                                                [
                                                    mobileParent.bootcampMegaMenuExtras?.popularTopic2Label,
                                                    mobileParent.bootcampMegaMenuExtras?.popularTopic2Url,
                                                ],
                                                [
                                                    mobileParent.bootcampMegaMenuExtras?.popularTopic3Label,
                                                    mobileParent.bootcampMegaMenuExtras?.popularTopic3Url,
                                                ],
                                            ]).map((t, idx) =>
                                                t.url !== "#" ? (
                                                    <Link key={idx} href={t.url} className="bbm-list-item" onClick={closeMobile}>
                                                        {t.label}
                                                    </Link>
                                                ) : (
                                                    <div key={idx} className="bbm-list-item bbm-list-item-disabled">
                                                        {t.label}
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <Link href="/topics" className="btn drp-down-button w-100" onClick={closeMobile}>
                                            View All
                                        </Link>
                                    </div>

                                    <div className="bbm-block">
                                        <div className="bbm-subheadings mb-2"><i className="fas fa-file-alt me-2"></i> Featured Blog</div>

                                        <div className="bbm-blog-grid">
                                            {mobileBootcampFeaturedBlogs.map((b, idx) => (
                                                <SmartLink key={idx} href={b.url} className="bbm-blog-card" onClick={closeMobile}>
                                                    {b.img ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img
                                                            src={b.img}
                                                            alt={b.alt || b.title || "Featured blog"}
                                                            className="bbm-blog-img"
                                                        />
                                                    ) : null}
                                                    <div className="bbm-blog-title">{b.title}</div>
                                                </SmartLink>
                                            ))}
                                        </div>
                                    </div>

                                    <Link href="/career-assessment" className="btn btn--primary w-100" onClick={closeMobile}>
                                        Get Started
                                    </Link>
                                </>
                            )}

                            {/* CERTS INDUSTRY VIEW */}
                            {mobileView === "certsIndustry" && mobileCertParent && (
                                <>
                                    <div className="bbm-subtop">
                                        <button
                                            className="bbm-back"
                                            onClick={() => {
                                                setMobileView("main");
                                                setMobileActiveCertSlug(null);
                                                setMobileAccordionOpen("certs");
                                            }}
                                            type="button"
                                        >
                                            ← Back to categories
                                        </button>
                                        <button className="bbm-close" onClick={closeMobile} aria-label="Close menu">
                                            ×
                                        </button>
                                    </div>

                                    <div className="bbm-page-title">{mobileCertParent.name}</div>

                                    <div className="bbm-block">
                                        <div className="bbm-subheadings mb-2"><i className="fas fa-certificate me-2"></i> Top Certifications</div>
                                        <div className="bbm-list">
                                            {buildPairs([
                                                [mobileCertParent.certificationsMegaMenu?.topcert1label, mobileCertParent.certificationsMegaMenu?.topcert1url],
                                                [mobileCertParent.certificationsMegaMenu?.topcert2label, mobileCertParent.certificationsMegaMenu?.topcert2url],
                                                [mobileCertParent.certificationsMegaMenu?.topcert3label, mobileCertParent.certificationsMegaMenu?.topcert3url],
                                                [mobileCertParent.certificationsMegaMenu?.topcert4label, mobileCertParent.certificationsMegaMenu?.topcert4url],
                                            ]).map((c, idx) =>
                                                c.url !== "#" ? (
                                                    <SmartLink key={idx} href={c.url} className="bbm-list-item" onClick={closeMobile}>
                                                        {c.label}
                                                    </SmartLink>
                                                ) : (
                                                    <div key={idx} className="bbm-list-item bbm-list-item-disabled">
                                                        {c.label}
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <Link
                                            href={certificationIndustryUrl(mobileCertParent.slug)}
                                            className="btn drp-down-button w-100 "
                                            onClick={closeMobile}
                                        >
                                            All {mobileCertParent.name} Certifications
                                        </Link>
                                    </div>

                                    <div className="bbm-block">
                                        <div className="bbm-subheadings mb-2"> <i className="fas fa-lightbulb me-2"></i> Popular Topics</div>
                                        <div className="bbm-list">
                                            {buildPairs([
                                                [mobileCertParent.certificationsMegaMenu?.populartopic1label, mobileCertParent.certificationsMegaMenu?.populartopic1url],
                                                [mobileCertParent.certificationsMegaMenu?.populartopic2label, mobileCertParent.certificationsMegaMenu?.populartopic2url],
                                                [mobileCertParent.certificationsMegaMenu?.populartopic3label, mobileCertParent.certificationsMegaMenu?.populartopic3url],
                                                [mobileCertParent.certificationsMegaMenu?.populartopic4label, mobileCertParent.certificationsMegaMenu?.populartopic4url],
                                            ]).map((t, idx) =>
                                                t.url !== "#" ? (
                                                    <SmartLink key={idx} href={t.url} className="bbm-list-item" onClick={closeMobile}>
                                                        {t.label}
                                                    </SmartLink>
                                                ) : (
                                                    <div key={idx} className="bbm-list-item bbm-list-item-disabled">
                                                        {t.label}
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <Link href="/topics" className="btn drp-down-button w-100 " onClick={closeMobile}>
                                            View All
                                        </Link>
                                    </div>

                                    <Link href="/career-assessment" className="btn btn--primary w-100" onClick={closeMobile}>
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
