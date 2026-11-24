using TicketsServer.Enums;

namespace TicketsServer.DTOs
{
    public class CreateTicketDto
    {
        public string Title { get; set; } = string.Empty;
        public string ProblemDescription { get; set; } = string.Empty;
        public TicketPriority Priority { get; set; }
        public TicketStatus Status { get; set; }
        
    }
}
