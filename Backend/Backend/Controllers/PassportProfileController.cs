using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PassportProfileController : Controller
    {
        private readonly AppDbContext _context;

        public PassportProfileController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/PassportRenewal
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreatePassportRenewal([FromBody] PassportRenewalDto dto)
        {
            if (dto == null)
                return BadRequest("Invalid input.");

            try
            {
                var sql = @"
            INSERT INTO PassportRenewals 
                (UserId, FullName, DOB, PassportNumber, EmailAddress,
                 ResidentialAddress, PassportSizedPhoto, GovernmentIssuedId,
                 ConfirmationNumber, CreatedAt, CreatedBy)
            VALUES 
                (@UserId, @FullName, @DOB, @PassportNumber, @EmailAddress,
                 @ResidentialAddress, @PassportSizedPhoto, @GovernmentIssuedId,
                 @ConfirmationNumber, @CreatedAt, @CreatedBy);
        ";

                var parameters = new[]
                {
            new SqlParameter("@UserId", dto.UserId),
            new SqlParameter("@FullName", dto.FullName),
            new SqlParameter("@DOB", dto.DOB),
            new SqlParameter("@PassportNumber", dto.PassportNumber),
            new SqlParameter("@EmailAddress", dto.EmailAddress),
            new SqlParameter("@ResidentialAddress", dto.ResidentialAddress),
            new SqlParameter("@PassportSizedPhoto", dto.PassportSizedPhoto ?? (object)DBNull.Value),
            new SqlParameter("@GovernmentIssuedId", dto.GovernmentIssuedId ?? (object)DBNull.Value),
            new SqlParameter("@ConfirmationNumber", dto.ConfirmationNumber),
            new SqlParameter("@CreatedAt", DateTime.UtcNow),
            new SqlParameter("@CreatedBy", dto.CreatedBy),
        };

                await _context.Database.ExecuteSqlRawAsync(sql, parameters);

                return Ok("Passport renewal application created successfully.");
            }
            catch (Exception ex)
            {
                // Log the exception internally if needed
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        // DELETE: api/PassportRenewal/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePassportRenewal(int id)
        {
            var renewal = await _context.PassportRenewals.FindAsync(id);
            if (renewal == null)
                return NotFound("Passport renewal application not found.");

            _context.PassportRenewals.Remove(renewal);
            await _context.SaveChangesAsync();

            return Ok("Passport renewal application deleted successfully.");
        }
    }
}
