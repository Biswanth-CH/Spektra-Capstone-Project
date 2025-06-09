namespace Backend.DTOs
{
    public class UserRequestDto
    {
        public int UserRequestId { get; set; }
        public int UserId { get; set; }
        public string RequestType { get; set; }
        public int RelatedRecordId { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
    }

}
