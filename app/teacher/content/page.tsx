import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, Upload, Download, BookOpen, Video, MoreHorizontal, Filter } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ContentLibrary() {
  const contentItems = [
    {
      id: 1,
      title: "Physics Lecture Notes",
      description: "Comprehensive notes on Newton's Laws of Motion",
      type: "Document",
      course: "Introduction to Physics",
      uploaded: "2 days ago",
      engagement: "32 views",
      icon: FileText,
    },
    {
      id: 2,
      title: "Mathematics Formulas",
      description: "Key formulas for differential equations",
      type: "Document",
      course: "Advanced Mathematics",
      uploaded: "3 days ago",
      engagement: "24 views",
      icon: FileText,
    },
    {
      id: 3,
      title: "Chemistry Lab Instructions",
      description: "Instructions for organic compounds lab",
      type: "Document",
      course: "Chemistry 101",
      uploaded: "4 days ago",
      engagement: "36 views",
      icon: FileText,
    },
    {
      id: 4,
      title: "Physics Video Lecture",
      description: "Video lecture on mechanics and forces",
      type: "Video",
      course: "Introduction to Physics",
      uploaded: "1 week ago",
      engagement: "48 views",
      icon: Video,
    },
    {
      id: 5,
      title: "Mathematics Problem Set",
      description: "Practice problems for complex equations",
      type: "Document",
      course: "Advanced Mathematics",
      uploaded: "1 week ago",
      engagement: "18 views",
      icon: FileText,
    },
    {
      id: 6,
      title: "Chemistry Textbook Chapters",
      description: "Selected chapters on key chemistry principles",
      type: "Document",
      course: "Chemistry 101",
      uploaded: "2 weeks ago",
      engagement: "42 views",
      icon: BookOpen,
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Library</h1>
          <p className="text-muted-foreground">Manage and organize your teaching materials</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/teacher/content/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Content
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search content..." className="pl-8" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contentItems.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <item.icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge>{item.type}</Badge>
                    <Badge variant="outline">{item.course}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Uploaded {item.uploaded}</span>
                    <span className="text-xs text-muted-foreground">{item.engagement}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/teacher/content/${item.id}`}>View</Link>
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contentItems
              .filter((item) => item.type === "Document")
              .map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge>{item.type}</Badge>
                      <Badge variant="outline">{item.course}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Uploaded {item.uploaded}</span>
                      <span className="text-xs text-muted-foreground">{item.engagement}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/teacher/content/${item.id}`}>View</Link>
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contentItems
              .filter((item) => item.type === "Video")
              .map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge>{item.type}</Badge>
                      <Badge variant="outline">{item.course}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Uploaded {item.uploaded}</span>
                      <span className="text-xs text-muted-foreground">{item.engagement}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/teacher/content/${item.id}`}>View</Link>
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="mt-4">
          <div className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Assignments Yet</h3>
            <p className="text-muted-foreground text-center max-w-md mt-2">
              You haven't created any assignments yet. Create your first assignment to get started.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/teacher/content/new-assignment">Create Assignment</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
