"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Menu, X } from "lucide-react"
import { AILogo } from "@/components/ai-logo"
import { useState, useEffect } from "react"

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if mobile on component mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Check initially
    checkIfMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])
  return (
    <div className="flex flex-col min-h-screen">
      {/* Enhanced Header with shadow and better spacing - matches home page */}
      <header className="px-6 lg:px-8 h-16 flex items-center border-b shadow-sm sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link className="flex items-center justify-center" href="/">
            <AILogo size="sm" />
            <span className="font-bold gradient-text ml-2 text-lg">LectureHall.ai</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/#features">
              Features
            </Link>
            <Link className="text-sm font-medium text-primary" href="/about">
              About
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">
              Contact
            </Link>
            <Button asChild size="sm" className="ml-2 shadow-md">
              <Link href="/login">Log In</Link>
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="md:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-30 animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu */}
          <div className="md:hidden fixed inset-x-0 top-16 z-40 bg-background/95 backdrop-blur-sm border-b shadow-lg animate-slideInDown">
            <div className="px-6 py-4 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <Link 
                className="flex items-center py-3 px-4 text-base font-medium hover:bg-primary/10 rounded-lg transition-colors" 
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                className="flex items-center py-3 px-4 text-base font-medium bg-primary/10 rounded-lg transition-colors" 
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                className="flex items-center py-3 px-4 text-base font-medium hover:bg-primary/10 rounded-lg transition-colors" 
                href="#"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-2 pb-3">
                <Button asChild size="lg" className="w-full shadow-md btn-gradient">
                  <Link 
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center"
                  >
                    Log In
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl pl-10 md:pl-0">
                About <span className="gradient-text">MyAILectureHall</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 pl-10 md:pl-0">
                Revolutionizing Education for Every Learning Journey
              </h2>
            </div>
            
            <div className="mt-10 space-y-8 text-gray-700 dark:text-gray-300">
              <p className="text-lg">
                At MyAILectureHall, we believe education shouldn't conform to a one-size-fits-all approach. We've created an AI-powered learning platform that adapts to your unique learning style, schedule, and educational goals—whether you're a traditional student or balancing multiple life responsibilities.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Why Adaptive Learning Matters</h3>
                <p>
                  The educational landscape is evolving rapidly. Today's students—whether they're pursuing their first degree right out of high school or returning to education while managing careers, families, and other commitments—deserve learning experiences tailored to their individual needs.
                </p>
                <p>
                  Our AI-driven platform delivers personalized educational content that adjusts in real-time based on:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your unique learning preferences and pace</li>
                  <li>Your existing knowledge and skill gaps</li>
                  <li>Your schedule and availability</li>
                  <li>Your specific educational goals</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Empowering Nontraditional Students</h3>
                <p>
                  We recognize that for many learners, education is just one part of a complex life equation. Whether you're a working professional seeking to upskill, a parent balancing family responsibilities, or someone with a non-linear educational path, MyAILectureHall ensures your learning experience works with your life—not against it.
                </p>
                <p>
                  Our platform is designed with "ANDers" in mind—those balancing education AND other key responsibilities. We see your busy life not as an obstacle but as a strength that brings valuable real-world perspective to your educational journey.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Enhancing Learning for All Students</h3>
                <p>
                  While our platform especially benefits nontraditional students, all learners can thrive with personalized education. Our AI tools help:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Identify and address knowledge gaps</li>
                  <li>Present material in formats that match your learning style</li>
                  <li>Provide immediate feedback and reinforcement</li>
                  <li>Generate study materials tailored to your needs</li>
                  <li>Offer flexible scheduling that works around your commitments</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">The Power of AI in Education</h3>
                <p>
                  MyAILectureHall harnesses cutting-edge artificial intelligence to transform how you learn:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personalized Content Generation</strong>: From comprehensive study guides to engaging podcasts, our AI creates materials specialized for your learning preferences.</li>
                  <li><strong>Adaptive Assessments</strong>: Quizzes and practice materials adjust in real-time, focusing on areas where you need more support.</li>
                  <li><strong>Learning Style Integration</strong>: Content delivery adapts based on whether you're a visual, auditory, reading/writing, or kinesthetic learner.</li>
                  <li><strong>Always Available Support</strong>: Get answers and explanations whenever you need them, not just during office hours.</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Join the Future of Learning</h3>
                <p>
                  At MyAILectureHall, we're building more than just another education platform—we're creating a community where every student can thrive on their own terms. Join us in shaping a future where education adapts to you, empowering your success regardless of your background, schedule, or learning journey.
                </p>
                <p className="text-lg font-medium">
                  Education shouldn't be another obstacle—it should be an opportunity that fits your life.
                </p>
              </div>
            </div>
            
            <div className="mt-12">
              <Button asChild size="lg" className="btn-gradient">
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Link>
              </Button>
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
                <li><Link className="text-muted-foreground hover:text-primary transition-colors" href="/#features">Features</Link></li>
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