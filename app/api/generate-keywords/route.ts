import { generateObject } from "ai"
import { z } from "zod"

const keywordSchema = z.object({
  keywords: z.array(
    z.object({
      persona: z.string().describe("The persona name"),
      variations: z.array(z.string()).length(3).describe("3 different search query variations"),
    }),
  ),
})

export async function POST(req: Request) {
  const { personas, businessInfo } = await req.json()

  const personaDescriptions = personas
    .map((p: any) => `${p.name} (${p.age}, ${p.occupation}): Goals - ${p.goals}. Pain Points - ${p.painPoints}`)
    .join("\n\n")

  const { object } = await generateObject({
    model: "openai/gpt-4o",
    schema: keywordSchema,
    prompt: `Given these customer personas for a ${businessInfo.businessType} in ${businessInfo.location}:

${personaDescriptions}

For each persona, generate 3 different ways they might type their search query into a search engine when looking for this business or its services.

The search queries should:
- Be realistic and natural (how real people search)
- Vary in length and specificity
- Include location when relevant
- Reflect the persona's goals and pain points
- Use different phrasings and word choices

Respond with 3 different search query variations for each persona.`,
  })

  return Response.json(object)
}
