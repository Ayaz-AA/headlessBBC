import 'dotenv/config.js'
import { GraphQLClient, gql } from 'graphql-request'

const endpoint = process.env.WP_GRAPHQL_ENDPOINT

if (!endpoint) {
  console.error('Missing WP_GRAPHQL_ENDPOINT in environment. Provide it in a .env file or environment variable.')
  process.exit(1)
}

const authToken = process.env.WP_AUTH_TOKEN

const client = new GraphQLClient(endpoint, {
  headers: authToken
    ? {
        Authorization: `Bearer ${authToken}`,
      }
    : undefined,
})

const GET_POSTS = gql`
  query GetPosts($first: Int!) {
    posts(first: $first) {
      nodes {
        id
        slug
        title
        excerpt
        date
      }
    }
  }
`

function stripHtml(input: string | null | undefined): string {
  return input ? input.replace(/<[^>]*>/g, '').trim() : ''
}

interface Post {
  id: string
  slug: string | null
  title: string | null
  excerpt: string | null
  date: string | null
}

interface PostsData {
  posts: {
    nodes: Post[]
  }
}

async function fetchPosts(first: number = 5): Promise<PostsData> {
  const variables = { first }
  return client.request<PostsData>(GET_POSTS, variables)
}

function parseLimit(arg: string | undefined): number | undefined {
  if (!arg) return undefined
  const parsed = Number(arg)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined
}

async function main() {
  const limit = parseLimit(process.argv[2]) ?? 5

  try {
    const data = await fetchPosts(limit)
    const posts = data?.posts?.nodes ?? []

    if (posts.length === 0) {
      console.log(`No posts returned from ${endpoint}`)
      return
    }

    console.log(`Fetched ${posts.length} posts from ${endpoint}`)
    console.log('---')

    posts.forEach((post, index) => {
      console.log(`#${index + 1}: ${post.title ?? 'Untitled Post'}`)
      if (post.slug) {
        console.log(`slug: ${post.slug}`)
      }
      if (post.date) {
        console.log(`date: ${new Date(post.date).toISOString()}`)
      }
      const excerpt = stripHtml(post.excerpt)
      if (excerpt) {
        console.log(`excerpt: ${excerpt}`)
      }
      console.log('---')
    })
  } catch (error: any) {
    console.error('Failed to fetch posts from WordPress GraphQL:')
    if (error.response?.errors) {
      error.response.errors.forEach(({ message }: { message: string }, idx: number) => {
        console.error(`  Error ${idx + 1}: ${message}`)
      })
    } else {
      console.error(error.message ?? error)
    }
    process.exit(1)
  }
}

main()

