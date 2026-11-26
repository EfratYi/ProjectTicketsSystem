namespace TicketsServer.Enums
{
    public enum TicketPriority { 
        Low = 0,
        High = 1,
        Medium = 2,
    }
    public enum TicketStatus {  
        Open = 0,
        InProgress = 1,
        Closed = 2,
    }
    public record TicketFilter(
     TicketStatus? Status = null,
     TicketPriority? Priority = null
     );
}
