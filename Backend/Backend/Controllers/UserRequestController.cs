using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRequestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserRequestController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/UserRequest
        [HttpPost]
        public async Task<IActionResult> CreateUserRequest([FromBody] UserRequestDto dto)
        {
            var entity = new UserRequest
            {
                UserId = dto.UserId,
                RequestType = dto.RequestType,
                RelatedRecordId = dto.RelatedRecordId,
                Status = dto.Status,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = dto.CreatedBy
            };

            _context.UserRequests.Add(entity);
            await _context.SaveChangesAsync();
            return Ok("User request created successfully.");
        }

        // GET: api/UserRequest
        [HttpGet]
        public async Task<IActionResult> GetAllRequests()
        {
            var data = await _context.UserRequests.ToListAsync();
            return Ok(data);
        }

        // GET: api/UserRequest/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRequestById(int id)
        {
            var requests = await _context.UserRequests.ToListAsync();
            var res = requests.Where(e => e.UserId == id).ToList();

            if (res == null || !res.Any())
                return NotFound("User request not found.");

            return Ok(res);

        }

        // PUT: api/UserRequest/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserRequest(int id, [FromBody] UserRequestDto dto)
        {
            var entity = await _context.UserRequests.FindAsync(id);
            if (entity == null)
                return NotFound("User request not found.");

            entity.RequestType = dto.RequestType;
            entity.RelatedRecordId = dto.RelatedRecordId;
            entity.Status = dto.Status;
            entity.CreatedAt = dto.CreatedAt;
            entity.CreatedBy = dto.CreatedBy;

            _context.UserRequests.Update(entity);
            await _context.SaveChangesAsync();

            return Ok("User request updated successfully.");
        }


        // DELETE: api/UserRequest/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserRequest(int id)
        {
            var entity = await _context.UserRequests.FindAsync(id);
            if (entity == null)
                return NotFound("User request not found.");

            _context.UserRequests.Remove(entity);
            await _context.SaveChangesAsync();
            return Ok("User request deleted successfully.");
        }
    }
}
