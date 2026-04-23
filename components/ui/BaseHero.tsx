
"use client";


type LayoutType = "6-6" | "8-4" | "7-5" | "6-5-offset-1" | "7-4-offset-1";

interface BaseHeroProps {
    label?: string;
    titleLine1?: string;
    titleLine2?: string;
    subtitle?: string;
    intro?: string;
    imageUrl?: string;
    imageAlt?: string;
    layout?: LayoutType;
    actions?: React.ReactNode;
    children?: React.ReactNode;
    className?: string; // extra custom classes if needed
}

export default function BaseHero({
    label,
    titleLine1,
    titleLine2,
    subtitle,
    intro,
    imageUrl,
    imageAlt,
    layout = "6-6",
    actions,
    children,
    className,
}: BaseHeroProps) {
    const layoutMap = {
        "6-6": {
            content: "col-lg-6",
            image: "col-lg-6",
        },
        "8-4": {
            content: "col-lg-8",
            image: "col-lg-4",
        },
        "7-5": {
            content: "col-lg-7",
            image: "col-lg-5",
        },
        "6-5-offset-1": {
            content: "col-lg-6",
            image: "col-lg-5 offset-lg-1",
        },
        "7-4-offset-1": {
            content: "col-lg-7 col-12",
            image: "col-lg-4 offset-lg-1 col-12",
        },
    };

    const cols = layoutMap[layout];

    return (
        <section className={`team-hero hero-bg py-5 ${className || ""}`}>
            <div className="container d-flex flex-lg-row flex-column gap-4 align-items-center">
                {/* LEFT */}
                <div className={cols.content}>
                    {label && (
                        <div className="  badge d-inline-flex align-items-center mb-3">
                            <div className="me-2">
                                <img src="/assets/Icon-badge.png" alt="icon" />
                            </div>
                            <span>{label}</span>
                        </div>
                    )}

                    <h1 className="hero__titles">
                        {titleLine1 && (
                            <div className="hero__title-line1">{titleLine1}</div>
                        )}
                        {titleLine2 && (
                            <span className="hero__title-line2">{titleLine2}</span>
                        )}
                    </h1>

                    {subtitle && (
                        <div className="hero__subtitle pb-3">{subtitle}</div>
                    )}

                    {intro && <p className="hero__intro">{intro}</p>}

                    {actions && (
                        <div className="d-flex flex-column flex-md-row gap-3 mt-4 align-items-start align-items-md-center">
                            {actions}
                        </div>
                    )}
                    {children && <div className="mt-4">{children}</div>}
                </div>

                {/* RIGHT */}
                {imageUrl && (
                    <div className={`${cols.image} d-flex justify-content-center justify-content-lg-end`}>
                        <img
                            src={imageUrl}
                            alt={imageAlt || ""}
                            className="img-fluid"
                            loading="lazy"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}