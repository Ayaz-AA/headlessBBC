import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Features from '@/components/Features'
import Bootcamps from '@/components/Bootcamps'
import WhatIsBootcamp from '@/components/WhatIsBootcamp'
import Guide from '@/components/Guide'
import Certification from '@/components/Certification'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="main">
        <Hero />
        <About />
        <Features />
        <Bootcamps />
        <WhatIsBootcamp />
        <Guide />
        <Certification />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}

