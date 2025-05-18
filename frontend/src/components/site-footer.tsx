import Link from "next/link"
import { Battery } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <Battery className="h-5 w-5 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} BatteryTech Explorer. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
          <Link href="/explorer" className="text-sm text-muted-foreground hover:text-foreground">
            Battery Explorer
          </Link>
          <Link href="/compare" className="text-sm text-muted-foreground hover:text-foreground">
            Comparison Tool
          </Link>
          <Link href="/timeline" className="text-sm text-muted-foreground hover:text-foreground">
            Timeline
          </Link>
          <Link href="/safety" className="text-sm text-muted-foreground hover:text-foreground">
            Safety & BMS
          </Link>
          <Link href="/quiz" className="text-sm text-muted-foreground hover:text-foreground">
            Quiz
          </Link>
        </div>
      </div>
    </footer>
  )
}
