
import type { HomepageFieldsGroup } from '@/lib/homepage'

interface AboutProps {
  data?: HomepageFieldsGroup | null
}

export default function About({ data }: AboutProps) {
  const about = data?.aboutUs

  const heading = about?.aboutUsHeading?.trim() || 'About Us'
  const paragraphRaw =
    about?.aboutUsParagraph?.trim() ||
    "It’s not always easy to take your first step — or your next step — toward the career you deserve."

  const paragraphs = paragraphRaw
    ? paragraphRaw.split(/\n+/).map((p) => p.trim()).filter(Boolean)
    : []

  const imageUrl =
    about?.aboutUsImage?.node?.sourceUrl || '/assets/about-fallback.png' // <-- add a fallback image if you want
  const imageAlt = about?.aboutUsImage?.node?.altText || 'About Us'

  return (
    <section className="about py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          {/* LEFT */}
          <div className="col-12 col-lg-7">

            <div className=" badge d-flex justify-content-between align-items-center mb-3 aboutus-badge">
              <div className="me-2">
                <img src="/assets/Icon-badge.png" alt="icon" />
              </div>
              <span>About Us</span>
            </div>

            <h2 className="team-intro-heading mb-3">{heading}</h2>

            <div className="regular-para">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

          </div>

          {/* RIGHT */}
          <div className="col-12 col-lg-5">


            <img
              src={imageUrl}
              alt={imageAlt}
              className="img-fluid"
              loading="lazy"
              style={{ height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
