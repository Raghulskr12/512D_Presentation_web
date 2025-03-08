"use client"

import React, { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import LoadingScreen from "./loading-screen" // Import the LoadingScreen component

// Check if WebGL is supported
function isWebGLSupported() {
  try {
    const canvas = document.createElement("canvas")
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")))
  } catch (e) {
    return false
  }
}

// GLB Model Loader
function GLBModel({ modelPath }) {
  const { scene } = useGLTF(modelPath)
  return <primitive object={scene} scale={1} position={[0, 1, 0]} /> // Adjusted scale and position
}

// Fallback component when WebGL is not available
function FallbackHeroVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
        <div
          className="absolute inset-8 rounded-full bg-primary/30 animate-ping"
          style={{ animationDuration: "3s" }}
        ></div>
        <div className="absolute inset-16 rounded-full bg-primary/40 flex items-center justify-center">
          <div className="text-4xl font-bold text-primary">512D</div>
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  const [webGLSupported, setWebGLSupported] = useState(true)
  const [isLoading, setIsLoading] = useState(true) // Add loading state

  useEffect(() => {
    setWebGLSupported(isWebGLSupported())
    // Simulate loading process
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Adjust the duration as needed

    return () => clearTimeout(timer)
  }, [])

  const scrollToDemo = () => {
    const demoSection = document.getElementById("admin-portal")
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (isLoading) {
    return <LoadingScreen /> // Show loading screen while loading
  }

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex flex-col md:flex-row items-center justify-center overflow-hidden pt-16"
    >
      {/* Text Content (Left Side) */}
      <div className="container relative z-10 text-left px-4 md:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-sm bg-background/30 p-8 rounded-xl max-w-3xl mx-auto md:mx-0"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500"
          >
            512D: AI-Powered Facial Recognition
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-foreground/80"
          >
            A seamless, AI-driven attendance system for the modern workplace
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={scrollToDemo}
            >
              Try It Now
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Canvas (Right Side) */}
      <div className="absolute inset-0 z-0 md:relative md:w-1/2 h-full">
        {webGLSupported ? (
          <ErrorBoundary fallback={<FallbackHeroVisual />}>
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }} className="h-full w-full">
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <Suspense fallback={null}>
                {/* Replace this with your GLB model path */}
                <GLBModel modelPath="/cctv2.glb" />
                <Environment preset="city" />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Suspense>
            </Canvas>
          </ErrorBoundary>
        ) : (
          <FallbackHeroVisual />
        )}
      </div>

      {/* Scroll Down Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <Button variant="ghost" size="icon" className="rounded-full" onClick={scrollToDemo}>
          <ChevronDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  )
}

// Error boundary component to catch WebGL errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("WebGL Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}