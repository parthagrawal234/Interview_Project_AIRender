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
        <div className="min-h-screen flex items-center justify-center bg-gray-900 mesh-bg overflow-hidden relative">
            {/* The Full Page Black Slide Reveal */}
            <div className="page-reveal"></div>

            <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] vibrant-shadow p-10 w-full max-w-md animate-pop-in relative z-10 border border-white/40">
                <div className="animate-pop-in stagger-1">
                    <h2 className="text-4xl font-extrabold mb-2 text-center text-vibrant-glow uppercase tracking-tighter">Welcome Back</h2>
                    <p className="text-center font-bold text-gray-600 mb-8 text-sm">Sign in to continue.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="animate-pop-in stagger-2">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-white/50 backdrop-blur-md border-[3px] border-gray-100 rounded-2xl p-4 text-gray-900 font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 hover:border-blue-300 transition-all duration-300"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="animate-pop-in stagger-3">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-white/50 backdrop-blur-md border-[3px] border-gray-100 rounded-2xl p-4 text-gray-900 font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 hover:border-purple-300 transition-all duration-300"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="animate-pop-in stagger-4 pt-4">
                        <button
                            type="submit"
                            className="w-full bg-black text-white text-lg font-black uppercase tracking-wider py-4 rounded-2xl hover:bg-gray-800 transition duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-y-1"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className="text-sm mt-8 pb-2 text-center font-bold text-gray-600 animate-pop-in stagger-5">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-pink-600 hover:text-blue-600 transition-colors duration-300">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
