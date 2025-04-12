"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  BookOpen,
  Home,
  Library,
  BarChart,
  FileText,
  Users,
  MessageSquare,
  Settings,
  Layers,
  LogOut,
} from "lucide-react"
import { AILogo } from "@/components/ai-logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { RecentConversations } from "@/components/recent-conversations"
import { Separator } from "@/components/ui/separator"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isAuthenticated, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-full flex flex-col bg-[hsl(var(--sidebar-background))]">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <AILogo size="md" />
            <span className="font-bold text-xl gradient-text">LectureHall.ai</span>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    )
  }

  // If still loading auth state, show minimal sidebar
  if (isLoading) {
    return (
      <div className="h-full flex flex-col bg-[hsl(var(--sidebar-background))]">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <AILogo size="md" />
            <span className="font-bold text-xl">LectureHall.ai</span>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    )
  }

  // If not authenticated, show minimal sidebar
  if (!isAuthenticated) {
    return (
      <div className="h-full flex flex-col bg-[hsl(var(--sidebar-background))]">
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center gap-2">
            <AILogo size="md" />
            <span className="font-bold text-xl gradient-text">LectureHall.ai</span>
          </Link>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/login">
                <LogOut className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const isTeacher = user?.role === "teacher"
  const isStudent = user?.role === "student"

  return (
    <div className="h-full flex flex-col bg-[hsl(var(--sidebar-background))]">
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <AILogo size="md" />
          <span className="font-bold text-xl gradient-text">LectureHall.ai</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-4">
        {isTeacher && (
          <div className="px-3 py-2">
            <h3 className="mb-3 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Teacher Portal</h3>
            <div className="space-y-1">
              <Link
                href="/teacher/dashboard"
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md",
                  pathname === "/teacher/dashboard"
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground transition-colors",
                )}
              >
                <BarChart className="mr-3 h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/teacher/courses"
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md",
                  pathname === "/teacher/courses" || pathname.startsWith("/teacher/courses/")
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground transition-colors",
                )}
              >
                <Layers className="mr-3 h-4 w-4" />
                Course Management
              </Link>
              <Link
                href="/teacher/content"
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md",
                  pathname === "/teacher/content"
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground transition-colors",
                )}
              >
                <Library className="mr-3 h-4 w-4" />
                Content Library
              </Link>
              <Link
                href="/teacher/insights"
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md",
                  pathname === "/teacher/insights"
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground transition-colors",
                )}
              >
                <Users className="mr-3 h-4 w-4" />
                Student Insights
              </Link>
            </div>
          </div>
        )}

        {isStudent && (
          <div className="px-3 py-2">
            <h3 className="mb-3 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Learning</h3>
            <div className="space-y-1">
              <Link
                href="/student/ai-assistant"
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md",
                  pathname === "/student/ai-assistant"
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground transition-colors",
                )}
              >
                <MessageSquare className="mr-3 h-4 w-4" />
                AI Study Assistant
              </Link>
              <Link
                href="/student/content-hub"
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md",
                  pathname === "/student/content-hub" || pathname.startsWith("/student/content/")
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground transition-colors",
                )}
              >
                <FileText className="mr-3 h-4 w-4" />
                Content Hub
              </Link>
              <Link
                href="/student/courses"
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md",
                  pathname === "/student/courses" || pathname.startsWith("/student/courses/")
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground transition-colors",
                )}
              >
                <BookOpen className="mr-3 h-4 w-4" />
                Course View
              </Link>
              <Link
                href="/student/dashboard"
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md",
                  pathname === "/student/dashboard"
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground transition-colors",
                )}
              >
                <BarChart className="mr-3 h-4 w-4" />
                Dashboard
              </Link>
            </div>
          </div>
        )}

        {isStudent && (
          <>
            <Separator className="my-4 mx-3" />
            <RecentConversations />
          </>
        )}
      </div>

      <div className="p-3 border-t mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full flex items-center justify-start p-2 rounded-lg hover:bg-accent/50">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium truncate max-w-[140px]">{user?.name}</span>
                <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={isTeacher ? "/teacher/profile" : "/student/profile"}>Profile Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // Clear current auth and redirect to login with switch parameter
                logout()
                // Small delay to ensure logout completes
                setTimeout(() => {
                  router.push("/login?switch=true")
                }, 100)
              }}
            >
              Switch to {isTeacher ? "Student" : "Teacher"} View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
