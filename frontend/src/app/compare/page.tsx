import type { Metadata } from "next"
import BatteryComparisonTool from "@/components/battery-comparison-tool"

export const metadata: Metadata = {
  title: "Battery Comparison | BatteryTech Explorer",
  description: "Compare different battery technologies side by side",
}

export default function ComparePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Battery Comparison Tool</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Select up to three battery types to compare their key performance metrics, applications, advantages, and
            disadvantages side by side.
          </p>
        </div>
      </section>

      <section className="py-12 container">
        <BatteryComparisonTool />
      </section>
    </main>
  )
}
