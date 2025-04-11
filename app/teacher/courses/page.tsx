import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, PlusCircle, Search, Users, Calendar, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function CourseManagement() {
  const activeCourses = [
    {
      id: 1,
      title: "Introduction to Physics",
      description: "Fundamental concepts of physics for beginners",
      students: 32,
      modules: 8,
      status: "In Progress",
      lastUpdated: "2 days ago",
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      description: "Complex mathematical concepts and problem solving",
      students: 24,
      modules: 12,
      status: "In Progress",
      lastUpdated: "1 week ago",
    },
    {
      id: 3,
      title: "Chemistry 101",
      description: "Introduction to basic chemistry principles",
      students: 36,
      modules: 10,
      status: "Upcoming",
      lastUpdated: "3 days ago",
    },
    {
      id: 4,
      title: "Biology Fundamentals",
      description: "Core concepts in modern biology",
      students: 28,
      modules: 9,
      status: "Upcoming",
      lastUpdated: "5 days ago",
    },
  ]

  const archivedCourses = [
    {
      id: 5,
      title: "History of Science",
      description: "Evolution of scientific thought through the ages",
      students: 22,
      modules: 6,
      status: "Completed",
      lastUpdated: "2 months ago",
    },
    {
      id: 6,
      title: "Environmental Studies",
      description: "Understanding our environment and sustainability",
      students: 18,
      modules: 7,
      status: "Completed",
      lastUpdated: "3 months ago",
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
          <p className="text-muted-foreground">Create, edit, and manage your courses</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/teacher/courses/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Course
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search courses..." className="pl-8" />
        </div>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Filter by Date
        </Button>
        <Button variant="outline">
          <Users className="mr-2 h-4 w-4" />
          Filter by Size
        </Button>
      </div>

      <Tabs defaultValue="active" className="mt-6">
        <TabsList>
          <TabsTrigger value="active">Active Courses</TabsTrigger>
          <TabsTrigger value="archived">Archived Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4 mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Course</DropdownMenuItem>
                        <DropdownMenuItem>Manage Students</DropdownMenuItem>
                        <DropdownMenuItem>Add Content</DropdownMenuItem>
                        <DropdownMenuItem>Archive Course</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{course.students} Students</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{course.modules} Modules</span>
                    </div>
                  </div>
                  <Badge variant={course.status === "In Progress" ? "default" : "secondary"}>{course.status}</Badge>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between">
                  <span className="text-xs text-muted-foreground">Updated {course.lastUpdated}</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/teacher/courses/${course.id}`}>Manage</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="archived" className="space-y-4 mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {archivedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Course</DropdownMenuItem>
                        <DropdownMenuItem>Restore Course</DropdownMenuItem>
                        <DropdownMenuItem>Export Data</DropdownMenuItem>
                        <DropdownMenuItem>Delete Course</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{course.students} Students</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{course.modules} Modules</span>
                    </div>
                  </div>
                  <Badge variant="outline">{course.status}</Badge>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between">
                  <span className="text-xs text-muted-foreground">Updated {course.lastUpdated}</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/teacher/courses/${course.id}`}>View</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
