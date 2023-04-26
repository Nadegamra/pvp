using Backend.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class AppDbContext: IdentityDbContext<User, IdentityRole<int>, int>
    {
        public DbSet<RegistrationRequest> RegistrationRequests { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Category> Categories { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityRole<int>>().HasData(new IdentityRole<int> { Id = 1, Name = "admin", NormalizedName = "ADMIN" },
                                                            new IdentityRole<int> { Id = 2, Name = "lender", NormalizedName = "LENDER" },
                                                            new IdentityRole<int> { Id = 3, Name = "borrower", NormalizedName = "BORROWER"});

            modelBuilder.Entity<User>().HasData(new User { Id = 1, IsCompany=false, FirstName = "Admy", LastName = "Nisterson", UserName = "admin@admin.com", NormalizedUserName = "ADMIN@ADMIN.COM", Email = "admin@admin.com", EmailConfirmed=true, NormalizedEmail = "ADMIN@ADMIN.COM", PasswordHash = "AQAAAAEAACcQAAAAEK4hVsHx9G6FTUDDlJaY/l1aRXqpoUZU9nkEkvECUI2uQ+FHoFYHjlJpmP3KOss/qg==", SecurityStamp = Guid.NewGuid().ToString()},
                                                new User { Id = 2, IsCompany=false,  FirstName = "Cuzy", LastName= "Tomerson", UserName = "customer@example.com", NormalizedUserName = "CUSTOMER@EXAMPLE.COM", Email = "customer@example.com", EmailConfirmed = false, NormalizedEmail = "CUSTOMER@EXAMPLE.COM", PasswordHash = "AQAAAAEAACcQAAAAEK4hVsHx9G6FTUDDlJaY/l1aRXqpoUZU9nkEkvECUI2uQ+FHoFYHjlJpmP3KOss/qg==", SecurityStamp = Guid.NewGuid().ToString()},
                                                new User { Id = 3, IsCompany=true,  CompanyName = "UAB „Tikra įmonė“", CompanyCode = "123456", UserName = "company@example.com", NormalizedUserName = "COMPANY@EXAMPLE.COM", Email = "company@example.com", EmailConfirmed = true, NormalizedEmail = "COMPANY@EXAMPLE.COM", PasswordHash = "AQAAAAEAACcQAAAAEK4hVsHx9G6FTUDDlJaY/l1aRXqpoUZU9nkEkvECUI2uQ+FHoFYHjlJpmP3KOss/qg==", SecurityStamp = Guid.NewGuid().ToString() });

            modelBuilder.Entity<IdentityUserRole<int>>().HasData(new IdentityUserRole<int> { UserId = 1, RoleId = 1 },
                                                                 new IdentityUserRole<int> { UserId = 2, RoleId = 2 },
                                                                 new IdentityUserRole<int> { UserId = 3, RoleId = 3 });

            modelBuilder.Entity<Category>().HasData(
                new Category {Id = 1, Name = "Console", Description = ""});

            modelBuilder.Entity<Manufacturer>().HasData(
                new Manufacturer { Id = 1, Name = "PlayStation", Description = "" },
                new Manufacturer { Id = 2, Name = "Microsoft", Description = "" },
                new Manufacturer { Id = 3, Name = "Nintendo", Description = "" },
                new Manufacturer { Id = 4, Name = "Sega", Description = "" });

            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1, ManufacturerId = 1, CategoryId = 1, Name = "PS5",
                    Description = "There is no description for this product", CurrentDiscount = 0.0m,
                    PriceEurNoTaxes = 23.12m
                },
                new Product
                {
                    Id = 2, ManufacturerId = 1, CategoryId = 1, Name = "PS4",
                    Description = "There is no description for this product", CurrentDiscount = 0.0m,
                    PriceEurNoTaxes = 25.15m
                },
                new Product
                {
                    Id = 3, ManufacturerId = 2, CategoryId = 1, Name = "XBOX ONE S",
                    Description = "There is no description for this product", CurrentDiscount = 0.0m,
                    PriceEurNoTaxes = 36.13m
                },
                new Product
                {
                    Id = 4, ManufacturerId = 2, CategoryId = 1, Name = "XBOX ONE X",
                    Description = "There is no description for this product", CurrentDiscount = 0.0m,
                    PriceEurNoTaxes = 32.56m
                },
                new Product
                {
                    Id = 5, ManufacturerId = 3, CategoryId = 1, Name = "Nintendo Switch",
                    Description = "There is no description for this product", CurrentDiscount = 0.0m,
                    PriceEurNoTaxes = 39.99m
                });
            base.OnModelCreating(modelBuilder);
        }
    }
}
