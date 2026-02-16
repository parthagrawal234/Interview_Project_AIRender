import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { fetchUsers, assignTicket } from "../services/api"
import { useDispatch } from "react-redux"
import { updateTicketInState } from "../redux/ticketSlice"
import { updateTicketStatus } from "../services/api"
import { Link } from "react-router-dom"


const TicketCard = ({ ticket }) => {
    const { role, token } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState("")
    const [loadingAssign, setLoadingAssign] = useState(false)

    useEffect(() => {
        if (role === "manager") {
            const loadUsers = async () => {
                const data = await fetchUsers(token)
                setUsers(data.filter(u => u.role === "member"))
            }
            loadUsers()
        }
    }, [role, token])

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

    const getUserName = (uid) => {
        const user = users.find(u => u.uid === uid)
        return user ? user.name : "Unassigned"
    }


    return (
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-2">
                <Link to={`/tickets/${ticket.id}`}>
                    <h4 className="text-lg font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                        {ticket.title}
                    </h4>
                </Link>


                <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                    {ticket.status}
                </span>
            </div>

            <p className="text-gray-600">{ticket.description}</p>

            <div className="mt-2">
                <span className={`
    text-xs font-medium px-3 py-1 rounded-full
    ${ticket.priority === "High" ? "bg-red-100 text-red-600" :
                        ticket.priority === "Medium" ? "bg-yellow-100 text-yellow-700" :
                            "bg-green-100 text-green-600"}
  `}>
                    {ticket.priority} Priority
                </span>
            </div>

            <div className="mt-1 text-sm text-gray-600">
                Assigned to: {ticket.assignedTo ? getUserName(ticket.assignedTo) : "Unassigned"}
            </div>

            {/* 🔥 Manager Assign UI */}
            {role === "manager" && (
                <div className="mt-4 border-t pt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                        <select
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="">Select member to assign</option>
                            {users
                                .filter(u => u.role === "member")
                                .map(user => (
                                    <option key={user.uid} value={user.uid}>
                                        {user.name}
                                    </option>
                                ))}
                        </select>

                        <button
                            onClick={handleAssign}
                            disabled={!selectedUser || loadingAssign}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loadingAssign ? "Assigning..." : "Assign Ticket"}
                        </button>

                    </div>

                    {ticket.assignedTo && (
                        <div className="mt-3 text-xs text-gray-500">
                            Currently assigned to:{" "}
                            <span className="font-medium text-gray-700">
                                {getUserName(ticket.assignedTo)}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default TicketCard
