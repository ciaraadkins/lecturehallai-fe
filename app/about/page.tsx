"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { AILogo } from "@/components/ai-logo"

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <AILogo size="sm" />
          <span className="font-bold gradient-text ml-2">LectureHall.ai</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-primary" href="/about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
          <Button asChild size="sm">
            <Link href="/login">Log In</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About <span className="gradient-text">MyAILectureHall</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-500 dark:text-gray-400">
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