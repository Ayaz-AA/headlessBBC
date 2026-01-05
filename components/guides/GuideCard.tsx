import Link from "next/link";
import type { GuideVM } from "./GuidesPage";

export default function GuideCard({ guide }: { guide: GuideVM }) {
    const badge = guide.industryNames?.[0] ?? "";

    return (
        <article className="guide-card">
            <div className="guide-card__media">
                {guide.imageUrl ? (
                    <img
                        src={guide.imageUrl}
                        alt={guide.imageAlt ?? guide.title}
                        className="guide-card__img"
                    />
                ) : (
                    <div className="guide-card__placeholder">Guide</div>
                )}

                {!!badge && <span className="guide-card__badge">{badge}</span>}
            </div>

            <div className="guide-card__body">
                <h3 className="guide-card__title">{guide.title}</h3>

                {guide.excerpt && <p className="guide-card__excerpt">{guide.excerpt}</p>}

                <Link className="guide-card__link" href={`/guides/${guide.slug}`}>
                    <span>Learn More</span>
                    <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </Link>
            </div>
        </article>
    );
}
