using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class UserProfile
    {
        [Key]
        public int UserId { get; set; }
        public string ProfilePic { get; set; }
        public string FullName { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }

        public long Phone { get; set; }
        [Required]

        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }

        public ICollection<UserLogin> UserLogins { get; set; }
        public ICollection<UserRequest> UserRequests { get; set; }
        public ICollection<PassportRenewal> PassportRenewals { get; set; }
        public ICollection<TaxFiling> TaxFilings { get; set; }
        public ICollection<LegalInquiry> LegalInquiries { get; set; }
    }
}