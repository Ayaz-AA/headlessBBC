import Link from "next/link";
import type { ProgramVM } from "./ProgramsPage";

export default function ProgramCard({ program }: { program: ProgramVM }) {
    // Program-specific PLP route
    const href = program.slug
        ? `/programs/${program.slug}`
        : `/programs`;

    return (
        <article className="bbc-card card h-100">
            <div className="bbc-card__media">
                {program.imageUrl ? (
                    <img
                        src={program.imageUrl}
                        alt={program.imageAlt ?? program.title}
                        className="bbc-card__img"
                    />
                ) : (
                    <div className="bbc-card__placeholder">Program</div>
                )}

                {!!program.industryNames?.length && (
                    <div className="bbc-card__badges">
                        {program.industryNames.map((name) => (
                            <span key={name} className="bbc-card__badge">
                                {name}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="card-body bbc-card__body">
                <h3 className="bbc-card__title">{program.title}</h3>

                <div className="bbc-card__meta">
                    {program.programLength && (
                        <span className="bbc-card__meta-item">
                            <i className="fa-regular fa-calendar" aria-hidden="true" />
                            <span>{program.programLength}</span>
                        </span>
                    )}

                    {program.programType && (
                        <span className="bbc-card__meta-item">
                            <i className="fa-regular fa-clock" aria-hidden="true" />
                            <span>{program.programType}</span>
                        </span>
                    )}
                </div>

                <div className="bbc-card__footer">
                    <Link
                        href={href}
                        className="btn--secondary btn  w-100"
                    >
                        <span>Learn More</span>
                        <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
