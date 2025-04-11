import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CourseCardProps {
  id: number
  title: string
  description: string
  instructor: string
  progress: number
  nextLesson: string
  upcoming: string
  upcomingDate: string
  modules: number
  completed: number
  image: string
}

export function CourseCard({
  id,
  title,
  description,
  instructor,
  progress,
  nextLesson,
  upcoming,
  upcomingDate,
  modules,
  completed,
  image,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden card-gradient">
      <div className="aspect-video w-full overflow-hidden relative">
        <img src={image || "/placeholder.svg"} alt={title} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40"></div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl gradient-text">{title}</CardTitle>
          <Badge variant={progress > 50 ? "default" : "outline"}>{progress}% Complete</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center space-x-2 mb-4">
          <Avatar className="h-6 w-6">
            <AvatarImage src={`/placeholder.svg?height=24&width=24&query=${instructor}`} alt={instructor} />
            <AvatarFallback>
              {instructor
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{instructor}</span>
        </div>
        <Progress value={progress} className="h-2 mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>
            {completed} of {modules} modules
          </span>
          <span>{progress}%</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs">
          <p className="font-medium">Next: {nextLesson}</p>
          <div className="flex items-center mt-1 text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{upcomingDate}</span>
          </div>
        </div>
        <Button size="sm" asChild className="btn-gradient">
          <Link href={`/student/courses/${id}`}>Continue</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
