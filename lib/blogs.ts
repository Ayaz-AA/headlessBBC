import { gql } from "graphql-request";
import { client } from "@/lib/wordpress";

// 1) Blogs listing hero (your Blogs page databaseId is 1252)
export const GET_BLOGS_LISTING_HERO = gql`
  query BlogsPageHero($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      blogListingHero {
        heroLabel
        titleLine1
        titleLine2
        heroDescription
        heroCtaLabel
        heroImage {
          node {
            sourceUrl
            altText
          }
        }
        heroCtaLink {
          edges {
            node {
              uri
            }
          }
        }
      }
    }
  }
`;

export async function getBlogsListingHero(pageDbId = "1252") {
  return client.request(GET_BLOGS_LISTING_HERO, { id: pageDbId });
}

// 2) Get blog topics for dropdowns
export const GET_BLOG_TOPICS = gql`
  query BlogTopicsForFilters {
    blogTopics(first: 500) {
      nodes {
        name
        slug
        parent {
          node {
            slug
            name
          }
        }
      }
    }
  }
`;
export async function getBlogTopics() {
  return client.request(GET_BLOG_TOPICS);
}

// 3) All blogs (cursor pagination)
export const GET_BLOGS_ALL = gql`
  query BlogsAll($first: Int!, $after: String) {
    blogs(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        title
        slug
        date
        excerpt
        blogFields {
          authorName
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        blogTopics {
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
      }
    }
  }
`;
export async function getBlogsAll(first = 12, after?: string | null) {
  return client.request(GET_BLOGS_ALL, { first, after: after ?? null });
}

// 4) Blogs by topic (child OR parent topic term)
export const GET_BLOGS_BY_TOPIC = gql`
  query BlogsByTopic($topicSlug: ID!, $first: Int!, $after: String) {
    blogTopic(id: $topicSlug, idType: SLUG) {
      name
      slug
      blogs(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          title
          slug
          date
          excerpt
          blogFields {
            authorName
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          blogTopics {
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
        }
      }
    }
  }
`;
export async function getBlogsByTopic(topicSlug: string, first = 9, after?: string | null) {
  return client.request(GET_BLOGS_BY_TOPIC, { topicSlug, first, after: after ?? null });
}

// 5) Blog detail by slug
export const GET_BLOG_DETAIL = gql`
  query BlogDetail($slug: ID!) {
    blog(id: $slug, idType: SLUG) {
      title
      slug
      date
      content
      excerpt
      blogFields {
        authorName
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      blogTopics {
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
    }
  }
`;
export async function getBlogBySlug(slug: string) {
  return client.request(GET_BLOG_DETAIL, { slug });
}

// Helpers
export function getPrimaryChildTopicSlug(blog: any) {
  const nodes = blog?.blogTopics?.nodes ?? [];
  const child = nodes.find((t: any) => !!t?.parent?.node?.slug);
  return child?.slug ?? null;
}

/**
 * ===========================================================
 * ✅ FIXED TOTAL PAGES + CURSORS (no offsetPagination needed)
 * ===========================================================
 *
 * Why your old getTotalBlogPages returned 7:
 * - It increments pages using hasNextPage/endCursor from a query that can
 *   return repeated cursors depending on ordering/caching.
 * - It does NOT ensure the last partial page is counted correctly when API
 *   behavior is odd.
 *
 * New approach:
 * - Fetch ONLY databaseId (fast)
 * - Count total posts
 * - totalPages = ceil(total/perPage)
 * - Also build cursors[] so page numbers can map to `after`
 */

// lightweight IDs-only query (fast)
const GET_BLOG_IDS_PAGE = gql`
  query BlogIdsPage($first: Int!, $after: String) {
    blogs(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        databaseId
      }
    }
  }
`;

const GET_BLOG_IDS_BY_TOPIC_PAGE = gql`
  query BlogIdsByTopicPage($topicSlug: ID!, $first: Int!, $after: String) {
    blogTopic(id: $topicSlug, idType: SLUG) {
      blogs(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          databaseId
        }
      }
    }
  }
`;

// ✅ returns { totalPages, total, cursors[] }
export async function getBlogsPaginationMeta(perPage = 9) {
  let after: string | null = null;
  let total = 0;
  const cursors: string[] = [];

  // guard against infinite loops if WPGraphQL misbehaves
  for (let i = 0; i < 500; i++) {
    const res: any = await client.request(GET_BLOG_IDS_PAGE, { first: perPage, after });

    const conn = res?.blogs;
    const nodes = conn?.nodes ?? [];
    total += nodes.length;

    const hasNext = !!conn?.pageInfo?.hasNextPage;
    const endCursor = conn?.pageInfo?.endCursor ?? null;

    if (!hasNext || !endCursor) break;

    // ✅ store cursor for NEXT page navigation
    cursors.push(endCursor);
    after = endCursor;
  }

  const totalPages = Math.max(1, Math.ceil(total / perPage));
  return { totalPages, total, cursors };
}

// ✅ returns { totalPages, total, cursors[] } for a topic
export async function getTopicPaginationMeta(topicSlug: string, perPage = 9) {
  let after: string | null = null;
  let total = 0;
  const cursors: string[] = [];

  for (let i = 0; i < 500; i++) {
    const res: any = await client.request(GET_BLOG_IDS_BY_TOPIC_PAGE, {
      topicSlug,
      first: perPage,
      after,
    });

    const conn = res?.blogTopic?.blogs;
    const nodes = conn?.nodes ?? [];
    total += nodes.length;

    const hasNext = !!conn?.pageInfo?.hasNextPage;
    const endCursor = conn?.pageInfo?.endCursor ?? null;

    if (!hasNext || !endCursor) break;

    cursors.push(endCursor);
    after = endCursor;
  }

  const totalPages = Math.max(1, Math.ceil(total / perPage));
  return { totalPages, total, cursors };
}

/**
 * ✅ Backwards-compatible helpers (if your pages already call these)
 * They now return correct totals.
 */
export async function getTotalBlogPages(perPage = 9) {
  const meta = await getBlogsPaginationMeta(perPage);
  return meta.totalPages;
}

export async function getTotalTopicPages(topicSlug: string, perPage = 9) {
  const meta = await getTopicPaginationMeta(topicSlug, perPage);
  return meta.totalPages;
}
