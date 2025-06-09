using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class PassportRenewal
    {
        [Key]
        public int PassportRenewalId { get; set; }

        [ForeignKey("UserProfile")]
        public int UserId { get; set; }
        public UserProfile UserProfile { get; set; }
        [Required]

        public string FullName { get; set; }
        public DateTime DOB { get; set; }
        [Required]
        public string PassportNumber { get; set; }
        [Required]
        public string EmailAddress { get; set; }
        [Required]
        public string ResidentialAddress { get; set; }
        public string PassportSizedPhoto { get; set; }
        public string GovernmentIssuedId { get; set; }
        public string ConfirmationNumber { get; set; }

        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
    }
}