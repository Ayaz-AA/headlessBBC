import { gql } from "graphql-request";
import { client } from "@/lib/wordpress";

export const GET_GUIDES_LISTING_HERO = gql`
  query GuidesListingHero {
    pageBy(uri: "guides") {
      id
      title
      guidesListingPageHero {
        herolabel
        herotitleline1
        herotitleline2
        herodescription
        heroimage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export async function getGuidesListingHero() {
    return client.request(GET_GUIDES_LISTING_HERO);
}

export function mapGuidesHero(data: any) {
    return data?.pageBy?.guidesListingPageHero ?? {};
}
