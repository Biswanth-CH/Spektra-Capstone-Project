using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class UserLogin
    {
        [Key]
        public int LoginId { get; set; }

        [ForeignKey("UserProfile")]
        public int UserId { get; set; }
        public UserProfile UserProfile { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime? LastLogin { get; set; }

        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
    }
}