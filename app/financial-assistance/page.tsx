// app/financial-assistance/page.tsx

import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'

import Hero from '@/components/financial-assistance/Hero'
import FinanceOptionsGrid from '@/components/financial-assistance/FinanceOptionsGrid'
import FAQ from '@/components/financial-assistance/FAQ'

import { getFinancialAssistancePageData } from '@/lib/financialAssistancePage'

export default async function FinancialAssistancePage() {
    const data: any = await getFinancialAssistancePageData()
    const page = data?.pages?.nodes?.[0]
    const fields = page?.financialAssistance?.financialAssistance

    const hero = fields?.heroSection
    const finance = fields?.financeOptions
    const faqs = fields?.faqs

    const faqItems = [
        { question: faqs?.question1, answer: faqs?.answer1 },
        { question: faqs?.question2, answer: faqs?.answer2 },
        { question: faqs?.question3, answer: faqs?.answer3 },
    ].filter((f) => f.question || f.answer)

    return (
        <>
            <Header />

            <main>
                <Hero
                    label={hero?.heroLabel}
                    titleLine1={hero?.heroTitleLine1}
                    titleLine2={hero?.heroTitleLine2}
                    intro={hero?.heroIntro}
                    // subheading={hero?.heroSubheading}
                    imageUrl={hero?.heroImage?.node?.sourceUrl}
                    imageAlt={hero?.heroImage?.node?.altText}
                />

                {/* ✅ Non-array version: pass the whole financeOptions object */}
                <FinanceOptionsGrid finance={finance} />

                <FAQ heading={faqs?.faqHeading} items={faqItems} />
            </main>

            <Footer />
        </>
    )
}
