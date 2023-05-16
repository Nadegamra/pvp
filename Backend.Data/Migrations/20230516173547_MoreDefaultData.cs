using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class MoreDefaultData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "c773a3e4-dae1-41e7-9181-e43437255ef2", "549ffbfc-2db9-4373-9e79-778291a167c8" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "191bf0ec-f327-4389-bdcf-52b86dd3063f", "b9f1161b-1a3e-4b2e-899c-3170fad74f0a" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "4b94dd84-0a30-4da4-8f08-fff383d68b7e", "6b335e28-a95d-41ae-bd17-3ac650dfe457" });

            migrationBuilder.InsertData(
                table: "Consoles",
                columns: new[] { "Id", "DailyPrice", "Description", "Name" },
                values: new object[] { 3, 7m, "Nintendo Switch", "Switch" });

            migrationBuilder.InsertData(
                table: "UserConsoles",
                columns: new[] { "Id", "Accessories", "Amount", "BorrowingId", "ConsoleId", "ConsoleStatus", "ConversationId", "UserId" },
                values: new object[,]
                {
                    { 1, "1 controller", 1, null, 1, 0, null, 2 },
                    { 2, "2 controllers", 1, null, 2, 0, null, 2 }
                });

            migrationBuilder.InsertData(
                table: "Images",
                columns: new[] { "Id", "ConsoleId", "Description", "Name", "Path", "UserConsoleId" },
                values: new object[,]
                {
                    { 7, 3, "", "SW1.jpeg", "eklt5qq9dci76xad67v7", null },
                    { 8, 3, "", "SW2.jpeg", "o8m586cvirnmfxeqh4v6", null },
                    { 9, 3, "", "SW3.jpeg", "arvmwbr83mqwshwyruqk", null },
                    { 10, null, "", "1.jpg", "qumlht6wjyklm6htfh3y", 1 },
                    { 11, null, "", "2.jpg", "qfx54nyuroewwoch473n", 1 },
                    { 12, null, "", "1.jpg", "t7dse874m3o03syqkyix", 2 },
                    { 13, null, "", "2.jpg", "ippxzihzs29akhhxd9xn", 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Consoles",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "14b1da77-79d4-4239-b082-96daffdf4afd", "0e0f9a2e-5c7d-4dd0-b17d-61ae413f4fe9" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "24c60b23-d9f9-4fd9-b62e-1d36241018a2", "4295537a-2a99-4b39-a190-5aa5064269d1" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "abfda497-8557-4ef1-8102-14a65da83a81", "da9338e6-e363-4049-b947-865e1207b995" });
        }
    }
}
