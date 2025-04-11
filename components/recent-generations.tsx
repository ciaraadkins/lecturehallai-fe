"use client"

import { useState, useEffect } from "react"
import { FileText, BookOpen, ListChecks, Headphones, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

// Define the shape of a generation item
interface GeneratedContent {
  id: string
  title: string
  type: "study-guide" | "flashcards" | "quiz" | "audio"
  course: string
  timestamp: string
}

export function RecentGenerations({ courseFilter = "all" }: { courseFilter?: string }) {
  // Demo content data
  const sampleGenerations: GeneratedContent[] = [
    {
      id: "gen1",
      title: "Derivatives Explained",
      type: "study-guide",
      course: "math",
      timestamp: "2 days ago"
    },
    {
      id: "gen2",
      title: "Wave Theory Flashcards",
      type: "flashcards",
      course: "physics",
      timestamp: "3 days ago"
    },
    {
      id: "gen3",
      title: "Calculus Fundamentals Quiz",
      type: "quiz",
      course: "math",
      timestamp: "5 days ago"
    },
    {
      id: "gen4",
      title: "Chemical Bonds Explained",
      type: "audio",
      course: "chemistry",
      timestamp: "1 week ago"
    },
    {
      id: "gen5",
      title: "Organic Chemistry Notes",
      type: "study-guide",
      course: "chemistry",
      timestamp: "1 week ago"
    },
    {
      id: "gen6",
      title: "Motion Equations Quiz",
      type: "quiz",
      course: "physics",
      timestamp: "2 weeks ago"
    }
  ]

  // Filter generations based on course filter
  const filteredGenerations = courseFilter === "all" 
    ? sampleGenerations 
    : sampleGenerations.filter(gen => gen.course === courseFilter)

  // Get icon based on content type
  const getContentIcon = (type: string) => {
    switch(type) {
      case "study-guide":
        return <FileText className="h-4 w-4" />
      case "flashcards":
        return <BookOpen className="h-4 w-4" />
      case "quiz":
        return <ListChecks className="h-4 w-4" />
      case "audio":
        return <Headphones className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recent Generations</CardTitle>
        <CardDescription>Previously created study materials</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredGenerations.length > 0 ? (
          <div className="space-y-2">
            {filteredGenerations.map((item, index) => (
              <div key={item.id}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-muted">
                      {getContentIcon(item.type)}
                    </div>
                    <div>
                      <Link href={`/student/content-hub/${item.id}`} className="text-sm font-medium hover:underline">
                        {item.title}
                      </Link>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-[10px] rounded-sm h-4">
                          {item.type.replace('-', ' ')}
                        </Badge>
                        <Clock className="h-3 w-3" />
                        <span>{item.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {index < filteredGenerations.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-sm text-muted-foreground py-4">
            No recent generations for this course.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
