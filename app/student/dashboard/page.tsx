import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, Clock, FileText, MessageSquare, BarChart, Bell } from "lucide-react"
import Link from "next/link"
import { StatsCard } from "@/components/stats-card"

export default function StudentDashboard() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Quiz: Newton's Laws of Motion",
      course: "Introduction to Physics",
      date: "Tomorrow, 2:00 PM",
      type: "quiz",
    },
    {
      id: 2,
      title: "Assignment: Matrix Operations",
      course: "Advanced Mathematics",
      date: "Friday, 11:59 PM",
      type: "assignment",
    },
    {
      id: 3,
      title: "Lab: Acid-Base Titration",
      course: "Chemistry 101",
      date: "Thursday, 3:30 PM",
      type: "lab",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      title: "Completed lesson: Kinetic and Potential Energy",
      course: "Introduction to Physics",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Generated study guide: Differential Equations",
      course: "Advanced Mathematics",
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Submitted assignment: Chemical Formulas",
      course: "Chemistry 101",
      time: "2 days ago",
    },
  ]

  const aiGeneratedContent = [
    {
      id: 1,
      title: "Physics Study Guide",
      description: "Comprehensive notes on Newton's Laws of Motion",
      type: "Study Guide",
      created: "2 days ago",
    },
    {
      id: 2,
      title: "Math Concepts Podcast",
      description: "Audio explanation of differential equations",
      type: "Audio",
      created: "3 days ago",
    },
    {
      id: 3,
      title: "Chemistry Flashcards",
      description: "Key terms and concepts for organic compounds",
      type: "Flashcards",
      created: "4 days ago",
    },
  ]

  const enrolledCourses = [
    {
      id: 1,
      title: "Introduction to Physics",
      instructor: "Dr. Richard Feynman",
      progress: 68,
      nextLesson: "Wave Mechanics and Interference",
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      instructor: "Dr. Katherine Johnson",
      progress: 42,
      nextLesson: "Partial Differential Equations",
    },
    {
      id: 3,
      title: "Chemistry 101",
      instructor: "Dr. Marie Curie",
      progress: 25,
      nextLesson: "Organic Compounds and Nomenclature",
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your learning journey.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button asChild>
            <Link href="/student/ai-assistant">
              <MessageSquare className="mr-2 h-4 w-4" />
              AI Assistant
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatsCard title="Courses Enrolled" value="3" description="Active courses" icon={BookOpen} />
        <StatsCard
          title="Study Time"
          value="12.5 hrs"
          description="This week"
          icon={Clock}
          trend="up"
          trendValue="2.1 hrs"
        />
        <StatsCard title="Assignments" value="2/5" description="Completed" icon={FileText} />
        <StatsCard
          title="Overall Progress"
          value="45%"
          description="Across all courses"
          icon={BarChart}
          trend="up"
          trendValue="5%"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Your enrolled courses and progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    </div>
                    <Badge variant={course.progress > 50 ? "default" : "outline"}>{course.progress}%</Badge>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Next: {course.nextLesson}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/student/courses/${course.id}`}>Continue</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/student/courses">View All Courses</Link>
              </Button>
            </CardFooter>
          </Card>

          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Scheduled assignments, quizzes, and deadlines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {event.type === "quiz" && <FileText className="h-5 w-5 text-primary" />}
                          {event.type === "assignment" && <FileText className="h-5 w-5 text-primary" />}
                          {event.type === "lab" && <BookOpen className="h-5 w-5 text-primary" />}
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.course}</p>
                          <div className="flex items-center mt-1 text-sm">
                            <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">{event.date}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Prepare
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recent" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest learning activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.course}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Content</CardTitle>
              <CardDescription>Your recent study materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiGeneratedContent.map((content) => (
                <div key={content.id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{content.title}</h3>
                    <Badge variant="outline">{content.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{content.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Created {content.created}</span>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/student/content-hub">View Content Hub</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Recommendations</CardTitle>
              <CardDescription>Personalized for your learning style</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Review Newton's Laws</h3>
                <p className="text-sm text-muted-foreground">Based on your upcoming quiz in Physics</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/student/ai-assistant">Generate Study Guide</Link>
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Practice Matrix Problems</h3>
                <p className="text-sm text-muted-foreground">To prepare for your Mathematics assignment</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/student/ai-assistant">Create Practice Quiz</Link>
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Chemistry Lab Preparation</h3>
                <p className="text-sm text-muted-foreground">Review acid-base reactions before your lab</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/student/ai-assistant">Generate Lab Notes</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
