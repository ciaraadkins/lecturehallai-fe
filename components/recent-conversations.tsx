"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  MoreHorizontal,
  Trash,
  Edit,
  MessageSquare
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useConversations, Conversation } from "@/hooks/use-conversations"

// Type for a conversation
interface ConversationProps {
  onNewChat?: () => void;
}

export function RecentConversations({ onNewChat }: ConversationProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentConversationId = searchParams.get('conversation')
  const [isExpanded, setIsExpanded] = useState(true)
  
  const { 
    conversations, 
    loadConversation, 
    createConversation,
    deleteConversation
  } = useConversations()

  // Navigate to conversation
  const openConversation = (id: string) => {
    loadConversation(id)
    router.push(`/student/ai-assistant?conversation=${id}`)
  }

  // Handle creating a new chat
  const handleNewChat = () => {
    const newId = createConversation()
    router.push(`/student/ai-assistant?conversation=${newId}`)
    if (onNewChat) onNewChat()
  }

  return (
    <div className="px-3 pt-5 pb-0">
      <div 
        className="flex items-center justify-between px-2 py-1 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-sm font-medium text-muted-foreground">Conversations</h3>
        {isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
      </div>

      {isExpanded && (
        <div className="mt-2 space-y-1">
          <Button 
            variant="outline" 
            className="w-full justify-center mb-4 p-2" 
            onClick={handleNewChat}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>

          <div className="mt-3 space-y-0.5 max-h-[280px] overflow-y-auto pr-1">
            {conversations.map((conversation) => (
              <div key={conversation.id} className="group relative">
                <div
                  className={cn(
                    "conversation-item py-2.5 pl-3 pr-9 cursor-pointer flex items-center",
                    conversation.id === currentConversationId
                      ? "conversation-item-active"
                      : "conversation-item-inactive"
                  )}
                  onClick={() => openConversation(conversation.id)}
                >
                  <MessageSquare className="h-4 w-4 mr-3 opacity-50" />
                  <div className="truncate text-sm">{conversation.title}</div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      aria-label="More options" 
                      className="conversation-actions h-7 w-7 p-0 absolute right-1 top-2 opacity-0 group-hover:opacity-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[120px]">
                    <DropdownMenuItem onClick={() => deleteConversation(conversation.id)}>
                      <Trash className="h-3.5 w-3.5 mr-2" />
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-3.5 w-3.5 mr-2" />
                      Rename
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
