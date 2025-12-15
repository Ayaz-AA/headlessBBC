import { GraphQLClient, gql } from 'graphql-request'

const endpoint = process.env.WP_GRAPHQL_ENDPOINT || 'http://34.205.184.15:8080/graphql'

const authToken = process.env.WP_AUTH_TOKEN

export const client = new GraphQLClient(endpoint, {
  headers: authToken
    ? {
      Authorization: `Bearer ${authToken}`,
    }
    : undefined,
})

// GraphQL query to fetch homepage with ACF fields
// Using pages query to match the working GraphQL structure
export const GET_HOMEPAGE = gql`
  query GetHomepage {
    pages(where: {name: "bbc-home"}) {
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
`

// Alternative query to get page by database ID (uncomment if needed)
// export const GET_HOMEPAGE_BY_ID = gql`
//   query GetHomepage($id: ID!) {
//     page(id: $id, idType: DATABASE_ID) {
//       id
//       title
//       content
//       homepageFields {
//         # Your ACF fields here
//       }
//     }
//   }
// `

// Type definitions for ACF fields
export interface MediaItem {
  sourceUrl: string
  altText?: string | null
  mediaDetails?: {
    width?: number | null
    height?: number | null
  } | null
}

// Flexible type for ACF fields - adjust based on your actual ACF field structure
export interface HeroSection {
  heroTitle?: string | null
  // Add other hero section fields here as needed
}

export interface HomepageFields {
  // heroTitle is nested inside heroSection group
  heroSection?: HeroSection | null
  // Add other field groups here as needed
  [key: string]: any
}

export interface HomepageData {
  pages: {
    nodes: Array<{
      id: string
      databaseId: number
      title: string | null
      content: string | null
      slug: string | null
      uri: string | null
      homepageFields?: {
        homepageFields?: HomepageFields | null
      } | null
    }>
  }
}

// Function to fetch homepage data
export async function getHomepageData(): Promise<HomepageData> {
  try {
    const data = await client.request<HomepageData>(GET_HOMEPAGE)
    return data
  } catch (error: any) {
    console.error('Failed to fetch homepage data:', error)
    if (error.response?.errors) {
      error.response.errors.forEach(({ message }: { message: string }, idx: number) => {
        console.error(`  Error ${idx + 1}: ${message}`)
      })
    }
    throw error
  }
}

