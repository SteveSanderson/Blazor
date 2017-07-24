using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore.Design;

namespace BackEnd.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Attendee>()
               .HasIndex(a => a.UserName)
               .IsUnique();

            // Many-to-many: Conference <-> Attendee
            modelBuilder.Entity<ConferenceAttendee>()
                .HasKey(ca => new { ca.ConferenceID, ca.AttendeeID });

            // Many-to-many: Speaker <-> Session
            modelBuilder.Entity<SessionSpeaker>()
                .HasKey(ss => new { ss.SessionId, ss.SpeakerId});

            // Many-to-many: Session <-> Tag
            modelBuilder.Entity<SessionTag>()
                .HasKey(st => new { st.SessionID, st.TagID });
        }

        public DbSet<Conference> Conferences { get; set; }

        public DbSet<Session> Sessions { get; set; }

        public DbSet<Track> Tracks { get; set; }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<Speaker> Speakers { get; set; }

        public DbSet<Attendee> Attendees { get; set; }
    }

    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args) =>
            Program.BuildWebHost(args).Services.CreateScope().ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
    }
}
