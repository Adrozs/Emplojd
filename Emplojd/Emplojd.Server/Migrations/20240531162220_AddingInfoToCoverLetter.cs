using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Emplojd.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddingInfoToCoverLetter : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "CoverLetters",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "CoverLetters",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "CoverLetters");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "CoverLetters");
        }
    }
}
