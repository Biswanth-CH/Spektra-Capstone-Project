using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class AdminLogin
    {
        [Key]
        public int LoginId { get; set; }

        [ForeignKey("AdminProfile")]
        public int AdminId { get; set; }
        public AdminProfile AdminProfile { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public DateTime? LastLogin { get; set; }

        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
    }
}