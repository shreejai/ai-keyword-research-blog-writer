# ContentAI – Keyword Research, Blog Writer & Social Caption Generator

ContentAI is a Next.js app that helps you go from **business idea → customer personas → keyword research → SEO blog post → social media caption + hashtags** in one flow.

### Features

- **Business & audience intake**: Describe your business type and location to ground all later AI outputs.
- **AI-generated personas**: Create detailed customer personas, including goals, pain points, and search behaviour.
- **Keyword research assistant**: Generate realistic search queries (long-tail and intent-rich) for each persona.
- **SEO blog writer**:
  - Streams a full blog post using your selected topic and generated keywords.
  - Writes in a professional, conversational tone with headings and structure.
- **Social media caption & hashtags**:
  - Generates a high-engagement caption for platforms like Instagram.
  - Produces a mix of niche and broad hashtags optimised for reach and engagement.

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript, React 19
- **Styling**: Tailwind CSS + custom components
- **AI**: OpenAI (`gpt-4o`) via the official `openai` Node SDK

### Getting Started

#### 1. Prerequisites

- Node.js 18+ (recommended)
- A valid **OpenAI API key**

#### 2. Install dependencies

Using npm:

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

#### 3. Environment variables

Create a `.env.local` file in the project root (if it does not already exist) and add:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

This key is used by:

- `app/api/generate-personas/route.ts`
- `app/api/generate-keywords/route.ts`
- `app/api/generate-blog/route.ts`
- `app/api/generate-caption/route.ts`

#### 4. Run the dev server

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

- The **marketing/landing page** is served from `/`.
- The main **app experience** (personas → keywords → blog → caption) starts after login at `/app`.

### How to Use

1. **Enter business details**
   - Provide your business type and location.
2. **Review personas**
   - The app generates multiple buyer personas you can read through.
3. **Generate keywords**
   - Click to generate search queries for each persona.
4. **Write a blog**
   - Go to the Blog Writer step, choose a topic, and generate a complete blog post that uses your keywords.
5. **Generate social caption**
   - After the blog is generated, use the **“Generate Social Caption”** button to get:
     - An engagement-focused caption.
     - A list of hashtags ready to copy into your social posts.

### Scripts

- **`npm run dev`** – Start the development server.
- **`npm run build`** – Create a production build.
- **`npm start`** – Run the production build.
- **`npm run lint`** – Run ESLint on the codebase.

### Notes & Limitations

- The quality of personas, keywords, blogs, and captions depends on the quality of your business description and topic.
- OpenAI usage is billable via your own API key; monitor your usage and quota on your OpenAI dashboard.

### Contributing

Issues, suggestions, and pull requests are welcome. If you extend the app (e.g., add more platforms or tones for captions), try to keep the UX simple and focused on the end-to-end content workflow.

