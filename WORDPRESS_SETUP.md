# WordPress GraphQL Setup Guide

This guide explains how to connect your Next.js application to WordPress and fetch data from ACF (Advanced Custom Fields) using GraphQL.

## What Has Been Set Up

1. **GraphQL Client Utility** (`lib/wordpress.ts`)
   - Configured to connect to `https://blog.bestbootcamps.com/graphql`
   - Includes TypeScript types for ACF fields
   - Ready to fetch homepage data with ACF `homepage_fields` group

2. **Homepage Data Fetching** (`app/page.tsx`)
   - Updated to fetch data from WordPress on the server
   - Passes ACF data to all components
   - Falls back gracefully if WordPress data is unavailable

3. **Example Component Update** (`components/Hero.tsx`)
   - Updated to accept and use WordPress data
   - Falls back to default content if data is not available
   - Serves as a template for updating other components

4. **Test Script** (`src/testGraphQL.ts`)
   - Helps you discover available fields in your WordPress GraphQL API
   - Lists all pages and their properties

## Setup Steps

### 1. Create Environment File

Create a `.env` file in the root directory:

```bash
WP_GRAPHQL_ENDPOINT=https://blog.bestbootcamps.com/graphql
# Optional: Add if your endpoint requires authentication
# WP_AUTH_TOKEN=your-token-here
```

### 2. Test GraphQL Connection

Run the test script to see what fields are available:

```bash
npm run test-graphql
```

This will:
- List all pages in your WordPress site
- Show the homepage structure
- Help you identify available ACF fields

### 3. Update GraphQL Query

Based on the test results, update the GraphQL query in `lib/wordpress.ts`:

1. Open `lib/wordpress.ts`
2. Find the `GET_HOMEPAGE` query
3. Add your specific ACF field names inside the `homepageFields` block

Example:
```graphql
homepageFields {
  heroBadgeText
  heroHeading
  heroDescription
  heroImage {
    sourceUrl
    altText
    mediaDetails {
      width
      height
    }
  }
}
```

**Important Notes:**
- ACF field group name `homepage_fields` becomes `homepageFields` in GraphQL (camelCase)
- Individual field names are also in camelCase (e.g., `hero_badge_text` → `heroBadgeText`)
- Image fields need to query `sourceUrl`, `altText`, and `mediaDetails`
- Repeater fields return arrays
- Group fields return nested objects

### 4. Update TypeScript Types

After identifying your ACF fields, update the `HomepageFields` interface in `lib/wordpress.ts`:

```typescript
export interface HomepageFields {
  heroBadgeText?: string | null
  heroHeading?: string | null
  heroDescription?: string | null
  heroImage?: MediaItem | null
  // Add all your ACF fields here
}
```

### 5. Update Components

Update your components to use WordPress data. The `Hero` component serves as an example:

1. Import the `HomepageFields` type
2. Add a `data` prop to the component
3. Use the data with fallback to defaults

Example:
```typescript
interface ComponentProps {
  data?: HomepageFields | null
}

export default function Component({ data }: ComponentProps) {
  const title = data?.componentTitle || 'Default Title'
  // ... rest of component
}
```

## WordPress Requirements

Your WordPress site needs:

1. **WPGraphQL Plugin** - Provides the GraphQL endpoint
2. **ACF Plugin** - For custom fields
3. **ACF to GraphQL Plugin** (or WPGraphQL for ACF) - Exposes ACF fields to GraphQL

### Verify GraphQL Endpoint

Visit: `https://blog.bestbootcamps.com/graphql`

You should see a GraphQL playground or API explorer.

## Troubleshooting

### GraphQL Query Errors

If you get errors about unknown fields:
1. Run `npm run test-graphql` to see available fields
2. Check your ACF field group name (should be `homepage_fields`)
3. Verify the field names match exactly (case-sensitive, camelCase)

### Page Not Found

If `pageBy(uri: "/")` doesn't work, try:
- `page(id: "1", idType: DATABASE_ID)` - Use the page database ID
- `page(id: "home", idType: URI)` - Use page slug
- Check the test script output for the correct page identifier

### ACF Fields Not Showing

1. Ensure ACF to GraphQL plugin is installed and activated
2. Check that your ACF field group is set to show in GraphQL
3. Verify the field group location rules match your homepage

## Next Steps

1. ✅ Test the GraphQL connection
2. ✅ Identify your ACF field structure
3. ✅ Update the GraphQL query with your fields
4. ✅ Update TypeScript types
5. ✅ Update remaining components (About, Features, Bootcamps, etc.)

## Resources

- [WPGraphQL Documentation](https://www.wpgraphql.com/)
- [ACF to GraphQL](https://github.com/wp-graphql/wp-graphql-acf)
- [GraphQL Query Syntax](https://graphql.org/learn/queries/)

