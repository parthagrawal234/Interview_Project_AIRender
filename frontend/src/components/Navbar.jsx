import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/authSlice"
import { signOut } from "firebase/auth"
import { auth } from "../services/firebase"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { role } = useSelector(state => state.auth)

    const handleLogout = async () => {
        await signOut(auth)
        dispatch(logout())
        navigate("/")
    }

    return (
        <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Ticket System</h1>

            <div className="flex items-center gap-4">
                <span className="bg-gray-700 px-3 py-1 rounded-lg text-sm">
                    Role: {role}
                </span>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar
