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

// Try to get homepageFields with common field name variations
const TEST_HOMEPAGE_FIELDS = gql`
  query TestHomepageFields {
    pageBy(uri: "/") {
      id
      title
      homepageFields {
        # Try different possible field name formats
        heroTitle
        hero_title
        heroTitleText
        hero_title_text
      }
    }
  }
`

async function testACFFields() {
  console.log(`Testing ACF fields from: ${endpoint}\n`)

  try {
    const data = await client.request(TEST_HOMEPAGE_FIELDS)
    console.log('Homepage data:')
    console.log(JSON.stringify(data, null, 2))
  } catch (error: any) {
    console.error('Error fetching ACF fields:')
    if (error.response?.errors) {
      error.response.errors.forEach((err: any) => {
        console.error(`  - ${err.message}`)
      })
    } else {
      console.error(error.message ?? error)
    }
    
    // Try a simpler query to see what's available
    console.log('\nTrying to fetch homepageFields without specific fields...')
    try {
      const simpleQuery = gql`
        query SimpleHomepageFields {
          pageBy(uri: "/") {
            id
            title
            homepageFields {
              __typename
            }
          }
        }
      `
      const simpleData = await client.request(simpleQuery)
      console.log('Simple query result:')
      console.log(JSON.stringify(simpleData, null, 2))
    } catch (simpleError: any) {
      console.error('Simple query also failed:', simpleError.message)
    }
  }
}

testACFFields()

