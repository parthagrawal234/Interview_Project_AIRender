import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTickets, setLoading } from "../redux/ticketSlice"
import { fetchTickets } from "../services/api"
import Navbar from "../components/Navbar"
import TicketCard from "../components/TicketCard"
import TicketForm from "../components/TicketForm"
import BackgroundShapes from "../components/BackgroundShapes"

const Dashboard = () => {
    const dispatch = useDispatch()
    const { list, loading } = useSelector(state => state.tickets)
    const { token, role } = useSelector(state => state.auth)

    useEffect(() => {
        const loadTickets = async () => {
            dispatch(setLoading(true))
            const data = await fetchTickets(token)
            dispatch(setTickets(data))
        }

        loadTickets()
    }, [dispatch, token])

    return (
        <div className="min-h-screen bg-black font-sans text-white relative">
            <BackgroundShapes />
            <div className="page-reveal"></div>
            <Navbar />

            <div className="p-4 sm:p-8 max-w-[1600px] mx-auto animate-pop-in mt-4 sm:mt-8 relative z-10">
                <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">
                    {/* Left Column: Form */}
                    {role === "manager" && (
                        <div className="w-full xl:w-[450px] shrink-0 animate-pop-in stagger-1">
                            <div className="xl:sticky xl:top-32">
                                <TicketForm />
                            </div>
                        </div>
                    )}

                    {/* Right Column: Tickets */}
                    <div className="flex-1 min-w-0 space-y-8 sm:space-y-12">
                        <div className="flex items-center justify-center xl:justify-start mb-8 sm:mb-12 animate-pop-in stagger-2">
                            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter flex flex-wrap justify-center xl:justify-start gap-3 sm:gap-4">
                                <span className="bg-[#3B82F6] text-black px-4 sm:px-6 py-1 sm:py-2 rounded-full border-4 sm:border-8 border-black shadow-[4px_4px_0_0_#fff] sm:shadow-[8px_8px_0_0_#fff] transform -rotate-2">Active</span>
                                <span className="bg-[#FFD700] text-black px-4 sm:px-6 py-1 sm:py-2 rounded-full border-4 sm:border-8 border-black shadow-[4px_4px_0_0_#fff] sm:shadow-[8px_8px_0_0_#fff] transform rotate-2">Tickets</span>
                            </h2>
                        </div>

                        {loading && (
                            <div className="flex justify-center items-center py-20 animate-pop-in stagger-3">
                                <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 border-t-8 border-b-8 border-white border-l-8 border-r-8 border-l-[#FF4500] border-r-[#10B981]"></div>
                            </div>
                        )}

                        {!loading && list.length === 0 && (
                            <div className="text-center py-16 sm:py-24 bg-white rounded-[2rem] sm:rounded-[3rem] border-4 sm:border-8 border-black shadow-[8px_8px_0_0_#FF4500] sm:shadow-[12px_12px_0_0_#FF4500] animate-pop-in stagger-3">
                                <p className="text-black text-3xl sm:text-4xl font-black uppercase tracking-tighter">QUEUE EMPTY</p>
                            </div>
                        )}

                        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
                            {list.map((ticket, index) => (
                                <div
                                    key={ticket.id}
                                    className="animate-pop-in"
                                    style={{ animationDelay: `${(index % 5 + 3) * 150}ms` }}
                                >
                                    <TicketCard ticket={ticket} cardIndex={index} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
