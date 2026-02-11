import { gql } from "graphql-request";
import { client, type AcfContentNodeConnection } from "@/lib/wordpress";

// =========================
// CERTIFICATIONS (CPT) LISTING
// =========================

export const GET_CERTIFICATIONS = gql`
  query GetCertifications($first: Int!) {
    certifications(first: $first) {
      nodes {
        id
        title
        slug
        excerpt

        certificationsCategories {
          nodes {
            name
            slug
          }
        }

        certificationFields {
          learnmoretype
          anchorid
          externalurl
          duration
          cost
          shortName

          linkedprogram {
            nodes {
              uri
              link
            }
          }
        }

        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export type CertificationVM = {
    id: string;
    title: string;
    slug: string;

    excerpt?: string;

    shortName?: string;

    categorySlugs: string[];
    categoryNames: string[];

    imageUrl?: string;
    imageAlt?: string;

    learnMoreType?: "internal_plp" | "external" | string;
    anchorId?: string;

    externalUrl?: string;
    duration?: string;
    cost?: string;

    linkedProgram?: AcfContentNodeConnection; // internal link connection
};

export async function getCertifications(first = 200): Promise<CertificationVM[]> {
    const data: any = await client.request(GET_CERTIFICATIONS, { first });
    const nodes = data?.certifications?.nodes ?? [];
    return nodes.map(mapCertificationNodeToVM);
}

export function mapCertificationNodeToVM(node: any): CertificationVM {
    const catNodes = node?.certificationsCategories?.nodes ?? [];
    const fields = node?.certificationFields ?? {};
    const imgNode = node?.featuredImage?.node;

    return {
        id: node?.id ?? "",
        title: node?.title ?? "",
        slug: node?.slug ?? "",
        excerpt: node?.excerpt ?? undefined,

        shortName: fields?.shortName ?? undefined,

        categorySlugs: catNodes.map((t: any) => t?.slug).filter(Boolean),
        categoryNames: catNodes.map((t: any) => t?.name).filter(Boolean),

        imageUrl: imgNode?.sourceUrl ?? undefined,
        imageAlt: imgNode?.altText ?? undefined,

        learnMoreType: fields?.learnmoretype ?? undefined,
        anchorId: fields?.anchorid ?? undefined,

        externalUrl: fields?.externalurl ?? undefined,
        duration: fields?.duration ?? undefined,
        cost: fields?.cost ?? undefined,

        linkedProgram: fields?.linkedprogram ?? undefined,
    };
}

// =========================
// CERTIFICATIONS HERO (SECTION 0) FROM PAGES
// =========================

export const GET_CERTIFICATIONS_HERO = gql`
  query CertificationsHero($slug: ID!) {
    page(id: $slug, idType: URI) {
      title
      certificationsHero {
        heroLabel
        heroHeading
        heroParagraph
      }
    }
  }
`;

export type CertificationsHeroVM = {
    heroLabel?: string | null;
    heroHeading?: string | null;
    heroParagraph?: string | null;
};

export async function getCertificationsHero(
    pageSlug: "all-certifications" | "healthcare-certifications" | "it-certifications"
): Promise<CertificationsHeroVM | null> {
    const data: any = await client.request(GET_CERTIFICATIONS_HERO, { slug: pageSlug });

    const hero = data?.page?.certificationsHero ?? null;
    if (!hero) return null;

    return {
        heroLabel: hero?.heroLabel ?? null,
        heroHeading: hero?.heroHeading ?? null,
        heroParagraph: hero?.heroParagraph ?? null,
    };
}
