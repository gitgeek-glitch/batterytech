import type { Metadata } from "next"
import BatteryTimeline from "@/components/battery-timeline"

export const metadata: Metadata = {
  title: "Battery Evolution Timeline | BatteryTech Explorer",
  description: "Explore the history and evolution of battery technologies",
}

export default function TimelinePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Battery Evolution Timeline</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Discover the fascinating history of battery technology, from the early Voltaic pile to modern lithium-ion
            batteries and beyond. Explore key innovations and breakthroughs that have shaped energy storage throughout
            the centuries.
          </p>
        </div>
      </section>

      <section className="py-12 container">
        <BatteryTimeline />
      </section>
    </main>
  )
}
