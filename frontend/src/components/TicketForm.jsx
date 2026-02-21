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
            className="bg-[#10B981] p-8 rounded-[2rem] mb-8 space-y-6 border-8 border-black shadow-[12px_12px_0_0_#fff] relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full mix-blend-overlay opacity-20 -translate-y-1/2 translate-x-1/3"></div>

            <h3 className="text-3xl font-black text-black uppercase tracking-tighter">
                Create Ticket
            </h3>

            {error && (
                <div className="bg-[#FF4500] border-4 border-black text-black px-4 py-3 rounded-xl text-lg font-black uppercase shadow-[4px_4px_0_0_#fff]">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-xl font-black text-black mb-2 uppercase">
                    Title
                </label>
                <input
                    type="text"
                    className="w-full bg-white border-4 border-black rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:ring-0 focus:bg-gray-100 transition shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-xl font-black text-black mb-2 uppercase">
                    Description
                </label>
                <textarea
                    className="w-full bg-white border-4 border-black rounded-xl px-4 py-3 h-32 text-black font-bold focus:outline-none focus:ring-0 focus:bg-gray-100 transition shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-xl font-black text-black mb-2 uppercase">
                    Priority
                </label>
                <select
                    className="w-full bg-white border-4 border-black rounded-xl px-4 py-3 text-black font-black uppercase tracking-wider focus:outline-none focus:ring-0 shadow-[4px_4px_0_0_rgba(0,0,0,1)] cursor-pointer hover:bg-gray-100 transition"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-black text-white text-2xl py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-900 transition border-4 border-transparent hover:border-white shadow-[8px_8px_0_0_#fff] hover:shadow-[4px_4px_0_0_#fff] hover:translate-x-[4px] hover:translate-y-[4px]"
            >
                Submit
            </button>
        </form>

    )
}

export default TicketForm
