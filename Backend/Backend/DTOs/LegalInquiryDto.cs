namespace Backend.DTOs
{
    public class LegalInquiryDto
    {
        public int LegalInquiryId { get; set; }
        public int UserId { get; set; }
        public string Category { get; set; }
        public string Priority { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public string Information { get; set; }
        public string Document { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
    }

}
