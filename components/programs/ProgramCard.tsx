import Link from "next/link";
import type { ProgramVM } from "./ProgramsPage";

export default function ProgramCard({ program }: { program: ProgramVM }) {
    return (
        <article className="program-card card h-100">
            <div className="program-card__media">
                {program.imageUrl ? (
                    <img
                        src={program.imageUrl}
                        alt={program.imageAlt ?? program.title}
                        className="program-card__img"
                    />
                ) : (
                    <div className="program-card__placeholder">Program</div>
                )}

                {!!program.industryNames?.length && (
                    <div className="program-card__badges">
                        {program.industryNames.map((n) => (
                            <span key={n} className="program-card__badge">
                                {n}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="card-body program-card__body">
                <h3 className="program-card__title">{program.title}</h3>

                <div className="program-card__meta">
                    {program.programLength && (
                        <span className="program-card__meta-item">
                            <i className="fa-regular fa-calendar" aria-hidden="true" />
                            <span>{program.programLength}</span>
                        </span>
                    )}
                    {program.programType && (
                        <span className="program-card__meta-item">
                            <i className="fa-regular fa-clock" aria-hidden="true" />
                            <span>{program.programType}</span>
                        </span>
                    )}
                </div>

                <div className="program-card__footer">
                    <button
                        className="program-card__btn btn btn-outline-primary w-100"
                        type="button"
                        onClick={() => alert("Detail page coming soon")}
                    >
                        <span>Learn More</span>
                        <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </article>
    );
}
