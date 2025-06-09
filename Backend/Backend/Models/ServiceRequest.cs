using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class ServiceRequest
    {
        [Key]
        public int ServiceId { get; set; }
        [Required]
        public string ServiceName { get; set; }
        public string Description { get; set; }
        [Required]
        public string Status { get; set; }

        [ForeignKey("AdminProfile")]
        public int AdminId { get; set; }
        public AdminProfile AdminProfile { get; set; }

        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
    }
}