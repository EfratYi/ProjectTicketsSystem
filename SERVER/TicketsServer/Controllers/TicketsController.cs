using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using TicketsServer.DTOs;
using TicketsServer.Entities;
using TicketsServer.Enums;
using TicketsServer.Services;

namespace TicketsServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketService _ticketService;
        public TicketsController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllTickets([FromQuery] TicketStatus? status, [FromQuery] TicketPriority? priority, [FromQuery] string? search)
        {
            var tickets=await _ticketService.GetAllTickets(status, priority, search);    
            return Ok(tickets);
        }
        [HttpPost]
        public async Task<IActionResult> CreateTicket(CreateTicketDto createTicketDto)
        {
            try
            {
                var created = await _ticketService.CreateTicket(createTicketDto);
                return StatusCode(201, created);
            }
            catch (ArgumentException ex) { 
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var success = await _ticketService.DeleteTicket(id);
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateTicketStatus(int id, [BindRequired] TicketStatus status)
        {
            var success=await _ticketService.UpdateTicketStatus(id, status);
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }
     

    }
}
