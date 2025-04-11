"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, GraduationCap } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("student")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, user } = useAuth()

  // Check if we're switching roles
  const isSwitching = searchParams.get("switch") === "true"

  // Update the useEffect to prevent premature redirects
  useEffect(() => {
    // Add a small delay to ensure localStorage and cookies are in sync
    const timer = setTimeout(() => {
      // If already logged in and not switching, redirect to appropriate dashboard
      if (user && !isSwitching) {
        if (user.role === "student") {
          router.push("/student/dashboard")
        } else {
          router.push("/teacher/dashboard")
        }
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [user, router, isSwitching])

  // Update the handleLogin function to handle the loading state better
  const handleLogin = async (e: React.FormEvent, role: string) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Use the appropriate demo credentials based on selected role
      let loginEmail = email
      let loginPassword = password

      if (role === "student" && !email && !password) {
        loginEmail = "student@lecturehall.ai"
        loginPassword = "student123"
      } else if (role === "teacher" && !email && !password) {
        loginEmail = "teacher@lecturehall.ai"
        loginPassword = "teacher123"
      }

      const success = await login(loginEmail, loginPassword)

      if (success) {
        // Add a small delay before redirect to ensure cookie is set
        setTimeout(() => {
          if (role === "student") {
            router.push("/student/dashboard")
          } else {
            router.push("/teacher/dashboard")
          }
        }, 100)
      } else {
        setError("Invalid email or password")
        setIsLoading(false)
      }
    } catch (err) {
      setError("An error occurred during login")
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (role: string) => {
    if (role === "student") {
      setEmail("student@lecturehall.ai")
      setPassword("student123")
    } else {
      setEmail("teacher@lecturehall.ai")
      setPassword("teacher123")
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-2">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Welcome to LectureHall.ai</CardTitle>
          <CardDescription className="text-center">
            {isSwitching ? "Switch to a different account" : "Log in to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
            </TabsList>
            <TabsContent value="student">
              <form onSubmit={(e) => handleLogin(e, "student")} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="student@lecturehall.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="student-password">Password</Label>
                    <Link href="#" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="student-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log in as Student"}
                </Button>
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">or</span>
                </div>
                <Button type="button" variant="outline" className="w-full" onClick={() => handleDemoLogin("student")}>
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Use Demo Student Account
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="teacher">
              <form onSubmit={(e) => handleLogin(e, "teacher")} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="teacher-email">Email</Label>
                  <Input
                    id="teacher-email"
                    type="email"
                    placeholder="teacher@lecturehall.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="teacher-password">Password</Label>
                    <Link href="#" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="teacher-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log in as Teacher"}
                </Button>
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">or</span>
                </div>
                <Button type="button" variant="outline" className="w-full" onClick={() => handleDemoLogin("teacher")}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Use Demo Teacher Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="#" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
          <div className="text-center text-xs text-muted-foreground">
            <p>Demo Student: student@lecturehall.ai / student123</p>
            <p>Demo Teacher: teacher@lecturehall.ai / teacher123</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
