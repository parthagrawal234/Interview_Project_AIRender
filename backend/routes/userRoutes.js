const express = require("express")
const router = express.Router()
const authenticateUser = require("../middleware/authMiddleware")
const { createUserProfile, getUserProfile } = require("../services/user")

// Create user profile after signup
router.post("/", authenticateUser, async (req, res) => {
  const uid = req.user.uid
  const { name, role } = req.body

  await createUserProfile(uid, {
    name,
    email: req.user.email,
    role: role || "member"
  })

  res.json({ message: "User profile created" })
})

// Get current logged-in user
router.get("/me", authenticateUser, async (req, res) => {
  const uid = req.user.uid
  const user = await getUserProfile(uid)
  res.json(user)
})

module.exports = router
