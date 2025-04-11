import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface ContentItemProps {
  id: number
  title: string
  description: string
  type: string
  course: string
  created: string
  icon: LucideIcon
}

export function ContentItem({ id, title, description, type, course, created, icon: Icon }: ContentItemProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2">
          <Badge>{type}</Badge>
          <Badge variant="outline">{course}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-xs text-muted-foreground">Created {created}</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/student/content-hub/${id}`}>View</Link>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
