import { gql } from "graphql-request";
import { client } from "@/lib/wordpress";

export const GET_PROGRAMS = gql`
  query ProgramsWithMeta {
    programs(first: 100) {
      nodes {
        id
        title
        slug

        roles {
          nodes {
            name
            slug
            parent {
              node {
                name
                slug
              }
            }
          }
        }

        providers {
          nodes {
            name
            slug
            providerMeta {
              providerUrl
              providerLogo {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }

        programFields {
          programLength
          programType

          # (kept, for Programs page / card fallback)
          programImage {
            node {
              sourceUrl
              altText
            }
          }

          # ✅ PDP data (confirmed by your IDE)
          programPdpFields {
            heroSectionPdp {
              heroShortDescription
            }
          }
        }
      }
    }
  }
`;

export async function getPrograms() {
  return client.request(GET_PROGRAMS);
}

export type ProgramVM = {
  id: string;
  title: string;
  slug: string;

  // ✅ keep these for ProgramsPage.tsx compatibility
  industrySlugs: string[];
  industryNames: string[];

  roleSlugs: string[];
  roleNames: string[];

  provider?: {
    name: string;
    slug: string;
    url?: string;
    logoUrl?: string;
    logoAlt?: string;
  };

  programLength?: string;
  programType?: string;

  // ✅ NEW: PDP hero short description for assessment result cards
  heroShortDescription?: string;

  imageUrl?: string;
  imageAlt?: string;
};

export function mapProgramNodeToVM(node: any): ProgramVM {
  const roleNodes = node?.roles?.nodes ?? [];
  const primaryRole = roleNodes[0];
  const parentIndustry = primaryRole?.parent?.node;

  const industrySlugs = parentIndustry?.slug ? [parentIndustry.slug] : [];
  const industryNames = parentIndustry?.name ? [parentIndustry.name] : [];

  const providerNode = node?.providers?.nodes?.[0];
  const providerMeta = providerNode?.providerMeta ?? {};
  const providerLogoNode = providerMeta?.providerLogo?.node;

  const fields = node?.programFields ?? {};
  const imgNode = fields?.programImage?.node;

  const heroShortDescription =
    fields?.programPdpFields?.heroSectionPdp?.heroShortDescription ?? undefined;

  return {
    id: node.id,
    title: node.title,
    slug: node.slug,

    // ✅ now ProgramsPage.tsx can safely do forEach
    industrySlugs,
    industryNames,

    roleSlugs: roleNodes.map((x: any) => x.slug),
    roleNames: roleNodes.map((x: any) => x.name),

    provider: providerNode
      ? {
        name: providerNode?.name,
        slug: providerNode?.slug,
        url: providerMeta?.providerUrl ?? undefined,
        logoUrl: providerLogoNode?.sourceUrl ?? undefined,
        logoAlt: providerLogoNode?.altText ?? undefined,
      }
      : undefined,

    programLength: fields?.programLength ?? undefined,
    programType: fields?.programType ?? undefined,

    // ✅ NEW
    heroShortDescription,

    // kept for existing UI / fallback
    imageUrl: imgNode?.sourceUrl ?? undefined,
    imageAlt: imgNode?.altText ?? undefined,
  };
}
