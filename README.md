# Headless WordPress Next.js Site

A modern Next.js application with React and TypeScript for fetching and displaying content from a WordPress instance that exposes a GraphQL endpoint (via [WPGraphQL](https://www.wpgraphql.com/)).

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **GraphQL Request** - WordPress GraphQL client

## Setup

1. Copy `env.example` to `.env` and update the values:
   ```bash
   cp env.example .env
   ```
   - `WP_GRAPHQL_ENDPOINT` should point to your WordPress GraphQL URL (usually `https://your-site.com/graphql`).
   - Optionally set `WP_AUTH_TOKEN` if your endpoint requires a bearer token.

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

Build the production application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## WordPress Content Fetching

Fetch WordPress posts using the TypeScript script:
```bash
npm run fetch
```

Fetch a specific number of posts:
```bash
npm run fetch -- 10
```

The script prints basic details for each post and strips HTML tags from excerpts. Any GraphQL errors will be logged to the console.

## Project Structure

```
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout with metadata
│   └── page.tsx      # Home page
├── components/        # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Features.tsx
│   ├── Bootcamps.tsx
│   ├── WhatIsBootcamp.tsx
│   ├── Guide.tsx
│   ├── Certification.tsx
│   ├── FAQ.tsx
│   └── Footer.tsx
├── public/           # Static assets (images, etc.)
│   └── assets/
├── styles/           # Global CSS
│   └── main.css
└── src/             # Source files
    └── fetchWordPress.ts  # WordPress GraphQL client
```

## Next Steps

- Expand the GraphQL query in `src/fetchWordPress.ts` to include the fields you need.
- Create API routes in `app/api/` to fetch WordPress data server-side.
- Add more pages and routes as needed.
- Integrate WordPress content into the React components.
