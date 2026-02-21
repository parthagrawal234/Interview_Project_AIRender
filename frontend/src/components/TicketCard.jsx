import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { fetchUsers, assignTicket, updateTicketStatus } from "../services/api"
import { useDispatch } from "react-redux"
import { updateTicketInState } from "../redux/ticketSlice"
import { Link } from "react-router-dom"

const SLUSH_COLORS = [
    "bg-[#FF4500]", // Orange
    "bg-[#3B82F6]", // Blue
    "bg-[#FFD700]", // Yellow
    "bg-[#10B981]", // Green
    "bg-white"      // White
]

const TicketCard = ({ ticket, cardIndex = 0 }) => {
    const { role, token, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [allUsers, setAllUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState("")
    const [loadingAssign, setLoadingAssign] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(false)

    useEffect(() => {
        if (token) {
            const loadUsers = async () => {
                const data = await fetchUsers(token)
                setAllUsers(data)
            }
            loadUsers()
        }
    }, [token])

    const handleAssign = async () => {
        if (!selectedUser) return

        setLoadingAssign(true)

        await assignTicket(token, ticket.id, selectedUser)

        dispatch(updateTicketInState({
            id: ticket.id,
            updates: {
                assignedTo: selectedUser,
                status: "Assigned"
            }
        }))

        setLoadingAssign(false)
    }

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value
        if (!newStatus || newStatus === ticket.status) return

        setLoadingStatus(true)
        await updateTicketStatus(token, ticket.id, { status: newStatus })

        dispatch(updateTicketInState({
            id: ticket.id,
            updates: { status: newStatus }
        }))
        setLoadingStatus(false)
    }

    const getUserName = (uid) => {
        const u = allUsers.find(usr => usr.uid === uid)
        return u ? u.name : "Unassigned"
    }

    const bgColor = SLUSH_COLORS[cardIndex % SLUSH_COLORS.length]
    const isWhite = bgColor === "bg-white"

    // Only managers need to see the filtered list for assigning
    const memberOptions = Array.isArray(allUsers) ? allUsers.filter(u => u.role === "member") : []

    return (
        <div className={`${bgColor} p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border-4 sm:border-[6px] border-black hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group shadow-[6px_6px_0_0_#fff] sm:shadow-[8px_8px_0_0_#fff]`}>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3 sm:gap-2">
                    <Link to={`/tickets/${ticket.id}`} className="min-w-0">
                        <h4 className="text-xl sm:text-2xl font-black text-black hover:opacity-80 transition-opacity truncate uppercase tracking-tight">
                            {ticket.title}
                        </h4>
                    </Link>

                    <span className="shrink-0 text-xs sm:text-sm font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-black text-white border-2 sm:border-[3px] border-black">
                        {loadingStatus ? "UPDATING..." : ticket.status}
                    </span>
                </div>

                <p className="text-black font-bold text-sm sm:text-base mb-6 line-clamp-3 leading-snug">{ticket.description}</p>

                <div className="mt-auto">
                    <div className="mb-4">
                        <span className={`
                            text-xs font-black uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 sm:border-[3px] border-black shadow-[2px_2px_0_0_#000]
                            ${ticket.priority === "High" ? "bg-[#FF4500] text-black" :
                                ticket.priority === "Medium" ? "bg-[#FFD700] text-black" :
                                    "bg-[#10B981] text-black"}
                            ${isWhite && ticket.priority === "High" ? "bg-[#FF4500]" : ""}
                            ${isWhite && ticket.priority === "Medium" ? "bg-[#FFD700]" : ""}
                            ${isWhite && ticket.priority === "Low" ? "bg-[#10B981]" : ""}
                            ${!isWhite ? "bg-white text-black" : ""}
                        `}>
                            {ticket.priority} Priority
                        </span>
                    </div>

                    <div className="text-xs sm:text-sm font-black text-black mb-2 uppercase border-2 border-black inline-block px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm">
                        Assignee: {ticket.assignedTo ? getUserName(ticket.assignedTo) : "Unassigned"}
                    </div>

                    {/* Manager Assign UI */}
                    {role === "manager" && (
                        <div className="mt-4 sm:mt-5 border-t-[3px] sm:border-t-4 border-black pt-4 sm:pt-5">
                            <div className="flex flex-col gap-3">
                                <select
                                    className="w-full bg-white border-2 sm:border-[3px] border-black rounded-full px-4 py-2 text-xs sm:text-sm font-black uppercase text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0_0_#000] cursor-pointer"
                                    value={selectedUser}
                                    onChange={(e) => setSelectedUser(e.target.value)}
                                >
                                    <option value="">Select member...</option>
                                    {memberOptions.map(usr => (
                                        <option key={usr.uid} value={usr.uid}>
                                            {usr.name}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    onClick={handleAssign}
                                    disabled={!selectedUser || loadingAssign}
                                    className="w-full bg-black text-white px-4 py-2 sm:py-3 rounded-full text-sm sm:text-base font-black uppercase tracking-wider hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 sm:border-[3px] border-transparent hover:border-white shadow-[2px_2px_0_0_#fff] sm:shadow-[3px_3px_0_0_#fff]"
                                >
                                    {loadingAssign ? "Assigning..." : "Assign"}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Status Update Dropdown for Allowed Users */}
                    {(role === "manager" || (role === "member" && ticket.assignedTo === user?.uid)) && (
                        <div className="mt-4 border-t-[3px] sm:border-t-4 border-black pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <span className="text-black font-black uppercase text-xs sm:text-sm tracking-widest shrink-0">Update Status:</span>
                            <select
                                className="bg-white border-2 sm:border-[3px] border-black rounded-full px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-black uppercase text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0_0_#000] cursor-pointer sm:max-w-[160px] w-full"
                                value={ticket.status}
                                onChange={handleStatusChange}
                                disabled={loadingStatus}
                            >
                                <option value="New">New</option>
                                <option value="Assigned">Assigned</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TicketCard
