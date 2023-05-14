using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class Borrowings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BorrowedConsoleId",
                table: "UserConsoles",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Borrowings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ConversationId = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Borrowings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Borrowings_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Borrowings_Conversations_ConversationId",
                        column: x => x.ConversationId,
                        principalTable: "Conversations",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "0b782df4-6f43-4dc1-9dc3-2953d2f34828", "b2e9dfaa-23af-4fca-81ac-3746b0fbb7bd" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "bd814ddd-88e4-40fa-8b5e-eded6d927c42", "60242356-92ba-4d3b-a4a0-90c585045775" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "0629523f-6f85-4d19-b875-37c19a959839", "1ea3d88e-9058-4396-92a5-265bb68d5ac3" });

            migrationBuilder.CreateIndex(
                name: "IX_UserConsoles_BorrowedConsoleId",
                table: "UserConsoles",
                column: "BorrowedConsoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Borrowings_ConversationId",
                table: "Borrowings",
                column: "ConversationId");

            migrationBuilder.CreateIndex(
                name: "IX_Borrowings_UserId",
                table: "Borrowings",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserConsoles_Borrowings_BorrowedConsoleId",
                table: "UserConsoles",
                column: "BorrowedConsoleId",
                principalTable: "Borrowings",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserConsoles_Borrowings_BorrowedConsoleId",
                table: "UserConsoles");

            migrationBuilder.DropTable(
                name: "Borrowings");

            migrationBuilder.DropIndex(
                name: "IX_UserConsoles_BorrowedConsoleId",
                table: "UserConsoles");

            migrationBuilder.DropColumn(
                name: "BorrowedConsoleId",
                table: "UserConsoles");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "a224e2a4-2723-4402-ae80-6e0f72ab3117", "31f58844-416d-4daf-91fe-4887acd7316d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "a86a7c37-3058-4f9b-b26a-0320550acd44", "8cc366dd-b639-4bc1-b102-8faee54b7bb5" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "ae5e0e4e-028a-4724-9ab1-c8f7422fd298", "6ce6f9ce-62c1-48ef-b799-9582b60987f9" });
        }
    }
}
