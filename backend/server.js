import express from "express"
import cors from "cors"
import { rateLimit } from "express-rate-limit"
import batteryData from "./data/batteries.js"
import quizData from "./data/quizzes.js"

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.json())
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production" ? ["https://batterytech-explorer.vercel.app"] : ["http://localhost:3000"],
  }),
)

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
})

app.use("/api/", apiLimiter)

// Routes
app.get("/api/batteries", (req, res) => {
  res.json(batteryData)
})

app.get("/api/batteries/:id", (req, res) => {
  const battery = batteryData.find((b) => b.id === req.params.id)

  if (!battery) {
    return res.status(404).json({ message: "Battery not found" })
  }

  res.json(battery)
})

app.get("/api/compare", (req, res) => {
  const { ids } = req.query

  if (!ids) {
    return res.status(400).json({ message: "Battery IDs are required" })
  }

  const batteryIds = ids.split(",")
  const batteries = batteryData.filter((b) => batteryIds.includes(b.id))

  res.json(batteries)
})

app.get("/api/quiz/:unit", (req, res) => {
  const unitQuestions = quizData.filter((q) => q.unit === Number.parseInt(req.params.unit))

  if (!unitQuestions.length) {
    return res.status(404).json({ message: "Quiz not found for this unit" })
  }

  // Shuffle and return a subset of questions
  const shuffled = [...unitQuestions].sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, Math.min(5, shuffled.length))

  res.json(selected)
})

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
