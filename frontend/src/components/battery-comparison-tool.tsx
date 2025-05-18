"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type BatteryType = {
  id: string
  name: string
  type: string
  metrics: {
    energyDensity: number
    powerDensity: number
    lifespan: number
    cost: number
    chargingTime: number
    safetyRating: number
  }
  applications: string[]
  advantages: string[]
  disadvantages: string[]
}

const batteryData: BatteryType[] = [
  {
    id: "lithium-ion",
    name: "Lithium-Ion",
    type: "Secondary",
    metrics: {
      energyDensity: 200,
      powerDensity: 340,
      lifespan: 1000,
      cost: 4,
      chargingTime: 2,
      safetyRating: 3,
    },
    applications: ["Smartphones and laptops", "Electric vehicles", "Power tools", "Grid energy storage"],
    advantages: ["High energy density", "Low self-discharge", "No memory effect", "Relatively long cycle life"],
    disadvantages: [
      "Requires protection circuit",
      "Ages even when not in use",
      "Transportation restrictions",
      "Thermal runaway risk",
    ],
  },
  {
    id: "lead-acid",
    name: "Lead-Acid",
    type: "Secondary",
    metrics: {
      energyDensity: 40,
      powerDensity: 180,
      lifespan: 300,
      cost: 1,
      chargingTime: 8,
      safetyRating: 4,
    },
    applications: [
      "Automotive starting, lighting, and ignition",
      "Uninterruptible power supplies",
      "Forklifts",
      "Off-grid energy storage",
    ],
    advantages: [
      "Low cost",
      "Reliable and well-understood",
      "High surge current capability",
      "Tolerant to overcharging",
    ],
    disadvantages: ["Heavy and bulky", "Low energy density", "Limited cycle life", "Toxic materials (lead)"],
  },
  {
    id: "nimh",
    name: "Nickel-Metal Hydride",
    type: "Secondary",
    metrics: {
      energyDensity: 100,
      powerDensity: 250,
      lifespan: 500,
      cost: 2.5,
      chargingTime: 4,
      safetyRating: 5,
    },
    applications: ["Hybrid vehicles", "Digital cameras", "Portable electronics", "Medical devices"],
    advantages: [
      "Higher capacity than NiCd",
      "Less prone to memory effect",
      "Environmentally friendly",
      "Safe operation",
    ],
    disadvantages: [
      "High self-discharge rate",
      "Limited shelf life",
      "Heat generation during charging",
      "Lower energy density than Li-ion",
    ],
  },
  {
    id: "alkaline",
    name: "Alkaline",
    type: "Primary",
    metrics: {
      energyDensity: 110,
      powerDensity: 50,
      lifespan: 5,
      cost: 1.5,
      chargingTime: 0,
      safetyRating: 5,
    },
    applications: ["Remote controls", "Flashlights", "Toys", "Wall clocks"],
    advantages: ["Low cost", "Long shelf life", "No toxic materials", "Widely available"],
    disadvantages: [
      "Not rechargeable",
      "Poor performance at high drain rates",
      "Performance decreases with use",
      "Environmental disposal concerns",
    ],
  },
  {
    id: "zinc-carbon",
    name: "Zinc-Carbon",
    type: "Primary",
    metrics: {
      energyDensity: 65,
      powerDensity: 30,
      lifespan: 2,
      cost: 1,
      chargingTime: 0,
      safetyRating: 4,
    },
    applications: ["Low-drain devices", "Remote controls", "Wall clocks", "Basic electronics"],
    advantages: ["Very low cost", "Simple construction", "Widely available", "Operates in wide temperature range"],
    disadvantages: [
      "Low energy density",
      "Short shelf life",
      "Poor performance at high drain rates",
      "Performance decreases rapidly with use",
    ],
  },
  {
    id: "lithium-primary",
    name: "Lithium Primary",
    type: "Primary",
    metrics: {
      energyDensity: 300,
      powerDensity: 100,
      lifespan: 10,
      cost: 5,
      chargingTime: 0,
      safetyRating: 3,
    },
    applications: ["Pacemakers", "Watches", "Memory backup", "Remote keyless entry"],
    advantages: ["Very high energy density", "Extremely long shelf life", "Wide temperature range", "Lightweight"],
    disadvantages: ["Not rechargeable", "Expensive", "Safety concerns if damaged", "Disposal challenges"],
  },
  {
    id: "pem-fuel-cell",
    name: "PEM Fuel Cell",
    type: "Fuel Cell",
    metrics: {
      energyDensity: 500,
      powerDensity: 300,
      lifespan: 5000,
      cost: 10,
      chargingTime: 0.1,
      safetyRating: 3,
    },
    applications: ["Fuel cell vehicles", "Portable power generation", "Backup power systems", "Space applications"],
    advantages: [
      "Zero emissions (only water as byproduct)",
      "High energy conversion efficiency",
      "Quick refueling",
      "No moving parts (quiet operation)",
    ],
    disadvantages: [
      "Expensive platinum catalyst",
      "Hydrogen storage challenges",
      "Sensitive to fuel impurities",
      "Limited infrastructure",
    ],
  },
]

