"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scan, Database, Search, Clock, MessageSquare } from "lucide-react"

const steps = [
  {
    title: "Face Detection",
    description: "Detect faces using RetinaFace",
    icon: <Scan className="h-8 w-8" />,
    color: "bg-blue-500",
  },
  {
    title: "Feature Extraction",
    description: "Extract facial features using ArcFace",
    icon: <Search className="h-8 w-8" />,
    color: "bg-indigo-500",
  },
  {
    title: "Matching",
    description: "Match faces using FAISS and cosine similarity",
    icon: <Database className="h-8 w-8" />,
    color: "bg-purple-500",
  },
  {
    title: "Attendance Logging",
    description: "Log attendance and store data in the database",
    icon: <Clock className="h-8 w-8" />,
    color: "bg-violet-500",
  },
  {
    title: "LLM Integration",
    description: "Query attendance data using natural language",
    icon: <MessageSquare className="h-8 w-8" />,
    color: "bg-fuchsia-500",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our system uses advanced AI algorithms to provide accurate and efficient facial recognition
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-fuchsia-500 transform -translate-x-1/2 hidden md:block" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-12 relative"
            >
              <div
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
              >
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative">
                    <div
                      className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center text-white z-10 relative`}
                    >
                      {step.icon}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-white dark:bg-background blur-xl opacity-50 scale-150" />
                  </div>
                </div>
                <Card className="md:w-1/2 border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="inline-block w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{step.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

