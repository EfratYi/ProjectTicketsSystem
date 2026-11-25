using TicketsServer.Entities;
using TicketsServer.Enums;

namespace TicketsServer.Repository
{
    public interface ITicketRepository
    {
        Task<Ticket> CreateAsync(Ticket ticket);
        Task<bool> UpdateStatusAsync(int id, TicketStatus ticketStatus);
        Task<bool> DeleteAsync(int id);
        Task<List<Ticket>> GetAllAsync(TicketStatus? status, TicketPriority? priority, string? search);
    }
}
