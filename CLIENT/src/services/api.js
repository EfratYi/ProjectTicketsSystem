import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:7142/api',
})

export const getTickets = (filters, search) => {
    const cleanFilters = Object.fromEntries(
        Object.entries(filters || {}).filter(([_, value]) => Boolean(value))
    );
    return api.get('/tickets', {
        params: {
            ...cleanFilters,
            search: search || undefined
        }
    });
};
export const updateTicketStatus = (ticketId, newStatus) => api.patch(`/tickets/${ticketId}`, null, { params: { status: newStatus } })
export const deleteTicket = (ticketId) => api.delete(`/tickets/${ticketId}`)
export const createTicket = (ticketData) => api.post('/tickets', ticketData)

export default api