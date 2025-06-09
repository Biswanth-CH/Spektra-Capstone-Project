namespace Backend.DTOs
{
    public class PassportRenewalDto
    {
        public int PassportRenewalId { get; set; }
        public int UserId { get; set; }
        public string FullName { get; set; }
        public DateTime DOB { get; set; }
        public string PassportNumber { get; set; }
        public string EmailAddress { get; set; }
        public string ResidentialAddress { get; set; }
        public string PassportSizedPhoto { get; set; }
        public string GovernmentIssuedId { get; set; }
        public string ConfirmationNumber { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
    }

}
