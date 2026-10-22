// Converts an OpenAI SDK error into a JSON response with a message that is safe to show users
export function openAIErrorResponse(error: any, context: string) {
  const status = error?.status || 500
  let message = "Something went wrong while generating content. Please try again."

  if (status === 429 && error?.code === "insufficient_quota") {
    console.log("⚠️ Insufficient OpenAI quota - please check your plan and billing details")
    message = "This demo has reached its AI usage limit, so content generation is temporarily unavailable. Please check back later."
  } else if (status === 429) {
    console.log(`OpenAI rate limit hit (${context})`)
    message = "This demo has reached its request limit for now. Please wait a minute and try again."
  } else {
    console.log(`OpenAI API error (${context}):`, error?.message || error)
  }

  return Response.json({ error: message }, { status })
}
