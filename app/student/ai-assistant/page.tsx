"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen, ListChecks, Headphones, MessageSquare, Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI study assistant. How can I help you today?",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("physics")

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

  // Mock conversation history data with course information
  const conversationHistory = [
    {
      id: 1,
      title: "Physics Concepts",
      course: "physics",
      lastActive: "2 days ago",
    },
    {
      id: 2,
      title: "Wave Properties Discussion",
      course: "physics",
      lastActive: "3 days ago",
    },
    {
      id: 3,
      title: "Math Problem Help",
      course: "math",
      lastActive: "5 days ago",
    },
    {
      id: 4,
      title: "Calculus Fundamentals",
      course: "math",
      lastActive: "1 week ago",
    },
    {
      id: 5,
      title: "Chemistry Review",
      course: "chemistry",
      lastActive: "1 week ago",
    },
    {
      id: 6,
      title: "Organic Chemistry Help",
      course: "chemistry",
      lastActive: "2 weeks ago",
    },
  ]

  // Filter conversations based on the selected course or show all
  const filteredConversations = selectedCourse === "all" 
    ? conversationHistory 
    : conversationHistory.filter(conv => conv.course === selectedCourse)
    
  // Define content types for the content generation panel
  const contentTypes = [
    {
      id: "study-guide",
      name: "Study Guide",
      description: "Comprehensive notes on a topic",
      icon: FileText,
    },
    {
      id: "flashcards",
      name: "Flashcards",
      description: "Key terms and concepts",
      icon: BookOpen,
    },
    {
      id: "quiz",
      name: "Practice Quiz",
      description: "Test your knowledge",
      icon: ListChecks,
    },
    {
      id: "audio",
      name: "Audio Explanation",
      description: "Listen and learn",
      icon: Headphones,
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Study Assistant</h1>
          <p className="text-muted-foreground">Get personalized help and generate study materials</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader className="px-4 py-3 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/abstract-ai-network.png" alt="AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">LectureHall AI</CardTitle>
                    <CardDescription className="text-xs">Powered by advanced AI</CardDescription>
                  </div>
                </div>
                <Select defaultValue={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-[250px] md:w-[300px]">
                    <SelectValue placeholder="Select course context" />
                  </SelectTrigger>
                  <SelectContent className="w-[250px] md:w-[300px]">
                    <SelectItem value="physics">Introduction to Physics</SelectItem>
                    <SelectItem value="math">Advanced Mathematics</SelectItem>
                    <SelectItem value="chemistry">Chemistry 101</SelectItem>
                    <SelectItem value="all">All Courses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-20rem)] p-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
                    <div
                      className={`flex items-start gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                    >
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
            </CardContent>
            <CardFooter className="p-4 border-t">
              <div className="flex w-full items-center space-x-2">
                <Textarea
                  placeholder="Ask a question or request study materials..."
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
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Generate Content</CardTitle>
              <CardDescription>Create AI-powered study materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contentTypes.map((type) => (
                <Button key={type.id} variant="outline" className="w-full justify-start h-auto py-3" asChild>
                  <div className="flex items-start">
                    <type.icon className="h-5 w-5 mr-3 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">{type.name}</div>
                      <div className="text-xs text-muted-foreground">{type.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredConversations.length > 0 ? (
                <div className="space-y-2">
                  {filteredConversations.map((conversation) => (
                    <div key={conversation.id}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{conversation.title}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {conversation.lastActive}
                        </Badge>
                      </div>
                      {conversation.id !== filteredConversations[filteredConversations.length - 1].id && <Separator className="my-2" />}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-sm text-muted-foreground py-4">
                  No recent conversations for this course.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
