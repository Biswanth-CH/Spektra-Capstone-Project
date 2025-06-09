namespace Backend.DTOs
{
    public class AdminProfileDto
    {
        public int AdminId { get; set; }
        public string ProfilePic { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public long Phone { get; set; }
        public string Department { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
    }

}
