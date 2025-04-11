"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

interface Message {
  role: "assistant" | "user"
  content: string
}

interface AIChatProps {
  initialMessages?: Message[]
  placeholder?: string
}

export function AIChat({
  initialMessages = [
    {
      role: "assistant",
      content: "Hello! I'm your AI study assistant. How can I help you today?",
    },
  ],
  placeholder = "Ask a question or request study materials...",
}: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: inputValue }])

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm analyzing your request. Here's what I can help you with based on your question. Would you like me to generate study materials, explain a concept, or create practice questions?",
        },
      ])
    }, 1000)

    setInputValue("")
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
            <div className={`flex items-start gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className="h-8 w-8 mt-0.5">
                {message.role === "assistant" ? (
                  <>
                    <AvatarImage src="/abstract-ai-network.png" alt="AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </>
                ) : (
                  <>
                    <AvatarImage src="/diverse-students-studying.png" alt="You" />
                    <AvatarFallback>You</AvatarFallback>
                  </>
                )}
              </Avatar>
              <div
                className={`rounded-lg p-3 ${message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"}`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex w-full items-center space-x-2">
          <Textarea
            placeholder={placeholder}
            className="flex-1 min-h-[60px]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
