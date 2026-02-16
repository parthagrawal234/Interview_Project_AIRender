import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTickets, setLoading } from "../redux/ticketSlice"
import { fetchTickets } from "../services/api"
import Navbar from "../components/Navbar"
import TicketCard from "../components/TicketCard"
import TicketForm from "../components/TicketForm"

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
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="p-8 max-w-4xl mx-auto">
                {role === "manager" && <TicketForm />}

                <h2 className="text-2xl font-bold mb-4">Tickets</h2>

                {loading && <p>Loading...</p>}

                <div className="grid gap-4">
                    {list.map(ticket => (
                        <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
