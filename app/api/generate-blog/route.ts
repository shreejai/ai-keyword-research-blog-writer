import { streamText } from "ai"

export async function POST(req: Request) {
  const { topic, keywords, businessInfo } = await req.json()

  const keywordList = keywords.join(", ")

  const result = streamText({
    model: "openai/gpt-4o",
    prompt: `Write a comprehensive, SEO-optimized blog post about: "${topic}"

Context:
- Business Type: ${businessInfo.businessType}
- Location: ${businessInfo.location}
- Target Keywords: ${keywordList}

Requirements:
1. Write an engaging, informative blog post (800-1200 words)
2. Naturally incorporate these keywords throughout: ${keywordList}
3. Include a compelling title
4. Use clear headings and subheadings
5. Write in a professional but conversational tone
6. Include actionable insights and tips
7. Make it valuable for readers searching for these keywords
8. Optimize for SEO while maintaining readability

Format the blog post with proper structure including title, introduction, body sections with headings, and conclusion.`,
    maxOutputTokens: 3000,
  })

  return new Response(result.textStream, {
    headers: {
      "Content-Type": "text/plain",
      "Transfer-Encoding": "chunked",
    },
  })
}
