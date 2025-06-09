namespace Backend.DTOs
{
    public class ServiceRequestDto
    {
        public int ServiceId { get; set; }
        public string ServiceName { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public int AdminId { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
    }

}
