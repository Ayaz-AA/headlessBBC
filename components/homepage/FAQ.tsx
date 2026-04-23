"use client";

import { useEffect } from "react";
import { HomepageFieldsGroup } from "@/lib/homepage";

type Props = {
  data?: HomepageFieldsGroup | null;
};

export default function FAQ({ data }: Props) {
  const section = data?.frequentlyAskedQuestions;

  const faqItems = section
    ? [
      { question: section.question1, answer: section.answer1 },
      { question: section.question2, answer: section.answer2 },
      { question: section.question3, answer: section.answer3 },
      { question: section.question4, answer: section.answer4 },
      { question: section.question5, answer: section.answer5 },
      { question: section.question6, answer: section.answer6 },
    ].filter((item) => item.question && item.answer)
    : [];

  // ✅ Scroll animation logic
  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-animate");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-animate--active");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (!section?.faqHeadings && !faqItems.length) return null;

  return (
    <section className="container py-5 custom-faq-section scroll-animate scroll-animate--fade-in">

      {section?.faqHeadings && (
        <h2 className="mb-4 text-center component-heading scroll-animate scroll-animate--slide-up">
          {section.faqHeadings}
        </h2>
      )}

      <div
        className="accordion custom-faq-accordion"
        id="homepageFaq"
      >
        {faqItems.map((item, idx) => {
          const collapseId = `homepage-faq-collapse-${idx}`;
          const headingId = `homepage-faq-heading-${idx}`;

          return (
            <div
              className={`accordion-item custom-faq-item scroll-animate scroll-animate--slide-up scroll-animate--delay-${idx + 1}`}
              key={idx}
            >
              <h2 className="accordion-header" id={headingId}>
                <button
                  className={
                    "accordion-button custom-faq-button " +
                    (idx === 0 ? "" : "collapsed")
                  }
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${collapseId}`}
                  aria-expanded={idx === 0 ? "true" : "false"}
                  aria-controls={collapseId}
                >
                  {item.question}
                </button>
              </h2>

              <div
                id={collapseId}
                className={
                  "accordion-collapse collapse " +
                  (idx === 0 ? "show" : "")
                }
                aria-labelledby={headingId}
                data-bs-parent="#homepageFaq"
              >
                <div className="accordion-body regular-para">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}