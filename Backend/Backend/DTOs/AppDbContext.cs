using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.DTOs;
namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<AdminProfile> AdminProfiles { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<ServiceRequest> ServiceRequests { get; set; }
        public DbSet<PassportRenewal> PassportRenewals { get; set; }
        public DbSet<UserRequest> UserRequests { get; set; }
        public DbSet<AdminLogin> AdminLogins { get; set; }
        public DbSet<UserLogin> UserLogins { get; set; }
        public DbSet<UserProfileDto> userprofileinfo { get; set; }
        public DbSet<LegalInquiry> LegalInquiries { get; set; }
        public DbSet<TaxFiling> TaxFilings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserProfileDto>().HasNoKey();

        }
    }
}