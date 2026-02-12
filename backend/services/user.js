const { db } = require("../firebase/admin")

const createUserProfile = async (uid, userData) => {
    try {
        const userRef = db.collection("users")
        await userRef.doc(uid).set({
            uid,
            ...userData,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            isActive: true,
        })
    } catch (error) {
        console.error("Error creating user profile: ", error)
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
        console.error("Error getting user profile: ", error)
        return null
    }
}


module.exports = {
    createUserProfile,
    getUserProfile
}