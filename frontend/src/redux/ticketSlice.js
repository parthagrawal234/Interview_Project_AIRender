import { createSlice } from "@reduxjs/toolkit"

const ticketSlice = createSlice({
    name: "tickets",
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {
        setTickets(state, action) {
            state.list = action.payload
            state.loading = false
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
            state.loading = false
        },
        addTicket(state, action) {
            state.list.push(action.payload)
        },
        updateTicketInState(state, action) {
            const { id, updates } = action.payload
            const index = state.list.findIndex(t => t.id === id)
            if (index !== -1) {
                state.list[index] = {
                    ...state.list[index],
                    ...updates
                }
            }
        }
    }
})

export const {
    setTickets,
    setLoading,
    setError,
    addTicket,
    updateTicketInState
} = ticketSlice.actions

export default ticketSlice.reducer
