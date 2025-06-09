using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class UserProfileDto
    {
        [Key]
        public int UserId { get; set; }
        public string ProfilePic { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public long Phone { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
    }

}
