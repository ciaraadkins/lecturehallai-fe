"use client"

import { useState, useEffect, useRef } from 'react'

// Type for a conversation
export interface Conversation {
  id: string
  title: string
  lastActive: string
  path: string
  messages?: Message[]
  contentType?: "study-guide" | "flashcards" | "quiz" | "audio" | null
}

// Type for a message
export interface Message {
  role: "assistant" | "user"
  content: string
  contentType?: "text" | "study-guide" | "flashcards" | "quiz" | "audio"
  isGenerating?: boolean
  generatedContent?: {
    title: string
    content: string
  }
}

// Sample conversation data
const sampleConversations: Conversation[] = [
  {
    id: "1",
    title: "Calculus Fundamentals",
    lastActive: "2 min ago",
    path: "/student/ai-assistant?conversation=1",
    contentType: "study-guide",
    messages: [
      {
        role: "assistant",
        content: "Hello! How can I help you with calculus today?",
        contentType: "text"
      },
      {
        role: "user",
        content: "Can you explain derivatives to me?",
        contentType: "text"
      },
      {
        role: "assistant",
        content: "I've created a comprehensive study guide on derivatives in calculus. The guide covers the fundamental concepts, common rules for finding derivatives, and practical applications.",
        contentType: "study-guide",
        generatedContent: {
          title: "Derivatives in Calculus",
          content: `
<h2>Introduction to Derivatives</h2>
<p>In calculus, a derivative measures the sensitivity to change of a function's output with respect to its input.</p>

<h3>The Concept of a Derivative</h3>
<p>The derivative of a function represents the rate of change of the function with respect to its variable. It is denoted by:</p>
<ul>
  <li>f'(x)</li>
  <li>dy/dx</li>
  <li>d/dx [f(x)]</li>
</ul>

<h3>Basic Derivative Rules</h3>
<p>Some fundamental derivative rules include:</p>

<h4>1. Constant Rule</h4>
<p>The derivative of a constant is zero: d/dx [c] = 0</p>

<h4>2. Power Rule</h4>
<p>For any real number n: d/dx [x^n] = n·x^(n-1)</p>

<h4>3. Sum Rule</h4>
<p>The derivative of a sum is the sum of derivatives: d/dx [f(x) + g(x)] = f'(x) + g'(x)</p>

<h4>4. Product Rule</h4>
<p>For two functions f(x) and g(x): d/dx [f(x)·g(x)] = f'(x)·g(x) + f(x)·g'(x)</p>

<h3>Applications of Derivatives</h3>
<p>Derivatives have numerous applications in mathematics and other fields:</p>
<ul>
  <li>Finding the slope of a curve at a specific point</li>
  <li>Determining rates of change in physical processes</li>
  <li>Optimization problems (finding maxima and minima)</li>
  <li>Approximation using linear functions (tangent lines)</li>
</ul>
          `
        }
      }
    ]
  },
  {
    id: "2",
    title: "Physics Concepts",
    lastActive: "1 hour ago",
    path: "/student/ai-assistant?conversation=2",
    contentType: "quiz",
    messages: [
      {
        role: "assistant",
        content: "Hello! How can I help you with physics today?",
        contentType: "text"
      },
      {
        role: "user",
        content: "I need to review Newton's laws of motion",
        contentType: "text"
      }
    ]
  },
  {
    id: "3",
    title: "Chemistry Review",
    lastActive: "1 day ago",
    path: "/student/ai-assistant?conversation=3",
    contentType: "flashcards",
    messages: [
      {
        role: "assistant",
        content: "Hello! How can I help you with chemistry today?",
        contentType: "text"
      },
      {
        role: "user",
        content: "I need help understanding chemical bonds",
        contentType: "text"
      }
    ]
  },
  {
    id: "4",
    title: "Biology Terms",
    lastActive: "3 days ago",
    path: "/student/ai-assistant?conversation=4",
    contentType: "audio",
    messages: [
      {
        role: "assistant",
        content: "Hello! How can I help you with biology today?",
        contentType: "text"
      },
      {
        role: "user",
        content: "Can you explain cellular respiration?",
        contentType: "text"
      }
    ]
  },
  {
    id: "5",
    title: "History Timeline Help",
    lastActive: "1 week ago",
    path: "/student/ai-assistant?conversation=5",
    messages: [
      {
        role: "assistant",
        content: "Hello! How can I help you with history today?",
        contentType: "text"
      },
      {
        role: "user",
        content: "I need help understanding World War II events",
        contentType: "text"
      }
    ]
  },
]

