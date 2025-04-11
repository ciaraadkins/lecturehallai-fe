import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, Clock, FileText, Video, ListChecks, ChevronRight, PlayCircle } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function CoursesPage() {
  const enrolledCourses = [
    {
      id: 1,
      title: "Introduction to Physics",
      description: "Fundamental principles of physics including mechanics, waves, and thermodynamics",
      instructor: "Dr. Richard Feynman",
      progress: 68,
      nextLesson: "Wave Mechanics and Interference",
      upcoming: "Quiz: Newton's Laws of Motion",
      upcomingDate: "Tomorrow, 2:00 PM",
      modules: 12,
      completed: 8,
      image: "/placeholder.svg?key=w50ix",
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      description: "Complex mathematical concepts including calculus, linear algebra, and differential equations",
      instructor: "Dr. Katherine Johnson",
      progress: 42,
      nextLesson: "Partial Differential Equations",
      upcoming: "Assignment: Matrix Operations",
      upcomingDate: "Friday, 11:59 PM",
      modules: 15,
      completed: 6,
      image: "/placeholder.svg?key=q7afi",
    },
    {
      id: 3,
      title: "Chemistry 101",
      description: "Introduction to chemical principles, atomic structure, and chemical reactions",
      instructor: "Dr. Marie Curie",
      progress: 25,
      nextLesson: "Organic Compounds and Nomenclature",
      upcoming: "Lab: Acid-Base Titration",
      upcomingDate: "Thursday, 3:30 PM",
      modules: 10,
      completed: 2,
      image: "/placeholder.svg?key=822f1",
    },
  ]

  const courseModules = [
    {
      id: 1,
      title: "Mechanics and Motion",
      lessons: [
        { id: 1, title: "Introduction to Newtonian Mechanics", type: "video", duration: "45 min", completed: true },
        { id: 2, title: "Forces and Free Body Diagrams", type: "video", duration: "38 min", completed: true },
        { id: 3, title: "Newton's Laws of Motion", type: "reading", duration: "20 min", completed: true },
        { id: 4, title: "Problem Set: Forces and Motion", type: "quiz", questions: 10, completed: false },
      ],
    },
    {
      id: 2,
      title: "Energy and Work",
      lessons: [
        { id: 5, title: "Kinetic and Potential Energy", type: "video", duration: "42 min", completed: true },
        { id: 6, title: "Conservation of Energy", type: "video", duration: "36 min", completed: true },
        { id: 7, title: "Work and Energy Theorem", type: "reading", duration: "25 min", completed: false },
        { id: 8, title: "Problem Set: Energy Calculations", type: "quiz", questions: 8, completed: false },
      ],
    },
    {
      id: 3,
      title: "Waves and Oscillations",
      lessons: [
        { id: 9, title: "Simple Harmonic Motion", type: "video", duration: "40 min", completed: true },
        { id: 10, title: "Wave Properties and Behavior", type: "video", duration: "44 min", completed: true },
        { id: 11, title: "Wave Mechanics and Interference", type: "reading", duration: "30 min", completed: false },
        {
          id: 12,
          title: "Lab Simulation: Wave Interference",
          type: "interactive",
          duration: "60 min",
          completed: false,
        },
      ],
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">View and manage your enrolled courses</p>
        </div>
      </div>

      <Tabs defaultValue="enrolled" className="space-y-4">
        <TabsList>
          <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
          <TabsTrigger value="current">Current Course</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <Badge variant={course.progress > 50 ? "default" : "outline"}>{course.progress}% Complete</Badge>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={`/placeholder.svg?height=24&width=24&query=${course.instructor}`}
                        alt={course.instructor}
                      />
                      <AvatarFallback>
                        {course.instructor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{course.instructor}</span>
                  </div>
                  <Progress value={course.progress} className="h-2 mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>
                      {course.completed} of {course.modules} modules
                    </span>
                    <span>{course.progress}%</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-xs">
                    <p className="font-medium">Next: {course.nextLesson}</p>
                    <div className="flex items-center mt-1 text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{course.upcomingDate}</span>
                    </div>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/student/courses/${course.id}`}>Continue</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="current">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">Introduction to Physics</CardTitle>
                      <CardDescription>Dr. Richard Feynman</CardDescription>
                    </div>
                    <Badge variant="default">In Progress</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Course Progress</span>
                        <span>68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>

                    <div className="bg-muted rounded-lg p-4 flex items-start space-x-4">
                      <PlayCircle className="h-8 w-8 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">Continue where you left off</h3>
                        <p className="text-sm text-muted-foreground mb-2">Wave Mechanics and Interference</p>
                        <Button size="sm">Resume Learning</Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        Upcoming
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Quiz: Newton's Laws of Motion</p>
                            <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Prepare
                          </Button>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Lab Simulation: Wave Interference</p>
                            <p className="text-sm text-muted-foreground">Friday, 3:30 PM</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h2 className="text-xl font-bold">Course Content</h2>

                {courseModules.map((module) => (
                  <Card key={module.id}>
                    <CardHeader className="pb-3">
                      <CardTitle>{module.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-2">
                        {module.lessons.map((lesson) => (
                          <div key={lesson.id} className="flex items-center justify-between py-2">
                            <div className="flex items-center">
                              {lesson.type === "video" && <Video className="h-4 w-4 mr-2 text-primary" />}
                              {lesson.type === "reading" && <FileText className="h-4 w-4 mr-2 text-primary" />}
                              {lesson.type === "quiz" && <ListChecks className="h-4 w-4 mr-2 text-primary" />}
                              {lesson.type === "interactive" && <PlayCircle className="h-4 w-4 mr-2 text-primary" />}
                              <div>
                                <p
                                  className={`font-medium ${lesson.completed ? "line-through text-muted-foreground" : ""}`}
                                >
                                  {lesson.title}
                                </p>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Badge variant="outline" className="mr-2 text-xs font-normal">
                                    {lesson.type}
                                  </Badge>
                                  {lesson.duration && (
                                    <span className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {lesson.duration}
                                    </span>
                                  )}
                                  {lesson.questions && (
                                    <span className="flex items-center">
                                      <ListChecks className="h-3 w-3 mr-1" />
                                      {lesson.questions} questions
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-1">
                              {lesson.completed ? "Review" : "Start"}
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/student/content-hub">
                      <FileText className="h-4 w-4 mr-2" />
                      Course Syllabus
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Textbook Materials
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/student/ai-assistant">
                      <BookOpen className="h-4 w-4 mr-2" />
                      AI Study Assistant
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Video className="h-4 w-4 mr-2" />
                    Lecture Recordings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Instructor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src="/placeholder.svg?height=48&width=48&query=professor"
                        alt="Dr. Richard Feynman"
                      />
                      <AvatarFallback>RF</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr. Richard Feynman</p>
                      <p className="text-sm text-muted-foreground">Professor of Physics</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Office Hours</p>
                    <p className="text-sm text-muted-foreground">Monday & Wednesday: 2:00 PM - 4:00 PM</p>
                    <p className="text-sm text-muted-foreground">Friday: 10:00 AM - 12:00 PM</p>
                  </div>
                  <Button className="w-full">Contact Instructor</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Study Group</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex -space-x-2">
                    <Avatar className="border-2 border-background">
                      <AvatarImage src="/placeholder.svg?height=32&width=32&query=student1" alt="Student" />
                      <AvatarFallback>S1</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background">
                      <AvatarImage src="/placeholder.svg?height=32&width=32&query=student2" alt="Student" />
                      <AvatarFallback>S2</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background">
                      <AvatarImage src="/placeholder.svg?height=32&width=32&query=student3" alt="Student" />
                      <AvatarFallback>S3</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background">
                      <AvatarImage src="/placeholder.svg?height=32&width=32&query=student4" alt="Student" />
                      <AvatarFallback>S4</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background">
                      <AvatarFallback>+3</AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="text-sm">You're part of a study group with 8 other students</p>
                  <Button variant="outline" className="w-full">
                    Open Group Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="rounded-lg border p-8 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No completed courses yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep learning! Your completed courses will appear here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
