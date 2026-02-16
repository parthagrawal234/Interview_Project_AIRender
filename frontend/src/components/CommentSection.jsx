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
            <h3 className="font-semibold mb-3">Comments</h3>

            <div className="space-y-2 mb-4">
                {comments.map((c, index) => (
                    <div key={index} className="bg-gray-100 p-3 rounded-lg text-sm">
                        {c.message}
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2"
                    placeholder="Add comment..."
                />
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Add
                </button>
            </div>
        </div>
    )
}

export default CommentSection
