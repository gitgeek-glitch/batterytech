"use client"

import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  link: string
}

export default function FeatureCard({ title, description, icon, link }: FeatureCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full">
        <CardContent className="pt-6">
          <div className="mb-4 flex justify-center">{icon}</div>
          <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
          <p className="text-center text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href={link} className="group">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
