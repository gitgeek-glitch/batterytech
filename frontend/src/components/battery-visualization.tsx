"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
// import { useResizeObserver as useResizeObserverHook } from "frontend/src/app/hooks/use-resize-observer"

interface BatteryVisualizationProps {
  batteryId: string
}

export default function BatteryVisualization({ batteryId }: BatteryVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Use ResizeObserver to detect container size changes
  useResizeObserver(containerRef, (entry) => {
    if (entry) {
      const { width } = entry.contentRect
      // Calculate height based on aspect ratio or use fixed height
      const height = Math.min(300, width * 0.6)
      setDimensions({ width, height })
    }
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = dimensions.width * dpr
    canvas.height = dimensions.height * dpr
    canvas.style.width = `${dimensions.width}px`
    canvas.style.height = `${dimensions.height}px`
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    // Draw based on battery type
    switch (batteryId) {
      case "lithium-ion":
        drawLithiumIonBattery(ctx, dimensions.width, dimensions.height)
        break
      case "lead-acid":
        drawLeadAcidBattery(ctx, dimensions.width, dimensions.height)
        break
      case "zinc-carbon":
        drawZincCarbonBattery(ctx, dimensions.width, dimensions.height)
        break
      case "pem-fuel-cell":
        drawPEMFuelCell(ctx, dimensions.width, dimensions.height)
        break
      case "zinc-air":
        drawZincAirBattery(ctx, dimensions.width, dimensions.height)
        break
      case "alkaline":
        drawAlkalineBattery(ctx, dimensions.width, dimensions.height)
        break
      case "primary-lithium":
        drawPrimaryLithiumBattery(ctx, dimensions.width, dimensions.height)
        break
      case "nickel-cadmium":
        drawNickelCadmiumBattery(ctx, dimensions.width, dimensions.height)
        break
      case "nickel-metal-hydride":
        drawNickelMetalHydrideBattery(ctx, dimensions.width, dimensions.height)
        break
      case "alkaline-fuel-cell":
        drawAlkalineFuelCell(ctx, dimensions.width, dimensions.height)
        break
      case "molten-carbonate-fuel-cell":
        drawMoltenCarbonateFuelCell(ctx, dimensions.width, dimensions.height)
        break
      case "solid-oxide-fuel-cell":
        drawSolidOxideFuelCell(ctx, dimensions.width, dimensions.height)
        break
      default:
        drawGenericBattery(ctx, dimensions.width, dimensions.height)
    }

    // Animation loop
    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 0.01

      // Only redraw if we need animation
      if (
        ["lithium-ion", "pem-fuel-cell", "zinc-air", "alkaline-fuel-cell", "solid-oxide-fuel-cell"].includes(batteryId)
      ) {
        ctx.clearRect(0, 0, dimensions.width, dimensions.height)

        if (batteryId === "lithium-ion") {
          drawLithiumIonBattery(ctx, dimensions.width, dimensions.height, time)
        } else if (batteryId === "pem-fuel-cell") {
          drawPEMFuelCell(ctx, dimensions.width, dimensions.height, time)
        } else if (batteryId === "zinc-air") {
          drawZincAirBattery(ctx, dimensions.width, dimensions.height, time)
        } else if (batteryId === "alkaline-fuel-cell") {
          drawAlkalineFuelCell(ctx, dimensions.width, dimensions.height, time)
        } else if (batteryId === "solid-oxide-fuel-cell") {
          drawSolidOxideFuelCell(ctx, dimensions.width, dimensions.height, time)
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [batteryId, dimensions])

  return (
    <Card className="p-4 h-full" ref={containerRef}>
      <h3 className="text-lg font-semibold mb-3">Interactive Visualization</h3>
      <div className="relative w-full" style={{ height: `${dimensions.height}px` }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-md bg-background"
          style={{ display: dimensions.width > 0 ? "block" : "none" }}
        />
        {dimensions.width === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-md">
            <p className="text-muted-foreground">Loading visualization...</p>
          </div>
        )}
      </div>
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
  ctx.font = `${Math.max(12, Math.min(14, width / 20))}px Arial`
  ctx.fillStyle = "#0369a1"
  ctx.textAlign = "center"
  ctx.fillText("Battery", centerX, centerY)
}

function drawLithiumIonBattery(ctx: CanvasRenderingContext2D, width: number, height: number, time = 0) {
  const centerX = width / 2
  const centerY = height / 2
  const batteryWidth = Math.min(width * 0.8, 250)
  const batteryHeight = Math.min(height * 0.7, 180)
  const fontSize = Math.max(10, Math.min(14, width / 25))

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
  ctx.font = `${fontSize}px Arial`
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("Anode", internalX + internalWidth / 4, centerY)
  ctx.fillText("(Graphite)", internalX + internalWidth / 4, centerY + fontSize + 2)

  // Cathode (right)
  ctx.beginPath()
  ctx.rect(centerX + 1, internalY, internalWidth / 2 - 1, internalHeight)
  ctx.fillStyle = "#0f172a"
  ctx.fill()
  ctx.font = `${fontSize}px Arial`
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("Cathode", centerX + internalWidth / 4, centerY)
  ctx.fillText("(Li Metal Oxide)", centerX + internalWidth / 4, centerY + fontSize + 2)

  // Animate lithium ions
  const numIons = Math.max(4, Math.min(8, Math.floor(width / 40)))
  for (let i = 0; i < numIons; i++) {
    const angle = (i / numIons) * Math.PI * 2 + time
    const radius = internalHeight * 0.3
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius

    ctx.beginPath()
    ctx.arc(x, y, Math.max(2, Math.min(4, width / 100)), 0, Math.PI * 2)
    ctx.fillStyle = "#3b82f6"
    ctx.fill()
    ctx.strokeStyle = "#bfdbfe"
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // Labels
  ctx.font = `bold ${fontSize}px Arial`
  ctx.fillStyle = "#0c4a6e"
  ctx.textAlign = "center"
  ctx.fillText("Lithium-Ion Battery", centerX, centerY - internalHeight / 2 - 15)
}

function drawLeadAcidBattery(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width / 2
  const centerY = height / 2
  const batteryWidth = Math.min(width * 0.8, 250)
  const batteryHeight = Math.min(height * 0.7, 180)
  const fontSize = Math.max(10, Math.min(14, width / 25))

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
  ctx.font = `bold ${fontSize}px Arial`
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("Lead-Acid Battery", centerX, centerY - batteryHeight / 2 - 30)

  ctx.font = `${fontSize}px Arial`
  ctx.fillText("Pb", centerX - batteryWidth / 4, centerY + 5)
  ctx.fillText("PbO₂", centerX + batteryWidth / 4, centerY + 5)
  ctx.fillText("H₂SO₄", centerX, centerY + cellHeight / 2 + 15)
}

function drawZincCarbonBattery(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width / 2
  const centerY = height / 2
  const batteryWidth = Math.min(width * 0.3, 100)
  const batteryHeight = Math.min(height * 0.7, 180)
  const fontSize = Math.max(10, Math.min(14, width / 25))

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
  ctx.font = `bold ${fontSize}px Arial`
  ctx.fillStyle = "#0f172a"
  ctx.textAlign = "center"
  ctx.fillText("Zinc-Carbon Battery", centerX, centerY - batteryHeight / 2 - 20)

  ctx.font = `${fontSize}px Arial`
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
  const fontSize = Math.max(10, Math.min(14, width / 25))

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
  ctx.font = `${fontSize}px Arial`
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("Anode", internalX + internalWidth / 4, centerY - 15)
  ctx.fillText("H₂ → 2H⁺ + 2e⁻", internalX + internalWidth / 4, centerY + 15)

  // Cathode (right)
  ctx.beginPath()
  ctx.rect(centerX + 2, internalY, internalWidth / 2 - 2, internalHeight)
  ctx.fillStyle = "#1e293b"
  ctx.fill()
  ctx.font = `${fontSize}px Arial`
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
    ctx.arc(x, y, Math.max(2, Math.min(3, width / 150)), 0, Math.PI * 2)
    ctx.fillStyle = "#0284c7"
    ctx.fill()
  }

  // Oxygen molecules
  for (let i = 0; i < 3; i++) {
    const progress = (time * 0.5 + i / 3) % 1
    const x = internalX + internalWidth + 20 - progress * 20
    const y = centerY - internalHeight / 4

    ctx.beginPath()
    ctx.arc(x, y, Math.max(2, Math.min(3, width / 150)), 0, Math.PI * 2)
    ctx.fillStyle = "#ef4444"
    ctx.fill()
  }

  // Water molecules
  for (let i = 0; i < 3; i++) {
    const progress = (time * 0.5 + i / 3) % 1
    const x = internalX + internalWidth + progress * 20
    const y = centerY + internalHeight / 4

    ctx.beginPath()
    ctx.arc(x, y, Math.max(2, Math.min(3, width / 150)), 0, Math.PI * 2)
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
  const numElectrons = Math.max(3, Math.min(5, Math.floor(width / 80)))
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
    ctx.arc(x, y, Math.max(2, Math.min(4, width / 100)), 0, Math.PI * 2)
    ctx.fillStyle = "#3b82f6"
    ctx.fill()
  }

  // Labels
  ctx.font = `bold ${fontSize}px Arial`
  ctx.fillStyle = "#0f172a"
  ctx.textAlign = "center"
  ctx.fillText("PEM Fuel Cell", centerX, centerY - cellHeight / 2 - 15)

  ctx.font = `${Math.max(8, fontSize - 2)}px Arial`
  ctx.fillStyle = "#0284c7"
  ctx.fillText("H₂", internalX - 20, centerY - internalHeight / 4 - 10)

  ctx.fillStyle = "#ef4444"
  ctx.fillText("O₂", internalX + internalWidth + 20, centerY - internalHeight / 4 - 10)

  ctx.fillStyle = "#0ea5e9"
  ctx.fillText("H₂O", internalX + internalWidth + 20, centerY + internalHeight / 4 - 10)
}

// New battery visualizations
function drawZincAirBattery(ctx: CanvasRenderingContext2D, width: number, height: number, time = 0) {
  const centerX = width / 2
  const centerY = height / 2
  const batteryWidth = Math.min(width * 0.7, 200)
  const batteryHeight = Math.min(height * 0.7, 180)
  const fontSize = Math.max(10, Math.min(14, width / 25))

  // Battery casing
  ctx.beginPath()
  ctx.rect(centerX - batteryWidth / 2, centerY - batteryHeight / 2, batteryWidth, batteryHeight)
  ctx.fillStyle = "#cbd5e1"
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = "#64748b"
  ctx.stroke()

  // Air holes (top)
  const holeCount = Math.max(3, Math.min(7, Math.floor(batteryWidth / 30)))
  const holeWidth = batteryWidth / (holeCount * 2)
  const holeSpacing = batteryWidth / holeCount

  for (let i = 0; i < holeCount; i++) {
    const x = centerX - batteryWidth / 2 + holeSpacing * (i + 0.5) - holeWidth / 2
    ctx.beginPath()
    ctx.rect(x, centerY - batteryHeight / 2, holeWidth, batteryHeight * 0.1)
    ctx.fillStyle = "#1e293b"
    ctx.fill()
  }

  // Internal components
  const internalWidth = batteryWidth * 0.9
  const internalHeight = batteryHeight * 0.7
  const internalX = centerX - internalWidth / 2
  const internalY = centerY - internalHeight / 2 + batteryHeight * 0.1

  // Zinc anode (bottom)
  ctx.beginPath()
  ctx.rect(internalX, centerY, internalWidth, internalHeight / 2)
  ctx.fillStyle = "#94a3b8"
  ctx.fill()
  ctx.font = `${fontSize}px Arial`
  ctx.fillStyle = "#1e293b"
  ctx.textAlign = "center"
  ctx.fillText("Zinc Anode", centerX, centerY + internalHeight / 4)

  // Separator
  ctx.beginPath()
  ctx.rect(internalX, centerY - 2, internalWidth, 4)
  ctx.fillStyle = "#e2e8f0"
  ctx.fill()

  // Air cathode (top)
  ctx.beginPath()
  ctx.rect(internalX, internalY, internalWidth, internalHeight / 2 - 2)
  ctx.fillStyle = "#475569"
  ctx.fill()
  ctx.font = `${fontSize}px Arial`
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("Air Cathode", centerX, centerY - internalHeight / 4)

  // Animate oxygen molecules entering
  const particleCount = Math.max(3, Math.min(7, Math.floor(width / 60)))
  for (let i = 0; i < particleCount; i++) {
    const progress = (time * 0.3 + i / particleCount) % 1
    const holeIndex = i % holeCount
    const x = centerX - batteryWidth / 2 + holeSpacing * (holeIndex + 0.5)
    const y = centerY - batteryHeight / 2 + batteryHeight * 0.1 * progress * 2

    ctx.beginPath()
    ctx.arc(x, y, Math.max(1.5, Math.min(2.5, width / 150)), 0, Math.PI * 2)
    ctx.fillStyle = "#3b82f6"
    ctx.fill()
  }

  // Labels
  ctx.font = `bold ${fontSize}px Arial`
  ctx.fillStyle = "#0f172a"
  ctx.textAlign = "center"
  ctx.fillText("Zinc-Air Battery", centerX, centerY - batteryHeight / 2 - 15)

  ctx.font = `${Math.max(8, fontSize - 2)}px Arial`
  ctx.fillStyle = "#0284c7"
  ctx.fillText("O₂", centerX, centerY - batteryHeight / 2 - 5)
}

function drawAlkalineBattery(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width / 2
  const centerY = height / 2
  const batteryWidth = Math.min(width * 0.3, 100)
  const batteryHeight = Math.min(height * 0.7, 180)
  const fontSize = Math.max(10, Math.min(14, width / 25))

  // Battery casing
  ctx.beginPath()
  ctx.rect(centerX - batteryWidth / 2, centerY - batteryHeight / 2, batteryWidth, batteryHeight)
  ctx.fillStyle = "#a1a1aa"
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = "#71717a"
  ctx.stroke()

  // Battery top
  ctx.beginPath()
  ctx.rect(centerX - batteryWidth / 2, centerY - batteryHeight / 2 - 10, batteryWidth, 10)
  ctx.fillStyle = "#52525b"
  ctx.fill()

  // Internal components
  const internalWidth = batteryWidth * 0.8
  const internalHeight = batteryHeight * 0.8
  const internalX = centerX - internalWidth / 2
  const internalY = centerY - internalHeight / 2

  // Zinc anode (center)
  const anodeWidth = internalWidth * 0.3
  ctx.beginPath()
  ctx.rect(centerX - anodeWidth / 2, internalY, anodeWidth, internalHeight)
  ctx.fillStyle = "#94a3b8"
  ctx.fill()
  ctx.font = `${Math.max(8, fontSize - 2)}px Arial`
  ctx.fillStyle = "#1e293b"
  ctx.textAlign = "center"
  ctx.fillText("Zn", centerX, centerY - internalHeight / 4)

  // MnO₂ cathode (surrounding)
  ctx.beginPath()
  ctx.rect(internalX, internalY, (internalWidth - anodeWidth) / 2, internalHeight)
  ctx.fillStyle = "#1e293b"
  ctx.fill()

  ctx.beginPath()
  ctx.rect(centerX + anodeWidth / 2, internalY, (internalWidth - anodeWidth) / 2, internalHeight)
  ctx.fillStyle = "#1e293b"
  ctx.fill()
  ctx.font = `${Math.max(8, fontSize - 2)}px Arial`
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("MnO₂", centerX + internalWidth / 3, centerY - internalHeight / 4)

  // Separator
  ctx.beginPath()
  ctx.rect(centerX - anodeWidth / 2 - 1, internalY, 1, internalHeight)
  ctx.fillStyle = "#e2e8f0"
  ctx.fill()

  ctx.beginPath()
  ctx.rect(centerX + anodeWidth / 2, internalY, 1, internalHeight)
  ctx.fillStyle = "#e2e8f0"
  ctx.fill()

  // Electrolyte
  ctx.fillStyle = "#a855f7"
  ctx.globalAlpha = 0.2
  ctx.fillRect(internalX, internalY + internalHeight * 0.6, internalWidth, internalHeight * 0.4)
  ctx.globalAlpha = 1.0
  ctx.font = `${Math.max(8, fontSize - 2)}px Arial`
  ctx.fillStyle = "#6b21a8"
  ctx.textAlign = "center"
  ctx.fillText("KOH", centerX, centerY + internalHeight / 3)

  // Labels
  ctx.font = `bold ${fontSize}px Arial`
  ctx.fillStyle = "#0f172a"
  ctx.textAlign = "center"
  ctx.fillText("Alkaline Battery", centerX, centerY - batteryHeight / 2 - 20)
}

function drawPrimaryLithiumBattery(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width / 2
  const centerY = height / 2
  const batteryWidth = Math.min(width * 0.6, 150)
  const batteryHeight = Math.min(height * 0.6, 150)
  const fontSize = Math.max(10, Math.min(14, width / 25))

  // Battery casing (coin cell)
  ctx.beginPath()
  ctx.arc(centerX, centerY, batteryWidth / 2, 0, Math.PI * 2)
  ctx.fillStyle = "#d1d5db"
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = "#9ca3af"
  ctx.stroke()

  // Battery rim
  ctx.beginPath()
  ctx.arc(centerX, centerY, batteryWidth / 2 - 5, 0, Math.PI * 2)
  ctx.strokeStyle = "#6b7280"
  ctx.lineWidth = 1
  ctx.stroke()

  // Internal components
  const internalRadius = batteryWidth / 2 - 15

  // Lithium anode (bottom)
  ctx.beginPath()
  ctx.arc(centerX, centerY, internalRadius, 0, Math.PI)
  ctx.lineTo(centerX - internalRadius, centerY)
  ctx.fillStyle = "#94a3b8"
  ctx.fill()
  ctx.font = `${fontSize}px Arial`
  ctx.fillStyle = "#1e293b"
  ctx.textAlign = "center"
  ctx.fillText("Li", centerX, centerY + internalRadius / 2)

  // Cathode (top)
  ctx.beginPath()
  ctx.arc(centerX, centerY, internalRadius, Math.PI, Math.PI * 2)
  ctx.lineTo(centerX + internalRadius, centerY)
  ctx.fillStyle = "#334155"
  ctx.fill()
  ctx.font = `${fontSize}px Arial`
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("MnO₂", centerX, centerY - internalRadius / 2)

  // Separator
  ctx.beginPath()
  ctx.moveTo(centerX - internalRadius, centerY)
  ctx.lineTo(centerX + internalRadius, centerY)
  ctx.strokeStyle = "#e2e8f0"
  ctx.lineWidth = 2
  ctx.stroke()

  // Labels
  ctx.font = `bold ${fontSize}px Arial`
  ctx.fillStyle = "#0f172a"
  ctx.textAlign = "center"
  ctx.fillText("Primary Lithium Battery", centerX, centerY - batteryHeight / 2 - 15)
}

function drawNickelCadmiumBattery(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width / 2
  const centerY = height / 2
  const batteryWidth = Math.min(width * 0.7, 200)
  const batteryHeight = Math.min(height * 0.7, 180)
  const fontSize = Math.max(10, Math.min(14, width / 25))

  // Battery casing
  ctx.beginPath()
  ctx.roundRect(centerX - batteryWidth / 2, centerY - batteryHeight / 2, batteryWidth, batteryHeight, 5)
  ctx.fillStyle = "#d4d4d8"
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = "#a1a1aa"
  ctx.stroke()

  // Battery terminals
  ctx.beginPath()
  ctx.roundRect(centerX - batteryWidth / 6, centerY - batteryHeight / 2 - 10, batteryWidth / 3, 10, 2)
  ctx.fillStyle = "#52525b"
  ctx.fill()

  // Internal components
  const internalWidth = batteryWidth * 0.9
  const internalHeight = batteryHeight * 0.8
  const internalX = centerX - internalWidth / 2
  const internalY = centerY - internalHeight / 2

  // Plates
  const plateCount = Math.max(5, Math.min(9, Math.floor(width / 40)))
  const plateWidth = internalWidth / plateCount
  const plateGap = 2

  for (let i = 0; i < plateCount; i++) {
    const x = internalX + i * plateWidth

    // Alternate between cadmium and nickel plates
    if (i % 2 === 0) {
      // Cadmium plate
      ctx.beginPath()
      ctx.rect(x + plateGap / 2, internalY, plateWidth - plateGap, internalHeight)
      ctx.fillStyle = "#94a3b8"
      ctx.fill()
    } else {
      // Nickel plate
      ctx.beginPath()
      ctx.rect(x + plateGap / 2, internalY, plateWidth - plateGap, internalHeight)
      ctx.fillStyle = "#334155"
      ctx.fill()
    }
  }

  // Electrolyte
  ctx.fillStyle = "#a855f7"
  ctx.globalAlpha = 0.2
  ctx.fillRect(internalX, internalY + internalHeight * 0.7, internalWidth, internalHeight * 0.3)
  ctx.globalAlpha = 1.0

  // Labels
  ctx.font = `bold ${fontSize}px Arial`
  ctx.fillStyle = "#0f172a"
  ctx.textAlign = "center"
  ctx.fillText("Nickel-Cadmium Battery", centerX, centerY - batteryHeight / 2 - 20)

  ctx.font = `${Math.max(8, fontSize - 2)}px Arial`
  ctx.fillStyle = "#0f172a"
  ctx.textAlign = "center"
  ctx.fillText("Cd", internalX + plateWidth / 2, centerY)
  ctx.fillText("Ni(OH)₂", internalX + plateWidth * 1.5, centerY)
  ctx.fillText("KOH", centerX, centerY + internalHeight / 2 + 15)
}

function drawNickelMetalHydrideBattery(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width / 2
  const centerY = height / 2
  const batteryWidth = Math.min(width * 0.7, 200)
  const batteryHeight = Math.min(height * 0.7, 180)
  const fontSize = Math.max(10, Math.min(14, width / 25))

  // Battery casing
  ctx.beginPath()
  ctx.roundRect(centerX - batteryWidth / 2, centerY - batteryHeight / 2, batteryWidth, batteryHeight, 5)
  ctx.fillStyle = "#d4d4d8"
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = "#a1a1aa"
  ctx.stroke()

  // Battery terminals
  ctx.beginPath()
  ctx.roundRect(centerX - batteryWidth / 6, centerY - batteryHeight / 2 - 10, batteryWidth / 3, 10, 2)
  ctx.fillStyle = "#52525b"
  ctx.fill()

  // Internal components
  const internalWidth = batteryWidth * 0.9
  const internalHeight = batteryHeight * 0.8
  const internalX = centerX - internalWidth / 2
  const internalY = centerY - internalHeight / 2

  // Plates
  const plateCount = Math.max(5, Math.min(9, Math.floor(width / 40)))
  const plateWidth = internalWidth / plateCount
  const plateGap = 2

  for (let i = 0; i < plateCount; i++) {
    const x = internalX + i * plateWidth

    // Alternate between metal hydride and nickel plates
    if (i % 2 === 0) {
      // Metal hydride plate
      ctx.beginPath()
      ctx.rect(x + plateGap / 2, internalY, plateWidth - plateGap, internalHeight)
      ctx.fillStyle = "#78716c"
      ctx.fill()
    } else {
      // Nickel plate
      ctx.beginPath()
      ctx.rect(x + plateGap / 2, internalY, plateWidth - plateGap, internalHeight)
      ctx.fillStyle = "#334155"
      ctx.fill()
    }
  }

  // Electrolyte
  ctx.fillStyle = "#a855f7"
  ctx.globalAlpha = 0.2
  ctx.fillRect(internalX, internalY + internalHeight * 0.7, internalWidth, internalHeight * 0.3)
  ctx.globalAlpha = 1.0

  // Labels
  ctx.font = `bold ${fontSize}px Arial`
  ctx.fillStyle = "#0f172a"
  ctx.textAlign = "center"
  ctx.fillText("Nickel-Metal Hydride Battery", centerX, centerY - batteryHeight / 2 - 20)

  ctx.font = `${Math.max(8, fontSize - 2)}px Arial`
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("MH", internalX + plateWidth / 2, centerY)
  ctx.fillText("Ni(OH)₂", internalX + plateWidth * 1.5, centerY)
  ctx.fillStyle = "#0f172a"
  ctx.fillText("KOH", centerX, centerY + internalHeight / 2 + 15)
}

function drawAlkalineFuelCell(ctx: CanvasRenderingContext2D, width: number, height: number, time = 0) {
  const centerX = width / 2
  const centerY = height / 2
  const cellWidth = Math.min(width * 0.8, 250)
  const cellHeight = Math.min(height * 0.6, 150)
  const fontSize = Math.max(10, Math.min(14, width / 25))

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

  // Electrolyte (middle)
  ctx.beginPath()
  ctx.rect(centerX - 10, internalY, 20, internalHeight)
  ctx.fillStyle = "#a855f7"
  ctx.globalAlpha = 0.4
  ctx.fill()
  ctx.globalAlpha = 1.0

  // Anode (left)
  ctx.beginPath()
  ctx.rect(internalX, internalY, internalWidth / 2 - 10, internalHeight)
  ctx.fillStyle = "#334155"
  ctx.fill()
  ctx.font = `${fontSize}px Arial`
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("Anode", internalX + internalWidth / 4 - 5, centerY - 15)
  ctx.fillText("H₂ + 2OH⁻ →", internalX + internalWidth / 4 - 5, centerY)
  ctx.fillText("2H₂O + 2e⁻", internalX + internalWidth / 4 - 5, centerY + 15)

  // Cathode (right)
  ctx.beginPath()
  ctx.rect(centerX + 10, internalY, internalWidth / 2 - 10, internalHeight)
  ctx.fillStyle = "#1e293b"
  ctx.fill()
  ctx.font = `${fontSize}px Arial`
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("Cathode", centerX + internalWidth / 4 + 5, centerY - 15)
  ctx.fillText("½O₂ + H₂O + 2e⁻ →", centerX + internalWidth / 4 + 5, centerY)
  ctx.fillText("2OH⁻", centerX + internalWidth / 4 + 5, centerY + 15)

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
  ctx.moveTo(internalX, centerY + internalHeight / 4)
  ctx.lineTo(internalX - 20, centerY + internalHeight / 4)
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
    ctx.arc(x, y, Math.max(2, Math.min(3, width / 150)), 0, Math.PI * 2)
    ctx.fillStyle = "#0284c7"
    ctx.fill()
  }

  // Oxygen molecules
  for (let i = 0; i < 3; i++) {
    const progress = (time * 0.5 + i / 3) % 1
    const x = internalX + internalWidth + 20 - progress * 20
    const y = centerY - internalHeight / 4

    ctx.beginPath()
    ctx.arc(x, y, Math.max(2, Math.min(3, width / 150)), 0, Math.PI * 2)
    ctx.fillStyle = "#ef4444"
    ctx.fill()
  }

  // Water molecules
  for (let i = 0; i < 3; i++) {
    const progress = (time * 0.5 + i / 3) % 1
    const x = internalX - progress * 20
    const y = centerY + internalHeight / 4

    ctx.beginPath()
    ctx.arc(x, y, Math.max(2, Math.min(3, width / 150)), 0, Math.PI * 2)
    ctx.fillStyle = "#0ea5e9"
    ctx.fill()
  }

  // Labels
  ctx.font = `bold ${fontSize}px Arial`
  ctx.fillStyle = "#0f172a"
  ctx.textAlign = "center"
  ctx.fillText("Alkaline Fuel Cell", centerX, centerY - cellHeight / 2 - 15)

  ctx.font = `${Math.max(8, fontSize - 2)}px Arial`
  ctx.fillStyle = "#0284c7"
  ctx.fillText("H₂", internalX - 20, centerY - internalHeight / 4 - 10)

  ctx.fillStyle = "#ef4444"
  ctx.fillText("O₂", internalX + internalWidth + 20, centerY - internalHeight / 4 - 10)

  ctx.fillStyle = "#0ea5e9"
  ctx.fillText("H₂O", internalX - 20, centerY + internalHeight / 4 - 10)

  ctx.fillStyle = "#a855f7"
  ctx.fillText("KOH", centerX, centerY + internalHeight / 2 + 15)
}

function drawMoltenCarbonateFuelCell(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width / 2
  const centerY = height / 2
  const cellWidth = Math.min(width * 0.8, 250)
  const cellHeight = Math.min(height * 0.6, 150)
  const fontSize = Math.max(10, Math.min(14, width / 25))

  // Cell casing with heat indication
  ctx.beginPath()
  ctx.rect(centerX - cellWidth / 2, centerY - cellHeight / 2, cellWidth, cellHeight)
  const gradient = ctx.createLinearGradient(centerX - cellWidth / 2, centerY, centerX + cellWidth / 2, centerY)
  gradient.addColorStop(0, "#fef2f2")
  gradient.addColorStop(0.5, "#fee2e2")
  gradient.addColorStop(1, "#fef2f2")
  ctx.fillStyle = gradient
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = "#ef4444"
  ctx.stroke()

  // Draw internal components
  const internalWidth = cellWidth * 0.9
  const internalHeight = cellHeight * 0.7
  const internalX = centerX - internalWidth / 2
  const internalY = centerY - internalHeight / 2

  // Electrolyte (middle) - molten carbonate
  ctx.beginPath()
  ctx.rect(centerX - 10, internalY, 20, internalHeight)
  ctx.fillStyle = "#fb923c"
  ctx.globalAlpha = 0.6
  ctx.fill()
  ctx.globalAlpha = 1.0

  // Anode (left)
  ctx.beginPath()
  ctx.rect(internalX, internalY, internalWidth / 2 - 10, internalHeight)
  ctx.fillStyle = "#334155"
  ctx.fill()
  ctx.font = `${Math.max(8, fontSize - 2)}px Arial`
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("Anode (Ni)", internalX + internalWidth / 4 - 5, centerY - 15)
  ctx.fillText("H₂ + CO₃²⁻ →", internalX + internalWidth / 4 - 5, centerY)
  ctx.fillText("H₂O + CO₂ + 2e⁻", internalX + internalWidth / 4 - 5, centerY + 15)

  // Cathode (right)
  ctx.beginPath()
  ctx.rect(centerX + 10, internalY, internalWidth / 2 - 10, internalHeight)
  ctx.fillStyle = "#1e293b"
  ctx.fill()
  ctx.font = `${Math.max(8, fontSize - 2)}px Arial`
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("Cathode (NiO)", centerX + internalWidth / 4 + 5, centerY - 15)
  ctx.fillText("½O₂ + CO₂ + 2e⁻ →", centerX + internalWidth / 4 + 5, centerY)
  ctx.fillText("CO₃²⁻", centerX + internalWidth / 4 + 5, centerY + 15)

  // Input/output pipes
  // Hydrogen input
  ctx.beginPath()
  ctx.moveTo(internalX - 20, centerY - internalHeight / 4)
  ctx.lineTo(internalX, centerY - internalHeight / 4)
  ctx.lineWidth = 3
  ctx.strokeStyle = "#0284c7"
  ctx.stroke()

  // CO2 + O2 input
  ctx.beginPath()
  ctx.moveTo(internalX + internalWidth + 20, centerY - internalHeight / 4)
  ctx.lineTo(internalX + internalWidth, centerY - internalHeight / 4)
  ctx.lineWidth = 3
  ctx.strokeStyle = "#84cc16"
  ctx.stroke()

  // H2O + CO2 output
  ctx.beginPath()
  ctx.moveTo(internalX, centerY + internalHeight / 4)
  ctx.lineTo(internalX - 20, centerY + internalHeight / 4)
  ctx.lineWidth = 3
  ctx.strokeStyle = "#0ea5e9"
  ctx.stroke()

  // Heat indicators
  const heatCount = 5
  for (let i = 0; i < heatCount; i++) {
    const x = centerX - cellWidth / 2 + (cellWidth / heatCount) * (i + 0.5)
    const y = centerY + cellHeight / 2 + 10

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x, y + 10)
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 2
    ctx.stroke()
  }

  // Labels
  ctx.font = `bold ${fontSize}px Arial`
  ctx.fillStyle = "#0f172a"
  ctx.textAlign = "center"
  ctx.fillText("Molten Carbonate Fuel Cell", centerX, centerY - cellHeight / 2 - 15)

  ctx.font = `${Math.max(8, fontSize - 2)}px Arial`
  ctx.fillStyle = "#0284c7"
  ctx.fillText("H₂", internalX - 20, centerY - internalHeight / 4 - 10)

  ctx.fillStyle = "#84cc16"
  ctx.fillText("CO₂ + O₂", internalX + internalWidth + 20, centerY - internalHeight / 4 - 10)

  ctx.fillStyle = "#0ea5e9"
  ctx.fillText("H₂O + CO₂", internalX - 20, centerY + internalHeight / 4 - 10)

  ctx.fillStyle = "#fb923c"
  ctx.fillText("Li₂CO₃/K₂CO₃ (650°C)", centerX, centerY + internalHeight / 2 + 15)
}

function drawSolidOxideFuelCell(ctx: CanvasRenderingContext2D, width: number, height: number, time = 0) {
  const centerX = width / 2
  const centerY = height / 2
  const cellWidth = Math.min(width * 0.8, 250)
  const cellHeight = Math.min(height * 0.6, 150)
  const fontSize = Math.max(10, Math.min(14, width / 25))

  // Cell casing with heat indication
  ctx.beginPath()
  ctx.rect(centerX - cellWidth / 2, centerY - cellHeight / 2, cellWidth, cellHeight)
  const gradient = ctx.createLinearGradient(centerX - cellWidth / 2, centerY, centerX + cellWidth / 2, centerY)
  gradient.addColorStop(0, "#fef2f2")
  gradient.addColorStop(0.5, "#fee2e2")
  gradient.addColorStop(1, "#fef2f2")
  ctx.fillStyle = gradient
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = "#dc2626"
  ctx.stroke()

  // Draw internal components
  const internalWidth = cellWidth * 0.9
  const internalHeight = cellHeight * 0.7
  const internalX = centerX - internalWidth / 2
  const internalY = centerY - internalHeight / 2

  // Electrolyte (middle) - solid ceramic
  ctx.beginPath()
  ctx.rect(centerX - 8, internalY, 16, internalHeight)
  ctx.fillStyle = "#fcd34d"
  ctx.fill()

  // Anode (left)
  ctx.beginPath()
  ctx.rect(internalX, internalY, internalWidth / 2 - 8, internalHeight)
  ctx.fillStyle = "#334155"
  ctx.fill()
  ctx.font = `${Math.max(8, fontSize - 2)}px Arial`
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("Anode", internalX + internalWidth / 4 - 4, centerY - 15)
  ctx.fillText("H₂ + O²⁻ →", internalX + internalWidth / 4 - 4, centerY)
  ctx.fillText("H₂O + 2e⁻", internalX + internalWidth / 4 - 4, centerY + 15)

  // Cathode (right)
  ctx.beginPath()
  ctx.rect(centerX + 8, internalY, internalWidth / 2 - 8, internalHeight)
  ctx.fillStyle = "#1e293b"
  ctx.fill()
  ctx.font = `${Math.max(8, fontSize - 2)}px Arial`
  ctx.fillStyle = "#f8fafc"
  ctx.textAlign = "center"
  ctx.fillText("Cathode", centerX + internalWidth / 4 + 4, centerY - 15)
  ctx.fillText("½O₂ + 2e⁻ →", centerX + internalWidth / 4 + 4, centerY)
  ctx.fillText("O²⁻", centerX + internalWidth / 4 + 4, centerY + 15)

  // Input/output pipes
  // Hydrogen/fuel input
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
  ctx.moveTo(internalX, centerY + internalHeight / 4)
  ctx.lineTo(internalX - 20, centerY + internalHeight / 4)
  ctx.lineWidth = 3
  ctx.strokeStyle = "#0ea5e9"
  ctx.stroke()

  // Animate oxygen ions
  const numIons = Math.max(3, Math.min(6, Math.floor(width / 60)))
  for (let i = 0; i < numIons; i++) {
    const progress = (time * 0.3 + i / numIons) % 1
    const x = centerX + 8 - progress * 16
    const y = centerY + Math.sin(progress * Math.PI * 2) * (internalHeight / 6)

    ctx.beginPath()
    ctx.arc(x, y, Math.max(2, Math.min(3, width / 150)), 0, Math.PI * 2)
    ctx.fillStyle = "#3b82f6"
    ctx.fill()
  }

  // Heat indicators
  const heatCount = 5
  for (let i = 0; i < heatCount; i++) {
    const x = centerX - cellWidth / 2 + (cellWidth / heatCount) * (i + 0.5)
    const y = centerY + cellHeight / 2 + 10

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x, y + 10)
    ctx.strokeStyle = "#dc2626"
    ctx.lineWidth = 2
    ctx.stroke()
  }

  // Labels
  ctx.font = `bold ${fontSize}px Arial`
  ctx.fillStyle = "#0f172a"
  ctx.textAlign = "center"
  ctx.fillText("Solid Oxide Fuel Cell", centerX, centerY - cellHeight / 2 - 15)

  ctx.font = `${Math.max(8, fontSize - 2)}px Arial`
  ctx.fillStyle = "#0284c7"
  ctx.fillText("H₂", internalX - 20, centerY - internalHeight / 4 - 10)

  ctx.fillStyle = "#ef4444"
  ctx.fillText("O₂", internalX + internalWidth + 20, centerY - internalHeight / 4 - 10)

  ctx.fillStyle = "#0ea5e9"
  ctx.fillText("H₂O", internalX - 20, centerY + internalHeight / 4 - 10)

  ctx.fillStyle = "#fcd34d"
  ctx.fillText("ZrO₂-Y₂O₃ (800-1000°C)", centerX, centerY + internalHeight / 2 + 15)
}

// Add a custom hook for resize observer if it doesn't exist
export function useResizeObserver(ref: React.RefObject<Element | null>, callback: (entry: ResizeObserverEntry) => void) {
  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver((entries) => {
        callback(entries[0])
      })

      observer.observe(ref.current)

      return () => {
        observer.disconnect()
      }
    }
    return undefined
  }, [ref, callback])
}
