import Link from "next/link"
import { Button } from "@/components/ui/button"
import HeroAnimation from "@/components/hero-animation"
import FeatureCard from "@/components/feature-card"
import { Battery, Zap, LineChart, ShieldCheck, Clock } from "lucide-react"

export default function Home() {
  const features = [
    {
      title: "Battery Explorer",
      description: "Discover all types of batteries from primary to secondary",
      icon: <Battery className="h-10 w-10 text-primary" />,
      link: "/explorer",
    },
    {
      title: "Interactive Comparisons",
      description: "Compare different battery technologies side by side",
      icon: <LineChart className="h-10 w-10 text-primary" />,
      link: "/compare",
    },
    {
      title: "Safety & BMS",
      description: "Learn about battery management systems and safety protocols",
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      link: "/safety",
    },
    {
      title: "Battery Evolution",
      description: "Explore the timeline of battery technology development",
      icon: <Clock className="h-10 w-10 text-primary" />,
      link: "/timeline",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-24 md:py-32 px-4">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/5 to-background" />
        <div className="container relative z-10 flex flex-col items-center text-center">
          <HeroAnimation />
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight md:text-6xl">
            Explore the Future of Energy
            <span className="block text-primary">Battery by Battery</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Discover the science, technology, and applications of modern battery systems through interactive learning
            and visualization.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/explorer">Start Exploring</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/quiz">Test Your Knowledge</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                link={feature.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Course Overview Section */}
      <section className="py-16 px-4">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Course Overview</h2>
              <p className="text-muted-foreground mb-4">
                Energy markets are undergoing game-changing transformations in the modern world. Batteries power our
                daily lives - from mobile phones and electric cars to solar energy storage systems.
              </p>
              <p className="text-muted-foreground mb-6">
                This comprehensive course covers the fundamentals of batteries, classifications, performance
                characteristics, and the chemistry of both primary and secondary batteries.
              </p>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-primary mr-2" />
                  <span>Fundamentals of batteries and classifications</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-primary mr-2" />
                  <span>Primary and secondary battery technologies</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-primary mr-2" />
                  <span>Fuel cells and their applications</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-primary mr-2" />
                  <span>Battery safety and management systems</span>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Course Units</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium">Unit 1: Fundamentals of Batteries</h4>
                  <p className="text-sm text-muted-foreground">Introduction, classifications, characteristics</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium">Unit 2: Primary Batteries</h4>
                  <p className="text-sm text-muted-foreground">Zinc-air, Zinc-carbon, Zinc-MnO₂, Primary Lithium</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium">Unit 3: Secondary Batteries</h4>
                  <p className="text-sm text-muted-foreground">Lead-acid, NiCd, NiMH, Lithium-ion</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium">Unit 4: Fuel Cells</h4>
                  <p className="text-sm text-muted-foreground">PEM, Alkaline, Molten Carbonate, Solid Oxide</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-medium">Unit 5: Battery Safety</h4>
                  <p className="text-sm text-muted-foreground">BMS, Lithium-ion hazards, Safe disposal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
