import BatteryGrid from "@/components/battery-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Battery Explorer | BatteryTech Explorer",
  description: "Explore different types of batteries and their characteristics",
}

export default function ExplorerPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Battery Explorer</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Discover the diverse world of battery technologies. Click on any battery type to learn more about its
            construction, chemistry, applications, and performance characteristics.
          </p>
        </div>
      </section>

      <section className="py-12 container">
        <BatteryGrid />
      </section>
    </main>
  )
}
