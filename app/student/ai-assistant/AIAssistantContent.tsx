"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AIChat } from "@/components/ai-chat"
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
import { useConversations, Message } from "@/hooks/use-conversations"
import { RightSidebar } from "@/components/right-sidebar"
import { AILogo } from "@/components/ai-logo"

export default function AIAssistantContent() {
  const [inputValue, setInputValue] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("math")
  const [selectedContentIds, setSelectedContentIds] = useState<string[]>([])
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Check for mobile device on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Check initially
    checkIfMobile()
    
    // Set sidebar to collapsed on mobile by default
    if (window.innerWidth < 768) {
      setIsRightSidebarCollapsed(true)
    }
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])
  
  // Set body class when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && !isRightSidebarCollapsed) {
      document.body.classList.add('ai-sidebar-open')
    } else {
      document.body.classList.remove('ai-sidebar-open')
    }
  }, [isMobile, isRightSidebarCollapsed])
  
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [activeCommand, setActiveCommand] = useState<string | null>(null)
  const searchParams = useSearchParams()

  const {
    activeMessages: messages,
    addMessage,
    activeConversation,
    loadConversation,
    createConversation
  } = useConversations()

  // Load conversation from URL if present
  useEffect(() => {
    const conversationId = searchParams.get('conversation')
    if (conversationId) {
      const loaded = loadConversation(conversationId)
      if (!loaded) {
        // Conversation not found, create a new one
        createConversation()
      }
    } else {
      // No conversation ID, create a new one
      createConversation()
    }
  }, [searchParams])
  
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

  // Handle content selection from right sidebar
  const handleContentSelectionChange = (ids: string[]) => {
    setSelectedContentIds(ids)
    console.log("Selected content IDs:", ids)
    // Here you would filter your AI's context based on the selection
  }

  // Track right sidebar collapsed state
  const handleRightSidebarCollapsedChange = (collapsed: boolean) => {
    setIsRightSidebarCollapsed(collapsed)
  }

  // Handle user sending a message
  const handleSendMessage = (message: string) => {
    if (!message.trim()) return

    // Add user message
    addMessage({ role: "user", content: message, contentType: "text" })
    
    // Check if the message contains a command
    const hasStudyGuideCommand = message.includes("@StudyGuide")
    const hasFlashcardsCommand = message.includes("@Flashcards")
    const hasQuizCommand = message.includes("@Quiz")
    const hasAudioCommand = message.includes("@AudioExplanation")
    
    // Clear input field after processing is no longer needed since AIChat handles it
    
    if (hasStudyGuideCommand) {
      // Handle Study Guide command - trigger the full demo flow
      handleStudyGuideTopic()
    } else if (hasFlashcardsCommand) {
      // Handle Flashcards command - trigger the full demo flow
      handleFlashcardsDemo()
    } else if (hasQuizCommand) {
      // Handle Quiz command - trigger the full demo flow
      handleQuizDemo()
    } else if (hasAudioCommand) {
      // Handle Audio command - trigger the full demo flow
      handleAudioDemo()
    } else if (activeCommand) {
      // Handle other commands
      // Add typing indicator
      addMessage({ 
        role: "assistant", 
        content: "", 
        contentType: "text",
        isGenerating: true
      })
      
      // Simulate AI thinking and add real message after delay
      setTimeout(() => {
        addMessage({ 
          role: "assistant", 
          content: `I'll help you create a ${activeCommand.replace('-', ' ')}. Could you please specify what topic you'd like to focus on?`, 
          contentType: "text"
        })
      }, 1500)
    } else {
      // Standard response for non-command messages
      // Add typing indicator
      addMessage({ 
        role: "assistant", 
        content: "", 
        contentType: "text",
        isGenerating: true
      })
      
      // Simulate AI response with delay
      setTimeout(() => {
        addMessage({ 
          role: "assistant", 
          content: "I'm sorry, but I'm having trouble understanding your request. How can I help you today?", 
          contentType: "text"
        })
      }, 1500)
    }
  }
  
  // Handle content type selection from sidebar
  const handleContentTypeClick = (commandId: string) => {
    // Add the command to input but immediately trigger the demo
    const command = COMMANDS.find(cmd => cmd.id === commandId)
    if (command) {
      setInputValue(command.tag)
      runContentTypeDemo(commandId)
    }
  }
  
  const handleStudyGuideTopic = () => {
    // Add user message
    addMessage({ 
      role: "user", 
      content: "I need help understanding derivatives in calculus.",
      contentType: "text"
    })
    
    // Add typing indicator
    setTimeout(() => {
      addMessage({ 
        role: "assistant", 
        content: "", 
        contentType: "text",
        isGenerating: true
      })
      
      // Simulate thinking and then provide the study guide
      setTimeout(() => {
        addMessage({ 
          role: "assistant", 
          content: "I've created a comprehensive study guide on derivatives in calculus. The guide covers the fundamental concepts, common rules for finding derivatives, and practical applications.", 
          contentType: "study-guide",
          generatedContent: {
            title: "Derivatives in Calculus",
            content: SAMPLE_STUDY_GUIDE_CONTENT
          }
        })
      }, 3000)
    }, 500)
  }
  
  const handleFlashcardsDemo = () => {
    // Add user message
    addMessage({ 
      role: "user", 
      content: "Can you create flashcards for the key derivative rules in calculus?",
      contentType: "text"
    })
    
    // Add typing indicator
    setTimeout(() => {
      addMessage({ 
        role: "assistant", 
        content: "", 
        contentType: "text",
        isGenerating: true
      })
      
      // Generate flashcards
      setTimeout(() => {
        addMessage({ 
          role: "assistant", 
          content: "I've created a set of 5 flashcards covering the key derivative rules in calculus. You can flip each card to see the definition and use the navigation buttons to move between cards.", 
          contentType: "flashcards",
          generatedContent: {
            title: "Derivative Rules Flashcards",
            content: SAMPLE_FLASHCARDS_CONTENT
          }
        })
      }, 3000)
    }, 500)
  }
  
  const handleQuizDemo = () => {
    // Add user message
    addMessage({ 
      role: "user", 
      content: "I'd like to test my knowledge of derivatives with a quiz.",
      contentType: "text"
    })
    
    // Add typing indicator
    setTimeout(() => {
      addMessage({ 
        role: "assistant", 
        content: "", 
        contentType: "text",
        isGenerating: true
      })
      
      // Generate quiz
      setTimeout(() => {
        addMessage({ 
          role: "assistant", 
          content: "I've created a 5-question quiz on derivatives with medium difficulty. The quiz covers basic rules and applications. Select an answer for each question and click 'Next' to proceed. At the end, you'll see your score and have the option to retry.", 
          contentType: "quiz",
          generatedContent: {
            title: "Derivatives Quiz",
            content: SAMPLE_QUIZ_CONTENT
          }
        })
      }, 3000)
    }, 500)
  }
  
  const handleAudioDemo = () => {
    // Add user message
    addMessage({ 
      role: "user", 
      content: "Can you create an audio explanation of derivatives that I can listen to?",
      contentType: "text"
    })
    
    // Add typing indicator
    setTimeout(() => {
      addMessage({ 
        role: "assistant", 
        content: "", 
        contentType: "text",
        isGenerating: true
      })
      
      // Generate audio
      setTimeout(() => {
        addMessage({ 
          role: "assistant", 
          content: "I've created an audio explanation of derivatives with a casual speaking style. You can play the audio using the controls below. A transcript is also available if you'd like to follow along.", 
          contentType: "audio",
          generatedContent: {
            title: "Derivatives Audio Explanation",
            content: SAMPLE_AUDIO_CONTENT
          }
        })
      }, 4000)
    }, 500)
  }
  
  // Handle saving to content hub
  const handleSaveToContentHub = () => {
    // In a real app, this would call an API to save the content
    console.log("Saving content to Content Hub")
  }
    
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

  // Handle content type selection from buttons
  const runContentTypeDemo = (type: string) => {
    console.log("runContentTypeDemo called with type:", type);
    
    // Add a user message
    let userMessage = `Create a ${type} about derivatives in calculus`;
    
    addMessage({
      role: "user",
      content: userMessage,
      contentType: "text"
    });
    
    // Add typing indicator
    addMessage({ 
      role: "assistant", 
      content: "", 
      contentType: "text",
      isGenerating: true
    });
    
    // Generate content based on type
    setTimeout(() => {
      switch(type) {
        case "study-guide":
          addMessage({ 
            role: "assistant", 
            content: "I've created a comprehensive study guide on derivatives in calculus.", 
            contentType: "study-guide",
            generatedContent: {
              title: "Derivatives in Calculus",
              content: SAMPLE_STUDY_GUIDE_CONTENT
            }
          });
          break;
        case "flashcards":
          addMessage({ 
            role: "assistant", 
            content: "I've created flashcards for key derivative rules in calculus.", 
            contentType: "flashcards",
            generatedContent: {
              title: "Derivative Rules Flashcards",
              content: SAMPLE_FLASHCARDS_CONTENT
            }
          });
          break;
        case "quiz":
          addMessage({ 
            role: "assistant", 
            content: "I've created a quiz to test your knowledge of derivatives.", 
            contentType: "quiz",
            generatedContent: {
              title: "Derivatives Quiz",
              content: SAMPLE_QUIZ_CONTENT
            }
          });
          break;
        case "audio":
          addMessage({ 
            role: "assistant", 
            content: "I've created an audio explanation of derivatives in calculus.", 
            contentType: "audio",
            generatedContent: {
              title: "Derivatives Audio Explanation",
              content: SAMPLE_AUDIO_CONTENT
            }
          });
          break;
      }
    }, 1000);
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div 
        className="flex-1 flex flex-col transition-all duration-300 px-3 md:px-6 py-4 md:py-6 relative"
        style={{
          paddingRight: isMobile 
            ? '0.75rem' 
            : (isRightSidebarCollapsed ? '3rem' : 'calc(420px + 1.5rem)')
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-64 pointer-events-none z-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
        </div>
        <div className="flex flex-col mb-4 md:mb-6 gap-2 md:gap-4">
          <div className="pl-10 md:pl-0"> {/* Add left padding for mobile to avoid overlap with hamburger menu */}
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight"><span className="gradient-text">AI Study Assistant</span></h1>
            <p className="text-sm md:text-base text-muted-foreground">Get personalized help and generate study materials</p>
          </div>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden chat-container card-gradient">
          <CardHeader className="px-3 py-3 border-b flex-shrink-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center space-x-3">
                <AILogo size="md" />
                <div>
                  <CardTitle className="text-lg gradient-text">LectureHall AI</CardTitle>
                  <CardDescription className="text-xs">Powered by advanced AI</CardDescription>
                </div>
              </div>
              <Select defaultValue={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full md:w-[240px] lg:w-[360px]">
                  <SelectValue placeholder="Select course context" />
                </SelectTrigger>
                <SelectContent className="w-full md:w-[240px] lg:w-[360px]">
                  <SelectItem value="physics">Introduction to Physics</SelectItem>
                  <SelectItem value="math">Advanced Mathematics</SelectItem>
                  <SelectItem value="chemistry">Chemistry 101</SelectItem>
                  <SelectItem value="all">All Courses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <AIChat 
              initialMessages={messages}
              placeholder="Ask a question or request study materials..."
              onGenerateContent={runContentTypeDemo}
              onSendMessage={(message) => {
                // Validate message
                if (typeof message !== 'string' || !message.trim()) {
                  return;
                }
                
                // Create the user message object once
                const userMessage = {
                  role: "user",
                  content: message,
                  contentType: "text"
                };
                
                // Add user message to state
                try {
                  addMessage(userMessage);
                  
                  // Add typing indicator after a delay
                  setTimeout(() => {
                    try {
                      // Create once, don't recreate in the callback
                      const typingIndicator = { 
                        role: "assistant", 
                        content: "", 
                        contentType: "text",
                        isGenerating: true
                      };
                      
                      addMessage(typingIndicator);
                      
                      // Generate a response after another delay
                      setTimeout(() => {
                        try {
                          // Create once, don't recreate in the callback
                          const responseMessage = { 
                            role: "assistant", 
                            content: "I'm here to help with your calculus studies. What specific topic would you like to explore?", 
                            contentType: "text"
                          };
                          
                          addMessage(responseMessage);
                        } catch (error) {
                          console.error("Error adding response:", error);
                        }
                      }, 1000);
                    } catch (error) {
                      console.error("Error adding typing indicator:", error);
                    }
                  }, 100);
                } catch (error) {
                  console.error("Error adding user message:", error);
                }
              }}
              onSaveContent={handleSaveToContentHub}
              onExportContent={() => console.log("Exporting content")}
              onRegenerateContent={() => console.log("Regenerating content")}
            />
          </CardContent>
        </Card>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobile && !isRightSidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsRightSidebarCollapsed(true)}
        />
      )}

      {/* Right Sidebar */}
      <RightSidebar 
        courseFilter={selectedCourse} 
        onContentSelectionChange={handleContentSelectionChange}
        onCollapsedChange={handleRightSidebarCollapsedChange}
      />
    </div>
  )
}