import { generateObject } from "ai"
import { z } from "zod"

const personaSchema = z.object({
  personas: z
    .array(
      z.object({
        name: z.string().describe("A realistic name for this persona"),
        age: z.number().describe("Age of the persona"),
        occupation: z.string().describe("Their job or occupation"),
        goals: z.string().describe("What they want to achieve"),
        painPoints: z.string().describe("Their challenges or problems"),
        searchBehavior: z.string().describe("How they search for solutions online"),
      }),
    )
    .length(4)
    .describe("Generate exactly 4 customer personas"),
})

export async function POST(req: Request) {
  const { businessType, location } = await req.json()

  const { object } = await generateObject({
    model: "openai/gpt-4o",
    schema: personaSchema,
    prompt: `Create 4 detailed customer personas for a ${businessType} business located in ${location}. 
    
    Each persona should represent someone who would be interested in buying products or services from this business.
    
    For each persona, include:
    - A realistic name
    - Age (vary the ages across personas)
    - Occupation
    - Their goals related to this business
    - Pain points they're experiencing
    - How they typically search for solutions online
    
    Make the personas diverse and realistic for the ${location} area.`,
  })

  return Response.json(object)
}
