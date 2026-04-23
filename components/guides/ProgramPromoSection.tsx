"use client";

import { programPromoData } from "@/lib/guidePromoData";

export default function ProgramPromoSection({ data }: any) {
    if (!data) return null;

    const config = programPromoData[data.industry || ""];
    if (!config) return null;

    return (
        <section className="container my-5 text-center">

            {/* SECTION TITLE */}
            {data.heading && (
                <h2 className="component-heading mb-4">
                    {data.heading}
                </h2>
            )}

            {/* CARD */}
            <div className="promo-card mx-auto d-flex flex-column flex-md-row">

                {/* LEFT */}
                <div className="promo-left">
                    <div
                        className="promo-bg"
                        style={{ backgroundImage: `url(${config.bg})` }}
                    >
                        <div className="promo-logo">
                            <img src={config.logo} alt={config.title} />
                            <a href={config.link} target="_blank" className="promo-view-btn">
                                View Site →
                            </a>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="promo-right d-flex flex-column justify-content-center text-center">

                    <h3 className="promo-title">{config.title}</h3>

                    <div
                        className="regular-para promo-desc"
                        dangerouslySetInnerHTML={{ __html: data.description || "" }}
                    />

                    <a href={config.link} target="_blank" className="promo-learn-btn">
                        Learn More →
                    </a>
                </div>
            </div>
        </section>
    );
}