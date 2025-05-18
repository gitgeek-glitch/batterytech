import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Shield, Zap, Recycle, Info } from "lucide-react"
import SafetyInfoGraphic from "@/components/safety-infographic"

export const metadata: Metadata = {
  title: "Battery Safety & BMS | BatteryTech Explorer",
  description: "Learn about battery management systems and safety protocols",
}

export default function SafetyPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Battery Safety & Management</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Understanding battery safety and management systems is crucial for the safe and efficient operation of
            battery technologies. Learn about hazards, best practices, and the role of Battery Management Systems (BMS).
          </p>
        </div>
      </section>

      <section className="py-12 container">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bms">Battery Management Systems</TabsTrigger>
            <TabsTrigger value="hazards">Lithium-ion Hazards</TabsTrigger>
            <TabsTrigger value="practices">Best Practices</TabsTrigger>
            <TabsTrigger value="disposal">Safe Disposal</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Battery Safety Fundamentals</h2>
                <p className="mb-4 text-muted-foreground">
                  Battery safety encompasses the practices, protocols, and systems designed to prevent hazards
                  associated with battery operation, storage, and disposal. As battery technologies advance and become
                  more prevalent in our daily lives, understanding safety considerations becomes increasingly important.
                </p>

                <Alert className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Important Safety Notice</AlertTitle>
                  <AlertDescription>
                    Always follow manufacturer guidelines for your specific battery type. Improper handling, charging,
                    or storage can lead to serious safety hazards including fire, explosion, or chemical exposure.
                  </AlertDescription>
                </Alert>

                <p className="text-muted-foreground">
                  Different battery chemistries present different safety challenges. While alkaline batteries are
                  generally safe for consumer use, lithium-ion batteries require more careful handling due to their
                  higher energy density and potential for thermal runaway.
                </p>
              </div>

              <SafetyInfoGraphic />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card>
                <CardHeader className="pb-2">
                  <Shield className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Battery Management Systems</CardTitle>
                  <CardDescription>Electronic systems that monitor and protect batteries</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    BMS technology monitors temperature, voltage, and current to prevent unsafe operating conditions and
                    extend battery life through balanced charging and discharging.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <Zap className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Lithium-ion Hazards</CardTitle>
                  <CardDescription>Understanding potential risks of high-energy batteries</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Thermal runaway, short circuits, and physical damage can lead to fire or explosion. Modern designs
                    include multiple safety features to mitigate these risks.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <Recycle className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Safe Disposal</CardTitle>
                  <CardDescription>Proper end-of-life handling for different battery types</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Many batteries contain hazardous materials that require special disposal procedures. Recycling
                    programs help recover valuable materials and prevent environmental contamination.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bms" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Battery Management Systems (BMS)</h2>
                <p className="mb-6 text-muted-foreground">
                  A Battery Management System (BMS) is an electronic system that manages a rechargeable battery pack.
                  Its primary function is to protect the battery from operating outside its safe operating area, monitor
                  its state, calculate secondary data, report that data, control its environment, authenticate it, and
                  balance it.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Key Functions of a BMS</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Info className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Cell Monitoring:</span> Tracks voltage, current, and temperature
                          of individual cells
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Info className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Cell Balancing:</span> Ensures all cells in a pack maintain
                          similar charge levels
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Info className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">State Estimation:</span> Calculates State of Charge (SoC) and
                          State of Health (SoH)
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Info className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Thermal Management:</span> Controls cooling or heating systems
                          to maintain optimal temperature
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Info className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Protection:</span> Prevents overcharge, overdischarge,
                          overcurrent, and overtemperature
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Info className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Communication:</span> Interfaces with external systems and
                          provides diagnostic information
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">BMS Architecture</h3>
                    <p className="mb-4 text-muted-foreground">
                      BMS architectures vary depending on the application, but typically include:
                    </p>
                    <ul className="space-y-4">
                      <li>
                        <h4 className="font-medium">Centralized BMS</h4>
                        <p className="text-sm text-muted-foreground">
                          A single controller manages all cells. Simple but limited in scalability.
                        </p>
                      </li>
                      <li>
                        <h4 className="font-medium">Distributed BMS</h4>
                        <p className="text-sm text-muted-foreground">
                          Multiple controllers work together, each managing a subset of cells. More complex but highly
                          scalable.
                        </p>
                      </li>
                      <li>
                        <h4 className="font-medium">Modular BMS</h4>
                        <p className="text-sm text-muted-foreground">
                          Combines aspects of both centralized and distributed approaches. Offers flexibility and
                          redundancy.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">BMS in Different Applications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Electric Vehicles</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">
                          EV battery packs contain thousands of cells requiring sophisticated BMS for safety, range
                          estimation, and thermal management during fast charging and high-power discharge.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Grid Storage</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">
                          Large-scale energy storage systems use BMS to manage megawatt-hour battery arrays, optimizing
                          for longevity, efficiency, and grid integration.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Consumer Electronics</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">
                          Smartphones and laptops use compact BMS integrated circuits that balance performance, battery
                          life, and safety in space-constrained designs.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hazards" className="mt-0">
            {/* Content for Lithium-ion Hazards tab */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Lithium-ion Battery Hazards</h2>
                <p className="mb-6 text-muted-foreground">
                  Lithium-ion batteries have revolutionized portable electronics and electric vehicles due to their high
                  energy density. However, this same characteristic also presents unique safety challenges that must be
                  understood and managed.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Primary Hazards</h3>

                    <div className="space-y-4">
                      <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-lg p-4">
                        <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Thermal Runaway</h4>
                        <p className="text-sm text-red-700 dark:text-red-400">
                          A self-reinforcing, exothermic reaction where rising temperature triggers further reactions,
                          releasing more heat. This can lead to cell rupture, fire, or explosion. Once initiated,
                          thermal runaway is difficult to stop.
                        </p>
                      </div>

                      <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-lg p-4">
                        <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Internal Short Circuit</h4>
                        <p className="text-sm text-red-700 dark:text-red-400">
                          Can occur due to manufacturing defects, physical damage, or dendrite formation. Results in
                          rapid discharge, heating, and potential thermal runaway.
                        </p>
                      </div>

                      <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-lg p-4">
                        <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Overcharging</h4>
                        <p className="text-sm text-red-700 dark:text-red-400">
                          Pushing voltage beyond safe limits can cause lithium plating, gas generation, and electrolyte
                          decomposition, potentially leading to cell rupture or thermal runaway.
                        </p>
                      </div>

                      <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-lg p-4">
                        <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Physical Damage</h4>
                        <p className="text-sm text-red-700 dark:text-red-400">
                          Puncture, crushing, or severe impact can damage internal separators, leading to internal short
                          circuits and thermal events.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Safety Mechanisms</h3>

                    <div className="space-y-4">
                      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Separator Shutdown</h4>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          Specialized separators that melt and close their pores at high temperatures, stopping ion flow
                          and preventing further reactions.
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Pressure Relief Vents</h4>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          Allow controlled release of gas pressure during abnormal conditions, preventing explosive
                          rupture.
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">
                          Current Interrupt Device (CID)
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          Physically breaks the electrical connection when pressure builds up inside the cell.
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">
                          Positive Temperature Coefficient (PTC) Device
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          Increases resistance at high temperatures or currents, limiting power and heat generation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Case Studies: Learning from Incidents</h3>

                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-4">
                      <h4 className="font-medium mb-2">Consumer Electronics Recalls</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Several major smartphone and laptop manufacturers have issued recalls due to battery safety
                        issues. These incidents typically involved manufacturing defects that led to internal short
                        circuits.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Key Lessons:</span> Importance of quality control, early detection
                        systems, and rapid response protocols.
                      </p>
                    </div>

                    <div className="bg-muted rounded-lg p-4">
                      <h4 className="font-medium mb-2">Electric Vehicle Battery Fires</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        While rare compared to conventional vehicle fires, EV battery fires present unique challenges
                        due to their high energy content and potential for reignition.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Key Lessons:</span> Need for specialized firefighting techniques,
                        robust thermal management systems, and improved cell-to-cell isolation to prevent propagation.
                      </p>
                    </div>

                    <div className="bg-muted rounded-lg p-4">
                      <h4 className="font-medium mb-2">Grid Storage Facility Incidents</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Large-scale battery energy storage systems have experienced thermal events that highlighted the
                        importance of system-level safety design beyond individual cell protection.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Key Lessons:</span> Critical role of fire detection, suppression
                        systems, thermal barriers between modules, and emergency response planning.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practices" className="mt-0">
            {/* Content for Best Practices tab */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Best Storage and Handling Practices</h2>
                <p className="mb-6 text-muted-foreground">
                  Proper storage and handling of batteries is essential for safety and maximizing battery life.
                  Different battery chemistries have specific requirements, but some general best practices apply across
                  most battery types.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Storage Guidelines</h3>

                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Temperature Control</h4>
                        <p className="text-sm text-muted-foreground">
                          Store batteries in cool, dry environments (typically 15-25°C or 59-77°F). Avoid extreme
                          temperatures, direct sunlight, and rapid temperature changes.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">State of Charge</h4>
                        <p className="text-sm text-muted-foreground">
                          For long-term storage of rechargeable batteries, maintain a partial charge (typically 40-60%
                          for lithium-ion). Avoid storing fully charged or fully discharged.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Physical Protection</h4>
                        <p className="text-sm text-muted-foreground">
                          Store in original packaging or use battery cases. Prevent contact between terminals and
                          conductive materials. Avoid stacking heavy items on batteries.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Segregation</h4>
                        <p className="text-sm text-muted-foreground">
                          Store different battery chemistries separately. Keep new and used batteries apart. Maintain
                          distance from flammable materials and heat sources.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Handling Guidelines</h3>

                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Inspection</h4>
                        <p className="text-sm text-muted-foreground">
                          Regularly check batteries for signs of damage, leakage, corrosion, bulging, or discoloration.
                          Never use damaged batteries.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Charging</h4>
                        <p className="text-sm text-muted-foreground">
                          Use only manufacturer-approved chargers. Avoid overcharging or charging at extreme
                          temperatures. Don't leave charging batteries unattended for extended periods.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Physical Handling</h4>
                        <p className="text-sm text-muted-foreground">
                          Avoid dropping, crushing, puncturing, or disassembling batteries. Don't expose to water or
                          other liquids unless specifically designed to be waterproof.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Transport</h4>
                        <p className="text-sm text-muted-foreground">
                          Follow transportation regulations for shipping batteries. Use appropriate packaging that
                          prevents short circuits and physical damage during transit.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Chemistry-Specific Considerations</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Placeholder for chemistry-specific considerations */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disposal" className="mt-0">
            {/* Content for Safe Disposal tab */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Safe Disposal of Batteries</h2>
                <p className="mb-6 text-muted-foreground">
                  Proper disposal of batteries is crucial to prevent environmental contamination and ensure the safe
                  recycling of valuable materials. Different battery types have specific disposal methods.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Disposal Methods</h3>

                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Recycling</h4>
                        <p className="text-sm text-muted-foreground">
                          Many batteries can be recycled to recover valuable materials like lithium, cobalt, and nickel.
                          Check local recycling programs for proper disposal.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Landfill</h4>
                        <p className="text-sm text-muted-foreground">
                          Batteries containing hazardous materials should not be disposed of in landfills. Follow local
                          regulations and guidelines for proper disposal.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Incineration</h4>
                        <p className="text-sm text-muted-foreground">
                          Incineration can be used as a last resort for battery disposal, but it should be done in
                          specialized facilities to prevent the release of harmful chemicals.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Disposal Regulations</h3>

                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Local Regulations</h4>
                        <p className="text-sm text-muted-foreground">
                          Follow local laws and regulations regarding battery disposal. Different regions may have
                          specific requirements for handling hazardous waste.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">International Standards</h4>
                        <p className="text-sm text-muted-foreground">
                          Adhere to international standards and guidelines for battery disposal to ensure compliance and
                          safety across borders.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}
