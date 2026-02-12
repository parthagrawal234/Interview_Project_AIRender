import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./services/firebase"

const TestLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState(null)

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            // 🔥 Login with Firebase
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )

            const user = userCredential.user

            // 🔥 Get ID token
            const token = await user.getIdToken()

            console.log("Firebase Token:", token)

            // 🔥 Call backend to test auth
            const res = await fetch("http://localhost:5000/api/users/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json()
            setResponse(data)
            console.log("Backend Response:", data)

        } catch (error) {
            console.error("Login error:", error.message)
        }
    }

    return (
        <div style={{ padding: "50px" }}>
            <h2>Test Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Login</button>
            </form>

            {response && (
                <div style={{ marginTop: "20px" }}>
                    <h3>User Data From Backend:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}

export default TestLogin
