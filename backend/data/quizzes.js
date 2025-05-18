// This file contains the quiz data for the API

const quizzes = [  // Unit 1: Fundamentals of Batteries
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
  // Add more quiz questions as needed
]

export default quizzes
