using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class UserAddressAndCompanyNameCode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "AspNetUsers",
                type: "varchar(64)",
                maxLength: 64,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "CompanyCode",
                table: "AspNetUsers",
                type: "varchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "AspNetUsers",
                type: "varchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "AspNetUsers",
                type: "varchar(64)",
                maxLength: 64,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "County",
                table: "AspNetUsers",
                type: "varchar(64)",
                maxLength: 64,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "PostCode",
                table: "AspNetUsers",
                type: "varchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Street",
                table: "AspNetUsers",
                type: "varchar(64)",
                maxLength: 64,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "StreetNo",
                table: "AspNetUsers",
                type: "varchar(5)",
                maxLength: 5,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { 1, null, "admin", "ADMIN" },
                    { 2, null, "customer", "CUSTOMER" },
                    { 3, null, "company", "COMPANY" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "City", "CompanyCode", "CompanyName", "ConcurrencyStamp", "Country", "County", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "PostCode", "SecurityStamp", "Street", "StreetNo", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { 1, 0, "", "", "", "d4db5ab7-a09a-490b-9325-fe3e49790541", "", "", "admin@admin.com", true, "Admy", "Nisterson", false, null, "ADMIN@ADMIN.COM", "ADMIN@ADMIN.COM", "AQAAAAEAACcQAAAAEK4hVsHx9G6FTUDDlJaY/l1aRXqpoUZU9nkEkvECUI2uQ+FHoFYHjlJpmP3KOss/qg==", null, false, "", "3fe42819-d5d5-4379-b5c9-e5e569f17112", "", "", false, "admin@admin.com" },
                    { 2, 0, "", "", "", "a7971687-142e-4551-9880-35582d5f5081", "", "", "customer@example.com", false, "Cuzy", "Tomerson", false, null, "CUSTOMER@EXAMPLE.COM", "CUSTOMER@EXAMPLE.COM", "AQAAAAEAACcQAAAAEK4hVsHx9G6FTUDDlJaY/l1aRXqpoUZU9nkEkvECUI2uQ+FHoFYHjlJpmP3KOss/qg==", null, false, "", "87c60707-64a4-46f4-9346-609b5f12539e", "", "", false, "customer@example.com" },
                    { 3, 0, "", "123456", "UAB „Tikra įmonė“", "b593cf85-dd9a-412c-b0ea-c6a28a3d392e", "", "", "company@example.com", true, "", "", false, null, "COMPANY@EXAMPLE.COM", "COMPANY@EXAMPLE.COM", "AQAAAAEAACcQAAAAEK4hVsHx9G6FTUDDlJaY/l1aRXqpoUZU9nkEkvECUI2uQ+FHoFYHjlJpmP3KOss/qg==", null, false, "", "62891791-d6b1-4427-9daa-d1cd56a4589f", "", "", false, "company@example.com" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 2 },
                    { 3, 3 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { 3, 3 });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "City",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CompanyCode",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "County",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PostCode",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Street",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "StreetNo",
                table: "AspNetUsers");
        }
    }
}
