import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

// Initialize the Google Generative AI model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set")
    }

    // Create a system prompt for battery technology
    const systemPrompt =
      "You are BatteryTech Assistant, an AI specialized in battery technology. " +
      "Provide accurate, helpful information about batteries, energy storage, " +
      "and related technologies. Focus on being educational and informative. " +
      "If asked about topics unrelated to battery technology, politely redirect " +
      "the conversation back to your area of expertise."

    // Format the conversation for the Google API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 1000,
      },
      history: [
        {
          role: "user",
          parts: [{ text: "System instruction: " + systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "I understand and will act as the BatteryTech Assistant." }],
        },
      ],
    })

    // Map user messages to the correct format for Google's API
    // Skip the first assistant message as it's already in the history
    const startIdx = messages[0].role === "assistant" ? 1 : 0
    for (let i = startIdx; i < messages.length; i++) {
      const msg = messages[i]
      const role = msg.role === "assistant" ? "model" : "user"
      await chat.sendMessage([{ text: msg.content }])
    }

    // Get the response from the model
    const result = await chat.sendMessage([{ text: messages[messages.length - 1].content }])
    const response = await result.response
    const text = response.text()

    // Stream the response back to the client
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        // Send the complete text in one chunk
        controller.enqueue(encoder.encode(text))
        controller.close()
      },
    })

    return new Response(stream)
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}