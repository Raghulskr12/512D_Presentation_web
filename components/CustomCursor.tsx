"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleHover = () => {
      setIsHovered(true)
    }

    const handleLeave = () => {
      setIsHovered(false)
    }

    // Track mouse movement
    window.addEventListener("mousemove", updateCursorPosition)

    // Track hover states for interactive elements
    const interactiveElements = document.querySelectorAll("button, a, input, textarea, .interactive")
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleHover)
      element.addEventListener("mouseleave", handleLeave)
    })

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition)
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleHover)
        element.removeEventListener("mouseleave", handleLeave)
      })
    }
  }, [])

  return (
    <div
      className={`custom-cursor ${isHovered ? "hover" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  )
}