export default function BatteryComparisonTool() {
  const [selectedBatteries, setSelectedBatteries] = useState<string[]>([])

  const handleSelectBattery = (batteryId: string, position: number) => {
    const newSelected = [...selectedBatteries]
    newSelected[position] = batteryId
    setSelectedBatteries(newSelected)
  }

  const handleRemoveBattery = (position: number) => {
    const newSelected = [...selectedBatteries]
    newSelected[position] = ""
    setSelectedBatteries(newSelected)
  }

  const getSelectedBatteryData = (position: number) => {
    const batteryId = selectedBatteries[position]
    return batteryData.find((battery) => battery.id === batteryId)
  }

  const getComparisonData = () => {
    const metrics = ["energyDensity", "powerDensity", "lifespan", "cost", "chargingTime", "safetyRating"]
    const metricLabels = {
      energyDensity: "Energy Density (Wh/kg)",
      powerDensity: "Power Density (W/kg)",
      lifespan: "Lifespan (cycles)",
      cost: "Relative Cost",
      chargingTime: "Charging Time (hours)",
      safetyRating: "Safety Rating (1-5)",
    }

    return metrics.map((metric) => {
      const data: any = {
        name: metricLabels[metric as keyof typeof metricLabels],
      }

      selectedBatteries.forEach((batteryId, index) => {
        if (batteryId) {
          const battery = batteryData.find((b) => b.id === batteryId)
          if (battery) {
            data[`battery${index + 1}`] = battery.metrics[metric as keyof typeof battery.metrics]
            data[`battery${index + 1}Name`] = battery.name
          }
        }
      })

      return data
    })
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Select Batteries to Compare</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((position) => (
              <div key={position} className="flex items-center space-x-2">
                <Select
                  value={selectedBatteries[position] || ""}
                  onValueChange={(value) => handleSelectBattery(value, position)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Select Battery ${position + 1}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {batteryData.map((battery) => (
                      <SelectItem
                        key={battery.id}
                        value={battery.id}
                        disabled={selectedBatteries.includes(battery.id) && selectedBatteries[position] !== battery.id}
                      >
                        {battery.name} ({battery.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedBatteries[position] && (
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveBattery(position)}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedBatteries.some((id) => id) && (
        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
            <TabsTrigger value="chart">Visual Comparison</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="pros-cons">Pros & Cons</TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Metric</TableHead>
                      {selectedBatteries.map((batteryId, index) =>
                        batteryId ? (
                          <TableHead key={index}>{batteryData.find((b) => b.id === batteryId)?.name}</TableHead>
                        ) : null,
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Type</TableCell>
                      {selectedBatteries.map((batteryId, index) =>
                        batteryId ? (
                          <TableCell key={index}>{batteryData.find((b) => b.id === batteryId)?.type}</TableCell>
                        ) : null,
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Energy Density (Wh/kg)</TableCell>
                      {selectedBatteries.map((batteryId, index) =>
                        batteryId ? (
                          <TableCell key={index}>
                            {batteryData.find((b) => b.id === batteryId)?.metrics.energyDensity}
                          </TableCell>
                        ) : null,
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Power Density (W/kg)</TableCell>
                      {selectedBatteries.map((batteryId, index) =>
                        batteryId ? (
                          <TableCell key={index}>
                            {batteryData.find((b) => b.id === batteryId)?.metrics.powerDensity}
                          </TableCell>
                        ) : null,
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Lifespan (cycles)</TableCell>
                      {selectedBatteries.map((batteryId, index) =>
                        batteryId ? (
                          <TableCell key={index}>
                            {batteryData.find((b) => b.id === batteryId)?.metrics.lifespan}
                          </TableCell>
                        ) : null,
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Relative Cost</TableCell>
                      {selectedBatteries.map((batteryId, index) =>
                        batteryId ? (
                          <TableCell key={index}>
                            {"$".repeat(batteryData.find((b) => b.id === batteryId)?.metrics.cost || 0)}
                          </TableCell>
                        ) : null,
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Charging Time (hours)</TableCell>
                      {selectedBatteries.map((batteryId, index) => {
                        const battery = batteryData.find((b) => b.id === batteryId)
                        return batteryId ? (
                          <TableCell key={index}>
                            {battery?.metrics.chargingTime === 0 ? "N/A (Primary)" : battery?.metrics.chargingTime}
                          </TableCell>
                        ) : null
                      })}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Safety Rating (1-5)</TableCell>
                      {selectedBatteries.map((batteryId, index) =>
                        batteryId ? (
                          <TableCell key={index}>
                            {batteryData.find((b) => b.id === batteryId)?.metrics.safetyRating}
                          </TableCell>
                        ) : null,
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chart" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getComparisonData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {selectedBatteries[0] && (
                        <Bar dataKey="battery1" name={getSelectedBatteryData(0)?.name} fill="#0ea5e9" />
                      )}
                      {selectedBatteries[1] && (
                        <Bar dataKey="battery2" name={getSelectedBatteryData(1)?.name} fill="#f59e0b" />
                      )}
                      {selectedBatteries[2] && (
                        <Bar dataKey="battery3" name={getSelectedBatteryData(2)?.name} fill="#10b981" />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedBatteries.map((batteryId, index) => {
                    const battery = batteryData.find((b) => b.id === batteryId)
                    return batteryId ? (
                      <div key={index} className="space-y-4">
                        <h3 className="text-lg font-semibold">{battery?.name}</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {battery?.applications.map((app, i) => (
                            <li key={i}>{app}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pros-cons" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-8">
                  {selectedBatteries.map((batteryId, index) => {
                    const battery = batteryData.find((b) => b.id === batteryId)
                    return batteryId ? (
                      <div key={index} className="space-y-4">
                        <h3 className="text-lg font-semibold">{battery?.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Advantages</h4>
                            <ul className="space-y-2">
                              {battery?.advantages.map((adv, i) => (
                                <li key={i} className="flex items-start">
                                  <Check className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 shrink-0" />
                                  <span>{adv}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Disadvantages</h4>
                            <ul className="space-y-2">
                              {battery?.disadvantages.map((dis, i) => (
                                <li key={i} className="flex items-start">
                                  <X className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 shrink-0" />
                                  <span>{dis}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : null
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
