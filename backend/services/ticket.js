const { db, admin } = require("../firebase/admin")

const createTicket = async (ticketData) => {
    try {
        const docRef = await db.collection("tickets").add({
            ...ticketData,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            status: "New",
            assignedTo: null
        })
        return { id: docRef.id }

    } catch (error) {
        console.error("Error creating ticket: ", error)
        throw error
    }
}

const getAllTickets = async () => {
    try {
        const snapshot = await db.collection("tickets").get()

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

    } catch (error) {
        console.error("Error fetching tickets:", error)
        throw error
    }
}

const getTicketById = async (ticketId) => {
    try {
        const doc = await db.collection("tickets").doc(ticketId).get()

        if (!doc.exists) return null

        return { id: doc.id, ...doc.data() }

    } catch (error) {
        console.error("Error fetching ticket:", error)
        throw error
    }
}

const updateTicket = async (ticketId, updateData) => {
    try {
        await db.collection("tickets").doc(ticketId).update({
            ...updateData,
            updatedAt: new Date()
        })

        return { message: "Ticket updated successfully" }

    } catch (error) {
        console.error("Error updating ticket:", error)
        throw error
    }
}

const assignTicket = async (ticketId, userId) => {
    try {
        await db.collection("tickets").doc(ticketId).update({
            assignedTo: userId,
            status: "Assigned",
            updatedAt: new Date()
        })

        return { message: "Ticket assigned successfully" }

    } catch (error) {
        console.error("Error assigning ticket:", error)
        throw error
    }
}


module.exports = { createTicket, getAllTickets, getTicketById, updateTicket, assignTicket }