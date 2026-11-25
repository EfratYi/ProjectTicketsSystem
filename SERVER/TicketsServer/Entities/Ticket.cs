using System.ComponentModel.DataAnnotations;
using TicketsServer.Enums;

namespace TicketsServer.Entities
{
    public class Ticket
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="חובה להזין כותרת")]
        public string Title { get; set; } = string.Empty;
        [Required(ErrorMessage ="חובה להזין תיאור")]
        
        public string ProblemDescription { get; set; } = string.Empty;
        public TicketPriority Priority { get; set; }
        public TicketStatus Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;


    }
}
