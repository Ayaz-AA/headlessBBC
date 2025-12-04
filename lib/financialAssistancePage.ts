// lib/financialAssistancePage.ts
import { gql } from 'graphql-request'
import { client } from './wordpress'

export const GET_FINANCIAL_ASSISTANCE_PAGE = gql`
  query GetFinancialAssistancePage {
    pages(where: { name: "financial-assistance" }) {
      nodes {
        id
        title
        financialAssistance {          # outer field (from GraphQL tab)
          financialAssistance {        # inner group (your main group field)

            heroSection {
              heroLabel
              heroTitleLine1
              heroTitleLine2
              heroIntro
              heroSubheading
              heroImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }

            financeOptions {
              mainHeading
              mainPara

              heading1
              para1
              icon1 { node { sourceUrl altText } }

              heading2
              para2
              icon2 { node { sourceUrl altText } }

              heading3
              para3
              icon3 { node { sourceUrl altText } }

              heading4
              para4
              icon4 { node { sourceUrl altText } }

              heading5
              para5
              icon5 { node { sourceUrl altText } }

              heading6
              para6
              icon6 { node { sourceUrl altText } }

              heading7
              section7Link1Para
              section7Link2Para
              icon7 { node { sourceUrl altText } }

              heading8
              para8
              icon8 { node { sourceUrl altText } }

              noteHeading
              notePara
              noteIcon { node { sourceUrl altText } }

              section6Link
              section6LinkText

              section7Link1
              section7Link1Para
              section7Link1Text

              section7Link2
              section7Link2Para
              section7Link2Text
            }

            faqs {
              faqHeading
              question1
              answer1
              question2
              answer2
              question3
              answer3
            }
          }
        }
      }
    }
  }
`

export async function getFinancialAssistancePageData() {
    const data = await client.request(GET_FINANCIAL_ASSISTANCE_PAGE)
    return data
}
