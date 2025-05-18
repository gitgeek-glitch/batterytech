"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

interface BatteryVisualizationProps {
  batteryId: string
}

export default function BatteryVisualization({ batteryId }: BatteryVisualizationProps) {
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

    // Draw based on battery type
    switch (batteryId) {
      case "lithium-ion":
        drawLithiumIonBattery(ctx, canvas.width, canvas.height)
        break
      case "lead-acid":
        drawLeadAcidBattery(ctx, canvas.width, canvas.height)
        break
      case "zinc-carbon":
        drawZincCarbonBattery(ctx, canvas.width, canvas.height)
        break
      case "pem":
        drawPEMFuelCell(ctx, canvas.width, canvas.height)
        break
      default:
        drawGenericBattery(ctx, canvas.width, canvas.height)
    }

    // Animation loop
    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 0.01

      // Only redraw if we need animation
      if (["lithium-ion", "pem"].includes(batteryId)) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (batteryId === "lithium-ion") {
          drawLithiumIonBattery(ctx, canvas.width, canvas.height, time)
        } else if (batteryId === "pem") {
          drawPEMFuelCell(ctx, canvas.width, canvas.height, time)
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [batteryId])

  return (
    <Card className="p-4 h-full">
      <h3 className="text-lg font-semibold mb-3">Interactive Visualization</h3>
      <canvas ref={canvasRef} className="w-full rounded-md bg-background" />
    </Card>
  )
}

function drawGenericBattery(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width / 2
  const centerY = height / 2
  const batteryWidth = Math.min(width * 0.7, 200)
  const batteryHeight = Math.min(height * 0.6, 150)

  // Battery body
  ctx.beginPath()
  ctx.roundRect(centerX - batteryWidth / 2, centerY - batteryHeight / 2, batteryWidth, batteryHeight, 10)
  ctx.fillStyle = "#f0f9ff"
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = "#0369a1"
  ctx.stroke()

  // Battery terminal
  ctx.beginPath()
  ctx.roundRect(centerX + batteryWidth / 2, centerY - batteryHeight / 6, batteryWidth / 10, batteryHeight / 3, 5)
  ctx.fillStyle = "#0369a1"
  ctx.fill()

  // Battery label
  ctx.font = "14px Arial"
  ctx.fillStyle = "#0369a1"
  ctx.textAlign = "center"
  ctx.fillText("Battery", centerX, centerY)
}

