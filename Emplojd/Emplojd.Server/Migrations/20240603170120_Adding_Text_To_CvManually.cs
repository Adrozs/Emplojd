using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Emplojd.Server.Migrations
{
    /// <inheritdoc />
    public partial class Adding_Text_To_CvManually : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CvText",
                table: "CvManually",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CvText",
                table: "CvManually");
        }
    }
}
