import Link from "next/link";

type MatchMeCtaProps = {
    title: string;
    description?: string;
    ctaLabel: string;
    ctaHref: string;
    imageSrc?: string;
    imageAlt?: string;
    className?: string;
};

export default function MatchMeCta({
    title,
    description,
    ctaLabel,
    ctaHref,
    imageSrc,
    imageAlt = "",
    className = "",
}: MatchMeCtaProps) {
    if (!title || !ctaHref) return null;

    return (
        <section className={`bb-match-cta py-4 py-md-5 ${className}`}>
            <div className="container">
                <div className="bb-match-cta__card rounded-4 shadow p-4 p-md-5">
                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-4">
                        {/* Left */}
                        <div className="bb-match-cta__content">
                            <h2 className="bb-match-cta__title text-white fw-bold mb-2">
                                {title}
                            </h2>

                            {description && (
                                <p className="bb-match-cta__desc text-white w-75 py-3 mb-3">
                                    {description}
                                </p>
                            )}

                            <Link href={ctaHref} className=" find-bootcamp-cta  d-flex align-items-center px-3 py-2">
                                <i className="fa-solid fa-graduation-cap me-2"></i>  {ctaLabel} <span aria-hidden="true"></span><i className="ms-2 fa-solid fa-chevron-right"></i>
                            </Link>
                        </div>

                        {/* Right */}
                        {imageSrc && (
                            <div className="bb-match-cta__media d-flex justify-content-md-end w-100">
                                <div className="bb-match-cta__ring">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={imageSrc}
                                        alt={imageAlt}
                                        className="bb-match-cta__img"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
