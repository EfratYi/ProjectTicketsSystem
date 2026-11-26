using TicketsServer.DTOs;
using TicketsServer.Entities;
using TicketsServer.Enums;
using TicketsServer.Repository;
namespace TicketsServer.Services
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _ticketRepository;
        
        public TicketService(ITicketRepository ticketRepository) {
            _ticketRepository = ticketRepository; 
        }
        public async Task<TicketDto> CreateTicket(CreateTicketDto ticketDto)
        {
            if(ticketDto == null) throw new ArgumentNullException(nameof(ticketDto));
            var ticket = new Ticket
            {
                Title = ticketDto.Title,
                ProblemDescription = ticketDto.ProblemDescription,
                Priority = ticketDto.Priority,
                Status = ticketDto.Status,
            };
            var creatTicket= await _ticketRepository.CreateAsync(ticket);
            return new TicketDto
            {
                Id = creatTicket.Id,
                Title = creatTicket.Title,
                ProblemDescription = creatTicket.ProblemDescription,
                Priority = creatTicket.Priority,
                Status = creatTicket.Status,
                CreatedAt = creatTicket.CreatedAt
            }; 

        }
        public async Task<bool> UpdateTicketStatus(int id, TicketStatus ticketStatus)
        {
            await _ticketRepository.UpdateStatusAsync(id,ticketStatus);
           
            return true;
        }
        public async Task<bool> DeleteTicket(int id)
        {
            return await _ticketRepository.DeleteAsync(id);
            
        }
        public async Task<List<TicketDto>> GetAllTickets(TicketFilter? ticketFilter, string? search)
        {
            var ticketes = await _ticketRepository.GetAllAsync(ticketFilter, search);
            return ticketes.Select(e => new TicketDto
            {
                Id = e.Id,
                Title = e.Title,
                ProblemDescription = e.ProblemDescription,
                Priority = e.Priority,
                Status = e.Status,
                CreatedAt = e.CreatedAt,
            }).ToList();
        }
    }

}
