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
    public class TaxfillingController : Controller
    {
        private readonly AppDbContext _context;

        public TaxfillingController(AppDbContext context)
        {
            _context = context;
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateTaxFiling([FromBody] TaxFilingDto dto)
        {
            var sql = @"
        INSERT INTO TaxFilings 
        (UserId, FirstName, LastName, SSN, FilingStatus, W2Income, Freelance1099Income, 
         StandardDeduction, CharitableDonations, MortgageInterestPaid, EstimatedTaxRefund, 
         CreatedAt, CreatedBy) 
        VALUES 
        (@UserId, @FirstName, @LastName, @SSN, @FilingStatus, @W2Income, @Freelance1099Income, 
         @StandardDeduction, @CharitableDonations, @MortgageInterestPaid, @EstimatedTaxRefund, 
         @CreatedAt, @CreatedBy);";

            var parameters = new[]
            {
        new SqlParameter("@UserId", dto.UserId),
        new SqlParameter("@FirstName", dto.FirstName),
        new SqlParameter("@LastName", dto.LastName),
        new SqlParameter("@SSN", dto.SSN),
        new SqlParameter("@FilingStatus", dto.FilingStatus),
        new SqlParameter("@W2Income", dto.W2Income),
        new SqlParameter("@Freelance1099Income", dto.Freelance1099Income),
        new SqlParameter("@StandardDeduction", dto.StandardDeduction),
        new SqlParameter("@CharitableDonations", dto.CharitableDonations),
        new SqlParameter("@MortgageInterestPaid", dto.MortgageInterestPaid),
        new SqlParameter("@EstimatedTaxRefund", dto.EstimatedTaxRefund),
        new SqlParameter("@CreatedAt", dto.CreatedAt),
        new SqlParameter("@CreatedBy", dto.CreatedBy)
    };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);

            return Ok("Tax filing submitted.");
        }



        // GET ALL
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _context.TaxFilings.ToListAsync();
            return Ok(list);
        }

        // GET BY ID
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var filing = await _context.TaxFilings.FindAsync(id);
            if (filing == null) return NotFound("Record not found.");
            return Ok(filing);
        }

        // PUT
        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TaxFilingDto dto)
        {
            var entity = await _context.TaxFilings.FindAsync(id);
            if (entity == null) return NotFound("Record not found.");

            entity.FirstName = dto.FirstName;
            entity.LastName = dto.LastName;
            entity.SSN = dto.SSN;
            entity.FilingStatus = dto.FilingStatus;
            entity.W2Income = dto.W2Income;
            entity.Freelance1099Income = dto.Freelance1099Income;
            entity.StandardDeduction = dto.StandardDeduction;
            entity.CharitableDonations = dto.CharitableDonations;
            entity.MortgageInterestPaid = dto.MortgageInterestPaid;
            entity.EstimatedTaxRefund = dto.EstimatedTaxRefund;

            _context.TaxFilings.Update(entity);
            await _context.SaveChangesAsync();
            return Ok("Tax filing updated.");
        }

        // DELETE
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _context.TaxFilings.FindAsync(id);
            if (entity == null) return NotFound("Record not found.");

            _context.TaxFilings.Remove(entity);
            await _context.SaveChangesAsync();
            return Ok("Tax filing deleted.");
        }
    }
}
