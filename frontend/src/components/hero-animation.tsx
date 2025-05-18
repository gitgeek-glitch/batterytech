"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = 500
      canvas.height = 300
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Battery outline
    const drawBattery = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Battery body
      ctx.beginPath()
      ctx.roundRect(100, 100, 300, 150, 10)
      ctx.fillStyle = "#f0f9ff"
      ctx.fill()
      ctx.lineWidth = 3
      ctx.strokeStyle = "#0369a1"
      ctx.stroke()

      // Battery terminal
      ctx.beginPath()
      ctx.roundRect(400, 125, 20, 50, 5)
      ctx.fillStyle = "#0369a1"
      ctx.fill()

      // Battery cells
      drawCells()

      // Energy flow animation
      drawEnergyFlow(Date.now())

      requestAnimationFrame(drawBattery)
    }

    // Draw battery cells
    const drawCells = () => {
      const cellWidth = 60
      const cellGap = 20
      const startX = 120

      for (let i = 0; i < 4; i++) {
        const x = startX + i * (cellWidth + cellGap)

        // Cell outline
        ctx.beginPath()
        ctx.roundRect(x, 120, cellWidth, 110, 5)
        ctx.fillStyle = "#e0f2fe"
        ctx.fill()
        ctx.lineWidth = 1
        ctx.strokeStyle = "#0284c7"
        ctx.stroke()

        // Cell terminal
        ctx.beginPath()
        ctx.moveTo(x + cellWidth / 2 - 5, 120)
        ctx.lineTo(x + cellWidth / 2 - 5, 110)
        ctx.lineTo(x + cellWidth / 2 + 5, 110)
        ctx.lineTo(x + cellWidth / 2 + 5, 120)
        ctx.fillStyle = "#0284c7"
        ctx.fill()
      }
    }

    // Draw energy flow animation
    const drawEnergyFlow = (timestamp: number) => {
      const particles = 5
      const flowPath = [
        { x: 150, y: 175 },
        { x: 230, y: 175 },
        { x: 310, y: 175 },
        { x: 390, y: 175 },
        { x: 410, y: 150 },
      ]

      for (let i = 0; i < flowPath.length - 1; i++) {
        const start = flowPath[i]
        const end = flowPath[i + 1]

        // Draw connection line
        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        ctx.lineTo(end.x, end.y)
        ctx.strokeStyle = "#bae6fd"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw animated particles
        for (let p = 0; p < particles; p++) {
          const progress = (timestamp / 1000 + p / particles) % 1
          const x = start.x + (end.x - start.x) * progress
          const y = start.y + (end.y - start.y) * progress

          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fillStyle = "#0ea5e9"
          ctx.fill()
        }
      }
    }

    drawBattery()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ position: 'relative', width: '100%', maxWidth: '28rem', margin: '0 auto' }}
    >
      <canvas ref={canvasRef} width={500} height={300} className="w-full h-auto" />
    </motion.div>
  )
}