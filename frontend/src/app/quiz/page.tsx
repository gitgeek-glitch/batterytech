import type { Metadata } from "next"
import BatteryQuiz from "@/components/battery-quiz"

export const metadata: Metadata = {
  title: "Battery Knowledge Quiz | BatteryTech Explorer",
  description: "Test your knowledge of battery technologies with our interactive quiz",
}

export default function QuizPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Battery Knowledge Quiz</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Test your understanding of battery technologies with our interactive quiz. Challenge yourself with questions
            covering battery fundamentals, chemistry, applications, and safety.
          </p>
        </div>
      </section>

      <section className="py-12 container">
        <BatteryQuiz />
      </section>
    </main>
  )
}
