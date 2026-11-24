using Microsoft.EntityFrameworkCore;
using TicketsServer.Data;
using TicketsServer.DTOs;
using TicketsServer.Entities;
using TicketsServer.Enums;

namespace TicketsServer.Services
{
    public class TicketService : ITicketService
    {
        private readonly AppDbContext _context;
        public TicketService(AppDbContext context) {
            _context = context; 
        }
        public async Task<TicketDto> CreateTicket(CreateTicketDto ticketDto)
        {
            if(ticketDto == null) throw new ArgumentNullException(nameof(ticketDto));
            if (string.IsNullOrWhiteSpace(ticketDto.Title))
            {
                throw new ArgumentException("הכותרת לא יכולה להיות ריקה.");
            }
            if (string.IsNullOrWhiteSpace(ticketDto.ProblemDescription))
            {
                throw new ArgumentException("תיאור הבעיה לא יכול להיות ריק");
            }
            var ticket = new Ticket
            {
                Title = ticketDto.Title,
                ProblemDescription = ticketDto.ProblemDescription,
                Priority = ticketDto.Priority,
                Status = ticketDto.Status,
            };
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
            return new TicketDto
            {
                Id = ticket.Id,
                Title = ticket.Title,
                ProblemDescription = ticket.ProblemDescription,
                Priority = ticket.Priority,
                Status = ticket.Status,
                CreatedAt = ticket.CreatedAt
            }; 

        }
        public async Task<bool> UpdateTicketStatus(int id, TicketStatus ticketStatus)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return false;
            }
            ticket.Status = ticketStatus;
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return false;
            }
            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<List<TicketDto>> GetAllTickets(TicketStatus? status, TicketPriority? priority, string? search)
        {
            var query = _context.Tickets.AsQueryable();
            if (status is not null)
            {
                query = query.Where(t => t.Status == status);
            }
            if (priority is not null)
            {
                query = query.Where(t => t.Priority == priority);
            }
            if (!string.IsNullOrWhiteSpace(search))
            {
                var term = search.Trim().ToLower();
                query = query.Where(t => t.Title.ToLower().Contains(search));
            }
            return await query.Select(t => new TicketDto
            {
                Id = t.Id,
                Title = t.Title,
                ProblemDescription = t.ProblemDescription,
                Priority = t.Priority,
                Status = t.Status,
                CreatedAt = t.CreatedAt
            }).ToListAsync();
        }
     


    }

}
