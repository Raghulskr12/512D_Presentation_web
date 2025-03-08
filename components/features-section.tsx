"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scan, Clock, User, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    title: "Real-Time Facial Recognition",
    description: "Detect and recognize faces in real-time using advanced AI models.",
    icon: <Scan className="h-10 w-10" />,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Attendance Logging",
    description: "Automatically log attendance with timestamps for accurate record-keeping.",
    icon: <Clock className="h-10 w-10" />,
    color: "from-purple-500 to-indigo-600",
  },
  {
    title: "Unknown Face Detection",
    description: "Identify and verify unknown faces to enhance security.",
    icon: <User className="h-10 w-10" />,
    color: "from-green-500 to-indigo-600",
  },
  {
    title: "LLM-Powered Query System",
    description: "Retrieve attendance data effortlessly using natural language queries.",
    icon: <MessageSquare className="h-10 w-10" />,
    color: "from-indigo-500 to-blue-600",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our facial recognition attendance system combines cutting-edge AI technology with user-friendly interfaces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
                <CardHeader>
                  <div className="rounded-full w-16 h-16 flex items-center justify-center bg-primary/10 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

