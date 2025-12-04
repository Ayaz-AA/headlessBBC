// lib/editorialPolicyPage.ts
import { gql } from 'graphql-request'
import { client } from './wordpress'

export const GET_EDITORIAL_POLICY_PAGE = gql`
  query GetEditorialPolicyPage {
    pages(where: { name: "our-editorial-policy" }) {
      nodes {
        id
        title
        ourEditorialPolicy {        # outer field on Page (GraphQL tab)
          ourEditorialPolicy {      # inner group field name
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

            editorial2ndSection {
              secondSectionHeading
              secondSectionPara
              secondSectionPara2
              innerHeading
           
              innerPara2
            }

            coreValue {
              mainHeading

              section1Heading
              section1Para
              section1Image {
                node {
                  sourceUrl
                  altText
                }
              }

              section2Heading
              section2Para
              section2Image {
                node {
                  sourceUrl
                  altText
                }
              }

              section3Heading
              section3Para
              section3Image {
                node {
                  sourceUrl
                  altText
                }
              }

              section4Heading
              section4Para
              section4Image {
                node {
                  sourceUrl
                  altText
                }
              }
            }

            reviewerNetwork {
              heading
              para
              highlightedPara
            }

            feedback {
              heading
              para
            }
          }
        }
      }
    }
  }
`

export async function getEditorialPolicyPageData() {
    const data = await client.request(GET_EDITORIAL_POLICY_PAGE)
    return data
}
