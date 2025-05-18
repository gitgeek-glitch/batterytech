// This file contains the battery data for the API

const batteries = [
  {
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
      energyDensity: 200, // Wh/kg
      powerDensity: 340, // W/kg
      voltage: 3.7, // V
      lifespan: 1000, // cycles
      chargingTime: 2, // hours
      dischargingRate: 1, // C
      efficiency: 85, // %
      selfDischarge: 5, // % per month
      operatingTemperature: [-20, 60], // °C
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
  {
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
      energyDensity: 40, // Wh/kg
      powerDensity: 180, // W/kg
      voltage: 2.1, // V
      lifespan: 300, // cycles
      chargingTime: 8, // hours
      dischargingRate: 0.2, // C
      efficiency: 75, // %
      selfDischarge: 3, // % per month
      operatingTemperature: [-20, 50], // °C
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
  // Add more battery data as needed
  {
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
      energyDensity: 65, // Wh/kg
      powerDensity: 30, // W/kg
      voltage: 1.5, // V
      lifespan: 0, // Not applicable for primary batteries
      chargingTime: 0, // Not applicable for primary batteries
      dischargingRate: 0.1, // C
      efficiency: 75, // %
      selfDischarge: 6, // % per year
      operatingTemperature: [0, 45], // °C
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
  {
    id: "pem-fuel-cell",
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
      energyDensity: 500, // Wh/kg (system level, depends on hydrogen storage)
      powerDensity: 300, // W/kg
      voltage: 0.7, // V (per cell, under load)
      lifespan: 5000, // hours
      chargingTime: 0.1, // hours (refueling time)
      dischargingRate: 1, // Continuous as long as fuel is supplied
      efficiency: 50, // %
      selfDischarge: 0, // No self-discharge
      operatingTemperature: [50, 100], // °C
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
]

export default batteries
