import { gql } from "graphql-request";
import { client } from "@/lib/wordpress";

export const GET_PROGRAMS_LISTING_HERO = gql`
  query ProgramsListingHero($slug: String!) {
    pages(where: { name: $slug }) {
      nodes {
        id
        title
        programsListingPageHero {
          programsListingPageHero {
            heroLabel
            heroTitleLine1
            heroTitleLine2
            heroDescription
            heroImage {
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
`;

export async function getProgramsListingHero(slug: string) {
    return client.request(GET_PROGRAMS_LISTING_HERO, { slug });
}

// normalize shape for the component
export function mapProgramsHero(data: any) {
    const node = data?.pages?.nodes?.[0];
    return node?.programsListingPageHero?.programsListingPageHero ?? {};
}
