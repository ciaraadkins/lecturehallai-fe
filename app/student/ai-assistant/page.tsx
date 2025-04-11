"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen, ListChecks, Headphones, MessageSquare, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommandInput, COMMANDS } from "@/components/command-input"
import { 
  GeneratedContent, 
  SAMPLE_STUDY_GUIDE_CONTENT, 
  SAMPLE_FLASHCARDS_CONTENT, 
  SAMPLE_QUIZ_CONTENT, 
  SAMPLE_AUDIO_CONTENT 
} from "@/components/generated-content"
import { TypingIndicator } from "@/components/typing-indicator"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Extended message type to include different content types
interface Message {
  role: "assistant" | "user"
  content: string
  contentType?: "text" | "study-guide" | "flashcards" | "quiz" | "audio"
  isGenerating?: boolean
  generatedContent?: {
    title: string
    content: string
  }
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI study assistant. How can I help you today?",
      contentType: "text"
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("math")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [activeCommand, setActiveCommand] = useState<string | null>(null)
  
  // Detect commands in input
  useEffect(() => {
    const detectCommand = () => {
      for (const command of COMMANDS) {
        if (inputValue.includes(command.tag)) {
          setActiveCommand(command.id)
          return
        }
      }
      setActiveCommand(null)
    }
    
    detectCommand()
  }, [inputValue])
  
  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        // Add a small delay to ensure DOM updates are complete
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight
        }, 50)
      }
    }
  }, [messages])

  // Handle message sending
  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: inputValue, contentType: "text" }])
    
    // Check if the message contains a command
    const hasStudyGuideCommand = inputValue.includes("@StudyGuide")
    const hasFlashcardsCommand = inputValue.includes("@Flashcards")
    const hasQuizCommand = inputValue.includes("@Quiz")
    const hasAudioCommand = inputValue.includes("@AudioExplanation")
    
    if (hasStudyGuideCommand) {
      // Add typing indicator
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "", 
        contentType: "text",
        isGenerating: true
      }])
      
      // First response - asking for topic details
      setTimeout(() => {
        setMessages(prev => {
          // Replace the typing indicator with the actual response
          const newMessages = [...prev]
          newMessages.pop() // Remove typing indicator
          
          return [...newMessages, { 
            role: "assistant", 
            content: "I'll create a comprehensive study guide for you. What specific topic or concept would you like me to cover in calculus?", 
            contentType: "text"
          }]
        })
      }, 1500)
      
      // For demo purposes, trigger the full flow if the message includes derivatives
      if (inputValue.toLowerCase().includes("derivatives")) {
        setTimeout(() => {
          handleStudyGuideTopic("derivatives")
        }, 2000)
      }
    } else if (hasFlashcardsCommand) {
      // Add typing indicator
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "", 
        contentType: "text",
        isGenerating: true
      }])
      
      // Flashcards response
      setTimeout(() => {
        setMessages(prev => {
          // Replace the typing indicator with the actual response
          const newMessages = [...prev]
          newMessages.pop() // Remove typing indicator
          
          return [...newMessages, { 
            role: "assistant", 
            content: "I'd be happy to create flashcards for you. What topic would you like the flashcards to cover?", 
            contentType: "text"
          }]
        })
      }, 1500)
      
      // For demo purposes, trigger the full flow if the message includes calculus or derivatives
      if (inputValue.toLowerCase().includes("calculus") || inputValue.toLowerCase().includes("derivatives")) {
        setTimeout(() => {
          handleFlashcardsDemo()
        }, 2000)
      }
    } else if (hasQuizCommand) {
      // Add typing indicator
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "", 
        contentType: "text",
        isGenerating: true
      }])
      
      // Quiz response
      setTimeout(() => {
        setMessages(prev => {
          // Replace the typing indicator with the actual response
          const newMessages = [...prev]
          newMessages.pop() // Remove typing indicator
          
          return [...newMessages, { 
            role: "assistant", 
            content: "I'd be happy to create a quiz for you. What topic would you like to be tested on and what difficulty level do you prefer?", 
            contentType: "text"
          }]
        })
      }, 1500)
      
      // For demo purposes, trigger the full flow if the message includes calculus or derivatives
      if (inputValue.toLowerCase().includes("calculus") || inputValue.toLowerCase().includes("derivatives")) {
        setTimeout(() => {
          handleQuizDemo()
        }, 2000)
      }
    } else if (hasAudioCommand) {
      // Add typing indicator
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "", 
        contentType: "text",
        isGenerating: true
      }])
      
      // Audio response
      setTimeout(() => {
        setMessages(prev => {
          // Replace the typing indicator with the actual response
          const newMessages = [...prev]
          newMessages.pop() // Remove typing indicator
          
          return [...newMessages, { 
            role: "assistant", 
            content: "I'd be happy to create an audio explanation for you. What topic would you like me to explain, and do you have any preferences for the style of explanation?", 
            contentType: "text"
          }]
        })
      }, 1500)
      
      // For demo purposes, trigger the full flow if the message includes calculus or derivatives
      if (inputValue.toLowerCase().includes("calculus") || inputValue.toLowerCase().includes("derivatives")) {
        setTimeout(() => {
          handleAudioDemo()
        }, 2000)
      }
    } else if (activeCommand) {
      // Handle other commands
      // Add typing indicator
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "", 
        contentType: "text",
        isGenerating: true
      }])
      
      // Simulate AI thinking
      setTimeout(() => {
        setMessages(prev => {
          // Replace the typing indicator with the actual response
          const newMessages = [...prev]
          newMessages.pop() // Remove typing indicator
          
          return [...newMessages, { 
            role: "assistant", 
            content: `I'll help you create a ${activeCommand.replace('-', ' ')}. Could you please specify what topic you'd like to focus on?`, 
            contentType: "text"
          }]
        })
      }, 1500)
    } else {
      // Standard response for non-command messages
      // Add typing indicator
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "", 
        contentType: "text",
        isGenerating: true
      }])
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => {
          // Replace the typing indicator with the actual response
          const newMessages = [...prev]
          newMessages.pop() // Remove typing indicator
          
          return [...newMessages, { 
            role: "assistant", 
            content: "I'm analyzing your request. Here's what I can help you with based on your question. Would you like me to generate study materials, explain a concept, or create practice questions?", 
            contentType: "text"
          }]
        })
      }, 1500)
    }

    setInputValue("")
  }
  
  // Handle content type selection from sidebar
  const handleContentTypeClick = (commandId: string) => {
    const command = COMMANDS.find(cmd => cmd.id === commandId)
    if (command) {
      const newValue = inputValue ? `${inputValue} ${command.tag} ` : `${command.tag} `
      setInputValue(newValue)
    }
  }
  
  // Content generation demo flows
  const handleStudyGuideTopic = (topic: string) => {
    // Add user message about derivatives
    setMessages(prev => [...prev, { 
      role: "user", 
      content: "I need help understanding derivatives in calculus.",
      contentType: "text"
    }])
    
    // Add typing indicator
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "", 
        contentType: "text",
        isGenerating: true
      }])
      
      // Simulate thinking and then provide the study guide
      setTimeout(() => {
        setMessages(prev => {
          // Replace the typing indicator with the actual response
          const newMessages = [...prev]
          newMessages.pop() // Remove typing indicator
          
          return [...newMessages, { 
            role: "assistant", 
            content: "I've created a comprehensive study guide on derivatives in calculus. The guide covers the fundamental concepts, common rules for finding derivatives, and practical applications.", 
            contentType: "study-guide",
            generatedContent: {
              title: "Derivatives in Calculus",
              content: SAMPLE_STUDY_GUIDE_CONTENT
            }
          }]
        })
      }, 3000)
    }, 500)
  }
  
  const handleFlashcardsDemo = () => {
    // Add user message about derivatives
    setMessages(prev => [...prev, { 
      role: "user", 
      content: "Can you create flashcards for the key derivative rules in calculus?",
      contentType: "text"
    }])
    
    // Add typing indicator
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "", 
        contentType: "text",
        isGenerating: true
      }])
      
      // First assistant response - clarifying the request
      setTimeout(() => {
        setMessages(prev => {
          // Replace the typing indicator with the first response
          const newMessages = [...prev]
          newMessages.pop() // Remove typing indicator
          
          return [...newMessages, { 
            role: "assistant", 
            content: "I'd be happy to create flashcards for derivative rules. Would you like me to include the basic rules like the power rule, product rule, quotient rule, and chain rule?", 
            contentType: "text"
          }]
        })
        
        // Simulate user response
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: "user", 
            content: "Yes, please include all of those rules.",
            contentType: "text"
          }])
          
          // Add second typing indicator
          setTimeout(() => {
            setMessages(prev => [...prev, { 
              role: "assistant", 
              content: "", 
              contentType: "text",
              isGenerating: true
            }])
            
            // Generate flashcards
            setTimeout(() => {
              setMessages(prev => {
                // Replace the typing indicator with the flashcards
                const newMessages = [...prev]
                newMessages.pop() // Remove typing indicator
                
                return [...newMessages, { 
                  role: "assistant", 
                  content: "I've created a set of 5 flashcards covering the key derivative rules in calculus. You can flip each card to see the definition and use the navigation buttons to move between cards.", 
                  contentType: "flashcards",
                  generatedContent: {
                    title: "Derivative Rules Flashcards",
                    content: SAMPLE_FLASHCARDS_CONTENT
                  }
                }]
              })
            }, 3000)
          }, 500)
        }, 1000)
      }, 1500)
    }, 500)
  }
  
  const handleQuizDemo = () => {
    // Add user message
    setMessages(prev => [...prev, { 
      role: "user", 
      content: "I'd like to test my knowledge of derivatives with a quiz.",
      contentType: "text"
    }])
    
    // Add typing indicator
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "", 
        contentType: "text",
        isGenerating: true
      }])
      
      // First assistant response - clarifying the request
      setTimeout(() => {
        setMessages(prev => {
          // Replace the typing indicator with the first response
          const newMessages = [...prev]
          newMessages.pop() // Remove typing indicator
          
          return [...newMessages, { 
            role: "assistant", 
            content: "I'd be happy to create a quiz on derivatives. What difficulty level would you prefer? Also, would you like to focus on any specific aspects (e.g., rules, applications, interpretations)?", 
            contentType: "text"
          }]
        })
        
        // Simulate user response
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: "user", 
            content: "A medium difficulty quiz covering basic rules and applications would be perfect.",
            contentType: "text"
          }])
          
          // Add second typing indicator
          setTimeout(() => {
            setMessages(prev => [...prev, { 
              role: "assistant", 
              content: "", 
              contentType: "text",
              isGenerating: true
            }])
            
            // Generate quiz
            setTimeout(() => {
              setMessages(prev => {
                // Replace the typing indicator with the quiz
                const newMessages = [...prev]
                newMessages.pop() // Remove typing indicator
                
                return [...newMessages, { 
                  role: "assistant", 
                  content: "I've created a 5-question quiz on derivatives with medium difficulty. The quiz covers basic rules and applications. Select an answer for each question and click 'Next' to proceed. At the end, you'll see your score and have the option to retry.", 
                  contentType: "quiz",
                  generatedContent: {
                    title: "Derivatives Quiz",
                    content: SAMPLE_QUIZ_CONTENT
                  }
                }]
              })
            }, 3000)
          }, 500)
        }, 1000)
      }, 1500)
    }, 500)
  }
  
  const handleAudioDemo = () => {
    // Add user message
    setMessages(prev => [...prev, { 
      role: "user", 
      content: "Can you create an audio explanation of derivatives that I can listen to?",
      contentType: "text"
    }])
    
    // Add typing indicator
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "", 
        contentType: "text",
        isGenerating: true
      }])
      
      // First assistant response - clarifying the request
      setTimeout(() => {
        setMessages(prev => {
          // Replace the typing indicator with the first response
          const newMessages = [...prev]
          newMessages.pop() // Remove typing indicator
          
          return [...newMessages, { 
            role: "assistant", 
            content: "I'd be happy to create an audio explanation of derivatives. Would you prefer a brief overview or a more detailed explanation? Also, do you have any preference for the speaking style (casual, formal, etc.)?", 
            contentType: "text"
          }]
        })
        
        // Simulate user response
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: "user", 
            content: "A detailed explanation with a casual speaking style would be great.",
            contentType: "text"
          }])
          
          // Add second typing indicator
          setTimeout(() => {
            setMessages(prev => [...prev, { 
              role: "assistant", 
              content: "", 
              contentType: "text",
              isGenerating: true
            }])
            
            // Generate audio
            setTimeout(() => {
              setMessages(prev => {
                // Replace the typing indicator with the audio
                const newMessages = [...prev]
                newMessages.pop() // Remove typing indicator
                
                return [...newMessages, { 
                  role: "assistant", 
                  content: "I've created an audio explanation of derivatives with a casual speaking style. You can play the audio using the controls below. A transcript is also available if you'd like to follow along.", 
                  contentType: "audio",
                  generatedContent: {
                    title: "Derivatives Audio Explanation",
                    content: SAMPLE_AUDIO_CONTENT
                  }
                }]
              })
            }, 4000)
          }, 500)
        }, 1000)
      }, 1500)
    }, 500)
  }
  
  // Handle saving to content hub
  const handleSaveToContentHub = () => {
    // In a real app, this would call an API to save the content
    console.log("Saving content to Content Hub")
  }
  
  // Demo conversation history
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

  // Filter conversations based on the selected course
  const filteredConversations = selectedCourse === "all" 
    ? conversationHistory 
    : conversationHistory.filter(conv => conv.course === selectedCourse)
    
  // Content generation types
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

  // Demo content generation flows
  const runStudyGuideDemo = () => {
    handleStudyGuideTopic("derivatives")
  }
  
  // Demo type selection based on clicked button
  const runContentTypeDemo = (type: string) => {
    switch(type) {
      case "study-guide":
        handleStudyGuideTopic("derivatives")
        break
      case "flashcards":
        handleFlashcardsDemo()
        break
      case "quiz":
        handleQuizDemo()
        break
      case "audio":
        handleAudioDemo()
        break
      default:
        handleStudyGuideTopic("derivatives")
    }
  }

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
          <Card className="flex flex-col h-[calc(100vh-12rem)] overflow-hidden chat-container">
            <CardHeader className="px-4 py-3 border-b flex-shrink-0">
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
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select course context" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physics">Introduction to Physics</SelectItem>
                    <SelectItem value="math">Advanced Mathematics</SelectItem>
                    <SelectItem value="chemistry">Chemistry 101</SelectItem>
                    <SelectItem value="all">All Courses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden">
              <ScrollArea ref={scrollAreaRef} className="h-full p-4 chat-scroll-area">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
                    <div
                      className={`flex items-start gap-3 max-w-[95%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
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
                      
                      {message.isGenerating ? (
                        <div className="rounded-lg py-2 px-3 bg-muted">
                          <TypingIndicator />
                        </div>
                      ) : message.contentType === "study-guide" ? (
                        <div className="w-full max-w-3xl">
                          <div className="rounded-lg p-3 bg-muted mb-2">
                            {message.content}
                          </div>
                          <GeneratedContent 
                            type="study-guide" 
                            title={message.generatedContent?.title || "Study Guide"} 
                            content={message.generatedContent?.content || ""}
                            onSave={handleSaveToContentHub}
                            onExport={() => console.log("Exporting study guide")}
                            onRegenerateRequest={() => console.log("Regenerate requested")}
                          />
                        </div>
                      ) : message.contentType === "flashcards" ? (
                        <div className="w-full max-w-3xl">
                          <div className="rounded-lg p-3 bg-muted mb-2">
                            {message.content}
                          </div>
                          <GeneratedContent 
                            type="flashcards" 
                            title={message.generatedContent?.title || "Flashcards"} 
                            content={message.generatedContent?.content || ""}
                            onSave={handleSaveToContentHub}
                            onExport={() => console.log("Exporting flashcards")}
                            onRegenerateRequest={() => console.log("Regenerate requested")}
                          />
                        </div>
                      ) : message.contentType === "quiz" ? (
                        <div className="w-full max-w-3xl">
                          <div className="rounded-lg p-3 bg-muted mb-2">
                            {message.content}
                          </div>
                          <GeneratedContent 
                            type="quiz" 
                            title={message.generatedContent?.title || "Practice Quiz"} 
                            content={message.generatedContent?.content || ""}
                            onSave={handleSaveToContentHub}
                            onExport={() => console.log("Exporting quiz")}
                            onRegenerateRequest={() => console.log("Regenerate requested")}
                          />
                        </div>
                      ) : message.contentType === "audio" ? (
                        <div className="w-full max-w-3xl">
                          <div className="rounded-lg p-3 bg-muted mb-2">
                            {message.content}
                          </div>
                          <GeneratedContent 
                            type="audio" 
                            title={message.generatedContent?.title || "Audio Explanation"} 
                            content={message.generatedContent?.content || ""}
                            onSave={handleSaveToContentHub}
                            onExport={() => console.log("Exporting audio")}
                            onRegenerateRequest={() => console.log("Regenerate requested")}
                          />
                        </div>
                      ) : (
                        <div
                          className={`rounded-lg p-3 ${message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"}`}
                        >
                          {message.content}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Demo mode alert */}
                {messages.length === 1 && (
                  <Alert className="mt-4 mb-2">
                    <AlertDescription>
                      <div className="flex flex-col gap-2">
                        <p>This is a demo of the AI Study Assistant. Try these interactions:</p>
                        <ol className="list-decimal pl-4 space-y-1">
                          <li>Click any content type button in the sidebar</li>
                          <li>Type "@" in the input field to see command options</li>
                          <li>Type any command tag (e.g., "@StudyGuide", "@Flashcards", "@Quiz", "@AudioExplanation") followed by "derivatives" or "calculus"</li>
                          <li>Or click one of the buttons below to see demonstrations:</li>
                        </ol>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <Button variant="outline" onClick={() => runContentTypeDemo("study-guide")}>
                            <FileText className="h-4 w-4 mr-1" /> Study Guide
                          </Button>
                          <Button variant="outline" onClick={() => runContentTypeDemo("flashcards")}>
                            <BookOpen className="h-4 w-4 mr-1" /> Flashcards
                          </Button>
                          <Button variant="outline" onClick={() => runContentTypeDemo("quiz")}>
                            <ListChecks className="h-4 w-4 mr-1" /> Quiz
                          </Button>
                          <Button variant="outline" onClick={() => runContentTypeDemo("audio")}>
                            <Headphones className="h-4 w-4 mr-1" /> Audio
                          </Button>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </ScrollArea>
            </CardContent>
            <div className="border-t p-4 flex-shrink-0">
              <div className="flex w-full items-center space-x-2">
                <CommandInput
                  value={inputValue}
                  onChange={setInputValue}
                  onSubmit={handleSendMessage}
                  placeholder="Ask a question or request study materials..."
                  className="flex-1"
                />
                <Button 
                  size="icon" 
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
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
                <Button 
                  key={type.id} 
                  variant="outline" 
                  className="w-full justify-start h-auto py-3" 
                  onClick={() => runContentTypeDemo(type.id)}
                >
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
