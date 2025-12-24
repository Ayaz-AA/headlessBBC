// import { GraphQLClient, gql } from 'graphql-request'

// const endpoint = process.env.WP_GRAPHQL_ENDPOINT || 'https://blog.bestbootcamps.com/graphql'

// const authToken = process.env.WP_AUTH_TOKEN

// export const client = new GraphQLClient(endpoint, {
//   headers: authToken
//     ? {
//       Authorization: `Bearer ${authToken}`,
//     }
//     : undefined,
// })

// // GraphQL query to fetch homepage with ACF fields
// // Using pages query to match the working GraphQL structure
// export const GET_HOMEPAGE = gql`
//   query GetHomepage {
//     pages(where: {name: "bbc-home"}) {
//       nodes {
//         id
//         databaseId
//         title
//         content
//         slug
//         uri
//         homepageFields {
//           homepageFields {
//             heroSection {
//               heroTitle
//             }
//           }
//         }
//       }
//     }
//   }
// `

// // Alternative query to get page by database ID (uncomment if needed)
// // export const GET_HOMEPAGE_BY_ID = gql`
// //   query GetHomepage($id: ID!) {
// //     page(id: $id, idType: DATABASE_ID) {
// //       id
// //       title
// //       content
// //       homepageFields {
// //         # Your ACF fields here
// //       }
// //     }
// //   }
// // `

// // Type definitions for ACF fields
// export interface MediaItem {
//   sourceUrl: string
//   altText?: string | null
//   mediaDetails?: {
//     width?: number | null
//     height?: number | null
//   } | null
// }

// // Flexible type for ACF fields - adjust based on your actual ACF field structure
// export interface HeroSection {
//   heroTitle?: string | null
//   // Add other hero section fields here as needed
// }

// export interface HomepageFields {
//   // heroTitle is nested inside heroSection group
//   heroSection?: HeroSection | null
//   // Add other field groups here as needed
//   [key: string]: any
// }

// export interface HomepageData {
//   pages: {
//     nodes: Array<{
//       id: string
//       databaseId: number
//       title: string | null
//       content: string | null
//       slug: string | null
//       uri: string | null
//       homepageFields?: {
//         homepageFields?: HomepageFields | null
//       } | null
//     }>
//   }
// }

// // Function to fetch homepage data
// export async function getHomepageData(): Promise<HomepageData> {
//   try {
//     const data = await client.request<HomepageData>(GET_HOMEPAGE)
//     return data
//   } catch (error: any) {
//     console.error('Failed to fetch homepage data:', error)
//     if (error.response?.errors) {
//       error.response.errors.forEach(({ message }: { message: string }, idx: number) => {
//         console.error(`  Error ${idx + 1}: ${message}`)
//       })
//     }
//     throw error
//   }
// }

import { GraphQLClient, gql } from "graphql-request";

const endpoint = process.env.WP_GRAPHQL_ENDPOINT || "https://blog.bestbootcamps.com/graphql";
const authToken = process.env.WP_AUTH_TOKEN;

export const client = new GraphQLClient(endpoint, {
  headers: authToken
    ? {
      Authorization: `Bearer ${authToken}`,
    }
    : undefined,
});

// =========================
// HOMEPAGE QUERY (existing)
// =========================

export const GET_HOMEPAGE = gql`
  query GetHomepage {
    pages(where: { name: "bbc-home" }) {
      nodes {
        id
        databaseId
        title
        content
        slug
        uri
        homepageFields {
          homepageFields {
            heroSection {
              heroTitle
            }
          }
        }
      }
    }
  }
`;

// =========================
// TYPES (existing + reused)
// =========================

export interface MediaItem {
  sourceUrl: string;
  altText?: string | null;
  mediaDetails?: {
    width?: number | null;
    height?: number | null;
  } | null;
}

export interface HeroSection {
  heroTitle?: string | null;
}

export interface HomepageFields {
  heroSection?: HeroSection | null;
  [key: string]: any;
}

