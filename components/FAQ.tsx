'use client'

import { useState, useEffect } from 'react'

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Do I have to start working or studying if I join your Bootcamp?',
      answer: 'Our bootcamps are designed for both working professionals and students. While students are encouraged to study in advance for upcoming modules, there are no education or employment requirements while you work through cybersecurity modules.'
    },
    {
      question: 'How long does a bootcamp take to complete?',
      answer: 'Bootcamp durations vary depending on the program, typically ranging from 12 to 24 weeks. Some programs offer part-time options that may take longer to complete.'
    },
    {
      question: 'Do you offer career counselling?',
      answer: 'Yes, we provide comprehensive career support including career counseling, resume reviews, interview preparation, and job placement assistance to help you transition into your new career.'
    },
    {
      question: 'Do you have flexible payment options?',
      answer: 'Yes, we offer various payment options including payment plans, scholarships, and financing options to make our programs accessible to everyone.'
    }
  ]

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  useEffect(() => {
    // Scroll animation functionality
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animate--active')
            observer.unobserve(entry.target)
          }
        })
      }, observerOptions)

      document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el)
      })

      return () => observer.disconnect()
    }
  }, [])

  return (
    <section className="faq">
      <div className="faq__container">
        <h2 className="faq__heading scroll-animate scroll-animate--slide-up">Frequently Asked Questions</h2>
        <div className="faq__list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq__item scroll-animate scroll-animate--slide-up scroll-animate--delay-${index + 1} ${activeIndex === index ? 'faq__item--active' : ''}`}>
              <button 
                className="faq__question" 
                aria-expanded={activeIndex === index}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <svg className="faq__icon" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5V25M5 15H25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <div className="faq__answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

