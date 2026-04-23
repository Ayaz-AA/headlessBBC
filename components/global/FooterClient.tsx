
'use client'

import Link from 'next/link'

export default function FooterClient({ data }: { data: any }) {
    const safeData = data || { columns: [], bottom: {} }

    return (
        <footer className="footer">
            <div className="container">

                <div className="row gy-4 py-5 align-items-start">

                    {/* COLUMN 1 */}
                    <div className="col-lg-4 col-md-6">
                        {/* LOGO */}
                        {safeData.logo && (
                            <div className="mb-3">
                                <img
                                    src={safeData.logo}
                                    alt={safeData.logoAlt}
                                    className="footer__logo"
                                />
                            </div>
                        )}
                        <p className="footer__description">
                            {safeData.description}
                        </p>

                        <div className="footer__social">

                            {/* FACEBOOK */}
                            <Link href="#" className="footer__social-link" aria-label="Facebook">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.022 3.657 9.19 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.987C18.343 21.19 22 17.022 22 12z" />
                                </svg>
                            </Link>

                            {/* TWITTER */}
                            <Link href="#" className="footer__social-link" aria-label="Twitter">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.3 3.9 12.15 12.15 0 01-8.82-4.47 4.28 4.28 0 001.32 5.71 4.23 4.23 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.98A8.6 8.6 0 012 19.54 12.13 12.13 0 008.56 21c7.87 0 12.18-6.52 12.18-12.18 0-.19 0-.39-.01-.58A8.72 8.72 0 0022.46 6z" />
                                </svg>
                            </Link>

                            {/* LINKEDIN */}
                            <Link href="#" className="footer__social-link" aria-label="LinkedIn">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.45 20.45h-3.55v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7H9.32V9h3.4v1.56h.05c.47-.9 1.63-1.87 3.36-1.87 3.6 0 4.27 2.37 4.27 5.46v6.3zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                                </svg>
                            </Link>

                            {/* INSTAGRAM */}
                            <Link href="#" className="footer__social-link" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5c3.18 0 5.75-2.57 5.75-5.75v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm4.25 5.5a4.75 4.75 0 110 9.5 4.75 4.75 0 010-9.5zm6.25-.88a1.12 1.12 0 110 2.25 1.12 1.12 0 010-2.25zM12 9.25A2.75 2.75 0 1012 14.75 2.75 2.75 0 0012 9.25z" />
                                </svg>
                            </Link>

                        </div>
                    </div>

                    {/* FLEX COLUMNS WRAPPER */}
                    <div className="col-lg-8">
                        <div className="row">

                            {safeData.columns?.map((col: any, i: number) => (
                                <div key={i} className="col-md-4 mt-4 mt-md-0">
                                    <h3 className="footer__column-title">{col.title}</h3>

                                    <ul className="footer__links">
                                        {col.links.map((link: any, j: number) => (
                                            <li key={j}>
                                                <Link href={link.url}>{link.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>

                {/* BOTTOM */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center border-top pt-4 pb-4">
                    <p className="footer__copyright">
                        {safeData.bottom?.copyright}
                    </p>

                    <p className="footer__legal">
                        {safeData.bottom?.rightText}
                    </p>
                </div>

            </div>
        </footer>
    )
}