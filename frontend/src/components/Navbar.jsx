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
        <div className="bg-black text-white px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 border-b-4 border-gray-900 sticky top-0 z-50">
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter bg-white text-black px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border-4 border-black hover:scale-105 transition-transform cursor-default shadow-[4px_4px_0_0_#fff]">
                Ticket System
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
                <span className="bg-white text-black font-black uppercase tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border-4 border-black shadow-[4px_4px_0_0_#fff] transform -rotate-1">
                    Role: {role}
                </span>

                <button
                    onClick={handleLogout}
                    className="bg-[#FF4500] text-black font-black uppercase tracking-widest px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:bg-[#FF3300] hover:-translate-y-1 transition-all border-4 border-black shadow-[4px_4px_0_0_#fff] text-xs sm:text-base"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar
