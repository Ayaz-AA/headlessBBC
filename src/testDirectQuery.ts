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

// Try querying the page by database ID instead of URI
const TEST_BY_ID = gql`
  query TestByID {
    page(id: "8", idType: DATABASE_ID) {
      id
      title
      homepageFields {
        heroTitle
      }
    }
  }
`

// Try querying without specifying fields (if the schema supports it)
const TEST_ALL_FIELDS = gql`
  query TestAllFields {
    pageBy(uri: "/") {
      id
      title
      homepageFields {
        __typename
      }
    }
  }
`

async function testDirect() {
  console.log(`Testing direct queries to: ${endpoint}\n`)

  console.log('1. Testing by Database ID (8):')
  try {
    const data1 = await client.request(TEST_BY_ID)
    console.log('✓ Success!')
    console.log(JSON.stringify(data1, null, 2))
  } catch (error: any) {
    if (error.response?.errors) {
      error.response.errors.forEach((err: any) => {
        console.log(`  ✗ ${err.message}`)
      })
    }
  }

  console.log('\n2. Testing homepageFields structure:')
  try {
    const data2 = await client.request(TEST_ALL_FIELDS)
    console.log('✓ Success!')
    console.log(JSON.stringify(data2, null, 2))
  } catch (error: any) {
    if (error.response?.errors) {
      error.response.errors.forEach((err: any) => {
        console.log(`  ✗ ${err.message}`)
      })
    }
  }

  console.log('\n---')
  console.log('If heroTitle still doesn\'t appear:')
  console.log('1. Make sure the field group "HomePage Fields" location rules include the homepage')
  console.log('2. Try saving the field group again in WordPress')
  console.log('3. Check if there are any GraphQL cache settings to clear')
  console.log('4. Verify the ACF to GraphQL plugin is active and up to date')
}

testDirect()

