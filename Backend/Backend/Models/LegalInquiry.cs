using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class LegalInquiry
    {
        [Key]
        public int LegalInquiryId { get; set; }

        [ForeignKey("UserProfile")]
        public int UserId { get; set; }
        public UserProfile UserProfile { get; set; }
        [Required]

        public string Category { get; set; }
        [Required]
        public string Priority { get; set; }
        [Required]
        public string Subject { get; set; }
        public string Description { get; set; }
        public string Information { get; set; }
        public string Document { get; set; }

        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
    }
}