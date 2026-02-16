const { db } = require("../firebase/admin")

const createUserProfile = async (uid, userData) => {
    try {
        await db.collection("users").doc(uid).set({
            ...userData,
            createdAt: new Date(),
            isActive: true
        })

    } catch (error) {
        console.error("Error creating user profile:", error)
        throw error
    }
}

const getUserProfile = async (uid) => {
    try {
        const doc = await db.collection("users").doc(uid).get()

        if (!doc.exists) {
            return null
        }

        return doc.data()

    } catch (error) {
        console.error("Error getting user profile:", error)
        throw error
    }
}

module.exports = {
    createUserProfile,
    getUserProfile
}
