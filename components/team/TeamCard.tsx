// components/team/TeamCard.tsx

import React from 'react'
import type { TeamMemberViewModel } from './TeamGrid'

export default function TeamCard({
    name,
    roleText,
    photoUrl,
    photoAlt,
    roleImageUrl,
    roleImageAlt
}: TeamMemberViewModel) {
    return (
        <article className="team-card text-start">

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
                <div className="team-card__social-badge">
                    <img
                        src="/assets/linkedin-icon.png"   // your small badge icon
                        alt="linkedin-icon"
                    />
                </div>
            </div>

            {/* Text area */}
            <div className="team-card__body w-100 p-0">
                <h3 className="team-card__name">{name}</h3>

                {roleText && <p className="team-card__role">{roleText}</p>}

                {/* Company/brand logo below name */}
                {roleImageUrl && (
                    <div className="team-card__company mt-2 p-0">
                        <img
                            src={roleImageUrl}
                            alt={roleImageAlt || ''}
                            className="team-card__company-logo"
                        />
                    </div>
                )}
            </div>
        </article>
    )
}
