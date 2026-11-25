using Microsoft.EntityFrameworkCore;
using TicketsServer.Data;
using TicketsServer.Entities;
using TicketsServer.Enums;

namespace TicketsServer.Repository
{
    public class TicketRepository : ITicketRepository
    {
        private readonly AppDbContext _context;
        public TicketRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Ticket> CreateAsync(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
             await _context.SaveChangesAsync();
            return ticket;
            
        }
        public async Task<bool> UpdateStatusAsync(int id, TicketStatus ticketStatus)
        {
            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket == null) { 
                return false;
            }
            ticket.Status = ticketStatus;
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteAsync(int id) {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return false;
            }
            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<List<Ticket>> GetAllAsync(TicketStatus? status, TicketPriority? priority, string? search)
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
                query = query.Where(t => t.Title.ToLower().Contains(term));
            }
            return await query.ToListAsync();
        }

    }
}
