"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Trophy, ArrowRight, RotateCcw } from "lucide-react"

type Question = {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
  unit: number
}

type QuizState = "start" | "question" | "result"

export default function BatteryQuiz() {
  const [quizState, setQuizState] = useState<QuizState>("start")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [selectedUnit, setSelectedUnit] = useState(1)

  const quizQuestions: Question[] = [
    // Unit 1: Fundamentals of Batteries
    {
      id: "q1",
      text: "Which of the following is NOT a characteristic used to evaluate battery performance?",
      options: ["Energy density", "Power density", "Magnetic field strength", "Cycle life"],
      correctAnswer: 2,
      explanation:
        "Magnetic field strength is not a characteristic used to evaluate battery performance. The key performance metrics include energy density (Wh/kg), power density (W/kg), cycle life, self-discharge rate, and operating temperature range.",
      unit: 1,
    },
    {
      id: "q2",
      text: "According to Ohm's law, what is the relationship between voltage (V), current (I), and resistance (R)?",
      options: ["V = I × R", "V = I / R", "V = I + R", "V = I - R"],
      correctAnswer: 0,
      explanation:
        "Ohm's law states that the voltage (V) across a conductor is directly proportional to the current (I) flowing through it, with the constant of proportionality being the resistance (R). The formula is V = I × R.",
      unit: 1,
    },
    {
      id: "q3",
      text: "What is the difference between a battery cell and a battery module?",
      options: [
        "They are different names for the same thing",
        "A cell is rechargeable while a module is not",
        "A cell is a single electrochemical unit while a module is a collection of cells",
        "A module is smaller than a cell",
      ],
      correctAnswer: 2,
      explanation:
        "A battery cell is a single electrochemical unit consisting of an anode, cathode, electrolyte, and separator. A battery module is a collection of cells connected together (in series, parallel, or both) to provide the desired voltage and capacity.",
      unit: 1,
    },

    // Unit 2: Primary Batteries
    {
      id: "q4",
      text: "Which of the following is a primary battery?",
      options: ["Lithium-ion", "Lead-acid", "Alkaline", "Nickel-metal hydride"],
      correctAnswer: 2,
      explanation:
        "Alkaline batteries are primary (non-rechargeable) batteries. Lithium-ion, lead-acid, and nickel-metal hydride are all secondary (rechargeable) batteries.",
      unit: 2,
    },
    {
      id: "q5",
      text: "What is the main advantage of zinc-air batteries?",
      options: [
        "They can be recharged thousands of times",
        "They have very high energy density",
        "They operate well in extreme cold",
        "They are inexpensive to manufacture",
      ],
      correctAnswer: 1,
      explanation:
        "Zinc-air batteries have very high energy density (theoretical energy density of 1,086 Wh/kg), which is their main advantage. They are primary batteries with limited rechargeability, moderate cost, and reduced performance in extreme temperatures.",
      unit: 2,
    },
    {
      id: "q6",
      text: "Which primary battery chemistry offers the longest shelf life?",
      options: ["Zinc-carbon", "Alkaline", "Lithium", "Silver oxide"],
      correctAnswer: 2,
      explanation:
        "Lithium primary batteries offer the longest shelf life, typically 10-15 years, due to their very low self-discharge rate. This makes them ideal for applications like medical devices, remote sensors, and backup power systems.",
      unit: 2,
    },

    // Unit 3: Secondary Batteries
    {
      id: "q7",
      text: "Which secondary battery type is commonly used in automotive starting applications?",
      options: ["Lithium-ion", "Lead-acid", "Nickel-cadmium", "Nickel-metal hydride"],
      correctAnswer: 1,
      explanation:
        "Lead-acid batteries are commonly used in automotive starting applications due to their ability to deliver high current (power density), low cost, reliability in a wide temperature range, and established recycling infrastructure.",
      unit: 3,
    },
    {
      id: "q8",
      text: "What is the 'memory effect' in batteries?",
      options: [
        "The battery's ability to remember its charging schedule",
        "A gradual loss of maximum capacity when repeatedly partially discharged",
        "The battery's ability to store data about its usage",
        "An increase in capacity after multiple charge cycles",
      ],
      correctAnswer: 1,
      explanation:
        "The memory effect is a phenomenon where batteries gradually lose their maximum capacity when repeatedly partially discharged before recharging. It was most prominent in nickel-cadmium (NiCd) batteries, less so in NiMH, and is virtually non-existent in lithium-ion batteries.",
      unit: 3,
    },
    {
      id: "q9",
      text: "Which material is commonly used as the cathode in lithium-ion batteries?",
      options: ["Pure lithium metal", "Graphite", "Lithium cobalt oxide (LiCoO₂)", "Zinc"],
      correctAnswer: 2,
      explanation:
        "Lithium cobalt oxide (LiCoO₂) is commonly used as the cathode material in lithium-ion batteries. Graphite is typically used as the anode. Pure lithium metal is not used in commercial lithium-ion batteries due to safety concerns, and zinc is used in other battery chemistries.",
      unit: 3,
    },

    // Unit 4: Fuel Cells
    {
      id: "q10",
      text: "What is the main difference between a fuel cell and a battery?",
      options: [
        "Fuel cells are rechargeable while batteries are not",
        "Fuel cells continuously convert chemical energy as long as fuel is supplied, while batteries store a fixed amount of energy",
        "Fuel cells are more efficient than batteries",
        "Fuel cells can only power small devices",
      ],
      correctAnswer: 1,
      explanation:
        "The main difference is that fuel cells continuously convert chemical energy to electrical energy as long as fuel (like hydrogen) is supplied, while batteries store a fixed amount of chemical energy. Fuel cells are not 'recharged' but refueled.",
      unit: 4,
    },
    {
      id: "q11",
      text: "Which fuel cell type operates at the lowest temperature?",
      options: [
        "Solid Oxide Fuel Cell (SOFC)",
        "Molten Carbonate Fuel Cell (MCFC)",
        "Phosphoric Acid Fuel Cell (PAFC)",
        "Polymer Electrolyte Membrane Fuel Cell (PEMFC)",
      ],
      correctAnswer: 3,
      explanation:
        "Polymer Electrolyte Membrane Fuel Cells (PEMFCs) operate at the lowest temperature, typically 50-100°C. In comparison, PAFCs operate at ~200°C, MCFCs at ~650°C, and SOFCs at 500-1000°C. The low operating temperature of PEMFCs allows for quick startup, making them suitable for automotive applications.",
      unit: 4,
    },
    {
      id: "q12",
      text: "What is the primary byproduct of hydrogen fuel cells?",
      options: ["Carbon dioxide", "Water", "Nitrogen oxide", "Sulfur dioxide"],
      correctAnswer: 1,
      explanation:
        "The primary byproduct of hydrogen fuel cells is water (H₂O). This is formed when hydrogen (H₂) reacts with oxygen (O₂) in the fuel cell, producing electricity, heat, and water. This clean byproduct is one of the main environmental advantages of hydrogen fuel cells.",
      unit: 4,
    },

    // Unit 5: Battery Safety
    {
      id: "q13",
      text: "What is thermal runaway in the context of battery safety?",
      options: [
        "A controlled heating process to improve battery performance",
        "A cooling system failure in battery management systems",
        "An uncontrollable self-heating process that can lead to fire or explosion",
        "The normal temperature increase during charging",
      ],
      correctAnswer: 2,
      explanation:
        "Thermal runaway is an uncontrollable self-heating process where increasing temperature triggers further reactions that generate more heat. In batteries, especially lithium-ion, this can lead to cell rupture, fire, or explosion if not contained.",
      unit: 5,
    },
    {
      id: "q14",
      text: "What is the primary function of a Battery Management System (BMS)?",
      options: [
        "To increase the battery's energy density",
        "To monitor and protect the battery from operating outside its safe operating area",
        "To reduce the cost of battery production",
        "To convert DC power from the battery to AC power for appliances",
      ],
      correctAnswer: 1,
      explanation:
        "The primary function of a Battery Management System (BMS) is to monitor and protect the battery from operating outside its safe operating area. This includes monitoring temperature, voltage, and current, preventing overcharging and overdischarging, and balancing cells in multi-cell batteries.",
      unit: 5,
    },
    {
      id: "q15",
      text: "Which of the following is NOT a recommended practice for lithium-ion battery safety?",
      options: [
        "Using manufacturer-approved chargers",
        "Storing batteries at 100% charge for long periods",
        "Avoiding exposure to extreme temperatures",
        "Inspecting batteries for physical damage before use",
      ],
      correctAnswer: 1,
      explanation:
        "Storing lithium-ion batteries at 100% charge for long periods is NOT recommended for safety and longevity. For long-term storage, lithium-ion batteries should be kept at 40-60% charge. The other options are all recommended safety practices.",
      unit: 5,
    },
  ]

  const filteredQuestions = quizQuestions.filter((q) => q.unit === selectedUnit)
  const currentQuestion = filteredQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / filteredQuestions.length) * 100

  const handleStartQuiz = (unit: number) => {
    setSelectedUnit(unit)
    setQuizState("question")
    setCurrentQuestionIndex(0)
    setScore(0)
  }

  const handleAnswerSelect = (index: number) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(index)
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null && !isAnswerSubmitted) {
      setIsAnswerSubmitted(true)
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore(score + 1)
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsAnswerSubmitted(false)
    } else {
      setQuizState("result")
    }
  }

  const handleRestartQuiz = () => {
    setQuizState("start")
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsAnswerSubmitted(false)
    setScore(0)
  }

  const renderQuizStart = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Choose a Quiz Topic</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground mb-6">
          Select a unit to test your knowledge on specific battery topics. Each quiz contains multiple-choice questions
          with explanations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="h-auto py-6 flex flex-col" onClick={() => handleStartQuiz(1)}>
            <span className="text-lg font-semibold">Unit 1</span>
            <span className="text-sm text-muted-foreground mt-2">Fundamentals of Batteries</span>
          </Button>

          <Button variant="outline" className="h-auto py-6 flex flex-col" onClick={() => handleStartQuiz(2)}>
            <span className="text-lg font-semibold">Unit 2</span>
            <span className="text-sm text-muted-foreground mt-2">Primary Batteries</span>
          </Button>

          <Button variant="outline" className="h-auto py-6 flex flex-col" onClick={() => handleStartQuiz(3)}>
            <span className="text-lg font-semibold">Unit 3</span>
            <span className="text-sm text-muted-foreground mt-2">Secondary Batteries</span>
          </Button>

          <Button variant="outline" className="h-auto py-6 flex flex-col" onClick={() => handleStartQuiz(4)}>
            <span className="text-lg font-semibold">Unit 4</span>
            <span className="text-sm text-muted-foreground mt-2">Fuel Cells</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col md:col-span-2"
            onClick={() => handleStartQuiz(5)}
          >
            <span className="text-lg font-semibold">Unit 5</span>
            <span className="text-sm text-muted-foreground mt-2">Battery Safety</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderQuestion = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentQuestionIndex + 1} of {filteredQuestions.length}
          </span>
          <span className="text-sm font-medium text-muted-foreground">Unit {selectedUnit}</span>
        </div>
        <Progress value={progress} className="h-2" />
        <CardTitle className="mt-4">{currentQuestion.text}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAnswer?.toString()} className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors ${
                isAnswerSubmitted
                  ? index === currentQuestion.correctAnswer
                    ? "border-green-500 bg-green-50 dark:bg-green-950"
                    : selectedAnswer === index
                      ? "border-red-500 bg-red-50 dark:bg-red-950"
                      : "border-transparent"
                  : selectedAnswer === index
                    ? "border-primary"
                    : "hover:border-muted-foreground/30"
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
                disabled={isAnswerSubmitted}
                className="sr-only"
              />
              <Label htmlFor={`option-${index}`} className="flex-1 flex items-center justify-between cursor-pointer">
                <span>{option}</span>
                {isAnswerSubmitted &&
                  (index === currentQuestion.correctAnswer ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : selectedAnswer === index ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : null)}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {isAnswerSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: "1.5rem", padding: "1rem", background: "var(--muted)", borderRadius: "0.5rem" }}
          >
            <h4 className="font-semibold mb-2">Explanation:</h4>
            <p className="text-muted-foreground">{currentQuestion.explanation}</p>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isAnswerSubmitted ? (
          <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null} className="w-full">
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} className="w-full">
            {currentQuestionIndex < filteredQuestions.length - 1 ? (
              <>
                Next Question
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                See Results
                <Trophy className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )

  const renderResults = () => {
    const percentage = Math.round((score / filteredQuestions.length) * 100)
    let message = ""

    if (percentage >= 90) {
      message = "Excellent! You have a deep understanding of this topic."
    } else if (percentage >= 70) {
      message = "Good job! You have a solid grasp of the material."
    } else if (percentage >= 50) {
      message = "Not bad! You have a basic understanding, but there's room for improvement."
    } else {
      message = "Keep studying! This topic needs more review."
    }

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <Trophy className="h-20 w-20 text-primary opacity-20" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl font-bold">{percentage}%</span>
                  <p className="text-sm text-muted-foreground">Score</p>
                </div>
              </div>
            </div>

            <p className="text-lg font-medium mb-2">
              You scored {score} out of {filteredQuestions.length}
            </p>
            <p className="text-muted-foreground text-center max-w-md">{message}</p>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Unit {selectedUnit} Summary</h3>
            <p className="text-sm text-muted-foreground">
              {selectedUnit === 1 &&
                "Fundamentals of batteries cover the basic principles, classifications, and characteristics that define battery performance. Understanding concepts like energy density, power density, and Ohm's law provides the foundation for all battery technologies."}
              {selectedUnit === 2 &&
                "Primary batteries are non-rechargeable power sources designed for single use. They include chemistries like zinc-carbon, alkaline, and lithium primary cells, each with specific advantages for different applications."}
              {selectedUnit === 3 &&
                "Secondary (rechargeable) batteries include lead-acid, nickel-based, and lithium-ion technologies. These batteries can be charged and discharged multiple times, making them suitable for applications from automotive to portable electronics."}
              {selectedUnit === 4 &&
                "Fuel cells convert chemical energy directly into electrical energy as long as fuel is supplied. Unlike batteries, they don't store energy but generate it through electrochemical reactions, typically using hydrogen as fuel."}
              {selectedUnit === 5 &&
                "Battery safety encompasses the practices, systems, and protocols designed to prevent hazards. Understanding thermal management, Battery Management Systems (BMS), and proper handling procedures is crucial for safe battery operation."}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" onClick={handleRestartQuiz} className="w-full sm:w-auto">
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Another Unit
          </Button>
          <Button onClick={() => handleStartQuiz(selectedUnit)} className="w-full sm:w-auto">
            <ArrowRight className="mr-2 h-4 w-4" />
            Retake This Quiz
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div>
      {quizState === "start" && renderQuizStart()}
      {quizState === "question" && renderQuestion()}
      {quizState === "result" && renderResults()}
    </div>
  )
}