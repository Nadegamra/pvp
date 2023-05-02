using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddressUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StreetNo",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "Street",
                table: "AspNetUsers",
                newName: "StreetAddress");

            migrationBuilder.RenameColumn(
                name: "PostCode",
                table: "AspNetUsers",
                newName: "PostalCode");

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StreetAddress",
                table: "AspNetUsers",
                newName: "Street");

            migrationBuilder.RenameColumn(
                name: "PostalCode",
                table: "AspNetUsers",
                newName: "PostCode");

            migrationBuilder.AddColumn<string>(
                name: "StreetNo",
                table: "AspNetUsers",
                type: "varchar(5)",
                maxLength: 5,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp", "StreetNo" },
                values: new object[] { "8cb01ecf-55a2-4a16-b344-31bc3a053bba", "d7dc3a99-eedb-4d2d-8d5f-b23dde42ccdf", "" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp", "StreetNo" },
                values: new object[] { "5cad8e95-287a-4945-86e8-a6e8540d5b6f", "c39d1a5d-2164-4909-8f91-05d21ef63879", "" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp", "StreetNo" },
                values: new object[] { "31cf9697-c362-454a-85d0-8126029d9166", "85189abb-59a7-426d-a0e1-bd454bab6e40", "" });
        }
    }
}
