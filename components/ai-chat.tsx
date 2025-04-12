"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, FileText, BookOpen, ListChecks, Headphones } from "lucide-react"
import { GeneratedContent } from "@/components/generated-content"
import { Message } from "@/hooks/use-conversations"
import { COMMANDS } from "@/components/command-input"

interface AIChatProps {
  initialMessages: Message[]
  placeholder?: string
  onGenerateContent?: (type: string) => void
  onSendMessage?: (message: string) => void
  onSaveContent?: () => void
  onExportContent?: () => void
  onRegenerateContent?: () => void
}

export function AIChat({
  initialMessages,
  placeholder = "Ask a question or request study materials...",
  onGenerateContent,
  onSendMessage,
  onSaveContent = () => console.log("Saving content"),
  onExportContent = () => console.log("Exporting content"),
  onRegenerateContent = () => console.log("Regenerating content")
}: AIChatProps) {
  const [inputValue, setInputValue] = useState("")
  const [showCommands, setShowCommands] = useState(false)
  const [commandFilter, setCommandFilter] = useState("")
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  
  // Store a stable reference to the messages
  const messagesRef = useRef<Message[]>([])
  
  // Update the ref when initialMessages changes
  useEffect(() => {
    messagesRef.current = initialMessages
    
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        // Add a small delay to ensure DOM updates are complete
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight
        }, 50)
      }
    }
  }, [initialMessages])
  
  // Handle @ detection and command filtering
  useEffect(() => {
    const match = inputValue.match(/@(\w*)$/)
    if (match) {
      setShowCommands(true)
      setCommandFilter(match[1])
      setSelectedCommandIndex(0)
    } else {
      setShowCommands(false)
    }
  }, [inputValue])

  // Filter commands based on what the user has typed after @
  const filteredCommands = COMMANDS.filter((command) =>
    command.name.toLowerCase().includes(commandFilter.toLowerCase())
  )

  // Insert the selected command into the input
  const insertCommand = (command: any) => {
    // Replace the @partial with the full command tag
    const newValue = inputValue.replace(/@\w*$/, command.tag + " ")
    setInputValue(newValue)
    setShowCommands(false)
    
    // Focus back on input and place cursor at the end
    if (inputRef.current) {
      inputRef.current.focus()
      const length = newValue.length
      inputRef.current.setSelectionRange(length, length)
    }
  }

  // Handle keyboard navigation in the dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showCommands) {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedCommandIndex((prev) => 
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedCommandIndex((prev) => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        if (filteredCommands.length > 0) {
          insertCommand(filteredCommands[selectedCommandIndex])
        }
      } else if (e.key === "Escape") {
        e.preventDefault()
        setShowCommands(false)
      }
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle sending message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    // Call the parent handler if provided
    if (onSendMessage) {
      onSendMessage(inputValue)
    }
    
    setInputValue("")
  }

  // Render typing indicator
  const renderTypingIndicator = () => {
    return (
      <div className="flex items-center space-x-1">
        <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
      </div>
    )
  }

  // Memoize message rendering to avoid unnecessary re-renders
  const renderMessage = (message: Message, index: number) => {
    // Handle different message types
    if (message.isGenerating) {
      return (
        <div key={`typing-${index}`} className="flex justify-start mb-4">
          <div className="flex items-start gap-3 max-w-[80%]">
            <Avatar className="h-9 w-9 mt-0.5 ring-2 ring-primary/20 shadow-sm">
              <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
            </Avatar>
            <div className="rounded-lg py-2 px-3 bg-muted relative overflow-hidden" style={{background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--muted)/0.5) 100%)'}}>
              {renderTypingIndicator()}
            </div>
          </div>
        </div>
      )
    } else if (message.contentType && message.contentType !== "text") {
      return (
        <div key={`generated-${index}`} className="flex justify-start mb-4">
          <div className="flex items-start gap-3 max-w-[95%]">
            <Avatar className="h-8 w-8 mt-0.5">
              <AvatarImage src="/abstract-ai-network.png" alt="AI" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="w-full max-w-3xl">
              <div className="rounded-lg p-3 bg-muted mb-2">
                {message.content}
              </div>
              <GeneratedContent 
                type={message.contentType as "study-guide" | "flashcards" | "quiz" | "audio"}
                title={message.generatedContent?.title || message.contentType || ""}
                content={message.generatedContent?.content || ""}
                onSave={onSaveContent}
                onExport={onExportContent}
                onRegenerateRequest={onRegenerateContent}
              />
            </div>
          </div>
        </div>
      )
    } else {
      const isUserMessage = message.role === "user"
      
      return (
        <div key={`message-${index}`} className={`flex ${isUserMessage ? "justify-end" : "justify-start"} mb-4`}>
          <div className={`flex items-start gap-3 max-w-[80%] ${isUserMessage ? "flex-row-reverse" : ""}`}>
            <Avatar className={`h-9 w-9 mt-0.5 ${isUserMessage ? 'ring-2 ring-accent/20' : 'ring-2 ring-primary/20'} shadow-sm`}>
              {isUserMessage ? (
                <AvatarFallback className="bg-accent text-accent-foreground">You</AvatarFallback>
              ) : (
                <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
              )}
            </Avatar>
            <div className={`rounded-lg p-3 ${isUserMessage ? "bg-primary text-primary-foreground gradient-bg" : "bg-muted relative overflow-hidden"}`} style={!isUserMessage ? {background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--muted)/0.5) 100%)'} : {}}>
              {message.content}
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ScrollArea className="flex-1 px-2 md:px-4 pt-2 pb-4 h-full chat-scroll-area" ref={scrollAreaRef}>
        <div className="pb-16 md:pb-4"> {/* Added bottom padding for mobile to account for nav bar */}
          {initialMessages.map(renderMessage)}
        </div>
      </ScrollArea>
      <div className="p-2 md:p-4 border-t flex-shrink-0 space-y-3 bg-background/95 backdrop-blur-sm">
        <div className="flex w-full items-center space-x-2 relative">
          <Textarea
            ref={inputRef}
            placeholder={placeholder}
            className="flex-1 min-h-[50px] md:min-h-[60px] p-2 resize-none text-sm md:text-base rounded-2xl"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button size="icon" onClick={handleSendMessage} className="btn-gradient h-10 w-10 rounded-full">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
          
          {/* Command dropdown */}
          {showCommands && filteredCommands.length > 0 && (
            <div 
              className="absolute bottom-full mb-1 left-0 w-56 z-50 bg-popover rounded-md border shadow-md"
            >
              <div className="py-1 px-1">
                {filteredCommands.map((command, index) => (
                  <button
                    key={command.id}
                    className={`flex items-center w-full gap-2 px-2 py-2 text-sm rounded-md ${
                      index === selectedCommandIndex ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => insertCommand(command)}
                    onMouseEnter={() => setSelectedCommandIndex(index)}
                  >
                    <command.icon className="h-5 w-5" />
                    <span>{command.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {onGenerateContent && (
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full flex gap-1 border gradient-border hover:border-transparent whitespace-nowrap min-w-max" 
              onClick={() => onGenerateContent("study-guide")}
            >
              <FileText className="h-4 w-4" />
              <span>Study Guide</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full flex gap-1 whitespace-nowrap min-w-max" 
              onClick={() => onGenerateContent("flashcards")}
            >
              <BookOpen className="h-4 w-4" />
              <span>Flashcards</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full flex gap-1 whitespace-nowrap min-w-max" 
              onClick={() => onGenerateContent("quiz")}
            >
              <ListChecks className="h-4 w-4" />
              <span>Practice Quiz</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full flex gap-1 whitespace-nowrap min-w-max" 
              onClick={() => onGenerateContent("audio")}
            >
              <Headphones className="h-4 w-4" />
              <span>Audio Explanation</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}