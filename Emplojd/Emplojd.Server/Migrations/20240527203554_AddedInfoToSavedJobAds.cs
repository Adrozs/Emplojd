using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Emplojd.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddedInfoToSavedJobAds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "SavedJobAds",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Employment_Type",
                table: "SavedJobAds",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Logo_Url",
                table: "SavedJobAds",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Occupation",
                table: "SavedJobAds",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Publication_Date",
                table: "SavedJobAds",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Working_Hours_Type",
                table: "SavedJobAds",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Workplace_Address",
                table: "SavedJobAds",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "SavedJobAds");

            migrationBuilder.DropColumn(
                name: "Employment_Type",
                table: "SavedJobAds");

            migrationBuilder.DropColumn(
                name: "Logo_Url",
                table: "SavedJobAds");

            migrationBuilder.DropColumn(
                name: "Occupation",
                table: "SavedJobAds");

            migrationBuilder.DropColumn(
                name: "Publication_Date",
                table: "SavedJobAds");

            migrationBuilder.DropColumn(
                name: "Working_Hours_Type",
                table: "SavedJobAds");

            migrationBuilder.DropColumn(
                name: "Workplace_Address",
                table: "SavedJobAds");
        }
    }
}
