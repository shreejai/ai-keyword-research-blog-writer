import OpenAI from "openai"

const apiKey = process.env.OPENAI_API_KEY

const openai = new OpenAI({ apiKey: apiKey });

export async function POST(req: Request) {
  try {
    // The 'question' variable is the user's input from the frontend
    const { question } = await req.json();
    // Here is where we communicate with the OpenAI API to create our chatbot.
    // We store the chatbot's response in the 'response' variable
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          // We give the chatbot a role with some content to determine how it will behave
          content:
            "You love Liverpool FC. Your name is Darwizzy and you have a personality similar to Darwin Nunez (a football player who currently plays for Liverpool). You have latin and scouse humour.",
        },
        {
          // We ask the chatbot to generate an answer based on the user's question
          // Remember, this question will come from the frontend
          role: "user",
          content: question,
        },
      ],
      // We choose the model we want to use for our chatbot
      model: "gpt-3.5-turbo",
      // We add a value for max_tokens to ensure the response won't exceed 300 tokens
      // This is to make sure the responses aren't too long
      max_tokens: 300,
    });
    // Then we return the response we receive from OpenAI
    // Note: This will only work once we set up our frontend logic
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    // Handle insufficient quota error
    if (error?.status === 429) {
      console.log("⚠️ Insufficient OpenAI quota - please check your plan and billing details");
    } else {
      console.log("OpenAI API error:", error?.message || error);
    }
    return new Response(JSON.stringify({ error: error?.message || "An error occurred" }), { 
      status: error?.status || 500 
    });
  }
}