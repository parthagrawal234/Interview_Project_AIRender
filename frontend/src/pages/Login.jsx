import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../services/firebase"
import { useDispatch } from "react-redux"
import { setAuth } from "../redux/authSlice"
import { useNavigate, Link } from "react-router-dom"
import { BASE_URL } from "../services/api"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        )

        const user = userCredential.user
        const token = await user.getIdToken()

        const res = await fetch(`${BASE_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const profile = await res.json()

        dispatch(setAuth({
            user: {
                uid: user.uid,
                email: user.email
            },
            role: profile.role,
            token
        }))


        navigate("/dashboard")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm mt-4 text-center">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
