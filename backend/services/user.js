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
        const userRef = db.collection("users")
        const querySnapshot = await userRef.where("uid", "==", uid).get()
        if (querySnapshot.empty) {
            return null
        }
        return querySnapshot.docs[0].data()
    } catch (error) {
        console.error("Error getting user profile: ", error)
    }
}

module.exports = {
    createUserProfile,
    getUserProfile
}