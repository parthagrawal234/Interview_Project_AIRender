const express = require("express")
const router = express.Router()
const authenticateUser = require("../middleware/authMiddleware")

const {
    getCommentsByTicketId,
    addComment
} = require("../services/comment")

// 🔥 Get comments for a ticket
router.get("/:ticketId", authenticateUser, async (req, res) => {
    try {
        const comments = await getCommentsByTicketId(req.params.ticketId)
        res.json(comments)
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
})

// 🔥 Add a comment to a ticket
router.post("/:ticketId", authenticateUser, async (req, res) => {
    const { message } = req.body

    if (!message || !message.trim()) {
        return res.status(400).json({ message: "Message is required" })
    }

    try {
        const comment = await addComment(
            req.params.ticketId,
            req.user.uid,
            message.trim()
        )
        res.json(comment)
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
})

module.exports = router
