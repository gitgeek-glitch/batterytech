"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

export default function SafetyInfoGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = 300

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw battery safety infographic
    drawSafetyInfoGraphic(ctx, canvas.width, canvas.height)

    // Animation loop
    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawSafetyInfoGraphic(ctx, canvas.width, canvas.height, time)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <Card className="p-4 h-full">
      <h3 className="text-lg font-semibold mb-3">Battery Safety Visualization</h3>
      <canvas ref={canvasRef} className="w-full rounded-md bg-background" />
    </Card>
  )
}

function drawSafetyInfoGraphic(ctx: CanvasRenderingContext2D, width: number, height: number, time = 0) {
  const centerX = width / 2
  const centerY = height / 2

  // Draw battery
  const batteryWidth = Math.min(width * 0.4, 150)
  const batteryHeight = Math.min(height * 0.6, 180)
  const batteryX = centerX - batteryWidth / 2
  const batteryY = centerY - batteryHeight / 2

  // Battery casing
  ctx.beginPath()
  ctx.roundRect(batteryX, batteryY, batteryWidth, batteryHeight, 5)
  ctx.fillStyle = "#e0f2fe"
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = "#0284c7"
  ctx.stroke()

  // Battery terminal
  ctx.beginPath()
  ctx.roundRect(batteryX + batteryWidth, batteryY + batteryHeight * 0.4, batteryWidth * 0.1, batteryHeight * 0.2, 3)
  ctx.fillStyle = "#0284c7"
  ctx.fill()

  // Draw hazard indicators

  // 1. Temperature warning
  const tempX = batteryX + batteryWidth * 0.5
  const tempY = batteryY + batteryHeight * 0.3

  // Temperature waves (animated)
  const waveCount = 3
  const maxRadius = batteryWidth * 0.6

  for (let i = 0; i < waveCount; i++) {
    const waveProgress = (time * 0.5 + i / waveCount) % 1
    const radius = waveProgress * maxRadius
    const alpha = 1 - waveProgress

    ctx.beginPath()
    ctx.arc(tempX, tempY, radius, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`
    ctx.lineWidth = 2
    ctx.stroke()
  }

  // Temperature icon
  ctx.beginPath()
  ctx.arc(tempX, tempY, 10, 0, Math.PI * 2)
  ctx.fillStyle = "#ef4444"
  ctx.fill()
  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 12px Arial"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("!", tempX, tempY)

  // Label
  ctx.font = "12px Arial"
  ctx.fillStyle = "#ef4444"
  ctx.fillText("Thermal Risk", tempX, tempY - 25)

  // 2. Short circuit warning
  const shortX = batteryX + batteryWidth * 0.5
  const shortY = batteryY + batteryHeight * 0.7

  // Lightning bolt
  drawLightningBolt(ctx, shortX, shortY, 15, time)

  // Label
  ctx.font = "12px Arial"
  ctx.fillStyle = "#f59e0b"
  ctx.fillText("Short Circuit", shortX, shortY + 25)

  // 3. Safety features

  // BMS indicator
  const bmsX = batteryX - 60
  const bmsY = centerY

  ctx.beginPath()
  ctx.roundRect(bmsX - 40, bmsY - 25, 80, 50, 5)
  ctx.fillStyle = "#0ea5e9"
  ctx.fill()

  ctx.font = "bold 14px Arial"
  ctx.fillStyle = "#ffffff"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("BMS", bmsX, bmsY)

  // Connection lines
  ctx.beginPath()
  ctx.moveTo(bmsX + 40, bmsY)
  ctx.lineTo(batteryX, bmsY)
  ctx.strokeStyle = "#0ea5e9"
  ctx.lineWidth = 2
  ctx.stroke()

  // Data flow animation
  const dataPoints = 4
  for (let i = 0; i < dataPoints; i++) {
    const progress = (time * 2 + i / dataPoints) % 1
    const x = bmsX + 40 + progress * (batteryX - (bmsX + 40))
    const y = bmsY

    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fillStyle = "#0ea5e9"
    ctx.fill()
  }

  // 4. Proper handling
  const handleX = batteryX + batteryWidth + 60
  const handleY = centerY

  // Safety shield
  ctx.beginPath()
  ctx.moveTo(handleX, handleY - 25)
  ctx.lineTo(handleX - 20, handleY + 15)
  ctx.lineTo(handleX, handleY + 25)
  ctx.lineTo(handleX + 20, handleY + 15)
  ctx.closePath()
  ctx.fillStyle = "#10b981"
  ctx.fill()
  ctx.strokeStyle = "#059669"
  ctx.lineWidth = 2
  ctx.stroke()

  // Checkmark
  ctx.beginPath()
  ctx.moveTo(handleX - 10, handleY)
  ctx.lineTo(handleX - 3, handleY + 10)
  ctx.lineTo(handleX + 10, handleY - 10)
  ctx.strokeStyle = "#ffffff"
  ctx.lineWidth = 3
  ctx.stroke()

  // Connection line
  ctx.beginPath()
  ctx.moveTo(batteryX + batteryWidth, handleY)
  ctx.lineTo(handleX - 25, handleY)
  ctx.strokeStyle = "#10b981"
  ctx.lineWidth = 2
  ctx.stroke()

  // Label
  ctx.font = "12px Arial"
  ctx.fillStyle = "#10b981"
  ctx.textAlign = "center"
  ctx.fillText("Safe Handling", handleX, handleY - 40)
}

function drawLightningBolt(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, time: number) {
  // Flash effect
  const flashIntensity = Math.sin(time * 10) * 0.5 + 0.5

  // Lightning bolt
  ctx.beginPath()
  ctx.moveTo(x, y - size)
  ctx.lineTo(x - size * 0.5, y - size * 0.3)
  ctx.lineTo(x, y)
  ctx.lineTo(x - size * 0.5, y + size * 0.3)
  ctx.lineTo(x, y + size)
  ctx.lineTo(x + size * 0.5, y + size * 0.3)
  ctx.lineTo(x, y)
  ctx.lineTo(x + size * 0.5, y - size * 0.3)
  ctx.closePath()

  // Gradient fill
  const gradient = ctx.createLinearGradient(x - size, y - size, x + size, y + size)
  gradient.addColorStop(0, `rgba(245, 158, 11, ${0.7 + flashIntensity * 0.3})`)
  gradient.addColorStop(1, `rgba(234, 88, 12, ${0.7 + flashIntensity * 0.3})`)
  ctx.fillStyle = gradient
  ctx.fill()

  // Glow effect
  ctx.shadowColor = `rgba(245, 158, 11, ${flashIntensity})`
  ctx.shadowBlur = 10 * flashIntensity
  ctx.strokeStyle = "#ffffff"
  ctx.lineWidth = 1
  ctx.stroke()

  // Reset shadow
  ctx.shadowColor = "transparent"
  ctx.shadowBlur = 0
}
