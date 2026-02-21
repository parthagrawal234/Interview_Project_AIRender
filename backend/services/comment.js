const { db, admin } = require("../firebase/admin")

const getCommentsByTicketId = async (ticketId) => {
    try {
        const snapshot = await db.collection("comments")
            .where("ticketId", "==", ticketId)
            .get()

        const comments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        // Sort in memory to avoid needing a Firestore composite index (ticketId + createdAt)
        return comments.sort((a, b) => {
            const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
            const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
            return timeA - timeB;
        });
    } catch (error) {
        console.error("Error fetching comments:", error)
        throw error
    }
}

const addComment = async (ticketId, userId, message) => {
    try {
        const docRef = await db.collection("comments").add({
            ticketId,
            userId,
            message,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        })
        return { id: docRef.id, userId, message, createdAt: new Date() }
    } catch (error) {
        console.error("Error adding comment:", error)
        throw error
    }
}

module.exports = { getCommentsByTicketId, addComment }
