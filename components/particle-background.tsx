"use client"

import { useCallback, useEffect, useState } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import { useTheme } from "next-themes"

export default function ParticleBackground() {
  const { theme } = useTheme()
  const [particlesSupported, setParticlesSupported] = useState(true)

  useEffect(() => {
    // Check if we're in a browser environment and if canvas is supported
    if (typeof window !== "undefined") {
      try {
        const canvas = document.createElement("canvas")
        if (!canvas.getContext) {
          setParticlesSupported(false)
        }
      } catch (e) {
        setParticlesSupported(false)
      }
    }
  }, [])

  const particlesInit = useCallback(async (engine: any) => {
    try {
      await loadSlim(engine)
    } catch (error) {
      console.error("Error initializing particles:", error)
      setParticlesSupported(false)
    }
  }, [])

  if (!particlesSupported) {
    return <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background to-background/80" />
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: theme === "dark" ? "#8b5cf6" : "#4f46e5",
            },
            links: {
              color: theme === "dark" ? "#8b5cf6" : "#4f46e5",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  )
}

