"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BatteryDetailModal from "@/components/battery-detail-modal"
import { Battery, Zap } from "lucide-react"

type BatteryType = {
  id: string
  name: string
  type: "primary" | "secondary" | "fuel-cell"
  shortDescription: string
  energyDensity: string
  lifespan: string
}

export default function BatteryGrid() {
  const [selectedBattery, setSelectedBattery] = useState<string | null>(null)

  const batteries: BatteryType[] = [
    // Primary Batteries
    {
      id: "zinc-carbon",
      name: "Zinc-Carbon",
      type: "primary",
      shortDescription: "Low-cost primary battery for low-drain applications",
      energyDensity: "65 Wh/kg",
      lifespan: "Short",
    },
    {
      id: "zinc-air",
      name: "Zinc-Air",
      type: "primary",
      shortDescription: "High energy density, used in hearing aids",
      energyDensity: "300-500 Wh/kg",
      lifespan: "Medium",
    },
    {
      id: "alkaline",
      name: "Zinc-MnO₂ (Alkaline)",
      type: "primary",
      shortDescription: "Common household battery with good shelf life",
      energyDensity: "100-150 Wh/kg",
      lifespan: "Medium",
    },
    {
      id: "primary-lithium",
      name: "Primary Lithium",
      type: "primary",
      shortDescription: "High energy density, long shelf life",
      energyDensity: "250-350 Wh/kg",
      lifespan: "Long",
    },

    // Secondary Batteries
    {
      id: "lead-acid",
      name: "Lead-Acid",
      type: "secondary",
      shortDescription: "Oldest rechargeable battery, used in vehicles",
      energyDensity: "30-50 Wh/kg",
      lifespan: "Medium",
    },
    {
      id: "nickel-cadmium",
      name: "Nickel-Cadmium (NiCd)",
      type: "secondary",
      shortDescription: "Robust rechargeable with memory effect",
      energyDensity: "45-80 Wh/kg",
      lifespan: "Long",
    },
    {
      id: "nickel-metal-hydride",
      name: "Nickel-Metal Hydride (NiMH)",
      type: "secondary",
      shortDescription: "Higher capacity than NiCd, less memory effect",
      energyDensity: "60-120 Wh/kg",
      lifespan: "Medium",
    },
    {
      id: "lithium-ion",
      name: "Lithium-Ion",
      type: "secondary",
      shortDescription: "High energy density, powers modern electronics",
      energyDensity: "150-250 Wh/kg",
      lifespan: "Medium to Long",
    },

    // Fuel Cells
    {
      id: "pem-fuel-cell",
      name: "Polymer Electrolyte Membrane (PEM)",
      type: "fuel-cell",
      shortDescription: "Low temperature operation, used in vehicles",
      energyDensity: "Depends on fuel storage",
      lifespan: "Long",
    },
    {
      id: "alkaline-fuel-cell",
      name: "Alkaline Fuel Cell",
      type: "fuel-cell",
      shortDescription: "Used in space applications, high efficiency",
      energyDensity: "Depends on fuel storage",
      lifespan: "Long",
    },
    {
      id: "molten-carbonate-fuel-cell",
      name: "Molten Carbonate Fuel Cell",
      type: "fuel-cell",
      shortDescription: "High temperature, suitable for stationary power",
      energyDensity: "Depends on fuel storage",
      lifespan: "Long",
    },
    {
      id: "solid-oxide-fuel-cell",
      name: "Solid Oxide Fuel Cell",
      type: "fuel-cell",
      shortDescription: "Very high temperature, high efficiency",
      energyDensity: "Depends on fuel storage",
      lifespan: "Long",
    },
  ]

  return (
    <>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Types</TabsTrigger>
          <TabsTrigger value="primary">Primary</TabsTrigger>
          <TabsTrigger value="secondary">Secondary</TabsTrigger>
          <TabsTrigger value="fuel-cell">Fuel Cells</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {batteries.map((battery) => (
              <BatteryCard key={battery.id} battery={battery} onClick={() => setSelectedBattery(battery.id)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="primary" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {batteries
              .filter((battery) => battery.type === "primary")
              .map((battery) => (
                <BatteryCard key={battery.id} battery={battery} onClick={() => setSelectedBattery(battery.id)} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="secondary" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {batteries
              .filter((battery) => battery.type === "secondary")
              .map((battery) => (
                <BatteryCard key={battery.id} battery={battery} onClick={() => setSelectedBattery(battery.id)} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="fuel-cell" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {batteries
              .filter((battery) => battery.type === "fuel-cell")
              .map((battery) => (
                <BatteryCard key={battery.id} battery={battery} onClick={() => setSelectedBattery(battery.id)} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedBattery && (
        <BatteryDetailModal
          batteryId={selectedBattery}
          open={!!selectedBattery}
          onClose={() => setSelectedBattery(null)}
        />
      )}
    </>
  )
}

function BatteryCard({
  battery,
  onClick,
}: {
  battery: BatteryType
  onClick: () => void
}) {
  const typeColors = {
    primary: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
    secondary: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    "fuel-cell": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  }

  const typeLabels = {
    primary: "Primary",
    secondary: "Secondary",
    "fuel-cell": "Fuel Cell",
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            {battery.type === "fuel-cell" ? (
              <Zap className="h-8 w-8 text-primary mr-2" />
            ) : (
              <Battery className="h-8 w-8 text-primary mr-2" />
            )}
            <h3 className="text-xl font-semibold">{battery.name}</h3>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${typeColors[battery.type]}`}>
            {typeLabels[battery.type]}
          </span>
        </div>

        <p className="text-muted-foreground mb-4">{battery.shortDescription}</p>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Energy Density:</span>
            <span className="text-sm">{battery.energyDensity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Lifespan:</span>
            <span className="text-sm">{battery.lifespan}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-muted/30 border-t">
        <Button onClick={onClick} variant="default" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