function drawLithiumIonBattery(ctx: CanvasRenderingContext2D, width: number, height: number, time = 0) {
  const centerX = width / 2
  const centerY = height / 2
  const batteryWidth = Math.min(width * 0.8, 250)
  const batteryHeight = Math.min(height * 0.7, 180)

  // Battery casing
  ctx.beginPath()
  ctx.roundRect(centerX - batteryWidth / 2, centerY - batteryHeight / 2, batteryWidth, batteryHeight, 5)
  ctx.fillStyle = "#e0f2fe"
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = "#0284c7"
  ctx.stroke()

  // Battery terminal
  ctx.beginPath()
  ctx.roundRect(centerX + batteryWidth / 2, centerY - batteryHeight / 6, batteryWidth / 15, batteryHeight / 3, 3)
  ctx.fillStyle = "#0284c7"
  ctx.fill()

  // Draw internal components
  const internalWidth = batteryWidth * 0.9
  const internalHeight = batteryHeight * 0.7
  const internalX = centerX - internalWidth / 2
  const internalY = centerY - internalHeight / 2

  // Separator (middle)
  ctx.beginPath()
  ctx.rect(centerX - 1, internalY, 2, internalHeight)
  ctx.fillStyle = "#cbd5e1"
  ctx.fill()

  // Anode (left)
  ctx.beginPath()
  ctx.rect(internalX, internalY, internalWidth / 2 - 1, internalHeight)
  ctx.fillStyle = "#475569"
  ctx.fill()
  ctx.font = "12px Arial"
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("Anode", internalX + internalWidth / 4, centerY)
  ctx.fillText("(Graphite)", internalX + internalWidth / 4, centerY + 16)

  // Cathode (right)
  ctx.beginPath()
  ctx.rect(centerX + 1, internalY, internalWidth / 2 - 1, internalHeight)
  ctx.fillStyle = "#0f172a"
  ctx.fill()
  ctx.font = "12px Arial"
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("Cathode", centerX + internalWidth / 4, centerY)
  ctx.fillText("(Li Metal Oxide)", centerX + internalWidth / 4, centerY + 16)

  // Animate lithium ions
  const numIons = 8
  for (let i = 0; i < numIons; i++) {
    const angle = (i / numIons) * Math.PI * 2 + time
    const radius = internalHeight * 0.3
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius

    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fillStyle = "#3b82f6"
    ctx.fill()
    ctx.strokeStyle = "#bfdbfe"
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // Labels
  ctx.font = "bold 14px Arial"
  ctx.fillStyle = "#0c4a6e"
  ctx.textAlign = "center"
  ctx.fillText("Lithium-Ion Battery", centerX, centerY - internalHeight / 2 - 15)
}

function drawLeadAcidBattery(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width / 2
  const centerY = height / 2
  const batteryWidth = Math.min(width * 0.8, 250)
  const batteryHeight = Math.min(height * 0.7, 180)

  // Battery case
  ctx.beginPath()
  ctx.rect(centerX - batteryWidth / 2, centerY - batteryHeight / 2, batteryWidth, batteryHeight)
  ctx.fillStyle = "#1e293b"
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = "#334155"
  ctx.stroke()

  // Battery terminals
  const terminalWidth = batteryWidth * 0.1
  const terminalHeight = batteryHeight * 0.2

  // Positive terminal
  ctx.beginPath()
  ctx.rect(
    centerX - batteryWidth / 4 - terminalWidth / 2,
    centerY - batteryHeight / 2 - terminalHeight,
    terminalWidth,
    terminalHeight,
  )
  ctx.fillStyle = "#dc2626"
  ctx.fill()
  ctx.strokeStyle = "#7f1d1d"
  ctx.lineWidth = 1
  ctx.stroke()

  // Negative terminal
  ctx.beginPath()
  ctx.rect(
    centerX + batteryWidth / 4 - terminalWidth / 2,
    centerY - batteryHeight / 2 - terminalHeight,
    terminalWidth,
    terminalHeight,
  )
  ctx.fillStyle = "#1d4ed8"
  ctx.fill()
  ctx.strokeStyle = "#1e3a8a"
  ctx.lineWidth = 1
  ctx.stroke()

  // Draw internal cells
  const cellWidth = batteryWidth * 0.15
  const cellGap = batteryWidth * 0.05
  const cellHeight = batteryHeight * 0.7
  const startX = centerX - batteryWidth * 0.4

  for (let i = 0; i < 4; i++) {
    const x = startX + i * (cellWidth + cellGap)

    // Lead plate (negative)
    ctx.beginPath()
    ctx.rect(x, centerY - cellHeight / 2, cellWidth / 2 - 1, cellHeight)
    ctx.fillStyle = "#64748b"
    ctx.fill()

    // Lead dioxide plate (positive)
    ctx.beginPath()
    ctx.rect(x + cellWidth / 2 + 1, centerY - cellHeight / 2, cellWidth / 2 - 1, cellHeight)
    ctx.fillStyle = "#475569"
    ctx.fill()

    // Separator
    ctx.beginPath()
    ctx.rect(x + cellWidth / 2 - 1, centerY - cellHeight / 2, 2, cellHeight)
    ctx.fillStyle = "#e2e8f0"
    ctx.fill()
  }

  // Electrolyte (sulfuric acid)
  ctx.fillStyle = "#fef9c3"
  ctx.globalAlpha = 0.3
  ctx.fillRect(centerX - batteryWidth * 0.45, centerY - cellHeight / 2 + 10, batteryWidth * 0.9, cellHeight - 20)
  ctx.globalAlpha = 1.0

  // Labels
  ctx.font = "bold 14px Arial"
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("Lead-Acid Battery", centerX, centerY - batteryHeight / 2 - 30)

  ctx.font = "12px Arial"
  ctx.fillText("Pb", centerX - batteryWidth / 4, centerY + 5)
  ctx.fillText("PbO₂", centerX + batteryWidth / 4, centerY + 5)
  ctx.fillText("H₂SO₄", centerX, centerY + cellHeight / 2 + 15)
}

function drawZincCarbonBattery(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width / 2
  const centerY = height / 2
  const batteryWidth = Math.min(width * 0.3, 100)
  const batteryHeight = Math.min(height * 0.7, 180)

  // Battery casing (zinc)
  ctx.beginPath()
  ctx.rect(centerX - batteryWidth / 2, centerY - batteryHeight / 2, batteryWidth, batteryHeight)
  ctx.fillStyle = "#94a3b8"
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = "#64748b"
  ctx.stroke()

  // Battery top
  ctx.beginPath()
  ctx.rect(centerX - batteryWidth / 2, centerY - batteryHeight / 2 - 10, batteryWidth, 10)
  ctx.fillStyle = "#475569"
  ctx.fill()

  // Carbon rod (center)
  const rodWidth = batteryWidth * 0.2
  ctx.beginPath()
  ctx.rect(centerX - rodWidth / 2, centerY - batteryHeight / 2 + 15, rodWidth, batteryHeight - 30)
  ctx.fillStyle = "#0f172a"
  ctx.fill()

  // MnO2 paste
  ctx.beginPath()
  ctx.rect(centerX - batteryWidth / 2 + 10, centerY - batteryHeight / 2 + 15, batteryWidth - 20, batteryHeight - 30)
  ctx.fillStyle = "#1e293b"
  ctx.globalAlpha = 0.7
  ctx.fill()
  ctx.globalAlpha = 1.0

  // Labels
  ctx.font = "bold 14px Arial"
  ctx.fillStyle = "#0f172a"
  ctx.textAlign = "center"
  ctx.fillText("Zinc-Carbon Battery", centerX, centerY - batteryHeight / 2 - 20)

  ctx.font = "12px Arial"
  ctx.fillStyle = "#f8fafc"
  ctx.fillText("Zn", centerX - batteryWidth / 2 - 15, centerY)
  ctx.fillText("C", centerX, centerY - batteryHeight / 4)
  ctx.fillText("MnO₂", centerX + batteryWidth / 2 + 20, centerY)
}

function drawPEMFuelCell(ctx: CanvasRenderingContext2D, width: number, height: number, time = 0) {
  const centerX = width / 2
  const centerY = height / 2
  const cellWidth = Math.min(width * 0.8, 250)
  const cellHeight = Math.min(height * 0.6, 150)

  // Cell casing
  ctx.beginPath()
  ctx.rect(centerX - cellWidth / 2, centerY - cellHeight / 2, cellWidth, cellHeight)
  ctx.fillStyle = "#f1f5f9"
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = "#64748b"
  ctx.stroke()

  // Draw internal components
  const internalWidth = cellWidth * 0.9
  const internalHeight = cellHeight * 0.7
  const internalX = centerX - internalWidth / 2
  const internalY = centerY - internalHeight / 2

  // Membrane (middle)
  ctx.beginPath()
  ctx.rect(centerX - 2, internalY, 4, internalHeight)
  ctx.fillStyle = "#fde68a"
  ctx.fill()

  // Anode (left)
  ctx.beginPath()
  ctx.rect(internalX, internalY, internalWidth / 2 - 2, internalHeight)
  ctx.fillStyle = "#334155"
  ctx.fill()
  ctx.font = "12px Arial"
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("Anode", internalX + internalWidth / 4, centerY - 15)
  ctx.fillText("H₂ → 2H⁺ + 2e⁻", internalX + internalWidth / 4, centerY + 15)

  // Cathode (right)
  ctx.beginPath()
  ctx.rect(centerX + 2, internalY, internalWidth / 2 - 2, internalHeight)
  ctx.fillStyle = "#1e293b"
  ctx.fill()
  ctx.font = "12px Arial"
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("Cathode", centerX + internalWidth / 4, centerY - 15)
  ctx.fillText("½O₂ + 2H⁺ + 2e⁻ → H₂O", centerX + internalWidth / 4, centerY + 15)

  // Hydrogen input
  ctx.beginPath()
  ctx.moveTo(internalX - 20, centerY - internalHeight / 4)
  ctx.lineTo(internalX, centerY - internalHeight / 4)
  ctx.lineWidth = 3
  ctx.strokeStyle = "#0284c7"
  ctx.stroke()

  // Oxygen input
  ctx.beginPath()
  ctx.moveTo(internalX + internalWidth + 20, centerY - internalHeight / 4)
  ctx.lineTo(internalX + internalWidth, centerY - internalHeight / 4)
  ctx.lineWidth = 3
  ctx.strokeStyle = "#ef4444"
  ctx.stroke()

  // Water output
  ctx.beginPath()
  ctx.moveTo(internalX + internalWidth, centerY + internalHeight / 4)
  ctx.lineTo(internalX + internalWidth + 20, centerY + internalHeight / 4)
  ctx.lineWidth = 3
  ctx.strokeStyle = "#0ea5e9"
  ctx.stroke()

  // Animate particles
  // Hydrogen molecules
  for (let i = 0; i < 3; i++) {
    const progress = (time * 0.5 + i / 3) % 1
    const x = internalX - 20 + progress * 20
    const y = centerY - internalHeight / 4

    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fillStyle = "#0284c7"
    ctx.fill()
  }

  // Oxygen molecules
  for (let i = 0; i < 3; i++) {
    const progress = (time * 0.5 + i / 3) % 1
    const x = internalX + internalWidth + 20 - progress * 20
    const y = centerY - internalHeight / 4

    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fillStyle = "#ef4444"
    ctx.fill()
  }

  // Water molecules
  for (let i = 0; i < 3; i++) {
    const progress = (time * 0.5 + i / 3) % 1
    const x = internalX + internalWidth + progress * 20
    const y = centerY + internalHeight / 4

    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fillStyle = "#0ea5e9"
    ctx.fill()
  }

  // Electron flow (animation)
  const electronPath = [
    { x: internalX + internalWidth / 4, y: internalY - 20 },
    { x: internalX + internalWidth / 4, y: internalY - 40 },
    { x: centerX + internalWidth / 4, y: internalY - 40 },
    { x: centerX + internalWidth / 4, y: internalY - 20 },
  ]

  // Draw electron path
  ctx.beginPath()
  ctx.moveTo(electronPath[0].x, electronPath[0].y)
  for (let i = 1; i < electronPath.length; i++) {
    ctx.lineTo(electronPath[i].x, electronPath[i].y)
  }
  ctx.strokeStyle = "#a1a1aa"
  ctx.lineWidth = 2
  ctx.stroke()

  // Draw electrons
  const numElectrons = 5
  for (let i = 0; i < numElectrons; i++) {
    const pathPosition = (time + i / numElectrons) % 1
    let currentSegment = 0
    let segmentLength = 0

    // Calculate total path length
    let totalLength = 0
    for (let j = 0; j < electronPath.length - 1; j++) {
      const dx = electronPath[j + 1].x - electronPath[j].x
      const dy = electronPath[j + 1].y - electronPath[j].y
      totalLength += Math.sqrt(dx * dx + dy * dy)
    }

    // Find current segment
    const targetLength = pathPosition * totalLength
    let currentLength = 0

    for (let j = 0; j < electronPath.length - 1; j++) {
      const dx = electronPath[j + 1].x - electronPath[j].x
      const dy = electronPath[j + 1].y - electronPath[j].y
      segmentLength = Math.sqrt(dx * dx + dy * dy)

      if (currentLength + segmentLength >= targetLength) {
        currentSegment = j
        break
      }

      currentLength += segmentLength
    }

    // Calculate position on current segment
    const segmentPosition = (targetLength - currentLength) / segmentLength
    const start = electronPath[currentSegment]
    const end = electronPath[currentSegment + 1]
    const x = start.x + (end.x - start.x) * segmentPosition
    const y = start.y + (end.y - start.y) * segmentPosition

    // Draw electron
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fillStyle = "#3b82f6"
    ctx.fill()
  }

  // Labels
  ctx.font = "bold 14px Arial"
  ctx.fillStyle = "#0f172a"
  ctx.textAlign = "center"
  ctx.fillText("PEM Fuel Cell", centerX, centerY - cellHeight / 2 - 15)

  ctx.font = "10px Arial"
  ctx.fillStyle = "#0284c7"
  ctx.fillText("H₂", internalX - 20, centerY - internalHeight / 4 - 10)

  ctx.fillStyle = "#ef4444"
  ctx.fillText("O₂", internalX + internalWidth + 20, centerY - internalHeight / 4 - 10)

  ctx.fillStyle = "#0ea5e9"
  ctx.fillText("H₂O", internalX + internalWidth + 20, centerY + internalHeight / 4 - 10)
}
