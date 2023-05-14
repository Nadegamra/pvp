using Backend.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace Backend.Data
{
    public class AppDbContext: IdentityDbContext<User, IdentityRole<int>, int>
    {
        public DbSet<RegistrationRequest> RegistrationRequests { get; set; }
        
        public DbSet<Models.Console> Consoles  { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<EmailChangeToken> EmailChangeTokens { get; set; }
        public DbSet<EmailConfirmationToken> EmailConfirmationTokens { get; set; }
        public DbSet<PasswordResetToken> PasswordResetTokens { get; set; }
        public DbSet<UserConsole> UserConsoles { get; set; }
        public DbSet<Borrowing> Borrowings { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Message> Messages { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models.Console>()
                .HasMany(a => a.Images)
                .WithOne(c => c.Console)
                .HasForeignKey(a => a.ConsoleId);

            modelBuilder.Entity<UserConsole>()
                .HasMany(a => a.Images)
                .WithOne(c => c.UserConsole)
                .HasForeignKey(a => a.UserConsoleId);

            modelBuilder.Entity<IdentityRole<int>>().HasData(new IdentityRole<int> { Id = 1, Name = "admin", NormalizedName = "ADMIN" },
                                                            new IdentityRole<int> { Id = 2, Name = "lender", NormalizedName = "LENDER" },
                                                            new IdentityRole<int> { Id = 3, Name = "borrower", NormalizedName = "BORROWER"});

            modelBuilder.Entity<User>().HasData(new User { Id = 1, IsCompany=false, FirstName = "Admy", LastName = "Nisterson", UserName = "admin@admin.com", NormalizedUserName = "ADMIN@ADMIN.COM", Email = "admin@admin.com", EmailConfirmed=true, NormalizedEmail = "ADMIN@ADMIN.COM", PasswordHash = "AQAAAAEAACcQAAAAEK4hVsHx9G6FTUDDlJaY/l1aRXqpoUZU9nkEkvECUI2uQ+FHoFYHjlJpmP3KOss/qg==", SecurityStamp = Guid.NewGuid().ToString()},
                                                new User { Id = 2, IsCompany=false,  FirstName = "Cuzy", LastName= "Tomerson", UserName = "customer@example.com", NormalizedUserName = "CUSTOMER@EXAMPLE.COM", Email = "customer@example.com", EmailConfirmed = false, NormalizedEmail = "CUSTOMER@EXAMPLE.COM", PasswordHash = "AQAAAAEAACcQAAAAEK4hVsHx9G6FTUDDlJaY/l1aRXqpoUZU9nkEkvECUI2uQ+FHoFYHjlJpmP3KOss/qg==", SecurityStamp = Guid.NewGuid().ToString()},
                                                new User { Id = 3, IsCompany=true,  CompanyName = "UAB „Tikra įmonė“", CompanyCode = "123456", UserName = "company@example.com", NormalizedUserName = "COMPANY@EXAMPLE.COM", Email = "company@example.com", EmailConfirmed = true, NormalizedEmail = "COMPANY@EXAMPLE.COM", PasswordHash = "AQAAAAEAACcQAAAAEK4hVsHx9G6FTUDDlJaY/l1aRXqpoUZU9nkEkvECUI2uQ+FHoFYHjlJpmP3KOss/qg==", SecurityStamp = Guid.NewGuid().ToString() });

            modelBuilder.Entity<IdentityUserRole<int>>().HasData(new IdentityUserRole<int> { UserId = 1, RoleId = 1 },
                                                                 new IdentityUserRole<int> { UserId = 2, RoleId = 2 },
                                                                 new IdentityUserRole<int> { UserId = 3, RoleId = 3 });

            modelBuilder.Entity<Models.Console>().HasData(new Models.Console { Id = 1, Name = "Xbox One", Description = "Microsoft Xbox One", DailyPrice = 8 },
                                                          new Models.Console { Id = 2, Name = "Playstation 5", Description = "Sony Playstation 5", DailyPrice = 9});

            modelBuilder.Entity<Image>().HasData(new Image { Id = 1, Path = "gvoktfyvobny0j2umvtt", Name = "1.jpeg", Description = "", ConsoleId = 1 },
                                                new Image { Id = 2, Path = "owdqtg9fodxw8ubvmavs", Name = "2.jpeg", Description = "", ConsoleId = 1 },
                                                new Image { Id = 3, Path = "d0sid8ixuhrgcx4melbs", Name = "3.jpeg", Description = "", ConsoleId = 1 },
                                                new Image { Id = 4, Path = "tmhke7yuza1v9zhourmc", Name = "P5.webp", Description = "", ConsoleId = 2 },
                                                new Image { Id = 5, Path = "hjzaamg3uuftq1vsgctt", Name = "P5.jpeg", Description = "", ConsoleId = 2 },
                                                new Image { Id = 6, Path = "dnj7iggkdupgcl9wdide", Name = "P5.png", Description = "", ConsoleId = 2 }
                                                );


            base.OnModelCreating(modelBuilder);
        }
    }
}
