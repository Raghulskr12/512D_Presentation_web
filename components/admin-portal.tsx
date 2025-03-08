"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, User, Users, MessageSquare } from "lucide-react"

// Mock data for attendance
const attendanceData = [
  {
    name: "John Doe",
    time: "09:02 AM",
    status: "Present",
    id: "EMP001",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Jane Smith",
    time: "08:55 AM",
    status: "Present",
    id: "EMP002",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Robert Johnson",
    time: "09:15 AM",
    status: "Present",
    id: "EMP003",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Emily Davis",
    time: "Absent",
    status: "Absent",
    id: "EMP004",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Michael Wilson",
    time: "08:45 AM",
    status: "Present",
    id: "EMP005",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Mock data for unknown faces
const unknownFaces = [
  { id: "UNK001", timestamp: "09:30 AM", image: "/placeholder.svg?height=100&width=100" },
  { id: "UNK002", timestamp: "10:15 AM", image: "/placeholder.svg?height=100&width=100" },
]

export default function AdminPortal() {
  const [query, setQuery] = useState("")
  const [queryResult, setQueryResult] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedUnknown, setSelectedUnknown] = useState<any>(null)

  const handleQuery = () => {
    // Simulate LLM response
    if (query.toLowerCase().includes("john")) {
      setQueryResult("John Doe was present on October 10th at 09:02 AM.")
    } else if (query.toLowerCase().includes("absent")) {
      setQueryResult(
        "Last week, 5 employees were absent: Emily Davis (3 days), Michael Wilson (1 day), and Jane Smith (1 day).",
      )
    } else {
      setQueryResult("I'm sorry, I couldn't understand your query. Please try again with a different question.")
    }
  }

  const handleVerifyFace = (face: any) => {
    setSelectedUnknown(face)
    setOpenDialog(true)
  }

  return (
    <section id="admin-portal" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">Admin Portal Demo</h2>
        <p className="text-muted-foreground text-center mb-10">
          Experience the powerful features of our admin dashboard
        </p>

        <Tabs defaultValue="attendance" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="attendance">
              <Users className="mr-2 h-4 w-4" />
              Attendance Log
            </TabsTrigger>
            <TabsTrigger value="unknown">
              <User className="mr-2 h-4 w-4" />
              Unknown Faces
            </TabsTrigger>
            <TabsTrigger value="query">
              <MessageSquare className="mr-2 h-4 w-4" />
              LLM Query
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Today's Attendance</CardTitle>
                <CardDescription>Current attendance status for all employees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 text-sm font-medium text-muted-foreground bg-muted/50">
                    <div className="col-span-5">Employee</div>
                    <div className="col-span-3">ID</div>
                    <div className="col-span-2">Time</div>
                    <div className="col-span-2">Status</div>
                  </div>
                  <div className="divide-y">
                    {attendanceData.map((employee) => (
                      <div key={employee.id} className="grid grid-cols-12 p-4 text-sm items-center">
                        <div className="col-span-5 flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{employee.name}</span>
                        </div>
                        <div className="col-span-3">{employee.id}</div>
                        <div className="col-span-2">{employee.time}</div>
                        <div className="col-span-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                              employee.status === "Present"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                          >
                            {employee.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unknown">
            <Card>
              <CardHeader>
                <CardTitle>Unknown Faces</CardTitle>
                <CardDescription>Faces detected that are not in the employee database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {unknownFaces.map((face) => (
                    <Card key={face.id} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <img
                          src={face.image || "/placeholder.svg"}
                          alt={`Unknown face ${face.id}`}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs">
                          {face.id}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Detected at {face.timestamp}</p>
                            <p className="text-xs text-muted-foreground">Main Entrance</p>
                          </div>
                          <Button size="sm" onClick={() => handleVerifyFace(face)}>
                            Verify
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Verify Unknown Face</DialogTitle>
                  <DialogDescription>Add this person to the employee database</DialogDescription>
                </DialogHeader>

                {selectedUnknown && (
                  <div className="grid gap-4 py-4">
                    <div className="mx-auto">
                      <img
                        src={selectedUnknown.image || "/placeholder.svg"}
                        alt="Unknown face"
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="employee-id" className="text-right">
                        Employee ID
                      </Label>
                      <Input id="employee-id" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="department" className="text-right">
                        Department
                      </Label>
                      <Input id="department" className="col-span-3" />
                    </div>
                  </div>
                )}

                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setOpenDialog(false)}>Add to Database</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="query">
            <Card>
              <CardHeader>
                <CardTitle>LLM Query System</CardTitle>
                <CardDescription>Ask questions about attendance data using natural language</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-6">
                  <Input
                    placeholder="e.g., Show attendance for John Doe on October 10th"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleQuery}>
                    <Search className="h-4 w-4 mr-2" />
                    Query
                  </Button>
                </div>

                {queryResult && (
                  <Card>
                    <CardContent className="p-4">
                      <p>{queryResult}</p>
                    </CardContent>
                  </Card>
                )}

                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Example queries:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => setQuery("Show attendance for John Doe on October 10th")}
                    >
                      Show attendance for John Doe on October 10th
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => setQuery("How many employees were absent last week?")}
                    >
                      How many employees were absent last week?
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

