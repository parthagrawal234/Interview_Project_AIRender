const express = require("express")
const router = express.Router()
const { db } = require("../firebase/admin")
const authenticateUser = require("../middleware/authMiddleware")
const checkManager = require("../middleware/roleMiddleware")

const {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
    assignTicket
} = require("../services/ticket")

// 🔥 Create ticket (Manager only)
router.post("/", authenticateUser, checkManager, async (req, res) => {
    const { title, description, priority } = req.body

    const ticket = await createTicket({
        title,
        description,
        priority,
        createdBy: req.user.uid
    })

    res.json(ticket)
})

// 🔥 Get all tickets (Authenticated users)
router.get("/", authenticateUser, async (req, res) => {
    const tickets = await getAllTickets()
    res.json(tickets)
})

// 🔥 Get single ticket
router.get("/:id", authenticateUser, async (req, res) => {
    const ticket = await getTicketById(req.params.id)
    res.json(ticket)
})

// 🔥 Update ticket
router.put("/:id", authenticateUser, async (req, res) => {
    const ticket = await getTicketById(req.params.id)

    if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" })
    }

    const uid = req.user.uid

    // Manager can update anything
    const userDoc = await db.collection("users").doc(uid).get()
    const role = userDoc.data().role

    if (role === "manager") {
        await updateTicket(req.params.id, req.body)
        return res.json({ message: "Updated by manager" })
    }

    // Member can only update if assigned
    if (ticket.assignedTo === uid) {
        await updateTicket(req.params.id, req.body)
        return res.json({ message: "Updated by assigned member" })
    }

    return res.status(403).json({ message: "Access denied" })
})


// 🔥 Delete ticket (Manager only)
router.delete("/:id", authenticateUser, checkManager, async (req, res) => {
    await deleteTicket(req.params.id)
    res.json({ message: "Deleted successfully" })
})

// 🔥 Assign ticket (Manager only)
router.put("/:id/assign", authenticateUser, checkManager, async (req, res) => {
    const { userId } = req.body

    await assignTicket(req.params.id, userId)

    res.json({ message: "Ticket assigned successfully" })
})

module.exports = router
