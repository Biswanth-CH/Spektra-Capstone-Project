namespace Backend.DTOs
{
    public class AdminLoginDto
    {
        public int LoginId { get; set; }
        public int AdminId { get; set; }
        public string Username { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
    }

}
