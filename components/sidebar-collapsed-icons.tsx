"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AILogo } from "@/components/ai-logo"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  BarChart,
  FileText,
  MessageSquare,
  User,
  BookOpenText,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarIconProps {
  href: string
  icon: React.ReactNode
  tooltip: string
  isActive: boolean
}

const SidebarIcon = ({ href, icon, tooltip, isActive }: SidebarIconProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              "w-10 h-10 rounded-md flex items-center justify-center transition-colors my-2",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={10} className="bg-popover text-popover-foreground">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function SidebarCollapsedIcons() {
  const pathname = usePathname()
  const isStudent = pathname.includes("/student/")
  const isTeacher = pathname.includes("/teacher/")
  
  return (
    <div className="flex flex-col items-center py-4 h-full">
      <div className="mb-6">
        <Link href="/" className="block">
          <AILogo size="md" />
        </Link>
      </div>
      
      {/* Learning Resources section */}
      <div className="mb-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="w-10 h-10 rounded-md flex items-center justify-center bg-primary/10 text-primary mb-2 cursor-pointer hover:bg-primary/20"
                onClick={() => window.dispatchEvent(new CustomEvent('toggle-sidebar'))}
              >
                <BookOpenText className="h-5 w-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10} className="bg-popover text-popover-foreground font-medium">
              Learning Resources
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex-1 flex flex-col items-center">
        {isStudent && (
          <>
            <SidebarIcon
              href="/student/ai-assistant"
              icon={<MessageSquare className="h-5 w-5" />}
              tooltip="AI Study Assistant"
              isActive={pathname === "/student/ai-assistant"}
            />
            <SidebarIcon
              href="/student/content-hub"
              icon={<FileText className="h-5 w-5" />}
              tooltip="Content Hub"
              isActive={pathname === "/student/content-hub" || pathname.startsWith("/student/content/")}
            />
            <SidebarIcon
              href="/student/courses"
              icon={<BookOpen className="h-5 w-5" />}
              tooltip="Course View"
              isActive={pathname === "/student/courses" || pathname.startsWith("/student/courses/")}
            />
            <SidebarIcon
              href="/student/dashboard"
              icon={<BarChart className="h-5 w-5" />}
              tooltip="Dashboard"
              isActive={pathname === "/student/dashboard"}
            />
          </>
        )}
        
        {isTeacher && (
          <>
            <SidebarIcon
              href="/teacher/dashboard"
              icon={<BarChart className="h-5 w-5" />}
              tooltip="Dashboard"
              isActive={pathname === "/teacher/dashboard"}
            />
            <SidebarIcon
              href="/teacher/courses"
              icon={<BookOpen className="h-5 w-5" />}
              tooltip="Course Management"
              isActive={pathname === "/teacher/courses" || pathname.startsWith("/teacher/courses/")}
            />
            <SidebarIcon
              href="/teacher/content"
              icon={<FileText className="h-5 w-5" />}
              tooltip="Content Library"
              isActive={pathname === "/teacher/content"}
            />
          </>
        )}
      </div>
      
      <div className="mt-auto">
        <SidebarIcon
          href={isTeacher ? "/teacher/profile" : "/student/profile"}
          icon={<User className="h-5 w-5" />}
          tooltip="Profile"
          isActive={pathname.includes("/profile")}
        />
      </div>
    </div>
  )
}
