import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import Navbar from "../components/Navbar"
import CommentSection from "../components/CommentSection"
import BackgroundShapes from "../components/BackgroundShapes"

const TicketDetails = () => {
    const { id } = useParams()
    const ticket = useSelector(state =>
        state.tickets.list.find(t => t.id === id)
    )

    if (!ticket) return <p className="text-white text-center mt-20 text-4xl font-black uppercase">Ticket not found</p>

    return (
        <div className="min-h-screen bg-black text-white relative">
            <BackgroundShapes />
            <div className="page-reveal"></div>
            <Navbar />

            <div className="max-w-4xl mx-auto p-10 bg-[#FFD700] text-black mt-12 rounded-[3rem] border-8 border-black shadow-[16px_16px_0_0_#fff] animate-pop-in relative z-10">
                <div className="flex items-start justify-between mb-8 gap-4 border-b-8 border-black pb-8">
                    <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">{ticket.title}</h2>
                    <span className="bg-white text-black text-xl font-black uppercase tracking-widest px-6 py-3 rounded-full border-4 border-black inline-block shrink-0 shadow-[4px_4px_0_0_#000] rotate-2">
                        {ticket.status}
                    </span>
                </div>

                <div className="bg-white border-4 border-black rounded-[2rem] p-8 mb-8 shadow-[8px_8px_0_0_#000]">
                    <h3 className="text-2xl font-black uppercase mb-4">Description</h3>
                    <p className="text-black text-xl font-bold leading-relaxed">{ticket.description}</p>
                </div>

                <div className="bg-white border-4 border-black rounded-[2rem] p-8 shadow-[8px_8px_0_0_#000]">
                    <CommentSection ticketId={id} />
                </div>
            </div>
        </div>
    )
}

export default TicketDetails
