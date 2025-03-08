"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Add this at the top of the file
function isSVGSupported() {
  return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
}

const components = [
  { id: "camera", label: "CCTV Camera", x: 10, y: 50, width: 120, height: 60 },
  { id: "retinaface", label: "RetinaFace", x: 180, y: 50, width: 120, height: 60 },
  { id: "arcface", label: "ArcFace", x: 350, y: 50, width: 120, height: 60 },
  { id: "faiss", label: "FAISS", x: 520, y: 50, width: 120, height: 60 },
  { id: "database", label: "Database", x: 690, y: 50, width: 120, height: 60 },
  { id: "llm", label: "LLM", x: 860, y: 50, width: 120, height: 60 },
]

const connections = [
  { from: "camera", to: "retinaface", label: "Video Feed" },
  { from: "retinaface", to: "arcface", label: "Detected Faces" },
  { from: "arcface", to: "faiss", label: "Feature Vectors" },
  { from: "faiss", to: "database", label: "Match Results" },
  { from: "database", to: "llm", label: "Attendance Data" },
]

// Add this fallback component
function FallbackDiagram() {
  return (
    <div className="p-6 bg-muted/30 rounded-lg">
      <h3 className="text-lg font-medium mb-4">System Architecture Flow</h3>
      <div className="space-y-4">
        {connections.map((conn, index) => {
          const fromComp = components.find((c) => c.id === conn.from)
          const toComp = components.find((c) => c.id === conn.to)

          return (
            <div key={index} className="flex items-center">
              <div className="px-3 py-2 bg-card rounded-md">{fromComp?.label}</div>
              <div className="mx-2 text-primary">→</div>
              <div className="px-3 py-2 bg-card rounded-md">{toComp?.label}</div>
              <div className="ml-2 text-sm text-muted-foreground">({conn.label})</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function ArchitectureDiagram() {
  const [svgSupported, setSvgSupported] = useState(true)

  useEffect(() => {
    setSvgSupported(isSVGSupported())
  }, [])

  const getTooltipContent = (componentId: string) => {
    switch (componentId) {
      case "camera":
        return "Captures video feed from surveillance cameras"
      case "retinaface":
        return "Detects and localizes faces in the video feed"
      case "arcface":
        return "Extracts facial features and creates embeddings"
      case "faiss":
        return "Performs fast similarity search for face matching"
      case "database":
        return "Stores attendance records and employee data"
      case "llm":
        return "Processes natural language queries about attendance"
      default:
        return ""
    }
  }

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Architecture Diagram</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The technical architecture of our facial recognition attendance system
          </p>
        </div>

        <Card className="border-none shadow-lg overflow-hidden">
          <CardContent className="p-6">
            {/* Replace the SVG diagram with your image */}
            <div className="w-full flex justify-center">
              <img
                src="/cctv.png" // Replace with the path to your image
                alt="Architecture Diagram"
                className="w-full max-w-4xl h-auto rounded-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Keep the rest of the content below the diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {components.map((comp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{comp.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{getTooltipContent(comp.id)}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}