export interface HomepageData {
  pages: {
    nodes: Array<{
      id: string;
      databaseId: number;
      title: string | null;
      content: string | null;
      slug: string | null;
      uri: string | null;
      homepageFields?: {
        homepageFields?: HomepageFields | null;
      } | null;
    }>;
  };
}

// Function to fetch homepage data
export async function getHomepageData(): Promise<HomepageData> {
  try {
    const data = await client.request<HomepageData>(GET_HOMEPAGE);
    return data;
  } catch (error: any) {
    console.error("Failed to fetch homepage data:", error);
    if (error.response?.errors) {
      error.response.errors.forEach(({ message }: { message: string }, idx: number) => {
        console.error(`  Error ${idx + 1}: ${message}`);
      });
    }
    throw error;
  }
}

// ==========================================
// BOOTCAMP MEGA MENU (NEW - add below)
// ==========================================

// GraphQL query (matches your working GraphiQL query)
export const GET_BOOTCAMP_MEGA_MENU = gql`
  query BootcampExtrasCamelCase {
    bootcampCategories(where: { parent: 0, hideEmpty: false }, first: 50) {
      nodes {
        id
        name
        slug

        children(first: 50) {
          nodes {
            id
            name
            slug
          }
        }

        bootcampMegaMenuExtras {
          popularTopic1Label
          popularTopic1Url
          popularTopic2Label
          popularTopic2Url
          popularTopic3Label
          popularTopic3Url

          featuredBlog1Title
          featuredBlog1Url
          featuredBlog1Image {
            node {
              sourceUrl
              altText
            }
          }

          featuredBlog2Title
          featuredBlog2Url
          featuredBlog2Image {
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

// Types for mega menu
export interface BootcampChildTerm {
  id: string;
  name: string;
  slug: string;
}

export interface BootcampMegaMenuExtras {
  popularTopic1Label?: string | null;
  popularTopic1Url?: string | null;
  popularTopic2Label?: string | null;
  popularTopic2Url?: string | null;
  popularTopic3Label?: string | null;
  popularTopic3Url?: string | null;

  featuredBlog1Title?: string | null;
  featuredBlog1Url?: string | null;
  featuredBlog1Image?: {
    node?: MediaItem | null;
  } | null;

  featuredBlog2Title?: string | null;
  featuredBlog2Url?: string | null;
  featuredBlog2Image?: {
    node?: MediaItem | null;
  } | null;
}

export interface BootcampMegaMenuParentTerm {
  id: string;
  name: string;
  slug: string;
  children?: {
    nodes: BootcampChildTerm[];
  } | null;
  bootcampMegaMenuExtras?: BootcampMegaMenuExtras | null;
}

export interface BootcampMegaMenuData {
  bootcampCategories: {
    nodes: BootcampMegaMenuParentTerm[];
  };
}

// Fetch function (same error handling style as homepage)
export async function getBootcampMegaMenuData(): Promise<BootcampMegaMenuData> {
  try {
    const data = await client.request<BootcampMegaMenuData>(GET_BOOTCAMP_MEGA_MENU);
    return data;
  } catch (error: any) {
    console.error("Failed to fetch bootcamp mega menu data:", error);
    if (error.response?.errors) {
      error.response.errors.forEach(({ message }: { message: string }, idx: number) => {
        console.error(`  Error ${idx + 1}: ${message}`);
      });
    }
    throw error;
  }
}

// ==========================================
// CERTIFICATIONS MEGA MENU (NEW)
// ==========================================

export const GET_CERTIFICATIONS_MEGA_MENU = gql`
  query CertificationsMegaMenu {
    certificationsCategories(where: { parent: 0 }, first: 10) {
      nodes {
        id
        name
        slug

        certificationsMegaMenu {
          topcert1label
          topcert1url
          topcert2label
          topcert2url
          topcert3label
          topcert3url
          topcert4label
          topcert4url

          populartopic1label
          populartopic1url
          populartopic2label
          populartopic2url
          populartopic3label
          populartopic3url
          populartopic4label
          populartopic4url
        }
      }
    }
  }
