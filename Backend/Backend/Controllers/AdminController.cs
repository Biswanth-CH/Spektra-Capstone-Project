using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AdminController : Controller
    {
        
        private readonly AppDbContext app;
        private readonly JwtSevice jwtSevice;
        public AdminController(AppDbContext app,JwtSevice jwtSevice)
        {
            this.app = app;
            this.jwtSevice = jwtSevice;
        }
        [HttpPost("id")]
        public async Task<IActionResult> CreateUser([FromBody] AdminProfileDto dto)
        {
            // Check for duplicate email
            if (await app.AdminProfiles.AnyAsync(a => a.Email == dto.Email))
            {
                return Conflict("Email already exists.");
            }

            // Map DTO to Entity
            var admin = new AdminProfile
            {
                ProfilePic = dto.ProfilePic,
                FullName = dto.FullName,
                Email = dto.Email,
                Phone = dto.Phone,
                Department = dto.Department,
                Role = dto.Role,
                Password = dto.Password, // In production, hash this
                CreatedAt = dto.CreatedAt,
                CreatedBy = dto.CreatedBy
            };

            // Add entity to context
            await app.AdminProfiles.AddAsync(admin);
            await app.SaveChangesAsync();

            return Ok("Admin created successfully.");
        }


        // READ ALL
        [HttpGet("all")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await app.AdminProfiles.ToListAsync();
            return Ok(users);
        }

        // READ BY ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await app.AdminProfiles.FindAsync(id);
            if (user == null) return NotFound("User not found.");
            return Ok(user);
        }

        // UPDATE
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserProfileDto dto)
        {
            var user = await app.AdminProfiles.FindAsync(id);
            if (user == null) return NotFound("User not found.");

            /*user.Name = dto.Name;
            user.Email = dto.Email;
            user.Password = dto.Password; // NOTE: Hash in production

            app.UserProfiles.Update(user);
            await app.SaveChangesAsync();*/
            return Ok("User updated successfully.");
        }

        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await app.AdminProfiles.FindAsync(id);
            if (user == null) return NotFound("User not found.");

            app.AdminProfiles.Remove(user);
            await app.SaveChangesAsync();
            return Ok("User deleted successfully.");
        }

        // LOGIN (already defined)
        [AllowAnonymous]
        [HttpPost("adminlogin")]
        public async Task<IActionResult> UserLogin([FromBody] AdminLoginDtos val)
        {
            var user = await app.AdminProfiles
                .FirstOrDefaultAsync(e => e.Email == val.Email && e.Password == val.Password);

            if (user == null)
            {
                return BadRequest("Invalid credentials.");
            }
            var token = await jwtSevice.AuthenticateAdmin(val);
            if (token == null) return Unauthorized();
            return Ok(token);
        }

        [HttpGet("email/{email}")]
        public async Task<IActionResult> GetUserByemail(string email)
        {
            var user = await app.AdminProfiles.FirstOrDefaultAsync(e=>e.Email==email);
            if (user == null) return NotFound("User not found.");
            return Ok(user);
        }
        [AllowAnonymous]
        [HttpGet("analytics")]
        public async Task<IActionResult> GetAnalytics()
        {
            var analytics = new
            {
                admin_profiles = await app.AdminProfiles.CountAsync(),
                legal_Inquiries = await app.LegalInquiries.CountAsync(),
                Passport_Renewals = await app.PassportRenewals.CountAsync(),
                Tax_Filings = await app.TaxFilings.CountAsync(),
                User_logins = await app.UserLogins.CountAsync(),
                Reviewsinfo = await app.UserProfiles.CountAsync(),
                User_Requests = await app.UserRequests.CountAsync(),
                Service_Requests = await app.ServiceRequests.CountAsync()

            };
            return Ok(analytics);
        }

        [AllowAnonymous]
        [HttpGet("analytics/user/{userId}")]
        public async Task<IActionResult> GetAnalyticsByUserId(string userId)
        {
            if (!int.TryParse(userId, out int userIdInt))
            {
                return BadRequest("Invalid userId parameter");
            }

            var analytics = new
            {
                passport_Renewals = await app.PassportRenewals.CountAsync(r => r.UserId == userIdInt),
                tax_Filings = await app.TaxFilings.CountAsync(r => r.UserId == userIdInt),
                legal_Inquiries = await app.LegalInquiries.CountAsync(r => r.UserId == userIdInt),
                user_Requests = await app.UserRequests.CountAsync(r => r.UserId == userIdInt)
            };
            return Ok(analytics);
        }

    }

    public class AdminloginRequestDto
    {
        public string Email { set; get; }
        public string Password { set;get; }
    }
}
