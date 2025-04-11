"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Brain, Clock, PlusCircle, User } from "lucide-react"

function StudentProfilePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-10">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-muted-foreground">
            Manage your preferences, track goals, and customize your learning experience.
          </p>
        </div>

        <div>
          <Tabs defaultValue="preferences" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="goals">Goals & Habits</TabsTrigger>
            </TabsList>

            <TabsContent value="preferences" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Preferences</CardTitle>
                  <CardDescription>Customize how content is presented to you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Content Format Preferences</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="pref-text">Text-based content</Label>
                        <Switch id="pref-text" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="pref-visual">Visual diagrams</Label>
                        <Switch id="pref-visual" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="pref-audio">Audio explanations</Label>
                        <Switch id="pref-audio" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="pref-interactive">Interactive exercises</Label>
                        <Switch id="pref-interactive" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium">AI Assistant Preferences</h4>
                    <div className="space-y-2">
                      <Label>Explanation Complexity</Label>
                      <RadioGroup defaultValue="balanced">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="simple" id="simple" />
                          <Label htmlFor="simple">Simple explanations</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="balanced" id="balanced" />
                          <Label htmlFor="balanced">Balanced</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="detailed" id="detailed" />
                          <Label htmlFor="detailed">Detailed explanations</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Learning Pace</Label>
                      <RadioGroup defaultValue="medium">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="slow" id="slow" />
                          <Label htmlFor="slow">Thorough (slower pace)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medium" id="medium" />
                          <Label htmlFor="medium">Balanced</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fast" id="fast" />
                          <Label htmlFor="fast">Efficient (faster pace)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium">Notification Preferences</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="notif-reminders">Study reminders</Label>
                        <Switch id="notif-reminders" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="notif-content">New content alerts</Label>
                        <Switch id="notif-content" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="notif-progress">Progress updates</Label>
                        <Switch id="notif-progress" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="notif-recommendations">AI recommendations</Label>
                        <Switch id="notif-recommendations" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Study Goals & Habits</CardTitle>
                  <CardDescription>Track your progress and set learning objectives</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Current Goals</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-primary" />
                            <span>Master Newton's Laws</span>
                          </div>
                          <span className="text-sm text-muted-foreground">75% Complete</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-primary" />
                            <span>Complete Differential Equations</span>
                          </div>
                          <span className="text-sm text-muted-foreground">40% Complete</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-primary" />
                            <span>Understand Organic Chemistry</span>
                          </div>
                          <span className="text-sm text-muted-foreground">60% Complete</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add New Goal
                    </Button>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium">Study Habits</h4>
                    <div className="grid gap-4">
                      <div className="flex items-center gap-4">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <h5 className="font-medium">Preferred Study Time</h5>
                          <div className="grid grid-cols-3 gap-2 mt-2">
                            <Button variant="outline" size="sm" className="h-8">
                              Morning
                            </Button>
                            <Button variant="default" size="sm" className="h-8">
                              Afternoon
                            </Button>
                            <Button variant="outline" size="sm" className="h-8">
                              Evening
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <User className="h-5 w-5 text-primary" />
                        <div>
                          <h5 className="font-medium">Study Session Length</h5>
                          <div className="grid grid-cols-3 gap-2 mt-2">
                            <Button variant="outline" size="sm" className="h-8">
                              Short
                            </Button>
                            <Button variant="default" size="sm" className="h-8">
                              Medium
                            </Button>
                            <Button variant="outline" size="sm" className="h-8">
                              Long
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Weekly Study Goal (hours)</Label>
                        <div className="flex items-center gap-4">
                          <Slider defaultValue={[15]} max={40} step={1} className="flex-1" />
                          <span className="font-medium">15 hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default StudentProfilePage