`;

export interface CertificationsMegaMenuFields {
  topcert1label?: string | null;
  topcert1url?: string | null;
  topcert2label?: string | null;
  topcert2url?: string | null;
  topcert3label?: string | null;
  topcert3url?: string | null;
  topcert4label?: string | null;
  topcert4url?: string | null;

  populartopic1label?: string | null;
  populartopic1url?: string | null;
  populartopic2label?: string | null;
  populartopic2url?: string | null;
  populartopic3label?: string | null;
  populartopic3url?: string | null;
  populartopic4label?: string | null;
  populartopic4url?: string | null;
}

export interface CertificationsMegaMenuParentTerm {
  id: string;
  name: string;
  slug: string;
  certificationsMegaMenu?: CertificationsMegaMenuFields | null;
}

export interface CertificationsMegaMenuData {
  certificationsCategories: {
    nodes: CertificationsMegaMenuParentTerm[];
  };
}

export async function getCertificationsMegaMenuData(): Promise<CertificationsMegaMenuData> {
  try {
    return await client.request<CertificationsMegaMenuData>(GET_CERTIFICATIONS_MEGA_MENU);
  } catch (error: any) {
    console.error("Failed to fetch certifications mega menu data:", error);
    if (error.response?.errors) {
      error.response.errors.forEach(({ message }: { message: string }, idx: number) => {
        console.error(`  Error ${idx + 1}: ${message}`);
      });
    }
    throw error;
  }
}
// ==========================================
// HEADER SETTINGS (Resources + About dropdown)
// ==========================================

const RESOURCES_GROUP_FIELD = "headerResourcesDropdown";
const ABOUT_GROUP_FIELD = "headerAboutDropdown";

// ✅ GraphQL Query (Page slug: header-settings)
export const GET_HEADER_SETTINGS = gql`
  query HeaderSettings {
    pages(where: { name: "header-settings" }, first: 1) {
      nodes {
        id
        title

        headerResourcesDropdown {
          resourcesItem1Title
          resourcesItem1Subtitle
          resourcesItem1Url {
            nodes {
              uri
              link
            }
          }

          resourcesItem2Title
          resourcesItem2Subtitle
          resourcesItem2Url {
            nodes {
              uri
              link
            }
          }

          resourcesItem3Title
          resourcesItem3Subtitle
          resourcesItem3Url {
            nodes {
              uri
              link
            }
          }
        }

        headerAboutDropdown {
          aboutItem1Title
          aboutItem1Subtitle
          aboutItem1Url {
            nodes {
              uri
              link
            }
          }

          aboutItem2Title
          aboutItem2Subtitle
          aboutItem2Url {
            nodes {
              uri
              link
            }
          }

          aboutItem3Title
          aboutItem3Subtitle
          aboutItem3Url {
            nodes {
              uri
              link
            }
          }
        }
      }
    }
  }
