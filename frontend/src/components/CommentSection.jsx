import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { fetchComments, addComment } from "../services/api"

const CommentSection = ({ ticketId }) => {
    const { token } = useSelector(state => state.auth)
    const [comments, setComments] = useState([])
    const [message, setMessage] = useState("")

    useEffect(() => {
        const load = async () => {
            const data = await fetchComments(token, ticketId)
            setComments(data)
        }
        load()
    }, [token, ticketId])

    const handleAdd = async () => {
        if (!message.trim()) return

        await addComment(token, ticketId, message)

        setComments([
            ...comments,
            { message, createdAt: new Date() }
        ])

        setMessage("")
    }

    return (
        <div className="mt-6">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 bg-[#3B82F6] text-white inline-block px-6 py-2 rounded-full border-4 border-black shadow-[4px_4px_0_0_#000] -rotate-1">
                Comments
            </h3>

            <div className="space-y-4 mb-8">
                {comments.map((c, index) => (
                    <div key={index} className="bg-gray-100 p-5 rounded-[1.5rem] border-4 border-black text-black font-bold shadow-[4px_4px_0_0_#000]">
                        {c.message}
                    </div>
                ))}
                {comments.length === 0 && (
                    <div className="text-gray-500 font-bold italic">No comments yet.</div>
                )}
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-white border-4 border-black rounded-full px-6 py-4 text-black font-bold focus:outline-none focus:ring-0 shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all"
                    placeholder="Type a comment..."
                />
                <button
                    onClick={handleAdd}
                    className="bg-[#10B981] text-black border-4 border-black px-8 py-4 rounded-full text-xl font-black uppercase tracking-widest hover:bg-[#0EA5E9] hover:text-white transition-colors duration-300 shadow-[4px_4px_0_0_#000]"
                >
                    Post
                </button>
            </div>
        </div>
    )
}

export default CommentSection
