using Backend.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class AppDbContext: IdentityDbContext<User, IdentityRole<int>, int>
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityRole<int>>().HasData(new IdentityRole<int> { Id = 1, Name = "admin", NormalizedName = "ADMIN" },
                                                            new IdentityRole<int> { Id = 2, Name = "user", NormalizedName = "USER" });

            modelBuilder.Entity<User>().HasData(new User { Id = 1, UserName = "admin@admin.com", NormalizedUserName = "ADMIN@ADMIN.COM", Email = "admin@admin.com", NormalizedEmail = "ADMIN@ADMIN.COM", PasswordHash = "AQAAAAEAACcQAAAAEK4hVsHx9G6FTUDDlJaY/l1aRXqpoUZU9nkEkvECUI2uQ+FHoFYHjlJpmP3KOss/qg==", SecurityStamp = Guid.NewGuid().ToString()},
                                                new User { Id = 2, UserName = "user@example.com", NormalizedUserName = "USER@EXAMPLE.COM", Email = "user@example.com", NormalizedEmail = "USER@EXAMPLE.COM", PasswordHash = "AQAAAAEAACcQAAAAEBD9ni3Ia0a/4ymfYFqItSYbeGLAeOfgH0vfPKkwwxjodulOXkEL95NAfP2VOEctQA==", SecurityStamp = Guid.NewGuid().ToString()});

            modelBuilder.Entity<IdentityUserRole<int>>().HasData(new IdentityUserRole<int> { UserId = 1, RoleId = 1 },
                                                                 new IdentityUserRole<int> { UserId = 2, RoleId = 2 });

            base.OnModelCreating(modelBuilder);
        }
    }
}
