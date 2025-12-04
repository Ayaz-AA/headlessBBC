// lib/whatWeDoPage.ts
import { gql } from 'graphql-request'
import { client } from './wordpress'

export const GET_WHAT_WE_DO_PAGE = gql`
  query GetWhatWeDoPage {
    pages(where: { name: "what-we-do" }) {
      nodes {
        id
        title
        whatWeDo {             # 👈 outer field on Page (from GraphQL tab)
          whatWeDo {           # 👈 inner group (your main group field name)
            heroSection {
              heroLabel
              heroTitleLine1
              heroTitleLine2
              heroIntro
              heroImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }

            whatWeDoSection1 {
              heading
              paragraph
              section1Image {
                node {
                  sourceUrl
                  altText
                }
              }
            paragraph2
            }

            whatWeDoSection2 {
              heading
              paragraph

              card1Heading
              card1Icon {
                node {
                  sourceUrl
                  altText
                }
              }
              card1Para

              card2Heading
              card2Icon {
                node {
                  sourceUrl
                  altText
                }
              }
              card2Para

              card3Heading
              card3Icon {
                node {
                  sourceUrl
                  altText
                }
              }
              card3Para
            }

            commitmentSection {
              commitmentHeading
              commitmentPara
              commitmentImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }

            editorialSection {
              editorialHeading
              editorialPara
              editorialLinkLine
              editorialLinkText
              editorialImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`

export async function getWhatWeDoPageData() {
    const data = await client.request(GET_WHAT_WE_DO_PAGE)
    return data
}
