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
        // Original batteries from first file
        "lithium-ion": {
          id: "lithium-ion",
          name: "Lithium-Ion Battery",
          type: "Secondary",
          description:
            "Lithium-ion batteries are rechargeable batteries that use lithium ions as the primary component of their electrolyte. They have high energy density, no memory effect, and low self-discharge when not in use. High energy density, powers modern electronics.",
          chemistry: {
            anode: "Graphite (Carbon)",
            cathode: "Lithium Metal Oxide (e.g., LiCoO₂, LiFePO₄)",
            electrolyte: "Lithium Salt in an Organic Solvent",
            reactions:
              "During discharge, lithium ions move from the anode to the cathode through the electrolyte. During charging, the process is reversed.",
          },
          performance: {
            energyDensity: "150-250 Wh/kg",
            powerDensity: "340 W/kg",
            voltage: "3.7V (nominal)",
            chargingRate: "0.5-1C (typical)",
            dischargingRate: "1C (continuous)",
            lifespan: "1000 cycles (Medium to Long)",
            efficiency: "85%",
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
        "lead-acid": {
          id: "lead-acid",
          name: "Lead-Acid Battery",
          type: "Secondary",
          description:
            "Lead-acid batteries are the oldest type of rechargeable battery. Despite having a low energy-to-weight ratio and low energy-to-volume ratio, their ability to supply high surge currents means they have a relatively large power-to-weight ratio. Oldest rechargeable battery, used in vehicles.",
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
            lifespan: "300 cycles (Medium)",
            efficiency: "75%",
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
        "zinc-carbon": {
          id: "zinc-carbon",
          name: "Zinc-Carbon Battery",
          type: "Primary",
          description:
            "Zinc-carbon batteries are inexpensive primary batteries that provide moderate energy at a low cost. They were the first commercial dry batteries and are still widely used for low-drain applications. Low-cost primary battery for low-drain applications.",
          chemistry: {
            anode: "Zinc",
            cathode: "Manganese Dioxide (MnO₂)",
            electrolyte: "Ammonium Chloride or Zinc Chloride",
            reactions:
              "The zinc anode is oxidized, releasing electrons. At the cathode, manganese dioxide is reduced, consuming electrons.",
          },
          performance: {
            energyDensity: "65 Wh/kg",
            powerDensity: "30 W/kg",
            voltage: "1.5V (nominal)",
            chargingRate: "Not rechargeable",
            dischargingRate: "0.1C",
            lifespan: "Short (Not applicable for primary batteries)",
            efficiency: "75%",
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
        "pem-fuel-cell": {
          id: "pem-fuel-cell",
          name: "Polymer Electrolyte Membrane Fuel Cell",
          type: "Fuel Cell",
          description:
            "PEM fuel cells use a solid polymer electrolyte membrane to exchange protons between electrodes. They operate at relatively low temperatures and can start quickly, making them suitable for automotive applications. Low temperature operation, used in vehicles.",
          chemistry: {
            anode: "Platinum-coated Carbon Paper/Cloth",
            cathode: "Platinum-coated Carbon Paper/Cloth",
            electrolyte: "Solid Polymer Membrane (e.g., Nafion)",
            reactions:
              "At the anode, hydrogen is split into protons and electrons. Protons pass through the membrane, while electrons travel through an external circuit. At the cathode, oxygen combines with protons and electrons to form water.",
          },
          performance: {
            energyDensity: "Depends on fuel storage",
            powerDensity: "300 W/kg",
            voltage: "0.7V (per cell, under load)",
            chargingRate: "Not applicable",
            dischargingRate: "Continuous as long as fuel is supplied",
            lifespan: "5000 hours (Long)",
            efficiency: "50%",
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
        
        // Additional batteries from images
        "zinc-air": {
          id: "zinc-air",
          name: "Zinc-Air Battery",
          type: "Primary",
          description: "High energy density primary batteries used in hearing aids and other applications requiring long runtime in a small form factor.",
          chemistry: {
            anode: "Zinc",
            cathode: "Oxygen from air",
            electrolyte: "Potassium hydroxide (KOH)",
            reactions: "Zinc reacts with oxygen from the air to form zinc oxide, releasing electrons."
          },
          performance: {
            energyDensity: "300-500 Wh/kg",
            powerDensity: "100 W/kg",
            voltage: "1.45V (nominal)",
            chargingRate: "Not rechargeable",
            dischargingRate: "Low current only",
            lifespan: "Medium",
            efficiency: "70%"
          },
          applications: [
            "Hearing aids",
            "Medical devices",
            "Pagers and low-power communication devices",
            "Some military applications",
            "Emergency backup power"
          ],
          advantages: [
            "Very high energy density",
            "Flat discharge curve",
            "Low environmental impact",
            "No power drain when sealed",
            "Lightweight"
          ],
          disadvantages: [
            "Limited current output",
            "Performance affected by humidity and temperature",
            "Limited shelf life once activated",
            "Not rechargeable (most types)",
            "Needs continuous air access"
          ],
          construction: "Zinc-air batteries consist of a zinc anode, an air cathode (oxygen from air), and an alkaline electrolyte. The cathode contains catalysts that facilitate oxygen reduction. The battery is typically sealed with a removable tab that prevents air from reaching the cell until needed."
        },
        "alkaline": {
          id: "alkaline",
          name: "Zinc-MnO₂ (Alkaline)",
          type: "Primary",
          description: "Common household battery with good shelf life. Alkaline batteries are a type of primary battery dependent on the reaction between zinc and manganese dioxide.",
          chemistry: {
            anode: "Zinc powder",
            cathode: "Manganese Dioxide (MnO₂)",
            electrolyte: "Potassium Hydroxide (KOH)",
            reactions: "Zinc is oxidized at the anode, while manganese dioxide is reduced at the cathode."
          },
          performance: {
            energyDensity: "100-150 Wh/kg",
            powerDensity: "50 W/kg",
            voltage: "1.5V (nominal)",
            chargingRate: "Not rechargeable",
            dischargingRate: "Low to moderate current",
            lifespan: "Medium",
            efficiency: "80%"
          },
          applications: [
            "Household devices",
            "Remote controls",
            "Toys",
            "Flashlights",
            "Portable electronics"
          ],
          advantages: [
            "Better performance than zinc-carbon",
            "Good shelf life (5-7 years)",
            "Reliable performance",
            "Widely available",
            "Moderate leakage resistance"
          ],
          disadvantages: [
            "Not rechargeable",
            "Performance drops at high drain rates",
            "Environmental concerns with disposal",
            "More expensive than zinc-carbon",
            "Diminished performance at temperature extremes"
          ],
          construction: "Alkaline batteries have a steel can that contains the cathode mixture of manganese dioxide and carbon, separated from the anode gel of zinc powder by a separator. The alkaline electrolyte of potassium hydroxide is absorbed in the separator and anode gel."
        },
        "primary-lithium": {
          id: "primary-lithium",
          name: "Primary Lithium Battery",
          type: "Primary",
          description: "High energy density primary batteries with long shelf life, used in applications requiring long service life.",
          chemistry: {
            anode: "Lithium metal",
            cathode: "Various (MnO₂, SO₂, SOCl₂)",
            electrolyte: "Organic solvent with lithium salt",
            reactions: "Lithium metal is oxidized at the anode, releasing electrons."
          },
          performance: {
            energyDensity: "250-350 Wh/kg",
            powerDensity: "200 W/kg",
            voltage: "3.0-3.6V (nominal)",
            chargingRate: "Not rechargeable",
            dischargingRate: "Low to moderate current",
            lifespan: "Long (10+ years shelf life)",
            efficiency: "90%"
          },
          applications: [
            "Pacemakers and medical devices",
            "Military equipment",
            "Watches and calculators",
            "Memory backup",
            "Remote sensors"
          ],
          advantages: [
            "Very high energy density",
            "Extremely long shelf life",
            "Wide operating temperature range",
            "Higher voltage than other primary cells",
            "Lightweight"
          ],
          disadvantages: [
            "Not rechargeable",
            "Higher cost",
            "Safety concerns (lithium is reactive)",
            "Disposal issues",
            "Potential for venting or rupture if abused"
          ],
          construction: "Primary lithium batteries typically have a lithium metal anode, a metal oxide cathode, and a non-aqueous electrolyte. The exact construction varies by chemistry type (Li-MnO₂, Li-SOCl₂, etc.)."
        },
        "nickel-cadmium": {
          id: "nickel-cadmium",
          name: "Nickel-Cadmium Battery (NiCd)",
          type: "Secondary",
          description: "Robust rechargeable battery with memory effect, historically used in power tools and emergency equipment.",
          chemistry: {
            anode: "Cadmium",
            cathode: "Nickel oxyhydroxide",
            electrolyte: "Potassium hydroxide solution",
            reactions: "During discharge, cadmium is oxidized and nickel oxyhydroxide is reduced. This process is reversed during charging."
          },
          performance: {
            energyDensity: "45-80 Wh/kg",
            powerDensity: "150 W/kg",
            voltage: "1.2V (nominal)",
            chargingRate: "1C (standard)",
            dischargingRate: "1-10C (depending on design)",
            lifespan: "1500 cycles (Long)",
            efficiency: "70-90%"
          },
          applications: [
            "Power tools",
            "Emergency lighting",
            "Portable electronics (historical)",
            "Radio-controlled models",
            "Medical equipment"
          ],
          advantages: [
            "Robust and durable",
            "High discharge rates",
            "Good low-temperature performance",
            "Long cycle life if properly maintained",
            "Tolerant to overcharge and over-discharge"
          ],
          disadvantages: [
            "Memory effect",
            "Lower energy density than newer technologies",
            "Cadmium is toxic and environmentally hazardous",
            "High self-discharge rate",
            "Being phased out due to environmental regulations"
          ],
          construction: "NiCd batteries contain a nickel hydroxide positive electrode plate, a cadmium negative electrode plate, a separator, and an alkaline electrolyte. Cells are typically sealed with a safety vent."
        },
        "nickel-metal-hydride": {
          id: "nickel-metal-hydride",
          name: "Nickel-Metal Hydride Battery (NiMH)",
          type: "Secondary",
          description: "Higher capacity than NiCd, less memory effect. Common in hybrid vehicles and consumer electronics.",
          chemistry: {
            anode: "Hydrogen-absorbing alloy",
            cathode: "Nickel oxyhydroxide",
            electrolyte: "Potassium hydroxide solution",
            reactions: "During discharge, hydrogen stored in the metal alloy is released and oxidized, while nickel oxyhydroxide is reduced to nickel hydroxide."
          },
          performance: {
            energyDensity: "60-120 Wh/kg",
            powerDensity: "250 W/kg",
            voltage: "1.2V (nominal)",
            chargingRate: "0.5-1C (standard)",
            dischargingRate: "1C (continuous)",
            lifespan: "500-1000 cycles (Medium)",
            efficiency: "65%"
          },
          applications: [
            "Hybrid vehicles",
            "Digital cameras",
            "Wireless controllers",
            "Consumer electronics",
            "Medical devices"
          ],
          advantages: [
            "Higher energy density than NiCd",
            "Less prone to memory effect",
            "Environmentally friendlier than NiCd",
            "Cost-effective for consumer applications",
            "Robust and reliable"
          ],
          disadvantages: [
            "Higher self-discharge than NiCd",
            "Reduced performance at high temperatures",
            "More complex charging than NiCd",
            "Hydrogen outgassing if overcharged",
            "Limited cycle life if deeply discharged"
          ],
          construction: "NiMH batteries contain a nickel hydroxide positive electrode, a hydrogen-absorbing alloy negative electrode, a separator, and an alkaline electrolyte. The cells are typically sealed with a safety vent."
        },
        "alkaline-fuel-cell": {
          id: "alkaline-fuel-cell",
          name: "Alkaline Fuel Cell",
          type: "Fuel Cell",
          description: "Used in space applications, high efficiency fuel cell operating at relatively low temperatures.",
          chemistry: {
            anode: "Platinum or nickel-based catalyst",
            cathode: "Platinum or silver-based catalyst",
            electrolyte: "Potassium hydroxide (KOH) solution",
            reactions: "Hydrogen oxidation at the anode releases electrons; oxygen reduction at the cathode consumes electrons and produces hydroxide ions."
          },
          performance: {
            energyDensity: "Depends on fuel storage",
            powerDensity: "100-200 W/kg",
            voltage: "0.9V (per cell, under load)",
            chargingRate: "Not applicable",
            dischargingRate: "Continuous as long as fuel is supplied",
            lifespan: "Long (10,000+ hours)",
            efficiency: "60-70%"
          },
          applications: [
            "Space missions (Apollo, Space Shuttle)",
            "Military applications",
            "Backup power systems",
            "Portable power generation",
            "Specialized industrial applications"
          ],
          advantages: [
            "High electrical efficiency",
            "Low operating temperature (60-90°C)",
            "Quick startup",
            "Simple construction",
            "Produces potable water as byproduct"
          ],
          disadvantages: [
            "Sensitive to CO₂ (requires pure hydrogen and oxygen)",
            "Electrolyte management issues",
            "Less durable than newer fuel cell technologies",
            "Corrosion concerns with the alkaline electrolyte",
            "Limited commercial applications"
          ],
          construction: "Alkaline fuel cells consist of two electrodes separated by a porous matrix saturated with an alkaline electrolyte. The electrodes typically contain precious metal catalysts, and the entire assembly is housed in a conductive frame."
        },
        "molten-carbonate-fuel-cell": {
          id: "molten-carbonate-fuel-cell",
          name: "Molten Carbonate Fuel Cell",
          type: "Fuel Cell",
          description: "High temperature fuel cell suitable for stationary power generation applications.",
          chemistry: {
            anode: "Nickel-based alloy",
            cathode: "Nickel oxide",
            electrolyte: "Molten lithium-potassium carbonate salt",
            reactions: "At the anode, hydrogen and carbon monoxide react with carbonate ions to produce water, carbon dioxide, and electrons. At the cathode, oxygen and carbon dioxide react with electrons to form carbonate ions."
          },
          performance: {
            energyDensity: "Depends on fuel storage",
            powerDensity: "100-200 W/kg",
            voltage: "0.7-0.8V (per cell, under load)",
            chargingRate: "Not applicable",
            dischargingRate: "Continuous as long as fuel is supplied",
            lifespan: "Long (40,000+ hours)",
            efficiency: "50-60%"
          },
          applications: [
            "Industrial power generation",
            "Utility power stations",
            "Combined heat and power systems",
            "Distributed generation",
            "Natural gas conversion"
          ],
          advantages: [
            "Fuel flexibility (can use natural gas, biogas, etc.)",
            "High efficiency in combined heat and power",
            "No need for expensive catalysts",
            "Suitable for carbon capture",
            "Internal reforming capability"
          ],
          disadvantages: [
            "Very high operating temperature (650°C)",
            "Long startup time",
            "Corrosion issues",
            "Electrolyte degradation",
            "Not suitable for mobile or small applications"
          ],
          construction: "Molten carbonate fuel cells consist of two electrodes separated by a porous ceramic matrix saturated with molten carbonate electrolyte. The entire assembly is maintained at high temperature and is housed in appropriate insulating materials."
        },
        "solid-oxide-fuel-cell": {
          id: "solid-oxide-fuel-cell",
          name: "Solid Oxide Fuel Cell",
          type: "Fuel Cell",
          description: "Very high temperature, high efficiency fuel cell using a solid ceramic electrolyte.",
          chemistry: {
            anode: "Nickel-YSZ cermet",
            cathode: "Strontium-doped lanthanum manganite",
            electrolyte: "Yttria-stabilized zirconia (YSZ)",
            reactions: "At the anode, fuel is oxidized, releasing electrons. At the cathode, oxygen is reduced, consuming electrons. Oxygen ions are transported through the solid electrolyte."
          },
          performance: {
            energyDensity: "Depends on fuel storage",
            powerDensity: "250-350 W/kg",
            voltage: "0.8-1.0V (per cell, under load)",
            chargingRate: "Not applicable",
            dischargingRate: "Continuous as long as fuel is supplied",
            lifespan: "Long (20,000-90,000 hours)",
            efficiency: "60-65%"
          },
          applications: [
            "Stationary power generation",
            "Combined heat and power",
            "Auxiliary power units",
            "Military applications",
            "Remote power generation"
          ],
          advantages: [
            "Highest electrical efficiency of fuel cells",
            "Fuel flexibility (hydrogen, natural gas, biofuels)",
            "No liquid electrolyte issues",
            "No need for precious metal catalysts",
            "Excellent long-term stability"
          ],
          disadvantages: [
            "Extremely high operating temperature (700-1000°C)",
            "Long startup time",
            "Ceramic components are fragile",
            "Thermal cycling can cause mechanical stress",
            "Sophisticated thermal management required"
          ],
          construction: "Solid oxide fuel cells consist of a solid ceramic electrolyte layer sandwiched between porous ceramic-based electrodes. The entire assembly is maintained at high temperature and requires appropriate insulation and interconnects."
        }
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
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        title={accessibleTitle} // Always provide a title prop to DialogContent
      >
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