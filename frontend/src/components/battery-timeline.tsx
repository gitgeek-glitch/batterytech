"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

type TimelineEvent = {
  year: number
  title: string
  description: string
  image: string
  key: string
}

export default function BatteryTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)

  const timelineEvents: TimelineEvent[] = [
    {
      year: 1800,
      title: "Voltaic Pile",
      description:
        "Alessandro Volta invented the first true battery, the Voltaic Pile, consisting of alternating discs of zinc and copper with brine-soaked cloth between them. This discovery proved that electricity could be generated chemically and debunked the prevailing theory that electricity was generated solely by living beings.",
      image: "/images/voltaic-pile.png",
      key: "voltaic-pile",
    },
    {
      year: 1836,
      title: "Daniell Cell",
      description:
        "John Frederic Daniell developed an improved battery with copper and zinc plates in separate electrolyte solutions. The Daniell Cell provided a more reliable and steady source of current than the Voltaic Pile and was widely used to power telegraphs.",
      image: "/images/daniell-cell.png",
      key: "daniell-cell",
    },
    {
      year: 1859,
      title: "Lead-Acid Battery",
      description:
        "Gaston Planté invented the first rechargeable battery based on lead-acid chemistry. This technology is still used in car batteries today and was the first practical storage battery that could be recharged by passing a reverse current through it.",
      image: "/images/lead-acid-battery.png",
      key: "lead-acid",
    },
    {
      year: 1899,
      title: "Nickel-Cadmium Battery",
      description:
        "Waldemar Jungner invented the nickel-cadmium (NiCd) battery, which used nickel oxide hydroxide and metallic cadmium as electrodes. NiCd batteries offered better energy density and longer life than lead-acid batteries.",
      image: "/images/nicad-battery.png",
      key: "nicad",
    },
    {
      year: 1912,
      title: "Alkaline Battery Concept",
      description:
        "Thomas Edison developed the alkaline storage battery using iron and nickel electrodes. This design improved on previous batteries with longer life and higher energy density, though it wasn't until the 1950s that modern alkaline batteries became commercially successful.",
      image: "/images/alkaline-battery.png",
      key: "alkaline",
    },
    {
      year: 1955,
      title: "First Fuel Cell Practical Application",
      description:
        "General Electric produced the first practical fuel cell systems. While fuel cells were invented in 1839 by William Grove, it wasn't until the mid-20th century that they became practical power sources, first used in NASA's space programs.",
      image: "/images/fuel-cell.png",
      key: "fuel-cell",
    },
    {
      year: 1970,
      title: "Lithium Battery Development",
      description:
        "The first non-rechargeable lithium batteries were commercially available. These batteries used lithium metal as an anode and had very high energy density, but safety concerns limited their applications.",
      image: "/images/lithium-battery.png",
      key: "lithium",
    },
    {
      year: 1991,
      title: "Commercial Lithium-Ion Battery",
      description:
        "Sony and Asahi Kasei released the first commercial lithium-ion battery. This revolutionary technology offered higher energy density, no memory effect, and slower loss of charge when not in use. It quickly became the standard for portable electronics.",
      image: "/images/lithium-ion-battery.png",
      key: "lithium-ion",
    },
    {
      year: 2008,
      title: "Tesla Roadster",
      description:
        "Tesla released the Roadster, the first production automobile to use lithium-ion battery cells and the first production electric vehicle with a range greater than 200 miles per charge. This marked a turning point in the adoption of electric vehicles.",
      image: "/images/tesla-roadster.png",
      key: "tesla",
    },
    {
      year: 2017,
      title: "World's Largest Battery Storage",
      description:
        "Tesla completed installation of the world's largest lithium-ion battery storage facility in South Australia. With a capacity of 100 MW/129 MWh, it demonstrated the viability of large-scale battery storage for grid stabilization.",
      image: "/images/grid-battery-storage.png",
      key: "grid-storage",
    },
    {
      year: 2019,
      title: "Nobel Prize for Lithium-Ion",
      description:
        "John B. Goodenough, M. Stanley Whittingham, and Akira Yoshino were awarded the Nobel Prize in Chemistry for their work developing lithium-ion batteries, recognizing the revolutionary impact of this technology on society.",
      image: "/images/nobel-prize-lithium.png",
      key: "nobel",
    },
    {
      year: 2023,
      title: "Solid-State Battery Advances",
      description:
        "Major breakthroughs in solid-state battery technology, with several companies announcing pilot production. Solid-state batteries promise higher energy density, faster charging, longer lifespan, and improved safety compared to conventional lithium-ion batteries.",
      image: "/images/solid-state-battery.png",
      key: "solid-state",
    },
  ]

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev < timelineEvents.length - 1 ? prev + 1 : prev))
  }

  const handleDotClick = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={activeIndex === 0}
            className="rounded-full bg-background/80 backdrop-blur-sm"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous</span>
          </Button>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={activeIndex === timelineEvents.length - 1}
            className="rounded-full bg-background/80 backdrop-blur-sm"
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next</span>
          </Button>
        </div>

        <div className="overflow-hidden px-12">
          <motion.div
            animate={{ x: `calc(-${activeIndex * 100}%)` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ display: "flex" }}
          >
            {timelineEvents.map((event, index) => (
              <Card key={event.key} className="min-w-full p-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        {event.year}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                      <p className="text-muted-foreground">{event.description}</p>
                    </div>
                    <div className="bg-muted flex items-center justify-center p-6 min-h-[250px] md:min-h-[300px]">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="max-w-full max-h-[200px] md:max-h-[250px] object-contain rounded-md shadow-md"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement
                          target.src = `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(event.title)}`
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Dots for mobile navigation */}
      <div className="flex justify-center space-x-2 md:hidden">
        {timelineEvents.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === activeIndex ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Timeline bar for larger screens */}
      <div className="mt-12 hidden md:block">
        <div className="relative">
          <div className="absolute h-1 bg-muted top-5 left-0 right-0 z-0"></div>
          <div
            className="absolute h-1 bg-primary top-5 left-0 z-0 transition-all duration-300"
            style={{ width: `${(activeIndex / (timelineEvents.length - 1)) * 100}%` }}
          ></div>

          <div className="flex justify-between relative z-10">
            {timelineEvents.map((event, index) => (
              <button
                key={event.key}
                className={`flex flex-col items-center cursor-pointer group ${
                  index <= activeIndex ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => handleDotClick(index)}
              >
                <div
                  className={`w-3 h-3 rounded-full mb-2 transition-colors ${
                    index <= activeIndex ? "bg-primary" : "bg-muted"
                  }`}
                ></div>
                <span className="text-xs font-medium transform -rotate-45 origin-top-left translate-y-2 group-hover:text-foreground transition-colors">
                  {event.year}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Simplified timeline for mobile */}
      <div className="mt-6 md:hidden">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{timelineEvents[0].year}</span>
          <div className="h-1 flex-1 mx-2 bg-muted relative">
            <div
              className="absolute h-1 bg-primary left-0 top-0 transition-all duration-300"
              style={{ width: `${(activeIndex / (timelineEvents.length - 1)) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">{timelineEvents[timelineEvents.length - 1].year}</span>
        </div>
      </div>
    </div>
  )
}
