// components/editorial-policy/Feedback.tsx

interface FeedbackProps {
    heading?: string
    para?: string
}

export default function Feedback({ heading, para }: FeedbackProps) {
    if (!heading && !para) return null

    return (
        <>
            <section className="container mb-3">
                {heading && <h2 className="mb-3 team-intro-heading">{heading}</h2>}
                {para && <p className="mb-0 regular-para">{para}</p>}
            </section>

            <section className="connect-strip">
                <div className="connect-strip__inner container w-75">
                    <h2 className="connect-strip__heading">Connect with Us</h2>
                    <span className="connect-strip__divider" aria-hidden="true" />
                    <div className="connect-strip__icons" aria-label="BestColleges social media">
                        <a href="#" className="connect-strip__icon" aria-label="Facebook">
                            <img src="/assets/icon-facebook.svg" alt="" />
                        </a>
                        <a href="#" className="connect-strip__icon" aria-label="Twitter">
                            <img src="/assets/icon-twitter.svg" alt="" />
                        </a>
                        <a href="#" className="connect-strip__icon" aria-label="LinkedIn">
                            <img src="/assets/icon-linkedin.svg" alt="" />
                        </a>
                        <a href="#" className="connect-strip__icon" aria-label="Instagram">
                            <img src="/assets/icon-instagram.svg" alt="" />
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}
