using System.ComponentModel.DataAnnotations;
using TicketsServer.Enums;

namespace TicketsServer.DTOs
{
    public class CreateTicketDto
    {
        [Required(ErrorMessage = "חובה להזין כותרת")]
        public string Title { get; set; } = string.Empty;
        [Required(ErrorMessage = "חובה להזין תיאור")]
        public string ProblemDescription { get; set; } = string.Empty;
        public TicketPriority Priority { get; set; }
        public TicketStatus Status { get; set; }
        
    }
}
