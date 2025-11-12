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
import { getHomepageData } from '@/lib/wordpress'

export default async function Home() {
  let homepageData = null
  
  try {
    homepageData = await getHomepageData()
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    // Continue with default content if fetch fails
  }

  // Get the first page (homepage) from the pages query
  const homepage = homepageData?.pages?.nodes?.[0]
  const homepageFields = homepage?.homepageFields?.homepageFields

  return (
    <>
      <Header />
      <main id="main-content" className="main">
        <Hero data={homepageFields} />
        <About data={homepageFields} />
        <Features data={homepageFields} />
        <Bootcamps data={homepageFields} />
        <WhatIsBootcamp data={homepageFields} />
        <Guide data={homepageFields} />
        <Certification data={homepageFields} />
        <FAQ data={homepageFields} />
      </main>
      <Footer />
    </>
  )
}

