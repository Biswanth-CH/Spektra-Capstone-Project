using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class AdminProfile
    {
        [Key]
        public int AdminId { get; set; }
        public string ProfilePic { get; set; }
        [Required]
        public string FullName { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        public long Phone { get; set; }
        [Required]
        public string Department { get; set; }
        [Required]
        public string Role { get; set; }
        public string Password { get; set; }

        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }

        public ICollection<ServiceRequest> ServiceRequests { get; set; }
        public ICollection<AdminLogin> AdminLogins { get; set; }
    }
}