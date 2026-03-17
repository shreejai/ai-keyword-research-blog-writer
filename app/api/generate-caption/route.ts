import OpenAI from "openai"

const apiKey = process.env.OPENAI_API_KEY

const openai = new OpenAI({ apiKey })

export async function POST(req: Request) {
  try {
    const {
      blogContent,
      topic,
      businessInfo,
      platform = "Instagram",
      tone = "engaging and conversational",
    } = await req.json()

    const prompt = `You are an expert social media marketer.

Business context:
- Business Type: ${businessInfo?.businessType || "N/A"}
- Location: ${businessInfo?.location || "N/A"}

Content to promote (blog summary / key ideas):
${blogContent || topic}

Task:
Create a highly engaging social media caption tailored for ${platform}.

Requirements:
1. Write a single, scroll-stopping caption in a ${tone} tone.
2. Aim for maximum engagement (likes, comments, saves, shares).
3. Include a clear call-to-action that fits organic social (no "click the link in bio" if irrelevant).
4. Use simple language and be easy to skim.
5. Avoid sounding like an ad; feel like a helpful creator/brand.
6. Do NOT include hashtags inside the main caption text.

Then generate relevant hashtags optimized for reach and engagement:
- Mix of broad and niche hashtags.
- Avoid banned or spammy hashtags.
- Do not number or bullet the hashtags.

Respond STRICTLY in this JSON format:
{
  "caption": "your caption here",
  "hashtags": ["#tagone", "#tagtwo", "#tagthree"]
}`

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a social media marketing expert who writes viral captions and optimized hashtags.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    })

    const content = response.choices[0].message.content || "{}"
    const parsed = JSON.parse(content)

    return Response.json({
      caption: parsed.caption || "",
      hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags : [],
    })
  } catch (error: any) {
    if (error?.status === 429) {
      console.log("⚠️ Insufficient OpenAI quota - please check your plan and billing details")
    } else {
      console.log("OpenAI API error (caption):", error?.message || error)
    }

    return new Response(JSON.stringify({ error: error?.message || "An error occurred" }), {
      status: error?.status || 500,
    })
  }
}

