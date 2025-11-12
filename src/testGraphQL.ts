import 'dotenv/config.js'
import { GraphQLClient, gql } from 'graphql-request'

const endpoint = process.env.WP_GRAPHQL_ENDPOINT || 'http://34.236.237.236:8080/graphql'

const authToken = process.env.WP_AUTH_TOKEN

const client = new GraphQLClient(endpoint, {
  headers: authToken
    ? {
        Authorization: `Bearer ${authToken}`,
      }
    : undefined,
})

// Query to introspect available fields
const INTROSPECT_PAGE = gql`
  query IntrospectPage {
    __type(name: "Page") {
      name
      fields {
        name
        type {
          name
          kind
        }
      }
    }
  }
`

// Query to get homepage and see what fields are available
const GET_HOMEPAGE_INTROSPECT = gql`
  query GetHomepageIntrospect {
    pageBy(uri: "/") {
      id
      databaseId
      title
      slug
      uri
      # Try to get homepageFields
      homepageFields {
        __typename
      }
    }
  }
`

// Query to list all pages
const LIST_PAGES = gql`
  query ListPages {
    pages(first: 10) {
      nodes {
        id
        databaseId
        title
        slug
        uri
      }
    }
  }
`

async function testConnection() {
  console.log(`Testing connection to: ${endpoint}\n`)

  try {
    // Test 1: List pages
    console.log('1. Listing pages...')
    const pagesData = await client.request(LIST_PAGES)
    console.log('Pages found:', pagesData.pages?.nodes?.length || 0)
    if (pagesData.pages?.nodes?.length > 0) {
      pagesData.pages.nodes.forEach((page: any) => {
        console.log(`   - ${page.title} (ID: ${page.databaseId}, slug: ${page.slug}, uri: ${page.uri})`)
      })
    }
    console.log('')

    // Test 2: Get homepage by URI
    console.log('2. Getting homepage by URI "/"...')
    try {
      const homepageData = await client.request(GET_HOMEPAGE_INTROSPECT)
      console.log('Homepage found:', homepageData.pageBy ? 'Yes' : 'No')
      if (homepageData.pageBy) {
        console.log('   ID:', homepageData.pageBy.id)
        console.log('   Database ID:', homepageData.pageBy.databaseId)
        console.log('   Title:', homepageData.pageBy.title)
        console.log('   Slug:', homepageData.pageBy.slug)
        console.log('   URI:', homepageData.pageBy.uri)
        console.log('   homepageFields:', homepageData.pageBy.homepageFields ? 'Available' : 'Not available')
      }
    } catch (error: any) {
      console.log('   Error:', error.message)
      if (error.response?.errors) {
        error.response.errors.forEach((err: any) => {
          console.log(`   - ${err.message}`)
        })
      }
    }
    console.log('')

    // Test 3: Try introspection (if enabled)
    console.log('3. Attempting type introspection...')
    try {
      const introspectData = await client.request(INTROSPECT_PAGE)
      if (introspectData.__type) {
        console.log('Available fields on Page type:')
        const fields = introspectData.__type.fields || []
        fields.forEach((field: any) => {
          if (field.name.includes('homepage') || field.name.includes('Homepage')) {
            console.log(`   - ${field.name} (${field.type?.name || field.type?.kind})`)
          }
        })
      }
    } catch (error: any) {
      console.log('   Introspection not available or failed:', error.message)
    }

  } catch (error: any) {
    console.error('Connection failed:')
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

testConnection()

