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

// Try different ways to query heroTitle
const TEST_QUERIES = [
  {
    name: 'Direct heroTitle in homepageFields',
    query: gql`
      query {
        pageBy(uri: "/") {
          homepageFields {
            heroTitle
          }
        }
      }
    `
  },
  {
    name: 'heroTitle at page level',
    query: gql`
      query {
        pageBy(uri: "/") {
          heroTitle
        }
      }
    `
  },
  {
    name: 'All fields in homepageFields (if supported)',
    query: gql`
      query {
        pageBy(uri: "/") {
          homepageFields {
            __typename
          }
        }
      }
    `
  }
]

async function testHeroTitle() {
  console.log(`Testing heroTitle field from: ${endpoint}\n`)

  for (const test of TEST_QUERIES) {
    console.log(`\nTesting: ${test.name}`)
    try {
      const data = await client.request(test.query)
      console.log('✓ Success!')
      console.log(JSON.stringify(data, null, 2))
      break // If one works, we found it
    } catch (error: any) {
      if (error.response?.errors) {
        error.response.errors.forEach((err: any) => {
          console.log(`  ✗ ${err.message}`)
        })
      } else {
        console.log(`  ✗ ${error.message}`)
      }
    }
  }
  
  console.log('\n---')
  console.log('If all queries failed, the field may need to be enabled in WordPress:')
  console.log('1. Go to Custom Fields → Field Groups → homepage_fields')
  console.log('2. Edit the hero_title field')
  console.log('3. Under "Show in GraphQL", make sure it\'s enabled')
  console.log('4. The GraphQL Field Name should be set to "heroTitle"')
}

testHeroTitle()

