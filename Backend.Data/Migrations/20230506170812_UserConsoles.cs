using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class UserConsoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Consoles_ConsoleId",
                table: "Images");

            migrationBuilder.DropTable(
                name: "Accessories");

            migrationBuilder.AlterColumn<int>(
                name: "ConsoleId",
                table: "Images",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "UserConsoleId",
                table: "Images",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserConsoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ConsoleId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    Accessories = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ConsoleStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserConsoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserConsoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserConsoles_Consoles_ConsoleId",
                        column: x => x.ConsoleId,
                        principalTable: "Consoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "746b34fd-10f6-4055-b1b9-f3ba3f3797fb", "1aef8e2f-3c41-4f5d-a638-4795c304fbfd" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "f0ec936d-49d0-41af-8b07-87fcbfbe0eda", "7b2c71ef-8836-4d6c-8327-165605157938" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "b5d171db-5077-4cdc-bee6-0a6aba1591e2", "c7318ac4-4622-49e8-b9f9-1d1c2c95196e" });

            migrationBuilder.UpdateData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserConsoleId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 2,
                column: "UserConsoleId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 3,
                column: "UserConsoleId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 4,
                column: "UserConsoleId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 5,
                column: "UserConsoleId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 6,
                column: "UserConsoleId",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_Images_UserConsoleId",
                table: "Images",
                column: "UserConsoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserConsoles_ConsoleId",
                table: "UserConsoles",
                column: "ConsoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserConsoles_UserId",
                table: "UserConsoles",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Consoles_ConsoleId",
                table: "Images",
                column: "ConsoleId",
                principalTable: "Consoles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_UserConsoles_UserConsoleId",
                table: "Images",
                column: "UserConsoleId",
                principalTable: "UserConsoles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Consoles_ConsoleId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_UserConsoles_UserConsoleId",
                table: "Images");

            migrationBuilder.DropTable(
                name: "UserConsoles");

            migrationBuilder.DropIndex(
                name: "IX_Images_UserConsoleId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "UserConsoleId",
                table: "Images");

            migrationBuilder.AlterColumn<int>(
                name: "ConsoleId",
                table: "Images",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Accessories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Category = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accessories", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "06f0f16b-fe14-4661-ba8f-7afd13d6a247", "f2241a74-2c49-4a8b-9227-e5e988992a29" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "33805c60-120d-4a49-b76b-a0a42c389084", "476b89b3-90c1-4869-8282-b45de6867086" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "34299fac-d008-49cd-a8e9-30b7336dba60", "09ce07d1-7b90-4204-9514-679b8836e896" });

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Consoles_ConsoleId",
                table: "Images",
                column: "ConsoleId",
                principalTable: "Consoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
