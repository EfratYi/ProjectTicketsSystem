using TicketsServer.Enums;

namespace TicketsServer.Entities
{
    public class Ticket
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string ProblemDescription { get; set; } = string.Empty;
        public TicketPriority Priority { get; set; }
        public TicketStatus Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;


    }
}
