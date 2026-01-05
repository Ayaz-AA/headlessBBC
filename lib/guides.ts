import { gql } from "graphql-request";
import { client } from "@/lib/wordpress";

export const GET_GUIDES = gql`
  query GuidesWithIndustries {
    guides(first: 200) {
      nodes {
        id
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        industries {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export async function getGuides() {
    return client.request(GET_GUIDES);
}

export type GuideVM = {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    imageUrl?: string;
    imageAlt?: string;
    industrySlugs: string[];
    industryNames: string[];
};

function stripHtml(html?: string): string {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export function mapGuideNodeToVM(node: any): GuideVM {
    const industryNodes = node?.industries?.nodes ?? [];
    const imgNode = node?.featuredImage?.node;

    return {
        id: node?.id,
        title: node?.title ?? "",
        slug: node?.slug ?? "",
        excerpt: stripHtml(node?.excerpt ?? ""),
        imageUrl: imgNode?.sourceUrl ?? undefined,
        imageAlt: imgNode?.altText ?? undefined,
        industrySlugs: industryNodes.map((x: any) => x.slug),
        industryNames: industryNodes.map((x: any) => x.name),
    };
}
// detail page hero 
export const GUIDE_BY_SLUG_QUERY = gql`
  query GuideBySlug($slug: ID!) {
    guide(id: $slug, idType: SLUG) {
      id
      slug
      title
      content

      guideDetailPage {
        guideHero {
          heroLabel: herolabel
          heroTitleLine1: herotitleline1
          heroTitleLine2: herotitleline2
          heroDescription: herodescription

          heroImage: heroimage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }

      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      guideDetailPage {
  guideHero {
    heroLabel: herolabel
    heroTitleLine1: herotitleline1
    heroTitleLine2: herotitleline2
    heroDescription: herodescription
    heroImage: heroimage { node { sourceUrl altText } }
  }

  guideIntro {
    title
    topdescription
    bottomdescription
    rightlist
  }
}  
    }
  }
`;

export async function getGuideBySlug(slug: string) {
    if (!slug) throw new Error("getGuideBySlug: slug is required");
    return client.request(GUIDE_BY_SLUG_QUERY, { slug });
}
export const GUIDES_FOR_FILTER_QUERY = gql`
  query GuidesForFilter {
    guides(first: 1000) {
      nodes {
        slug
        title
        industries {
          nodes {
            slug
            name
          }
        }
      }
    }
  }
`;

export async function getGuidesForFilter() {
    return client.request(GUIDES_FOR_FILTER_QUERY);
}