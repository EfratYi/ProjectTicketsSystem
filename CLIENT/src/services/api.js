import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:7142/api',
})

export const getTickets = (status, priority, search) => api.get('/tickets',{
  params: {
    status: status||undefined,
    priority: priority||undefined,
    search: search||undefined
  }
  })
  export const updateTicketStatus = (ticketId, newStatus) => api.patch(`/tickets/${ticketId}`, null, { params: { status: newStatus } })


export default api