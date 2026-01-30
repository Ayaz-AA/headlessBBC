// components/team/TeamCard.tsx
import React from "react";
import type { TeamMemberViewModel } from "./TeamGrid";

export default function TeamCard({
    name,
    roleText,
    photoUrl,
    photoAlt,
    roleImageUrl,
    roleImageAlt, linkedinUrl,

}: TeamMemberViewModel) {
    return (

        <article className="team-card d-flex flex-column align-items-center text-center">
            {/* Image wrapper */}
            <div className="team-card__image-wrapper">
                {photoUrl && (
                    <img
                        src={photoUrl}
                        alt={photoAlt || name}
                        className="team-card__image"
                    />
                )}

                {/* Small round social badge */}

            </div>

            {/* Text area */}
            <div className="team-card__body d-flex flex-column align-items-center text-center">
                <h3 className="team-card__name mb-1">{name}</h3>

                {roleText && <p className="team-card__role mb-0">{roleText}</p>}

                {/* Company/brand logo below */}
                {roleImageUrl && (
                    <div className="team-card__company mt-2">
                        <img
                            src={roleImageUrl}
                            alt={roleImageAlt || ""}
                            className="team-card__company-logo"
                        />
                    </div>
                )}
                {linkedinUrl && (
                    <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="team-card__social-badge d-flex align-items-center justify-content-center"
                        aria-label={`${name} LinkedIn`}
                    >

                        <i className="fa-brands fa-linkedin-in"></i>
                    </a>)}
            </div>
        </article>
    );
}
