import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, BookOpen, FileText, PlusCircle, Users } from "lucide-react"
import Link from "next/link"

export default function TeacherDashboard() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Manage your courses, content, and student interactions.</p>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 in progress, 2 upcoming</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Items</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+8 in the last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Student Engagement</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+2% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent-activity" className="mt-6">
        <TabsList>
          <TabsTrigger value="recent-activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="pending-tasks">Pending Tasks</TabsTrigger>
          <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
        </TabsList>
        <TabsContent value="recent-activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "New assignment submitted",
                    description: "12 students submitted the Physics Quiz",
                    time: "2 hours ago",
                  },
                  {
                    title: "Course material updated",
                    description: "You updated 'Introduction to Calculus' materials",
                    time: "Yesterday",
                  },
                  {
                    title: "Student question",
                    description: "Sarah asked a question about the Chemistry homework",
                    time: "Yesterday",
                  },
                  {
                    title: "New student enrolled",
                    description: "3 new students enrolled in 'Biology 101'",
                    time: "2 days ago",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-start pb-4 border-b last:border-0 last:pb-0">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending-tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Tasks that require your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Review assignment submissions",
                    description: "Physics Quiz - 12 submissions pending review",
                    deadline: "Due tomorrow",
                  },
                  {
                    title: "Answer student questions",
                    description: "3 unanswered questions in Chemistry forum",
                    deadline: "Due today",
                  },
                  {
                    title: "Prepare next week's materials",
                    description: "Biology 101 - Chapter 5 materials needed",
                    deadline: "Due in 3 days",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-start pb-4 border-b last:border-0 last:pb-0">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <span className="text-xs font-medium text-orange-500">{item.deadline}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="quick-actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you might want to perform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/teacher/courses/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create new course
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/teacher/content/new">
                    <FileText className="mr-2 h-4 w-4" />
                    Upload content
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/teacher/courses">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Manage courses
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/teacher/insights">
                    <Users className="mr-2 h-4 w-4" />
                    View student insights
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
