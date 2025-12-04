import Header from '@/components/global/Header'
import Hero from '@/components/homepage/Hero'
import About from '@/components/homepage/About'
import Features from '@/components/homepage/Features'
import Bootcamps from '@/components/homepage/Bootcamps'
import WhatIsBootcamp from '@/components/homepage/WhatIsBootcamp'
import Guide from '@/components/homepage/Guide'
import Certification from '@/components/homepage/Certification'
import FAQ from '@/components/homepage/FAQ'
import Footer from '@/components/global/Footer'
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

