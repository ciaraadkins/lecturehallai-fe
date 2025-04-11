"use client"

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, FileText, BookOpen, ListChecks, Headphones, Clock, Play, File, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CourseContent {
  id: string
  title: string
  type: 'study-guide' | 'flashcards' | 'quiz' | 'audio'
  date: string
}

interface CourseModule {
  id: string
  title: string
  items: CourseItem[]
}

interface CourseItem {
  id: string
  title: string
  type: 'video' | 'reading' | 'quiz'
  duration?: string
  questions?: number
  completed?: boolean
  link: string
}

interface RightSidebarProps {
  courseFilter: string
  onContentSelectionChange?: (selectedIds: string[]) => void
  onCollapsedChange?: (collapsed: boolean) => void
  className?: string
}

export function RightSidebar({ courseFilter, onContentSelectionChange, onCollapsedChange, className }: RightSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isRecentGenerationsOpen, setIsRecentGenerationsOpen] = useState(true)
  const [isCourseContentOpen, setIsCourseContentOpen] = useState(true)
  const [selectedContentIds, setSelectedContentIds] = useState<string[]>([])
  const [allSelected, setAllSelected] = useState(true)

  // Content generation types
  const contentTypes = [
    {
      id: "study-guide",
      name: "Study Guide",
      description: "Comprehensive notes on a topic",
      icon: FileText,
    },
    {
      id: "flashcards",
      name: "Flashcards",
      description: "Key terms and concepts",
      icon: BookOpen,
    },
    {
      id: "quiz",
      name: "Practice Quiz",
      description: "Test your knowledge",
      icon: ListChecks,
    },
    {
      id: "audio",
      name: "Audio Explanation",
      description: "Listen and learn",
      icon: Headphones,
    },
  ]

  // Notify parent component when collapsed state changes
  useEffect(() => {
    if (onCollapsedChange) {
      onCollapsedChange(isCollapsed);
    }
  }, [isCollapsed, onCollapsedChange]);

  // Sample recent generations
  const recentGenerations = [
    { id: 'g1', title: 'Chemical Bonds Explained', type: 'audio', course: 'chemistry', timestamp: '1 week ago' },
    { id: 'g2', title: 'Organic Chemistry Notes', type: 'study-guide', course: 'chemistry', timestamp: '1 week ago' },
    { id: 'g3', title: 'Wave Theory Flashcards', type: 'flashcards', course: 'physics', timestamp: '3 days ago' },
    { id: 'g4', title: 'Motion Equations Quiz', type: 'quiz', course: 'physics', timestamp: '2 weeks ago' },
    { id: 'g5', title: 'Derivatives Explained', type: 'study-guide', course: 'math', timestamp: '2 days ago' },
    { id: 'g6', title: 'Calculus Fundamentals Quiz', type: 'quiz', course: 'math', timestamp: '5 days ago' },
  ]

  // Filter recent generations based on the selected course
  const filteredGenerations = courseFilter === 'all' 
    ? recentGenerations 
    : recentGenerations.filter(gen => gen.course === courseFilter)

  // Sample course modules data - this would come from your API in a real app
  const courseModulesData: Record<string, CourseModule[]> = {
    physics: [
      {
        id: "mechanics",
        title: "Mechanics and Motion",
        items: [
          { id: "intro-mechanics", title: "Introduction to Newtonian Mechanics", type: "video", duration: "45 min", completed: false, link: "/student/courses/physics/content/intro-mechanics" },
          { id: "forces-diagrams", title: "Forces and Free Body Diagrams", type: "video", duration: "38 min", completed: false, link: "/student/courses/physics/content/forces-diagrams" },
          { id: "newton-laws", title: "Newton's Laws of Motion", type: "reading", duration: "20 min", completed: false, link: "/student/courses/physics/content/newton-laws" },
          { id: "problem-forces", title: "Problem Set: Forces and Motion", type: "quiz", questions: 10, completed: false, link: "/student/courses/physics/quiz/problem-forces" },
        ]
      },
      {
        id: "energy",
        title: "Energy and Work",
        items: [
          { id: "kinetic-potential", title: "Kinetic and Potential Energy", type: "video", duration: "42 min", completed: false, link: "/student/courses/physics/content/kinetic-potential" },
          { id: "conservation", title: "Conservation of Energy", type: "video", duration: "36 min", completed: false, link: "/student/courses/physics/content/conservation" },
          { id: "work-energy", title: "Work and Energy Theorem", type: "reading", duration: "25 min", completed: false, link: "/student/courses/physics/content/work-energy" },
          { id: "problem-energy", title: "Problem Set: Energy Calculations", type: "quiz", questions: 8, completed: false, link: "/student/courses/physics/quiz/problem-energy" },
        ]
      },
      {
        id: "waves",
        title: "Waves and Oscillations",
        items: [
          { id: "harmonic-motion", title: "Simple Harmonic Motion", type: "video", duration: "40 min", completed: false, link: "/student/courses/physics/content/harmonic-motion" },
          { id: "wave-properties", title: "Wave Properties and Behavior", type: "video", duration: "35 min", completed: false, link: "/student/courses/physics/content/wave-properties" },
        ]
      }
    ],
    math: [
      {
        id: "calculus",
        title: "Differential Calculus",
        items: [
          { id: "limits", title: "Limits and Continuity", type: "video", duration: "35 min", completed: false, link: "/student/courses/math/content/limits" },
          { id: "derivatives", title: "Derivatives and Rates of Change", type: "reading", duration: "30 min", completed: false, link: "/student/courses/math/content/derivatives" },
        ]
      }
    ],
    chemistry: [
      {
        id: "organic",
        title: "Introduction to Organic Chemistry",
        items: [
          { id: "carbon-compounds", title: "Carbon Compounds", type: "video", duration: "40 min", completed: false, link: "/student/courses/chemistry/content/carbon-compounds" },
          { id: "functional-groups", title: "Functional Groups", type: "reading", duration: "25 min", completed: false, link: "/student/courses/chemistry/content/functional-groups" },
        ]
      }
    ],
    all: []
  }
  
  // Default to showing "all courses" content
  let courseModules = courseModulesData.all;
  
  // If a specific course is selected, show that course's content
  if (courseFilter !== 'all' && courseModulesData[courseFilter]) {
    courseModules = courseModulesData[courseFilter];
  }

  // Initialize selected content
  useEffect(() => {
    // Flat array of all item IDs for the selected course
    const allItems = courseModules.flatMap(module => module.items.map(item => item.id));
    setSelectedContentIds(allItems);
  }, [courseFilter]);

  // Handle select/deselect all
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedContentIds([]);
      setAllSelected(false);
    } else {
      // Flat array of all item IDs
      const allItems = courseModules.flatMap(module => module.items.map(item => item.id));
      setSelectedContentIds(allItems);
      setAllSelected(true);
    }
    
    // Notify parent component
    if (onContentSelectionChange) {
      onContentSelectionChange(allSelected ? [] : selectedContentIds);
    }
  }

  // Handle individual content selection
  const handleContentSelection = (contentId: string, checked: boolean) => {
    let newSelection = [...selectedContentIds];
    
    if (checked) {
      newSelection.push(contentId);
    } else {
      newSelection = newSelection.filter(id => id !== contentId);
    }
    
    setSelectedContentIds(newSelection);
    
    // All items from the current course
    const allItems = courseModules.flatMap(module => module.items.map(item => item.id));
    setAllSelected(newSelection.length === allItems.length);
    
    // Notify parent component
    if (onContentSelectionChange) {
      onContentSelectionChange(newSelection);
    }
  }

  // Get content icon based on type
  const getContentTypeIcon = (type: string) => {
    switch(type) {
      case 'study-guide': return <FileText className="h-4 w-4" />;
      case 'flashcards': return <BookOpen className="h-4 w-4" />;
      case 'quiz': return <ListChecks className="h-4 w-4" />;
      case 'audio': return <Headphones className="h-4 w-4" />;
      case 'video': return <Play className="h-4 w-4" />;
      case 'reading': return <File className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  }

  // Format content type for display
  const formatContentType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  return (
    <div className={cn(
      "fixed right-0 top-0 h-full z-40 transition-all duration-300 bg-background border-l",
      isCollapsed ? "w-10" : "w-[420px]",
      className
    )}>
      {/* Collapse button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 -left-4 rounded-full border bg-background shadow-md z-50 h-8 w-8"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      {/* Sidebar content */}
      <div className={cn(
        "h-full overflow-hidden flex flex-col",
        isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b bg-gradient-to-r from-secondary/5 to-primary/5">
            <h2 className="text-xl font-semibold gradient-text">Learning Resources</h2>
            <p className="text-sm text-muted-foreground">Study materials and course content</p>
          </div>
          
          <div className="flex-1 overflow-auto p-4 space-y-6">

          {/* Recent Generations Section */}
          <Collapsible
            open={isRecentGenerationsOpen}
            onOpenChange={setIsRecentGenerationsOpen}
            className="border rounded-md shadow-sm overflow-hidden"
          >
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-accent/10 bg-card">
                <h3 className="font-medium text-primary">Recent Generations</h3>
                {isRecentGenerationsOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 pt-0">
                <p className="text-sm text-muted-foreground mb-3">Previously created study materials</p>
                <ScrollArea className="h-[240px]">
                  {filteredGenerations.length > 0 ? (
                    <div className="space-y-2">
                      {filteredGenerations.map((item) => (
                        <div key={item.id}>
                          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                            <div className="p-1.5 rounded-md bg-muted flex-shrink-0">
                              {getContentTypeIcon(item.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">{item.title}</div>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-[10px] rounded-sm h-4">
                                  {formatContentType(item.type)}
                                </Badge>
                                <Clock className="h-3 w-3" />
                                <span>{item.timestamp}</span>
                              </div>
                            </div>
                          </div>
                          <Separator className="my-2 last:hidden" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-sm text-muted-foreground py-4">
                      No recent generations for this course.
                    </div>
                  )}
                </ScrollArea>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Course Content Section */}
          <Collapsible
            open={isCourseContentOpen}
            onOpenChange={setIsCourseContentOpen}
            className="border rounded-md shadow-sm overflow-hidden"
          >
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-accent/10 bg-card">
                <h3 className="font-medium text-primary">Course Content</h3>
                {isCourseContentOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 pt-0">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground">Select content to include</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSelectAll}
                    className="h-8 text-xs"
                  >
                    {allSelected ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
                
                <ScrollArea className="h-[calc(100vh-32rem)] pr-3">
                  {courseModules.length > 0 ? (
                    <div className="space-y-6">
                      {courseModules.map((module) => (
                        <div key={module.id} className="space-y-3">
                          <h2 className="font-medium text-base">{module.title}</h2>
                          <div className="space-y-2 pl-1">
                            {module.items.map((item) => (
                              <div key={item.id} className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Checkbox 
                                    id={item.id}
                                    checked={selectedContentIds.includes(item.id)}
                                    onCheckedChange={(checked) => handleContentSelection(item.id, checked as boolean)}
                                    className="mt-0.5"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start">
                                      <div className="mr-1.5 mt-0.5">
                                        {getContentTypeIcon(item.type)}
                                      </div>
                                      <div>
                                        <label 
                                          htmlFor={item.id} 
                                          className="text-sm font-medium cursor-pointer"
                                        >
                                          {item.title}
                                        </label>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                          <span className="capitalize">{item.type}</span>
                                          {item.duration && <span>{item.duration}</span>}
                                          {item.questions && <span>{item.questions} questions</span>}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <Link 
                                    href={item.link} 
                                    className="text-xs flex items-center gap-0.5 text-primary hover:underline"
                                  >
                                    <span>Review</span>
                                    <ArrowRight className="h-3 w-3" />
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                          <Separator className="my-2" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    courseFilter === 'all' ? (
                      <div className="text-center text-sm text-muted-foreground py-4">
                        Please select a specific course to view content.
                      </div>
                    ) : (
                      <div className="text-center text-sm text-muted-foreground py-4">
                        No content available for this course.
                      </div>
                    )
                  )}
                </ScrollArea>
              </div>
            </CollapsibleContent>
          </Collapsible>
          </div>
        </div>
      </div>
    </div>
  )
}
