using TicketsServer.DTOs;
using TicketsServer.Entities;
using TicketsServer.Enums;

namespace TicketsServer.Services
{
    public interface ITicketService
    {
        Task<TicketDto> CreateTicket(CreateTicketDto ticket);
        Task<bool> UpdateTicketStatus(int id, TicketStatus ticketStatus);
        Task<bool> DeleteTicket(int id);
        Task<List<TicketDto>> GetAllTickets(TicketFilter? ticketFilter, string? search);

    }
}
