const express = require("express")
const router = express.Router()
const authenticateUser = require("../middleware/authMiddleware")
const { createUserProfile, getUserProfile } = require("../services/user")
const checkManager = require("../middleware/roleMiddleware")
const { db } = require("../firebase/admin")

// Create user profile after signup
router.post("/", authenticateUser, async (req, res) => {
  try {
    const uid = req.user.uid
    const { name } = req.body

    await createUserProfile(uid, {
      name,
      email: req.user.email,
      role: "member"
    })

    res.json({ message: "User profile created" })

  } catch (error) {
    res.status(500).json({ message: "Failed to create user profile" })
  }
})

// Get all users (Manager only)
router.get("/", authenticateUser, checkManager, async (req, res) => {
  const snapshot = await db.collection("users").get()

  const users = snapshot.docs.map(doc => ({
    uid: doc.id,
    ...doc.data()
  }))

  res.json(users)
})


// Get current logged-in user
router.get("/me", authenticateUser, async (req, res) => {
  const uid = req.user.uid
  const user = await getUserProfile(uid)
  res.json(user)
})

module.exports = router
