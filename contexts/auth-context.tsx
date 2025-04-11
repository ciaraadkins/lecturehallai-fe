"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Demo user data
const DEMO_USERS = {
  student: {
    id: "student-1",
    email: "student@lecturehall.ai",
    name: "Alex Johnson",
    role: "student",
    avatar: "/diverse-students-studying.png",
  },
  teacher: {
    id: "teacher-1",
    email: "teacher@lecturehall.ai",
    name: "Dr. Richard Feynman",
    role: "teacher",
    avatar: "/diverse-professor-lecture.png",
  },
}

type User = {
  id: string
  email: string
  name: string
  role: "student" | "teacher"
  avatar: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user")

      // Check if auth cookie exists
      const hasCookie = document.cookie.split(";").some((item) => item.trim().startsWith("auth-token="))

      if (storedUser && hasCookie) {
        setUser(JSON.parse(storedUser))
      } else if (storedUser && !hasCookie) {
        // If localStorage has user but cookie is missing, set the cookie
        const userData = JSON.parse(storedUser)
        const authToken = `${userData.id}:${userData.role}`
        document.cookie = `auth-token=${authToken}; path=/; max-age=${60 * 60 * 24 * 7}`
      }
      setIsLoading(false)
    }

    // Small delay to ensure consistent state
    const timer = setTimeout(checkAuth, 50)
    return () => clearTimeout(timer)
  }, [])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check for demo credentials
    let userData = null
    if (email === "student@lecturehall.ai" && password === "student123") {
      userData = DEMO_USERS.student
    } else if (email === "teacher@lecturehall.ai" && password === "teacher123") {
      userData = DEMO_USERS.teacher
    }

    if (userData) {
      // Create a simple auth token (in a real app, this would be a JWT)
      const authToken = `${userData.id}:${userData.role}`

      // Set both localStorage and cookie
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))

      // Set cookie with 7-day expiration
      document.cookie = `auth-token=${authToken}; path=/; max-age=${60 * 60 * 24 * 7}`

      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")

    // Clear the auth cookie by setting it to expire in the past
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
