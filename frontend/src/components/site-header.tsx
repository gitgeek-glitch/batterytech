import type React from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Battery, Clock, LineChart, Menu, ShieldCheck, BookOpen } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 mr-6">
            <Battery className="h-6 w-6 text-primary" />
            <span className="font-bold">BatteryTech Explorer</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                          href="/explorer"
                        >
                          <Battery className="h-6 w-6 text-primary" />
                          <div className="mb-2 mt-4 text-lg font-medium">Battery Explorer</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Discover all types of batteries and their characteristics
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/timeline" title="Timeline" icon={<Clock className="h-4 w-4" />}>
                      Explore the evolution of battery technology
                    </ListItem>
                    <ListItem href="/compare" title="Comparison Tool" icon={<LineChart className="h-4 w-4" />}>
                      Compare different battery technologies
                    </ListItem>
                    <ListItem href="/safety" title="Safety & BMS" icon={<ShieldCheck className="h-4 w-4" />}>
                      Learn about battery management and safety
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/quiz" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Quiz
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 py-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  Home
                </Link>
                <Link
                  href="/explorer"
                  className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  <Battery className="h-4 w-4" />
                  <span>Battery Explorer</span>
                </Link>
                <Link
                  href="/compare"
                  className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  <LineChart className="h-4 w-4" />
                  <span>Comparison Tool</span>
                </Link>
                <Link
                  href="/timeline"
                  className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  <Clock className="h-4 w-4" />
                  <span>Timeline</span>
                </Link>
                <Link
                  href="/safety"
                  className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Safety & BMS</span>
                </Link>
                <Link
                  href="/quiz"
                  className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Quiz</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

interface ListItemProps {
  href: string
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
}

function ListItem({ href, title, children, icon }: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="flex items-center space-x-2">
            {icon}
            <span className="text-sm font-medium leading-none">{title}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}
