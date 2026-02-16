const express = require("express")
const cors = require("cors")
require("dotenv").config()

// Import routes
const userRoutes = require("./routes/userRoutes")
const ticketRoutes = require("./routes/ticketRoutes")

const app = express()

// 🔥 Middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://interview-project-ai-render.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())

// 🔥 Health check route (for testing)
app.get("/", (req, res) => {
    res.send("Backend is running 🚀")
})

// 🔥 Routes
app.use("/api/users", userRoutes)
app.use("/api/tickets", ticketRoutes)

// 🔥 Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
