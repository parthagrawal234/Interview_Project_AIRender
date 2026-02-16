import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createTicket } from "../services/api"
import { addTicket } from "../redux/ticketSlice"

const TicketForm = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
    const [priority, setPriority] = useState("Low")

    const { token } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title.trim() || !description.trim()) {
            setError("Title and description are required")
            return
        }

        setError("")

        try {
            const newTicket = await createTicket(token, {
                title,
                description,
                priority
            })

            dispatch(addTicket({
                id: newTicket.id,
                title,
                description,
                priority,
                status: "New"
            }))

            setTitle("")
            setDescription("")
        } catch (err) {
            setError("Failed to create ticket")
        }
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-lg mb-8 space-y-5 border border-gray-200"
        >
            <h3 className="text-xl font-semibold text-gray-800">
                Create Ticket
            </h3>

            {error && (
                <div className="bg-red-50 border border-red-400 text-red-600 px-4 py-2 rounded-lg text-sm font-medium">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Description
                </label>
                <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Priority
                </label>
                <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
                Create Ticket
            </button>
        </form>

    )
}

export default TicketForm
