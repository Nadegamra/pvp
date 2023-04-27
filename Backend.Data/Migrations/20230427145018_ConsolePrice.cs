using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class ConsolePrice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "DailyPrice",
                table: "Consoles",
                type: "decimal(65,30)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

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

            migrationBuilder.InsertData(
                table: "Consoles",
                columns: new[] { "Id", "DailyPrice", "Description", "Name" },
                values: new object[] { 1, 8m, "Microsoft Xbox One", "Xbox One" });

            migrationBuilder.InsertData(
                table: "Images",
                columns: new[] { "Id", "ConsoleId", "Description", "Name", "Path" },
                values: new object[,]
                {
                    { 1, 1, "", "1.jpeg", "gvoktfyvobny0j2umvtt" },
                    { 2, 1, "", "2.jpeg", "owdqtg9fodxw8ubvmavs" },
                    { 3, 1, "", "3.jpeg", "d0sid8ixuhrgcx4melbs" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Consoles",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.AlterColumn<string>(
                name: "DailyPrice",
                table: "Consoles",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(65,30)")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "5c8977f1-47ae-410c-a777-c684c182f918", "cd2c503f-fcf7-489a-9485-951d25c8f448" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "9cff78e7-8d27-4bce-893d-6cab02f14eaf", "778ffc08-b905-4a2a-a222-7ee1d62701df" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "0736d704-164f-45ac-980f-96e74a9149ef", "6f646498-4af5-40af-9ca6-0bd8307129c5" });
        }
    }
}
