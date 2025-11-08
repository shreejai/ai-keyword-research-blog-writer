import OpenAI from "openai"

const apiKey = process.env.OPENAI_API_KEY

const openai = new OpenAI({ apiKey: apiKey })

export async function POST(req: Request) {
  try {
    const { personas, businessInfo } = await req.json()

    const personaDescriptions = personas
      .map((p: any) => `${p.name} (${p.age}, ${p.occupation}): Goals - ${p.goals}. Pain Points - ${p.painPoints}`)
      .join("\n\n")

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates keyword search queries in JSON format.",
        },
        {
          role: "user",
          content: `Given these customer personas for a ${businessInfo.businessType} in ${businessInfo.location}:

${personaDescriptions}

For each persona, generate 3 different ways they might type their search query into a search engine when looking for this business or its services.

The search queries should:
- Be realistic and natural (how real people search)
- Vary in length and specificity
- Include location when relevant
- Reflect the persona's goals and pain points
- Use different phrasings and word choices

Respond with a JSON object with this structure:
{
  "keywords": [
    {
      "persona": "Persona Name",
      "variations": ["query 1", "query 2", "query 3"]
    }
  ]
}`,
        },
      ],
      response_format: { type: "json_object" },
    })

    const result = JSON.parse(response.choices[0].message.content || "{}")
    return Response.json(result)
  } catch (error: any) {
    if (error?.status === 429) {
      console.log("⚠️ Insufficient OpenAI quota - please check your plan and billing details")
    } else {
      console.log("OpenAI API error:", error?.message || error)
    }
    return new Response(JSON.stringify({ error: error?.message || "An error occurred" }), {
      status: error?.status || 500,
    })
  }
}
