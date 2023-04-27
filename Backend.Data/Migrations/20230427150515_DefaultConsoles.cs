using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class DefaultConsoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "f43b79f0-f67e-4f3a-9698-ab41575a6022", "beb57e8d-c77b-405f-9e7a-780498421def" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "a887db35-d6a2-4b10-92da-a34d8d39aa80", "ca44bcf8-99cf-49dd-b20b-2909591e0eab" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "05582702-5122-4d58-9e82-b5899c1ee869", "7f28a548-b3d3-4785-9e05-ea0485e2ae73" });

            migrationBuilder.InsertData(
                table: "Consoles",
                columns: new[] { "Id", "DailyPrice", "Description", "Name" },
                values: new object[] { 2, 9m, "Sony Playstation 5", "Playstation 5" });

            migrationBuilder.InsertData(
                table: "Images",
                columns: new[] { "Id", "ConsoleId", "Description", "Name", "Path" },
                values: new object[,]
                {
                    { 4, 2, "", "P5.webp", "tmhke7yuza1v9zhourmc" },
                    { 5, 2, "", "P5.jpeg", "hjzaamg3uuftq1vsgctt" },
                    { 6, 2, "", "P5.png", "dnj7iggkdupgcl9wdide" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Consoles",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "3a2ff31b-d4f8-4870-a825-b5cc53e5295d", "524d0db3-f1ea-41ce-8a47-c9a6bb3f4265" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "1ab61072-67ea-49de-92be-c75d5f205d75", "8c5d5da4-99c7-47bd-912e-e643bff86188" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "3d0c37e3-973f-4ebb-b59c-b2fb14c7da38", "050af067-16fb-4c1a-8fef-8fd7e8d42679" });
        }
    }
}