export function useConversations() {
  // Use useRef to maintain stable array references
  const messagesRef = useRef<Message[]>([]);
  
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [activeMessages, setActiveMessages] = useState<Message[]>([]);

  // Track updates to avoid unnecessary re-renders
  const updateCountRef = useRef(0);

  // Find conversation by ID
  const getConversation = (id: string | null) => {
    if (!id) return null;
    return conversations.find(conv => conv.id === id) || null;
  }

  // Get active conversation
  const activeConversation = getConversation(activeConversationId);

  // Load a conversation
  const loadConversation = (id: string) => {
    const conversation = getConversation(id);
    if (conversation && conversation.messages) {
      setActiveConversationId(id);
      const newMessages = conversation.messages.map(m => ({...m})); // Create a deep copy
      messagesRef.current = newMessages;
      setActiveMessages(newMessages);
      return true;
    }
    return false;
  }

  // Create a new conversation
  const createConversation = (title: string = "New Conversation") => {
    const newId = `new-${Date.now()}`;
    const initialMessage = {
      role: "assistant" as const,
      content: "Hello! I'm your AI study assistant. How can I help you today?",
      contentType: "text" as const
    };
    
    const newMessages = [initialMessage];
    messagesRef.current = newMessages;
    
    const newConversation: Conversation = {
      id: newId,
      title,
      lastActive: "Just now",
      path: `/student/ai-assistant?conversation=${newId}`,
      messages: [...newMessages] // Create a copy for the conversation
    };

    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newId);
    setActiveMessages(newMessages);
    return newId;
  }

  // Add message to active conversation
  const addMessage = (message: Message) => {
    if (!activeConversationId) return false;

    console.log("addMessage called with:", JSON.stringify({ 
      role: message.role, 
      content: message.content?.substring(0, 30) + "...", 
      type: message.contentType, 
      isGenerating: message.isGenerating 
    }));

    // DEBUG: Show all current messages
    console.log("BEFORE: Current messages:", JSON.stringify(messagesRef.current.map(m => ({
      role: m.role,
      content: m.content?.substring(0, 20) + "..."
    }))));
    
    // Create a deep copy of the message to avoid reference issues
    const messageCopy = {
      role: message.role,
      content: message.content,
      contentType: message.contentType,
      isGenerating: message.isGenerating,
      generatedContent: message.generatedContent ? {...message.generatedContent} : undefined
    };
    
    // Create a new array with all existing messages
    const currentMessages = [...messagesRef.current];
    console.log("Current messages length:", currentMessages.length);
    
    let newMessages: Message[];
    
    // Check if this is a new non-generating message from the assistant
    // and we need to replace a typing indicator
    if (message.role === "assistant" && !message.isGenerating) {
      // Look for a typing indicator to replace
      const typingIndex = currentMessages.findIndex(msg => 
        msg.role === "assistant" && msg.isGenerating
      );
      
      if (typingIndex >= 0) {
        console.log("Replacing typing indicator at index", typingIndex);
        // Replace the typing indicator
        const updatedMessages = [...currentMessages];
        updatedMessages[typingIndex] = messageCopy;
        newMessages = updatedMessages;
      } else {
        console.log("No typing indicator found, adding new message");
        // Just add the message normally
        newMessages = [...currentMessages, messageCopy];
      }
    } else {
      console.log("Adding message normally, role:", message.role);
      // For user messages and typing indicators, add them normally
      newMessages = [...currentMessages, messageCopy];
    }
    
    // DEBUG: Show new messages array
    console.log("AFTER: New messages:", JSON.stringify(newMessages.map(m => ({
      role: m.role,
      content: m.content?.substring(0, 20) + "..."
    }))));
    
    // Store the new messages in the ref first
    messagesRef.current = newMessages;
    
    // Important: set the state for active messages
    console.log("Setting activeMessages, new length:", newMessages.length);
    setActiveMessages([...newMessages]); // Create a fresh copy for the state update
    
    // Track update count
    updateCountRef.current += 1;
    const currentUpdateCount = updateCountRef.current;
    
    // Update conversation in the list with a copy of the messages
    console.log("Updating conversation in list");
    setConversations(prev => {
      const updated = prev.map(conv => 
        conv.id === activeConversationId 
          ? { 
              ...conv, 
              messages: [...newMessages], // Create a fresh copy for the conversation
              lastActive: "Just now" 
            } 
          : conv
      );
      
      // DEBUG: Check updated conversation
      const updatedConv = updated.find(c => c.id === activeConversationId);
      if (updatedConv && updatedConv.messages) {
        console.log("UPDATED CONV MESSAGES:", JSON.stringify(updatedConv.messages.map(m => ({
          role: m.role,
          content: m.content?.substring(0, 20) + "..."
        }))));
      }
      
      return updated;
    });

    return true;
  }

  // Delete a conversation
  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    
    // If deleted the active conversation, create a new one
    if (id === activeConversationId) {
      createConversation();
    }
  }

  // Rename a conversation
  const renameConversation = (id: string, newTitle: string) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id 
          ? { ...conv, title: newTitle } 
          : conv
      )
    );
  }

  return {
    conversations,
    activeConversation,
    activeConversationId,
    activeMessages,
    loadConversation,
    createConversation,
    addMessage,
    deleteConversation,
    renameConversation
  }
}