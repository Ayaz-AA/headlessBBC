import { gql } from 'graphql-request'
import { client } from './wordpress'

export const GET_TEAM_PAGE = gql`
  query GetTeamPage {
    pages(where: { name: "our-team-strategy" }) {
      nodes {
        id
        title
        ourTeamStrategy {
          ourTeamStrategy {

   
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

            teamSection {
              teamLabel
              teamHeading
              teamIntro

              member1Name
              member1Role
              member1Id
              member1Image {
                node {
                  sourceUrl
                  altText
                }
              }

              member2Name
              member2Role
              member2Id
              member2Image {
                node {
                  sourceUrl
                  altText
                }
              }

              member3Neme
              member3Role
              member3Id
              member3Image {
                node {
                  sourceUrl
                  altText
                }
              }

              member4Name
              member4Id
              member4Image {
                node {
                  sourceUrl
                  altText
                }
              }
              member4RoleImage {
                node {
                  sourceUrl
                  altText
                }
              }

              member5Name
              member5Id
              member5Image {
                node {
                  sourceUrl
                  altText
                }
              }
              member5Role {
                node {
                  sourceUrl
                  altText
                }
              }

              member6Name
              member6Id
              member6Image {
                node {
                  sourceUrl
                  altText
                }
              }
              member6Role {
                node {
                  sourceUrl
                  altText
                }
              }

              missionText
            }
          }
        }
      }
    }
  }
`

export async function getTeamPageData() {
    const data = await client.request(GET_TEAM_PAGE)
    return data
}
