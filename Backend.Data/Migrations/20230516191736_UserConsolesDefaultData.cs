using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class UserConsolesDefaultData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                columns: new[] { "ConcurrencyStamp", "EmailConfirmed", "SecurityStamp" },
                values: new object[] { "856e48f0-0d74-4178-968d-ce5ce26690c8", true, "9b92c4b2-556e-4e24-9fff-2f92f07f2ebe" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "f981517d-5f98-4977-970e-62f89f8378be", "cf971ac6-e065-4ebf-b67a-c3bc9db8eb8f" });

            migrationBuilder.InsertData(
                table: "Borrowings",
                columns: new[] { "Id", "ConversationId", "Status", "UserId" },
                values: new object[,]
                {
                    { 1, null, 1, 3 },
                    { 2, null, 0, 3 },
                    { 3, null, 1, 3 }
                });

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
                    { 2, "2 controllers", 1, null, 2, 1, null, 2 },
                    { 8, "2 pulteliai", 1, null, 1, 1, null, 2 },
                    { 12, "4 pulteliai", 1, null, 1, 1, null, 2 },
                    { 13, "2 pulteliai", 1, null, 2, 0, null, 2 },
                    { 14, "4 pulteliai", 2, null, 2, 1, null, 2 }
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
                    { 13, null, "", "2.jpg", "ippxzihzs29akhhxd9xn", 2 },
                    { 24, null, "", "1.jpg", "jqaiq8wmqqecnlzwojax", 8 },
                    { 25, null, "", "2.jpg", "rgh3wb7beikhyt2emacl", 8 },
                    { 32, null, "", "9.webp", "wpclmzpnijnbejwcu7v2", 12 },
                    { 33, null, "", "10.jpg", "suowvu9mwqucv0lhp2y2", 12 },
                    { 34, null, "", "1.jpg", "kymuodazpxcondhpc2kb", 13 },
                    { 35, null, "", "2.jpg", "hwcpytri3igfalqovqbb", 13 },
                    { 36, null, "", "3.webp", "jryjdpjyhlfpxybhvgb2", 14 },
                    { 37, null, "", "4.jpg", "orvzpdw4izqin1eir2ro", 14 }
                });

            migrationBuilder.InsertData(
                table: "UserConsoles",
                columns: new[] { "Id", "Accessories", "Amount", "BorrowingId", "ConsoleId", "ConsoleStatus", "ConversationId", "UserId" },
                values: new object[,]
                {
                    { 3, "Switch valdikliai", 3, null, 3, 1, null, 2 },
                    { 4, "Switch valdikliai", 2, 1, 3, 3, null, 2 },
                    { 5, "Switch valdikliai", 1, 1, 3, 4, null, 2 },
                    { 6, "Switch valdikliai", 3, 1, 3, 3, null, 2 },
                    { 7, "Switch valdikliai", 1, null, 3, 0, null, 2 },
                    { 9, "3 pulteliai", 1, 2, 1, 2, null, 2 },
                    { 10, "6 pulteliai", 2, 2, 1, 2, null, 2 },
                    { 11, "9 pulteliai", 3, 2, 1, 2, null, 2 },
                    { 15, "6 pulteliai", 3, 3, 2, 3, null, 2 },
                    { 16, "6 pulteliai", 2, 3, 2, 5, null, 2 },
                    { 17, "3 pulteliai", 1, 3, 2, 3, null, 2 }
                });

            migrationBuilder.InsertData(
                table: "Images",
                columns: new[] { "Id", "ConsoleId", "Description", "Name", "Path", "UserConsoleId" },
                values: new object[,]
                {
                    { 14, null, "", "1.jpg", "cbjujhwymkya4egvowlp", 3 },
                    { 15, null, "", "2.jpg", "bnplshybz8d3vf3gr3no", 3 },
                    { 16, null, "", "3.jpg", "wj88di2k7pmft2isdlh8", 4 },
                    { 17, null, "", "4.jpg", "kevpxg8wzjv0jw6gkg4c", 4 },
                    { 18, null, "", "5.jpg", "ffl3aw9hv5005dfdjfpz", 5 },
                    { 19, null, "", "6.jpg", "lhmgyhueweqa7fkp1stl", 5 },
                    { 20, null, "", "7.jpg", "imrldxkmtmr5yeztklsq", 6 },
                    { 21, null, "", "8.jpg", "z3fxlitvox9pcnx6qifj", 6 },
                    { 22, null, "", "9.webp", "gsvfexdltber03kb0sbq", 7 },
                    { 23, null, "", "10.webp", "zu9h4aokymxxgogz3rpk", 7 },
                    { 26, null, "", "3.png", "nzc2jbogrqhimi2kinx7", 9 },
                    { 27, null, "", "4.jpg", "oiwhljjpuankybss3fxf", 9 },
                    { 28, null, "", "5.jpg", "michvakylcmespl2jpkp", 10 },
                    { 29, null, "", "6.jpg", "yhmkdali6lct87ujbxtw", 10 },
                    { 30, null, "", "7.jpg", "of7vv1zj6b3h4xcxoogo", 11 },
                    { 31, null, "", "8.webp", "busosz6xgrk1pl09satt", 11 },
                    { 38, null, "", "5.webp", "ak1f7z5qm7gqtcapo3x6", 15 },
                    { 39, null, "", "6.jpg", "d1laps4gd9ybshzwr8mm", 15 },
                    { 40, null, "", "7.jpg", "cn76jlujcjkrvlspid3s", 16 },
                    { 41, null, "", "8.jpg", "n3xkh0olersoqm8pvyxk", 16 },
                    { 42, null, "", "9.webp", "xy9djpejp8dqt013iwqc", 17 },
                    { 43, null, "", "10.jpg", "mgrat1qyaks74xvuqfxl", 17 }
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
                table: "Images",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "UserConsoles",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Borrowings",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Borrowings",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Borrowings",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Consoles",
                keyColumn: "Id",
                keyValue: 3);

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
                columns: new[] { "ConcurrencyStamp", "EmailConfirmed", "SecurityStamp" },
                values: new object[] { "24c60b23-d9f9-4fd9-b62e-1d36241018a2", false, "4295537a-2a99-4b39-a190-5aa5064269d1" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "abfda497-8557-4ef1-8102-14a65da83a81", "da9338e6-e363-4049-b947-865e1207b995" });
        }
    }
}
