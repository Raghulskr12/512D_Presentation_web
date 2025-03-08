"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const technologies = [
  { name: "RetinaFace", description: "State-of-the-art face detection model" },
  { name: "ArcFace", description: "Advanced facial feature extraction" },
  { name: "FAISS", description: "Fast similarity search for face matching" },
  { name: "LLM", description: "Natural language processing for queries" },
  { name: "Web Integration", description: "React frontend with FastAPI backend" }

]

const teamMembers = [
  {
    name: "Raghul S",
    role: "Developer",
    image: "/RAGHUL.JPEG?height=100&width=100",
  },
  {
    name: "Sarah Chen",
    role: "Full Stack Developer",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Michael Rodriguez",
    role: "UX Designer",
    image: "/placeholder.svg?height=100&width=100",
  },
  
]

export default function AboutSection() {
  return (
    <section id="tech-stack" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech Stack</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn more about our technology stack and the team behind the system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-none shadow-lg">
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
                <CardDescription>Our system is built with cutting-edge AI technologies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-start p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
                    >
                      <div className="mr-4 mt-1">
                        <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                          {index + 1}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{tech.name}</h3>
                        <p className="text-sm text-muted-foreground">{tech.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-none shadow-lg">
              <CardHeader>
                <CardTitle>Our Team</CardTitle>
                <CardDescription>Meet the experts behind our facial recognition system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
                    >
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primary/20">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

