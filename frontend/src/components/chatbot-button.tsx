"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetDescription 
} from "@/components/ui/sheet"
import Chatbot from "@/components/chatbot"

export default function ChatbotButton() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="default" className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50">
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open battery assistant</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="text-lg">BatteryTech Assistant</SheetTitle>
          <SheetDescription className="sr-only">
            Chat with the BatteryTech Assistant about battery technology
          </SheetDescription>
        </SheetHeader>
        <Chatbot />
      </SheetContent>
    </Sheet>
  )
}