`;

// -------------------------
// Types for ACF connection
// -------------------------
export type AcfContentNodeConnection = {
  nodes?: Array<{
    uri?: string | null;  // internal e.g. "/blog/"
    link?: string | null; // absolute e.g. "https://site.com/blog/"
  } | null> | null;
} | null;

export type HeaderNavItem = {
  title?: string | null;
  subtitle?: string | null;
  url?: string | null; // normalized url string
};

export type HeaderResourcesGroup = {
  resourcesItem1Title?: string | null;
  resourcesItem1Subtitle?: string | null;
  resourcesItem1Url?: AcfContentNodeConnection;

  resourcesItem2Title?: string | null;
  resourcesItem2Subtitle?: string | null;
  resourcesItem2Url?: AcfContentNodeConnection;

  resourcesItem3Title?: string | null;
  resourcesItem3Subtitle?: string | null;
  resourcesItem3Url?: AcfContentNodeConnection;
};

export type HeaderAboutGroup = {
  aboutItem1Title?: string | null;
  aboutItem1Subtitle?: string | null;
  aboutItem1Url?: AcfContentNodeConnection;

  aboutItem2Title?: string | null;
  aboutItem2Subtitle?: string | null;
  aboutItem2Url?: AcfContentNodeConnection;

  aboutItem3Title?: string | null;
  aboutItem3Subtitle?: string | null;
  aboutItem3Url?: AcfContentNodeConnection;
};

export interface HeaderSettingsData {
  pages: {
    nodes: Array<{
      id: string;
      title?: string | null;

      headerResourcesDropdown?: HeaderResourcesGroup | null;
      headerAboutDropdown?: HeaderAboutGroup | null;
    }>;
  };
}

// -------------------------
// Fetch function
// -------------------------
export async function getHeaderSettingsData(): Promise<HeaderSettingsData> {
  try {
    const data = await client.request<HeaderSettingsData>(GET_HEADER_SETTINGS);
    return data;
  } catch (error: any) {
    console.error("Failed to fetch header settings:", error);
    if (error.response?.errors) {
      error.response.errors.forEach(({ message }: { message: string }, idx: number) => {
        console.error(`  Error ${idx + 1}: ${message}`);
      });
    }
    throw error;
  }
}

// -------------------------
// Helpers (normalize)
// -------------------------
function pickUrlFromConnection(conn?: AcfContentNodeConnection): string | null {
  const node = conn?.nodes?.[0] ?? null;
  if (!node) return null;
  // Prefer internal uri (works well with Next.js <Link/>), fallback to full link
  return node.uri ?? node.link ?? null;
}

function safeText(v?: string | null): string | null {
  if (!v) return null;
  const s = String(v).trim();
  return s.length ? s : null;
}

/**
 * ✅ Convert the Resources/About group into clean items:
 * [{title, subtitle, url}]
 *
 * - If url is missing => "#"
 */
export function normalizeHeaderDropdownItems(
  group?: HeaderResourcesGroup | HeaderAboutGroup | null
): HeaderNavItem[] {
  if (!group) return [];

  // detect which group it is by presence of keys
  const isResources = "resourcesItem1Title" in (group as any);

  const makeItem = (
    title?: string | null,
    subtitle?: string | null,
    conn?: AcfContentNodeConnection
  ): HeaderNavItem | null => {
    const t = safeText(title);
    const sub = safeText(subtitle);
    const url = pickUrlFromConnection(conn);

    if (!t && !sub && !url) return null;

    return {
      title: t,
      subtitle: sub,
      url: safeText(url) ?? "#",
    };
  };

  if (isResources) {
    return [
      makeItem(
        (group as HeaderResourcesGroup).resourcesItem1Title,
        (group as HeaderResourcesGroup).resourcesItem1Subtitle,
        (group as HeaderResourcesGroup).resourcesItem1Url
      ),
      makeItem(
        (group as HeaderResourcesGroup).resourcesItem2Title,
        (group as HeaderResourcesGroup).resourcesItem2Subtitle,
        (group as HeaderResourcesGroup).resourcesItem2Url
      ),
      makeItem(
        (group as HeaderResourcesGroup).resourcesItem3Title,
        (group as HeaderResourcesGroup).resourcesItem3Subtitle,
        (group as HeaderResourcesGroup).resourcesItem3Url
      ),
    ].filter(Boolean) as HeaderNavItem[];
  }

  // About group
  return [
    makeItem(
      (group as HeaderAboutGroup).aboutItem1Title,
      (group as HeaderAboutGroup).aboutItem1Subtitle,
      (group as HeaderAboutGroup).aboutItem1Url
    ),
    makeItem(
      (group as HeaderAboutGroup).aboutItem2Title,
      (group as HeaderAboutGroup).aboutItem2Subtitle,
      (group as HeaderAboutGroup).aboutItem2Url
    ),
    makeItem(
      (group as HeaderAboutGroup).aboutItem3Title,
      (group as HeaderAboutGroup).aboutItem3Subtitle,
      (group as HeaderAboutGroup).aboutItem3Url
    ),
  ].filter(Boolean) as HeaderNavItem[];
}
