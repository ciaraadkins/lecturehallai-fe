"use client"

import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { FileText, BookOpen, ListChecks, Headphones } from "lucide-react"

interface CommandOption {
  id: string
  name: string
  tag: string
  icon: React.ElementType
  cssClass: string
}

const COMMANDS: CommandOption[] = [
  {
    id: "study-guide",
    name: "Study Guide",
    tag: "@StudyGuide",
    icon: FileText,
    cssClass: "cmd-tag-study-guide",
  },
  {
    id: "flashcards",
    name: "Flashcards",
    tag: "@Flashcards",
    icon: BookOpen,
    cssClass: "cmd-tag-flashcards",
  },
  {
    id: "quiz",
    name: "Practice Quiz",
    tag: "@Quiz",
    icon: ListChecks,
    cssClass: "cmd-tag-quiz",
  },
  {
    id: "audio",
    name: "Audio Explanation",
    tag: "@AudioExplanation",
    icon: Headphones,
    cssClass: "cmd-tag-audio",
  },
]

interface CommandInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  placeholder?: string
  className?: string
}

export function CommandInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Ask a question or request study materials...",
  className,
}: CommandInputProps) {
  const [showCommands, setShowCommands] = useState(false)
  const [commandFilter, setCommandFilter] = useState("")
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Filter commands based on what the user has typed after @
  const filteredCommands = COMMANDS.filter((command) =>
    command.name.toLowerCase().includes(commandFilter.toLowerCase())
  )

  // Handle @ detection and command filtering
  useEffect(() => {
    const match = value.match(/@(\w*)$/)
    if (match) {
      setShowCommands(true)
      setCommandFilter(match[1])
      setSelectedCommandIndex(0)
    } else {
      setShowCommands(false)
    }
  }, [value])

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
      onSubmit()
    }
  }

  // Insert the selected command into the input
  const insertCommand = (command: CommandOption) => {
    // Replace the @partial with the full command tag
    const newValue = value.replace(/@\w*$/, command.tag + " ")
    onChange(newValue)
    setShowCommands(false)
    
    // Focus back on input and place cursor at the end
    if (inputRef.current) {
      inputRef.current.focus()
      const length = newValue.length
      inputRef.current.setSelectionRange(length, length)
    }
  }

  // Function to handle clicking a command from the dropdown
  const handleCommandClick = (command: CommandOption) => {
    insertCommand(command)
  }

  return (
    <div className="relative w-full">
      <Textarea
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`flex-1 min-h-[60px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-3 ${className}`}
      />
      
      {/* Command dropdown */}
      {showCommands && filteredCommands.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute bottom-full mb-1 w-56 z-50 bg-popover rounded-md border shadow-md"
        >
          <div className="py-1 px-1">
            {filteredCommands.map((command, index) => (
              <button
                key={command.id}
                className={`flex items-center w-full gap-2 px-2 py-1.5 text-sm rounded-sm ${
                  index === selectedCommandIndex ? "bg-accent text-accent-foreground" : ""
                }`}
                onClick={() => handleCommandClick(command)}
                onMouseEnter={() => setSelectedCommandIndex(index)}
              >
                <command.icon className="h-4 w-4" />
                <span>{command.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Export command helper for use in other components
export { COMMANDS }
