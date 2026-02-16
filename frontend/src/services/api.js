const BASE_URL = import.meta.env.VITE_API_URL


export const fetchTickets = async (token) => {
    const res = await fetch(`${BASE_URL}/tickets`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return res.json()
}

export const createTicket = async (token, data) => {
    const res = await fetch(`${BASE_URL}/tickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    return res.json()
}

export const fetchUsers = async (token) => {
    const res = await fetch("${BASE_URL}/users", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return res.json()
}

export const assignTicket = async (token, ticketId, userId) => {
    const res = await fetch(
        `${BASE_URL}/tickets/${ticketId}/assign`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId })
        }
    )

    return res.json()
}
export const updateTicketStatus = async (token, ticketId, updates) => {
    const res = await fetch(
        `${BASE_URL}/tickets/${ticketId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updates)
        }
    )

    return res.json()
}
export const fetchComments = async (token, ticketId) => {
    const res = await fetch(
        `${BASE_URL}/comments/${ticketId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return res.json()
}

export const addComment = async (token, ticketId, message) => {
    const res = await fetch(
        `${BASE_URL}/comments/${ticketId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ message })
        }
    )

    return res.json()
}
