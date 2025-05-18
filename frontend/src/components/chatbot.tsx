"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from 'lucide-react'

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your BatteryTech Assistant. Ask me anything about battery technology!",
      role: "assistant",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamedResponse, setStreamedResponse] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamedResponse])

  // Focus input on component mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setIsStreaming(true)
    setStreamedResponse("")

    try {
      // Call the API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("Server responded with error:", response.status, errorData)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Process the response
      const reader = response.body?.getReader()
      if (!reader) throw new Error("Response body is null")

      const decoder = new TextDecoder()
      let done = false
      let accumulated = ""

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading

        if (value) {
          const chunk = decoder.decode(value, { stream: true })
          accumulated += chunk
          setStreamedResponse(accumulated)
        }
      }

      // Add the complete assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: accumulated || "I'm sorry, I couldn't generate a response.",
        role: "assistant",
      }
      
      setMessages((prev) => [...prev, assistantMessage])
      setStreamedResponse("")
    } catch (error) {
      console.error("Error sending message:", error)
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again later. Make sure your API key is correctly set up.",
        role: "assistant",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsStreaming(false)
      // Focus back on input after response
      inputRef.current?.focus()
    }
  }

  return (
    <div className="flex h-[calc(100vh-57px)] flex-col w-full max-w-full overflow-hidden">
      <ScrollArea className="flex-1 p-2 sm:p-4">
        <div className="space-y-4 pb-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`rounded-lg px-3 py-2 sm:px-4 sm:py-2 max-w-[85%] sm:max-w-[80%] break-words ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isStreaming && streamedResponse && (
            <div className="flex justify-start">
              <div className="rounded-lg px-3 py-2 sm:px-4 sm:py-2 max-w-[85%] sm:max-w-[80%] break-words bg-muted">
                {streamedResponse}
              </div>
            </div>
          )}
          {isLoading && !streamedResponse && (
            <div className="flex justify-start">
              <div className="rounded-lg px-3 py-2 sm:px-4 sm:py-2 max-w-[85%] sm:max-w-[80%] bg-muted">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground delay-75"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form 
        onSubmit={handleSubmit} 
        className="border-t p-2 sm:p-4 flex items-center space-x-2 max-w-3xl mx-auto w-full"
      >
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about battery technology..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={isLoading || !input.trim()}
          className="shrink-0"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  )
}
