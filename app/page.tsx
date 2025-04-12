"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, GraduationCap, LayoutDashboard, Library, MessageSquare, ArrowRight, Brain, Sparkles, Zap } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { AILogo } from "@/components/ai-logo"

export default function Home() {
  const { user, isAuthenticated } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Enhanced Header with shadow and better spacing */}
      <header className="px-6 lg:px-8 h-16 flex items-center border-b shadow-sm sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link className="flex items-center justify-center" href="/">
            <AILogo size="sm" />
            <span className="font-bold gradient-text ml-2 text-lg">LectureHall.ai</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/#features">
              Features
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/about">
              About
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">
              Contact
            </Link>
            {isAuthenticated ? (
              <Button asChild size="sm" className="ml-2 shadow-md">
                <Link href={user?.role === "teacher" ? "/teacher/dashboard" : "/student/ai-assistant"}>
                  Go to AI Assistant
                </Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="ml-2 shadow-md">
                <Link href="/login">Log In</Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with background gradient and improved layout */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 z-0"></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl translate-y-1/2"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-6 max-w-xl mx-auto lg:mx-0">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-2">
                  <Sparkles className="h-3.5 w-3.5 mr-2" />
                  AI-Powered Education Platform
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    <span className="gradient-text">Personalized Learning</span> with AI
                  </h1>
                  <p className="text-lg text-muted-foreground md:text-xl">
                    LectureHall.ai connects teachers, students, and AI-powered learning tools in a cohesive ecosystem
                    for personalized educational experiences tailored to your unique learning style.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {isAuthenticated ? (
                    <Button asChild size="lg" className="btn-gradient shadow-lg">
                      <Link href={user?.role === "teacher" ? "/teacher/dashboard" : "/student/ai-assistant"}>
                        Continue to AI Assistant <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button asChild size="lg" className="btn-gradient shadow-lg">
                        <Link href="/login?tab=student">
                          Student Login <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="gradient-border hover:border-transparent shadow">
                        <Link href="/login?tab=teacher">Teacher Login</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center mt-8 lg:mt-0">
                <div className="relative">
                  {/* Image frame with gradient border */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary opacity-30 blur-sm"></div>
                  <img
                    alt="AI-powered learning experience"
                    className="relative rounded-2xl shadow-2xl object-cover w-full max-w-lg mx-auto"
                    height="600"
                    src="/collaborative-ai-learning.png"
                    width="1000"
                  />
                  {/* Floating accent elements */}
                  <div className="absolute -top-6 -right-6 bg-accent/10 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-accent/20">
                    <Brain className="h-6 w-6 text-accent" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-primary/10 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-primary/20">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with improved cards and centered content */}
        <section id="features" className="w-full py-20 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-secondary/10 text-secondary mb-2">
                <Sparkles className="h-3.5 w-3.5 mr-2" />
                Innovative Features
              </div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">Key Features</h2>
              <p className="text-lg text-muted-foreground">
                Discover how LectureHall.ai transforms the learning experience with our comprehensive suite of tools
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {/* Feature card 1 */}
              <div className="group flex flex-col items-center text-center rounded-xl p-6 bg-background shadow-lg border border-border/50 hover:border-primary/20 transition-all duration-300 hover:-translate-y-2">
                <div className="rounded-full bg-primary/10 p-4 mb-6 group-hover:bg-primary/20 transition-colors">
                  <LayoutDashboard className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Personalized Dashboards</h3>
                <p className="text-muted-foreground">
                  Tailored interfaces for both teachers and students with relevant insights and actions to enhance productivity
                </p>
              </div>
              
              {/* Feature card 2 */}
              <div className="group flex flex-col items-center text-center rounded-xl p-6 bg-background shadow-lg border border-border/50 hover:border-secondary/20 transition-all duration-300 hover:-translate-y-2">
                <div className="rounded-full bg-secondary/10 p-4 mb-6 group-hover:bg-secondary/20 transition-colors">
                  <BookOpen className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Course Management</h3>
                <p className="text-muted-foreground">
                  Intuitive tools for organizing and accessing course materials, assignments, and student progress tracking
                </p>
              </div>
              
              {/* Feature card 3 */}
              <div className="group flex flex-col items-center text-center rounded-xl p-6 bg-background shadow-lg border border-border/50 hover:border-accent/20 transition-all duration-300 hover:-translate-y-2">
                <div className="rounded-full bg-accent/10 p-4 mb-6 group-hover:bg-accent/20 transition-colors">
                  <Library className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">Content Library</h3>
                <p className="text-muted-foreground">
                  Centralized repository for all teaching and learning materials with powerful search and organization features
                </p>
              </div>
              
              {/* Feature card 4 */}
              <div className="group flex flex-col items-center text-center rounded-xl p-6 bg-background shadow-lg border border-border/50 hover:border-warning/20 transition-all duration-300 hover:-translate-y-2">
                <div className="rounded-full bg-warning/10 p-4 mb-6 group-hover:bg-warning/20 transition-colors">
                  <MessageSquare className="h-8 w-8 text-warning" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI Study Assistant</h3>
                <p className="text-muted-foreground">
                  Intelligent AI companion that helps generate personalized study materials, quizzes, flashcards, and answers questions
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to action section */}
        <section className="w-full py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-6">Ready to Transform Your Learning Experience?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of students and educators who are already benefiting from AI-enhanced personalized learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="btn-gradient shadow-lg">
                  <Link href="/login?tab=student">
                    Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with improved layout and links */}
      <footer className="border-t bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link className="flex items-center mb-4" href="/">
                <AILogo size="sm" />
                <span className="font-bold gradient-text ml-2 text-lg">LectureHall.ai</span>
              </Link>
              <p className="text-muted-foreground mb-4 max-w-md">
                AI-powered educational platform creating personalized learning experiences for students of all types.
              </p>
              <p className="text-sm text-muted-foreground">© 2023 LectureHall.ai. All rights reserved.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link className="text-muted-foreground hover:text-primary transition-colors" href="#">Features</Link></li>
                <li><Link className="text-muted-foreground hover:text-primary transition-colors" href="/about">About</Link></li>
                <li><Link className="text-muted-foreground hover:text-primary transition-colors" href="#">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link className="text-muted-foreground hover:text-primary transition-colors" href="#">Terms of Service</Link></li>
                <li><Link className="text-muted-foreground hover:text-primary transition-colors" href="#">Privacy Policy</Link></li>
                <li><Link className="text-muted-foreground hover:text-primary transition-colors" href="#">Accessibility</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
