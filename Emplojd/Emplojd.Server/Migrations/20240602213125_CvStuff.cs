using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Emplojd.Server.Migrations
{
    /// <inheritdoc />
    public partial class CvStuff : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ResumeFilePath",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserResume",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ResumeFilePath",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UserResume",
                table: "AspNetUsers");
        }
    }
}
