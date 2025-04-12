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
    <Card className="card-gradient h-full flex flex-col">
      <CardHeader className="pb-2 sm:pb-3">
        <div className="flex items-center gap-2">
          <div className="rounded-md p-1.5 gradient-bg text-white">
            <Icon className="h-4 w-4" />
          </div>
          <CardTitle className="text-base sm:text-lg gradient-text">{title}</CardTitle>
        </div>
        <CardDescription className="line-clamp-2 text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 sm:pb-3 flex-grow">
        <div className="flex flex-wrap gap-2">
          <Badge className="text-xs">{type}</Badge>
          <Badge variant="outline" className="text-xs">{course}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-0">
        <span className="text-xs text-muted-foreground w-full sm:w-auto">Created {created}</span>
        <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10 flex-1 sm:flex-initial">
            <Link href={`/student/content-hub/${id}`}>View</Link>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 gradient-border">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
