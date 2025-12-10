import { gql } from "graphql-request";
import { client } from "@/lib/wordpress";

export const GET_PROGRAMS = gql`
  query ProgramsWithIndustries {
    programs(first: 100) {
      nodes {
        id
        title
        slug
        industries {
          nodes {
            name
            slug
          }
        }
        programFields {
          programLength
          programType
          programImage {
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

export async function getPrograms() {
  return client.request(GET_PROGRAMS);
}

// ✅ ADD THIS BELOW (do not remove your query)
export type ProgramVM = {
  id: string;
  title: string;
  slug: string;
  industrySlugs: string[];
  industryNames: string[];
  programLength?: string;
  programType?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export function mapProgramNodeToVM(node: any): ProgramVM {
  const industryNodes = node?.industries?.nodes ?? [];
  const fields = node?.programFields ?? {};
  const imgNode = fields?.programImage?.node;

  return {
    id: node.id,
    title: node.title,
    slug: node.slug,
    industrySlugs: industryNodes.map((x: any) => x.slug),
    industryNames: industryNodes.map((x: any) => x.name),
    programLength: fields?.programLength ?? undefined,
    programType: fields?.programType ?? undefined,
    imageUrl: imgNode?.sourceUrl ?? undefined,
    imageAlt: imgNode?.altText ?? undefined,
  };
}
