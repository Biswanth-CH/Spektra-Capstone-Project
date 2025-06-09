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
    public class UserController : Controller
    {
        private readonly AppDbContext app;
        private readonly JwtSevice jwtSevice;

        public UserController(AppDbContext app, JwtSevice jwtSevice)
        {
            this.app = app;
            this.jwtSevice = jwtSevice;
        }
        [AllowAnonymous]
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] UserProfileDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest("Email and Password are required.");

            var exists = await app.UserProfiles.AnyAsync(x => x.Email == dto.Email);
            if (exists) return Conflict("Email already registered.");

            var entity = new UserProfile
            {
                ProfilePic = dto.ProfilePic,
                FullName = dto.FullName,
                Email = dto.Email,
                Phone = dto.Phone,
                Password = dto.Password, // TODO: Hash password
                CreatedAt = dto.CreatedAt,
                CreatedBy = dto.CreatedBy
            };

            await app.UserProfiles.AddAsync(entity);
            await app.SaveChangesAsync();

            return Ok("User created successfully.");
        }
        [AllowAnonymous]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await app.UserProfiles.FromSqlRaw("EXEC GetallDetailsUsers").ToListAsync();
            return Ok(users);
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await app.UserProfiles.FindAsync(id);
            if (user == null) return NotFound("User not found.");
            return Ok(user);
        }
        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserProfileDto dto)
        {
            var existingUser = await app.UserProfiles.FindAsync(id);
            if (existingUser == null)
                return NotFound($"User with ID {id} not found.");

            existingUser.ProfilePic = dto.ProfilePic;
            existingUser.FullName = dto.FullName;
            existingUser.Email = dto.Email;
            existingUser.Phone = dto.Phone;
            existingUser.Password = dto.Password; // TODO: Hash in production

            app.UserProfiles.Update(existingUser);
            await app.SaveChangesAsync();

            return Ok(existingUser);
        }
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await app.UserProfiles.FindAsync(id);
            if (user == null) return NotFound("User not found.");

            app.UserProfiles.Remove(user);
            await app.SaveChangesAsync();
            return Ok("User deleted successfully.");
        }

        [AllowAnonymous]
        [HttpPost("userlogin")]
        public async Task<IActionResult> UserLogin([FromBody] UserLoginRequestDto val)
        {
            if (string.IsNullOrWhiteSpace(val.Email) || string.IsNullOrWhiteSpace(val.Password))
                return BadRequest("Email and password are required.");

            var user = await app.UserProfiles.FirstOrDefaultAsync(e => e.Email == val.Email);

            if (user == null || user.Password != val.Password) // TODO: Replace with hashed password check
                return Unauthorized("Invalid email or password.");

            var token = await jwtSevice.Authenticate(val);
            if (string.IsNullOrWhiteSpace(token))
                return Unauthorized("Token generation failed.");

            return Ok(token);
        }
        [AllowAnonymous]
        [HttpGet("userrequests")]
        public async Task<IActionResult> GetRequests()
        {
            var result = await app.UserRequests.ToListAsync();
            if (result == null || !result.Any())
                return NotFound("No user requests found.");

            return Ok(result);
        }
    }
    public class UserLoginRequestDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
