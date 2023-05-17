using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class BorrowingConversation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Borrowings_Conversations_ConversationId",
                table: "Borrowings");

            migrationBuilder.DropForeignKey(
                name: "FK_Conversations_UserConsoles_UserConsoleId",
                table: "Conversations");

            migrationBuilder.DropIndex(
                name: "IX_Borrowings_ConversationId",
                table: "Borrowings");

            migrationBuilder.AlterColumn<int>(
                name: "UserConsoleId",
                table: "Conversations",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "BorrowingId",
                table: "Conversations",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "db23c0e5-263a-4a80-b501-26ace05f9dee", "dc6962cf-9afe-4263-80ef-74f00354a00d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "cae3c8c8-8425-4d34-b776-71d463db1283", "ce9479a2-a47d-485a-a24c-610267682c42" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "1463f8a7-5002-4683-b803-99e48d34d561", "1a27c8f5-91f7-43eb-9d32-7808bbb256e9" });

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_BorrowingId",
                table: "Conversations",
                column: "BorrowingId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Conversations_Borrowings_BorrowingId",
                table: "Conversations",
                column: "BorrowingId",
                principalTable: "Borrowings",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Conversations_UserConsoles_UserConsoleId",
                table: "Conversations",
                column: "UserConsoleId",
                principalTable: "UserConsoles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Conversations_Borrowings_BorrowingId",
                table: "Conversations");

            migrationBuilder.DropForeignKey(
                name: "FK_Conversations_UserConsoles_UserConsoleId",
                table: "Conversations");

            migrationBuilder.DropIndex(
                name: "IX_Conversations_BorrowingId",
                table: "Conversations");

            migrationBuilder.DropColumn(
                name: "BorrowingId",
                table: "Conversations");

            migrationBuilder.AlterColumn<int>(
                name: "UserConsoleId",
                table: "Conversations",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "e7716d11-8145-410d-bd0a-0f4a015bfef8", "9af05da6-e869-4128-946e-695f35eb861c" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "856e48f0-0d74-4178-968d-ce5ce26690c8", "9b92c4b2-556e-4e24-9fff-2f92f07f2ebe" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "f981517d-5f98-4977-970e-62f89f8378be", "cf971ac6-e065-4ebf-b67a-c3bc9db8eb8f" });

            migrationBuilder.CreateIndex(
                name: "IX_Borrowings_ConversationId",
                table: "Borrowings",
                column: "ConversationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Borrowings_Conversations_ConversationId",
                table: "Borrowings",
                column: "ConversationId",
                principalTable: "Conversations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Conversations_UserConsoles_UserConsoleId",
                table: "Conversations",
                column: "UserConsoleId",
                principalTable: "UserConsoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
