const { db } = require("../firebase/admin")

const checkManager = async (req, res, next) => {
    try {
        const uid = req.user.uid

        const doc = await db.collection("users").doc(uid).get()

        if (!doc.exists) {
            return res.status(404).json({ message: "User not found" })
        }

        const user = doc.data()

        if (user.role !== "manager") {
            return res.status(403).json({ message: "Access denied" })
        }

        next()

    } catch (error) {
        return res.status(500).json({ message: "Role check failed" })
    }
}

module.exports = checkManager
