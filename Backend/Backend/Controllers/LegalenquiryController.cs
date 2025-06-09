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
    public class LegalenquiryController:ControllerBase
    {
        private readonly AppDbContext _context;

        public LegalenquiryController(AppDbContext context)
        {
            _context = context;
        }

        // CREATE
        [HttpPost]
        public async Task<IActionResult> CreateLegalInquiry([FromBody] LegalInquiryDto dto)
        {
            var sql = @"
        INSERT INTO LegalInquiries 
        (UserId, Category, Priority, Subject, Description, Information, Document, CreatedAt, CreatedBy) 
        VALUES 
        (@UserId, @Category, @Priority, @Subject, @Description, @Information, @Document, @CreatedAt, @CreatedBy);";

            var parameters = new[]
            {
        new SqlParameter("@UserId", dto.UserId),
        new SqlParameter("@Category", dto.Category),
        new SqlParameter("@Priority", dto.Priority),
        new SqlParameter("@Subject", dto.Subject),
        new SqlParameter("@Description", dto.Description),
        new SqlParameter("@Information", dto.Information),
        new SqlParameter("@Document", dto.Document),
        new SqlParameter("@CreatedAt", DateTime.UtcNow),
        new SqlParameter("@CreatedBy", dto.CreatedBy)
    };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);

            return Ok("Legal inquiry created successfully.");
        }


        // READ ALL
        [HttpGet]
        public async Task<IActionResult> GetAllInquiries()
        {
            var data = await _context.LegalInquiries.ToListAsync();
            return Ok(data);
        }

        // READ BY ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInquiryById(int id)
        {
            var inquiry = await _context.LegalInquiries.FindAsync(id);
            if (inquiry == null)
                return NotFound("Legal inquiry not found.");

            return Ok(inquiry);
        }

        // UPDATE
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLegalInquiry(int id, [FromBody] LegalInquiryDto dto)
        {
            var entity = await _context.LegalInquiries.FindAsync(id);
            if (entity == null)
                return NotFound("Legal inquiry not found.");

            entity.Category = dto.Category;
            entity.Priority = dto.Priority;
            entity.Subject = dto.Subject;
            entity.Description = dto.Description;
            entity.Information = dto.Information;
            entity.Document = dto.Document;

            _context.LegalInquiries.Update(entity);
            await _context.SaveChangesAsync();

            return Ok("Legal inquiry updated successfully.");
        }

        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLegalInquiry(int id)
        {
            var entity = await _context.LegalInquiries.FindAsync(id);
            if (entity == null)
                return NotFound("Legal inquiry not found.");

            _context.LegalInquiries.Remove(entity);
            await _context.SaveChangesAsync();

            return Ok("Legal inquiry deleted successfully.");
        }
    }
}
