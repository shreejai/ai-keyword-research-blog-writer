import OpenAI from "openai"

const apiKey = process.env.OPENAI_API_KEY

const openai = new OpenAI({ apiKey: apiKey })

export async function POST(req: Request) {
  try {
    const { businessType, location } = await req.json()

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates customer personas in JSON format.",
        },
        {
          role: "user",
          content: `Create 4 detailed customer personas for a ${businessType} business located in ${location}. 
    
Each persona should represent someone who would be interested in buying products or services from this business.

For each persona, include:
- A realistic name
- Age (vary the ages across personas)
- Occupation
- Their goals related to this business
- Pain points they're experiencing
- How they typically search for solutions online

Make the personas diverse and realistic for the ${location} area.

Respond with a JSON object with this structure:
{
  "personas": [
    {
      "name": "string",
      "age": number,
      "occupation": "string",
      "goals": "string",
      "painPoints": "string",
      "searchBehavior": "string"
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
