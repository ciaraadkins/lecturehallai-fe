import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, BarChart, PieChart, TrendingUp, Users, AlertTriangle, Download } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentInsights() {
  const students = [
    {
      id: 1,
      name: "Emma Thompson",
      email: "emma.t@example.com",
      avatar: "/placeholder.svg?key=emma",
      progress: 85,
      courses: ["Physics", "Mathematics"],
      lastActive: "Today",
      status: "Active",
    },
    {
      id: 2,
      name: "James Wilson",
      email: "james.w@example.com",
      avatar: "/placeholder.svg?key=james",
      progress: 72,
      courses: ["Physics", "Chemistry"],
      lastActive: "Yesterday",
      status: "Active",
    },
    {
      id: 3,
      name: "Sophia Chen",
      email: "sophia.c@example.com",
      avatar: "/placeholder.svg?key=sophia",
      progress: 93,
      courses: ["Mathematics", "Chemistry"],
      lastActive: "2 days ago",
      status: "Active",
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "michael.b@example.com",
      avatar: "/placeholder.svg?key=michael",
      progress: 65,
      courses: ["Physics"],
      lastActive: "3 days ago",
      status: "At Risk",
    },
    {
      id: 5,
      name: "Olivia Davis",
      email: "olivia.d@example.com",
      avatar: "/placeholder.svg?key=olivia",
      progress: 45,
      courses: ["Mathematics"],
      lastActive: "1 week ago",
      status: "At Risk",
    },
  ]

  const challengingTopics = [
    {
      id: 1,
      topic: "Differential Equations",
      course: "Advanced Mathematics",
      struggleRate: 68,
      affectedStudents: 16,
    },
    {
      id: 2,
      topic: "Quantum Mechanics",
      course: "Introduction to Physics",
      struggleRate: 75,
      affectedStudents: 24,
    },
    {
      id: 3,
      topic: "Organic Chemistry Reactions",
      course: "Chemistry 101",
      struggleRate: 62,
      affectedStudents: 22,
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Insights</h1>
          <p className="text-muted-foreground">Monitor student progress and identify areas for improvement</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search students..." className="pl-8" />
        </div>
        <Select defaultValue="all-courses">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-courses">All Courses</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="mathematics">Mathematics</SelectItem>
            <SelectItem value="chemistry">Chemistry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">+4% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">+2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">-3 from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="mt-6">
        <TabsList>
          <TabsTrigger value="students">Individual Students</TabsTrigger>
          <TabsTrigger value="class">Class Analytics</TabsTrigger>
          <TabsTrigger value="topics">Challenging Topics</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Progress</CardTitle>
              <CardDescription>Individual student performance and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                        <div className="flex gap-2 mt-1">
                          {student.courses.map((course, index) => (
                            <Badge key={index} variant="outline">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{student.progress}%</span>
                        <Badge variant={student.status === "At Risk" ? "destructive" : "default"}>
                          {student.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="class" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Class Performance Overview</CardTitle>
              <CardDescription>Aggregate data and trends across all students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Average Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">78%</div>
                    <p className="text-sm text-muted-foreground">Overall class average</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Completion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">92%</div>
                    <p className="text-sm text-muted-foreground">Students completing all assignments</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Challenging Topics</CardTitle>
              <CardDescription>Areas where students are struggling the most</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {challengingTopics.map((topic) => (
                  <div key={topic.id} className="border rounded-md p-4">
                    <h4 className="font-medium">{topic.topic}</h4>
                    <p className="text-sm text-muted-foreground">{topic.course}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <PieChart className="h-4 w-4" />
                      <span>Struggle Rate: {topic.struggleRate}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Affected Students: {topic.affectedStudents}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Recommendations</CardTitle>
              <CardDescription>Personalized suggestions to improve student outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Coming soon! AI recommendations will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
