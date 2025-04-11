"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, GraduationCap, LayoutDashboard, Library, MessageSquare, ArrowRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const { user, isAuthenticated } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <GraduationCap className="h-6 w-6 mr-2" />
          <span className="font-bold">LectureHall.ai</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
          {isAuthenticated ? (
            <Button asChild size="sm">
              <Link href={user?.role === "teacher" ? "/teacher/dashboard" : "/student/dashboard"}>Go to Dashboard</Link>
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Log In</Link>
            </Button>
          )}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Personalized Learning with AI
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    LectureHall.ai connects teachers, students, and AI-powered learning tools in a cohesive ecosystem
                    for personalized educational experiences.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  {isAuthenticated ? (
                    <Button asChild size="lg">
                      <Link href={user?.role === "teacher" ? "/teacher/dashboard" : "/student/dashboard"}>
                        Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button asChild size="lg">
                        <Link href="/login?tab=student">Student Login</Link>
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <Link href="/login?tab=teacher">Teacher Login</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Hero Image"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  height="550"
                  src="/collaborative-ai-learning.png"
                  width="800"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Discover how LectureHall.ai transforms the learning experience
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Personalized Dashboards</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tailored views for both teachers and students with relevant insights and actions
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Course Management</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Intuitive tools for organizing and accessing course materials and assignments
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <Library className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Content Library</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Centralized repository for all teaching and learning materials
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">AI Study Assistant</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Intelligent AI companion that helps generate study materials and answers questions
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 LectureHall.ai. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
