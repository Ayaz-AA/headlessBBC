import React from "react";

type Props = {
    data: {
        title?: string;
        descriptionHtml?: string | null;
        responsibilitiesIntro?: string | null;
        responsibilitiesListHtml?: string | null;
    };
};

export default function GuideOverview({ data }: Props) {
    // ❗ Only block if completely missing
    if (!data) return null;

    return (
        <section className="container pb-5">

            <div >


                {/* Title */}
                {data.title ? (
                    <h2 className="component-heading">
                        {data.title}
                    </h2>
                ) : null}

                {/* Description */}
                {data.descriptionHtml ? (
                    <div
                        className="regular-para mt-2"
                        dangerouslySetInnerHTML={{
                            __html: data.descriptionHtml,
                        }}
                    />
                ) : null}

                {/* Intro line */}
                {data.responsibilitiesIntro ? (
                    <p className="regular-para mt-3">
                        {data.responsibilitiesIntro}
                    </p>
                ) : null}

                {/* List */}
                {data.responsibilitiesListHtml ? (
                    <div
                        className="regular-para my-2"
                        dangerouslySetInnerHTML={{
                            __html: data.responsibilitiesListHtml,
                        }}
                    />
                ) : null}

            </div>


        </section>
    );
}