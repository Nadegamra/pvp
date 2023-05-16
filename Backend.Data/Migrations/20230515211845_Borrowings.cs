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
                name: "BorrowingId",
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

            migrationBuilder.CreateIndex(
                name: "IX_UserConsoles_BorrowingId",
                table: "UserConsoles",
                column: "BorrowingId");

            migrationBuilder.CreateIndex(
                name: "IX_Borrowings_ConversationId",
                table: "Borrowings",
                column: "ConversationId");

            migrationBuilder.CreateIndex(
                name: "IX_Borrowings_UserId",
                table: "Borrowings",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserConsoles_Borrowings_BorrowingId",
                table: "UserConsoles",
                column: "BorrowingId",
                principalTable: "Borrowings",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserConsoles_Borrowings_BorrowingId",
                table: "UserConsoles");

            migrationBuilder.DropTable(
                name: "Borrowings");

            migrationBuilder.DropIndex(
                name: "IX_UserConsoles_BorrowingId",
                table: "UserConsoles");

            migrationBuilder.DropColumn(
                name: "BorrowingId",
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
