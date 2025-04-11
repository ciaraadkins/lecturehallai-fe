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
      status: "Regular User",
    },
    {
      id: 2,
      name: "James Wilson",
      email: "james.w@example.com",
      avatar: "/placeholder.svg?key=james",
      progress: 72,
      courses: ["Physics", "Chemistry"],
      lastActive: "Yesterday",
      status: "Super User",
    },
    {
      id: 3,
      name: "Sophia Chen",
      email: "sophia.c@example.com",
      avatar: "/placeholder.svg?key=sophia",
      progress: 93,
      courses: ["Mathematics", "Chemistry"],
      lastActive: "2 days ago",
      status: "Super User",
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "michael.b@example.com",
      avatar: "/placeholder.svg?key=michael",
      progress: 65,
      courses: ["Physics"],
      lastActive: "3 days ago",
      status: "Occasional User",
    },
    {
      id: 5,
      name: "Olivia Davis",
      email: "olivia.d@example.com",
      avatar: "/placeholder.svg?key=olivia",
      progress: 45,
      courses: ["Mathematics"],
      lastActive: "1 week ago",
      status: "Occasional User",
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
            <CardTitle className="text-sm font-medium">Occasional Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 fewer than last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="mt-6">
        <TabsList>
          <TabsTrigger value="students">Individual Students</TabsTrigger>
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
                <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground mb-2 px-2">
                  <div>Student</div>
                  <div className="text-center">Engagement</div>
                  <div className="text-right">Usage Level</div>
                </div>
                {students.map((student) => (
                  <div key={student.id} className="border-b pb-6 last:border-0 last:pb-0 pt-6 first:pt-0">
                    <div className="grid grid-cols-3 items-center">
                      {/* Student Information Column */}
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-11">
                          {student.courses.map((course, index) => (
                            <Badge key={index} variant="outline">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Progress Column */}
                      <div className="text-center">
                        <span className="text-xl font-medium">{student.progress}%</span>
                      </div>
                      
                      {/* Engagement Column */}
                      <div className="text-right">
                        <Badge 
                          variant="outline" 
                          className={`${student.status === "Super User" ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400 border-green-400" : 
                                     student.status === "Regular User" ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-800/20 dark:text-blue-400 border-blue-400" : 
                                     "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800/20 dark:text-gray-400 border-gray-400"}`}
                        >
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
