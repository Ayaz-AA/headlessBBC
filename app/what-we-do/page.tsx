// app/what-we-do/page.tsx
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import Hero from '@/components/what-we-do/Hero'
import SectionOne from '@/components/what-we-do/SectionOne'
import SectionTwoCards from '@/components/what-we-do/SectionTwoCards'
import Commitment from '@/components/what-we-do/Commitment'
import Editorial from '@/components/what-we-do/Editorial'
import { getWhatWeDoPageData } from '@/lib/whatWeDoPage'

export default async function WhatWeDoPage() {
    const data: any = await getWhatWeDoPageData()
    const page = data?.pages?.nodes?.[0]
    const fields = page?.whatWeDo?.whatWeDo

    const hero = fields?.heroSection
    const section1 = fields?.whatWeDoSection1
    const section2 = fields?.whatWeDoSection2
    const commitment = fields?.commitmentSection
    const editorial = fields?.editorialSection

    const cards = [
        {
            heading: section2?.card1Heading,
            text: section2?.card1Para,
            iconUrl: section2?.card1Icon?.node?.sourceUrl,
            iconAlt: section2?.card1Icon?.node?.altText,
        },
        {
            heading: section2?.card2Heading,
            text: section2?.card2Para,
            iconUrl: section2?.card2Icon?.node?.sourceUrl,
            iconAlt: section2?.card2Icon?.node?.altText,
        },
        {
            heading: section2?.card3Heading,
            text: section2?.card3Para,
            iconUrl: section2?.card3Icon?.node?.sourceUrl,
            iconAlt: section2?.card3Icon?.node?.altText,
        },
    ].filter((c) => c.heading || c.text)

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

                <SectionOne
                    heading={section1?.heading}
                    paragraph={section1?.paragraph}
                    imageUrl={section1?.section1Image?.node?.sourceUrl}
                    imageAlt={section1?.section1Image?.node?.altText}
                    paragraph2={section1?.paragraph2}
                />

                <SectionTwoCards
                    heading={section2?.heading}
                    paragraph={section2?.paragraph}
                    cards={cards}
                />

                <Commitment
                    heading={commitment?.commitmentHeading}
                    paragraph={commitment?.commitmentPara}
                    imageUrl={commitment?.commitmentImage?.node?.sourceUrl}
                    imageAlt={commitment?.commitmentImage?.node?.altText}
                />

                <Editorial
                    heading={editorial?.editorialHeading}
                    paragraph={editorial?.editorialPara}
                    linkLine={editorial?.editorialLinkLine}
                    linkText={editorial?.editorialLinkText}
                    imageUrl={editorial?.editorialImage?.node?.sourceUrl}
                    imageAlt={editorial?.editorialImage?.node?.altText}
                />
            </main>

            <Footer />
        </>
    )
}
