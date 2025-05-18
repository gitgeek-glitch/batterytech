"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import BatteryVisualization from "@/components/battery-visualization"
import { cn } from "@/lib/utils"

// Dialog components (previously from dialog.tsx)
const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

// VisuallyHidden component for accessibility
const VisuallyHidden = ({ children }: { children: React.ReactNode }) => {
  return (
    <span
      style={{
        border: 0,
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        width: "1px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
};
VisuallyHidden.displayName = "VisuallyHidden"

// Type-checking helper functions
const hasDialogTitle = (children: React.ReactNode): boolean => {
  const childrenArray = React.Children.toArray(children)
  return childrenArray.some((child) => {
    if (!React.isValidElement(child)) return false

    if (child.type === DialogPrimitive.Title) return true

    if (child.props && typeof child.props === 'object' && 'children' in child.props) {
      return hasDialogTitle(child.props.children as React.ReactNode)
    }

    return false
  })
}

const hasDialogDescription = (children: React.ReactNode): boolean => {
  const childrenArray = React.Children.toArray(children)
  return childrenArray.some((child) => {
    if (!React.isValidElement(child)) return false

    if (child.type === DialogPrimitive.Description) return true

    if (child.props && typeof child.props === 'object' && 'children' in child.props) {
      return hasDialogDescription(child.props.children as React.ReactNode)
    }

    return false
  })
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    title?: string; // Optional title for accessibility
    description?: string; // Optional description for accessibility
  }
>(({ className, children, title = "Dialog", description, ...props }, ref) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className,
        )}
        aria-labelledby="dialog-title"
        aria-describedby={description ? "dialog-description" : undefined}
        {...props}
      >
        {/* Always ensure there's a title for screen readers */}
        {!hasDialogTitle(children) && (
          <VisuallyHidden>
            <DialogPrimitive.Title id="dialog-title">{title}</DialogPrimitive.Title>
          </VisuallyHidden>
        )}
        
        {/* Provide description if specified and not already present */}
        {description && !hasDialogDescription(children) && (
          <VisuallyHidden>
            <DialogPrimitive.Description id="dialog-description">
              {description}
            </DialogPrimitive.Description>
          </VisuallyHidden>
        )}
        
        {children}
        
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    id="dialog-title"
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description 
    ref={ref} 
    className={cn("text-sm text-muted-foreground", className)}
    id="dialog-description"
    {...props} 
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

interface BatteryDetailModalProps {
  batteryId: string
  open: boolean
  onClose: () => void
}

type BatteryDetail = {
  id: string
  name: string
  type: string
  description: string
  chemistry: {
    anode: string
    cathode: string
    electrolyte: string
    reactions: string
  }
  performance: {
    energyDensity: string
    powerDensity: string
    voltage: string
    chargingRate: string
    dischargingRate: string
    lifespan: string
    efficiency: string
  }
  applications: string[]
  advantages: string[]
  disadvantages: string[]
  construction: string
}

export default function BatteryDetailModal({ batteryId, open, onClose }: BatteryDetailModalProps) {
  const [battery, setBattery] = useState<BatteryDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (open) {
      setLoading(true)
      // In a real app, this would be an API call
      // For now, we'll simulate fetching data
      setTimeout(() => {
        // This is mock data - in a real app, you'd fetch this from your API
        const mockBatteryData: Record<string, BatteryDetail> = {
          "lithium-ion": {
            id: "lithium-ion",
            name: "Lithium-Ion Battery",
            type: "Secondary",
            description:
              "Lithium-ion batteries are rechargeable batteries that use lithium ions as the primary component of their electrolyte. They have high energy density, no memory effect, and low self-discharge when not in use.",
            chemistry: {
              anode: "Graphite (Carbon)",
              cathode: "Lithium Metal Oxide (e.g., LiCoO₂, LiFePO₄)",
              electrolyte: "Lithium Salt in an Organic Solvent",
              reactions:
                "During discharge, lithium ions move from the anode to the cathode through the electrolyte. During charging, the process is reversed.",
            },
            performance: {
              energyDensity: "150-250 Wh/kg",
              powerDensity: "300-1500 W/kg",
              voltage: "3.6-3.7V (nominal)",
              chargingRate: "0.5-1C (typical)",
              dischargingRate: "1-2C (continuous)",
              lifespan: "500-1500 cycles",
              efficiency: "80-90%",
            },
            applications: [
              "Smartphones and laptops",
              "Electric vehicles",
              "Power tools",
              "Grid energy storage",
              "Medical devices",
            ],
            advantages: [
              "High energy density",
              "Low self-discharge",
              "No memory effect",
              "Relatively long cycle life",
              "Low maintenance",
            ],
            disadvantages: [
              "Requires protection circuit",
              "Ages even when not in use",
              "Transportation restrictions",
              "Thermal runaway risk",
              "Relatively expensive",
            ],
            construction:
              "Lithium-ion batteries typically consist of a graphite anode, a metal oxide cathode, and an electrolyte. The electrodes are separated by a polymer membrane that prevents short circuits while allowing ion transfer. The entire assembly is usually enclosed in a metal case.",
          },
          "zinc-carbon": {
            id: "zinc-carbon",
            name: "Zinc-Carbon Battery",
            type: "Primary",
            description:
              "Zinc-carbon batteries are inexpensive primary batteries that provide moderate energy at a low cost. They were the first commercial dry batteries and are still widely used for low-drain applications.",
            chemistry: {
              anode: "Zinc",
              cathode: "Manganese Dioxide (MnO₂)",
              electrolyte: "Ammonium Chloride or Zinc Chloride",
              reactions:
                "The zinc anode is oxidized, releasing electrons. At the cathode, manganese dioxide is reduced, consuming electrons.",
            },
            performance: {
              energyDensity: "65 Wh/kg",
              powerDensity: "100 W/kg",
              voltage: "1.5V (nominal)",
              chargingRate: "Not rechargeable",
              dischargingRate: "Low current only",
              lifespan: "Short (shelf life 2-3 years)",
              efficiency: "70-80%",
            },
            applications: ["Remote controls", "Wall clocks", "Toys", "Flashlights", "Low-drain electronic devices"],
            advantages: [
              "Low cost",
              "Widely available",
              "No toxic materials (compared to some other batteries)",
              "Operates in wide temperature range",
              "Simple construction",
            ],
            disadvantages: [
              "Low energy density",
              "Poor performance at high drain rates",
              "Short shelf life",
              "Performance decreases with use",
              "Not rechargeable",
            ],
            construction:
              "Zinc-carbon batteries have a zinc outer case that serves as the anode. The cathode is a central carbon rod surrounded by a paste of manganese dioxide, carbon powder, and ammonium chloride. The entire assembly is sealed to prevent leakage.",
          },
          "lead-acid": {
            id: "lead-acid",
            name: "Lead-Acid Battery",
            type: "Secondary",
            description:
              "Lead-acid batteries are the oldest type of rechargeable battery. Despite having a low energy-to-weight ratio and low energy-to-volume ratio, their ability to supply high surge currents means they have a relatively large power-to-weight ratio.",
            chemistry: {
              anode: "Lead (Pb)",
              cathode: "Lead Dioxide (PbO₂)",
              electrolyte: "Sulfuric Acid (H₂SO₄)",
              reactions:
                "During discharge, both electrodes are converted to lead sulfate. During charging, the process is reversed.",
            },
            performance: {
              energyDensity: "30-50 Wh/kg",
              powerDensity: "180 W/kg",
              voltage: "2.1V (per cell)",
              chargingRate: "0.2C (typical)",
              dischargingRate: "0.2C (continuous)",
              lifespan: "200-300 cycles (deep cycle)",
              efficiency: "70-80%",
            },
            applications: [
              "Automotive starting, lighting, and ignition",
              "Uninterruptible power supplies",
              "Forklifts and other electric vehicles",
              "Emergency lighting",
              "Off-grid energy storage",
            ],
            advantages: [
              "Low cost",
              "Reliable and well-understood",
              "High surge current capability",
              "Tolerant to overcharging",
              "Operates in wide temperature range",
            ],
            disadvantages: [
              "Heavy and bulky",
              "Low energy density",
              "Limited cycle life",
              "Toxic materials (lead)",
              "Hydrogen gas emission during charging",
            ],
            construction:
              "Lead-acid batteries consist of lead and lead dioxide plates immersed in a sulfuric acid electrolyte. The plates are separated by insulating material to prevent short circuits. The entire assembly is contained in a durable case, typically made of plastic.",
          },
          pem: {
            id: "pem",
            name: "Polymer Electrolyte Membrane Fuel Cell",
            type: "Fuel Cell",
            description:
              "PEM fuel cells use a solid polymer electrolyte membrane to exchange protons between electrodes. They operate at relatively low temperatures and can start quickly, making them suitable for automotive applications.",
            chemistry: {
              anode: "Platinum-coated Carbon Paper/Cloth",
              cathode: "Platinum-coated Carbon Paper/Cloth",
              electrolyte: "Solid Polymer Membrane (e.g., Nafion)",
              reactions:
                "At the anode, hydrogen is split into protons and electrons. Protons pass through the membrane, while electrons travel through an external circuit. At the cathode, oxygen combines with protons and electrons to form water.",
            },
            performance: {
              energyDensity: "Depends on hydrogen storage",
              powerDensity: "300-1000 W/kg",
              voltage: "0.6-0.7V (per cell, under load)",
              chargingRate: "Not applicable",
              dischargingRate: "Continuous as long as fuel is supplied",
              lifespan: "5,000-40,000 hours",
              efficiency: "40-60%",
            },
            applications: [
              "Fuel cell vehicles",
              "Portable power generation",
              "Backup power systems",
              "Small stationary power generation",
              "Space applications",
            ],
            advantages: [
              "Zero emissions (only water as byproduct)",
              "High energy conversion efficiency",
              "Low operating temperature",
              "Quick start-up",
              "No moving parts (quiet operation)",
            ],
            disadvantages: [
              "Expensive platinum catalyst",
              "Hydrogen storage challenges",
              "Sensitive to fuel impurities",
              "Water management issues",
              "Limited durability",
            ],
            construction:
              "PEM fuel cells consist of a polymer electrolyte membrane sandwiched between two catalyst-coated electrodes (anode and cathode). This membrane electrode assembly (MEA) is placed between two flow-field plates that distribute hydrogen and oxygen to the electrodes and collect the current.",
          },
        }

        setBattery(mockBatteryData[batteryId] || null)
        setLoading(false)
      }, 1000)
    }
  }, [batteryId, open])

  // Determine the title to use for accessibility
  const accessibleTitle = battery ? battery.name : loading ? "Loading Battery Information" : "Battery Information Not Found"

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Always provide a DialogTitle for accessibility */}
        {loading ? (
          <>
            <DialogHeader>
              <DialogTitle>Loading Battery Information</DialogTitle>
            </DialogHeader>
            <BatteryDetailSkeleton />
          </>
        ) : battery ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">{battery.name}</DialogTitle>
              <DialogDescription>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-muted mt-2">{battery.type}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              <p className="text-muted-foreground mb-6">{battery.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <BatteryVisualization batteryId={battery.id} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Performance Metrics</h3>
                  <div className="space-y-2">
                    {Object.entries(battery.performance).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b pb-2">
                        <span className="font-medium">{formatLabel(key)}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Tabs defaultValue="chemistry" className="mt-6">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
                  <TabsTrigger value="construction">Construction</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="pros-cons">Pros & Cons</TabsTrigger>
                </TabsList>

                <TabsContent value="chemistry" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Anode</h4>
                      <p>{battery.chemistry.anode}</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Cathode</h4>
                      <p>{battery.chemistry.cathode}</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Electrolyte</h4>
                      <p>{battery.chemistry.electrolyte}</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Chemical Reactions</h4>
                      <p>{battery.chemistry.reactions}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="construction">
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Construction & Working</h4>
                    <p>{battery.construction}</p>
                  </div>
                </TabsContent>

                <TabsContent value="applications">
                  <h4 className="font-semibold mb-3">Common Applications</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {battery.applications.map((app, index) => (
                      <li key={index}>{app}</li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="pros-cons">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600 dark:text-green-400">Advantages</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {battery.advantages.map((adv, index) => (
                          <li key={index}>{adv}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-red-600 dark:text-red-400">Disadvantages</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {battery.disadvantages.map((dis, index) => (
                          <li key={index}>{dis}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Battery Information Not Found</DialogTitle>
            </DialogHeader>
            <div className="py-8 text-center">
              <p>Battery information not found.</p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function BatteryDetailSkeleton() {
  return (
    <>
      <div className="mt-4">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Skeleton className="h-64 w-full rounded-lg" />
          <div>
            <Skeleton className="h-6 w-48 mb-3" />
            <div className="space-y-2">
              {Array(7)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex justify-between border-b pb-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>
      </div>
    </>
  )
}

function formatLabel(key: string): string {
  return key
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// Export dialog components for potential reuse elsewhere in the app
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  VisuallyHidden,
}