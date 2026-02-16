import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import Navbar from "../components/Navbar"
import CommentSection from "../components/CommentSection"

const TicketDetails = () => {
    const { id } = useParams()
    const ticket = useSelector(state =>
        state.tickets.list.find(t => t.id === id)
    )

    if (!ticket) return <p>Ticket not found</p>

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-3xl mx-auto p-8 bg-white mt-6 rounded-2xl shadow">
                <h2 className="text-2xl font-bold mb-4">{ticket.title}</h2>

                <p className="text-gray-600 mb-4">{ticket.description}</p>

                <div className="text-sm text-gray-500">
                    Status: {ticket.status}
                </div>

                <CommentSection ticketId={id} />
            </div>
        </div>
    )
}

export default TicketDetails
