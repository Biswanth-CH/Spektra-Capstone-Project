namespace Backend.DTOs
{
    public class TaxFilingDto
    {
        public int TaxFilingId { get; set; }
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long SSN { get; set; }
        public string FilingStatus { get; set; }
        public decimal W2Income { get; set; }
        public decimal Freelance1099Income { get; set; }
        public string StandardDeduction { get; set; }
        public decimal CharitableDonations { get; set; }
        public decimal MortgageInterestPaid { get; set; }
        public decimal EstimatedTaxRefund { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
    }

}
