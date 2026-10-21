import OpenAI from "openai"
import { openAIErrorResponse } from "@/lib/openai-error"

const apiKey = process.env.OPENAI_API_KEY

const openai = new OpenAI({ apiKey: apiKey })

export async function POST(req: Request) {
  try {
    const { topic, keywords, businessInfo } = await req.json()

    const keywordList = keywords.join(", ")

    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that writes comprehensive, SEO-optimized blog posts.",
        },
        {
          role: "user",
          content: `Write a comprehensive, SEO-optimized blog post about: "${topic}"

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
        },
      ],
      max_tokens: 3000,
      stream: true,
    })

    // Create a readable stream
    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || ""
            if (content) {
              controller.enqueue(encoder.encode(content))
            }
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
      },
    })
  } catch (error: any) {
    return openAIErrorResponse(error, "blog")
  }
}
