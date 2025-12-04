// app/our-editorial-policy/page.tsx

import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'

import Hero from '@/components/editorial-policy/Hero'
import SecondSection from '@/components/editorial-policy/SecondSection'
import CoreValues from '@/components/editorial-policy/CoreValues'
import ReviewerNetwork from '@/components/editorial-policy/ReviewerNetwork'
import Feedback from '@/components/editorial-policy/Feedback'

import { getEditorialPolicyPageData } from '@/lib/editorialPolicyPage'

export default async function OurEditorialPolicyPage() {
    const data: any = await getEditorialPolicyPageData()
    const page = data?.pages?.nodes?.[0]
    const fields = page?.ourEditorialPolicy?.ourEditorialPolicy

    const hero = fields?.heroSection
    const second = fields?.editorial2ndSection
    const core = fields?.coreValue
    const reviewer = fields?.reviewerNetwork
    const feedback = fields?.feedback

    const coreBlocks = [
        {
            heading: core?.section1Heading,
            para: core?.section1Para,
            imageUrl: core?.section1Image?.node?.sourceUrl,
            imageAlt: core?.section1Image?.node?.altText,
        },
        {
            heading: core?.section2Heading,
            para: core?.section2Para,
            imageUrl: core?.section2Image?.node?.sourceUrl,
            imageAlt: core?.section2Image?.node?.altText,
        },
        {
            heading: core?.section3Heading,
            para: core?.section3Para,
            imageUrl: core?.section3Image?.node?.sourceUrl,
            imageAlt: core?.section3Image?.node?.altText,
        },
        {
            heading: core?.section4Heading,
            para: core?.section4Para,
            imageUrl: core?.section4Image?.node?.sourceUrl,
            imageAlt: core?.section4Image?.node?.altText,
        },
    ].filter((b) => b.heading || b.para || b.imageUrl)

    return (
        <>
            <Header />

            <main>
                <Hero
                    label={hero?.heroLabel}
                    titleLine1={hero?.heroTitleLine1}
                    titleLine2={hero?.heroTitleLine2}
                    intro={hero?.heroIntro}
                    imageUrl={hero?.heroImage?.node?.sourceUrl}
                    imageAlt={hero?.heroImage?.node?.altText}
                />

                <SecondSection
                    heading={second?.secondSectionHeading}
                    para={second?.secondSectionPara}
                    para2={second?.secondSectionPara2}
                    innerHeading={second?.innerHeading}

                    innerPara2={second?.innerPara2}
                />

                <CoreValues mainHeading={core?.mainHeading} blocks={coreBlocks} />

                <ReviewerNetwork
                    heading={reviewer?.heading}
                    para={reviewer?.para}
                    highlightedPara={reviewer?.highlightedPara}
                />

                <Feedback heading={feedback?.heading} para={feedback?.para} />
            </main>

            <Footer />
        </>
    )
}
