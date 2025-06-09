using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class TaxFiling
    {
        [Key]
        public int TaxFilingId { get; set; }

        [ForeignKey("UserProfile")]
        public int UserId { get; set; }
        public UserProfile UserProfile { get; set; }
        [Required]

        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public long SSN { get; set; }
        [Required]
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