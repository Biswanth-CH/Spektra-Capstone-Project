using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class UserRequest
    {
        [Key]
        public int UserRequestId { get; set; }

        [ForeignKey("UserProfile")]
        public int UserId { get; set; }
        public UserProfile UserProfile { get; set; }
        [Required]
        public string RequestType { get; set; }
        public int RelatedRecordId { get; set; }
        public string Status { get; set; }

        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
    }
}