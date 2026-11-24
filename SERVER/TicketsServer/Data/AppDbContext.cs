using Microsoft.EntityFrameworkCore;
using TicketsServer.Entities;
namespace TicketsServer.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Ticket> Tickets { get; set; }
    }
}
