import { gql } from "graphql-request";
import { client } from "@/lib/wordpress";

const GLOBAL_CTAS_PAGE_ID = "1732";

const GET_GLOBAL_MATCH_CTA = gql`
  query GlobalMatchMeCta($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      globalCtas {
        matchMeCta {
          matchctaenabled
          matchctatitle
          matchctadescription
          matchctabuttonlabel
          matchctabuttonlink {
            edges {
              node {
                id
              }
            }
          }
          matchctaimage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

const GET_NODE_URI = gql`
  query NodeUri($id: ID!) {
    node(id: $id) {
      ... on ContentNode {
        uri
      }
    }
  }
`;

export type MatchMeCtaVM = {
    enabled: boolean;
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
    imageUrl: string;
    imageAlt: string;
};

export async function getGlobalMatchMeCta(): Promise<MatchMeCtaVM | null> {
    const res: any = await client.request(GET_GLOBAL_MATCH_CTA, {
        id: GLOBAL_CTAS_PAGE_ID,
    });

    const raw = res?.page?.globalCtas?.matchMeCta;
    if (!raw?.matchctaenabled) return null;

    // Page Link -> first linked node id
    const linkedId = raw?.matchctabuttonlink?.edges?.[0]?.node?.id as string | undefined;

    let buttonHref = "#";
    if (linkedId) {
        const nodeRes: any = await client.request(GET_NODE_URI, { id: linkedId });
        buttonHref = nodeRes?.node?.uri ?? "#";
    }

    return {
        enabled: !!raw.matchctaenabled,
        title: raw.matchctatitle ?? "",
        description: raw.matchctadescription ?? "",
        buttonLabel: raw.matchctabuttonlabel ?? "Learn more",
        buttonHref,
        imageUrl: raw?.matchctaimage?.node?.sourceUrl ?? "",
        imageAlt: raw?.matchctaimage?.node?.altText ?? "",
    };
}
