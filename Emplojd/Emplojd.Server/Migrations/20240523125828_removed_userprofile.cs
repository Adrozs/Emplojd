using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Emplojd.Migrations
{
    /// <inheritdoc />
    public partial class removed_userprofile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_UserProfiles_UserProfileId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_CoverLetters_UserProfiles_UserProfileId",
                table: "CoverLetters");

            migrationBuilder.DropTable(
                name: "UserProfiles");

            migrationBuilder.DropIndex(
                name: "IX_CoverLetters_UserProfileId",
                table: "CoverLetters");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_UserProfileId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UserProfileId",
                table: "CoverLetters");

            migrationBuilder.DropColumn(
                name: "UserProfileId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "CvContentText",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DescriptiveWords",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserInterestTags",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CvContentText",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DescriptiveWords",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UserInterestTags",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "UserProfileId",
                table: "CoverLetters",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserProfileId",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    UserProfileId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DescriptiveWords = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SavedJobAdsSavedJobId = table.Column<int>(type: "int", nullable: true),
                    UserInterestTags = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.UserProfileId);
                    table.ForeignKey(
                        name: "FK_UserProfiles_SavedJobAds_SavedJobAdsSavedJobId",
                        column: x => x.SavedJobAdsSavedJobId,
                        principalTable: "SavedJobAds",
                        principalColumn: "SavedJobId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CoverLetters_UserProfileId",
                table: "CoverLetters",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_UserProfileId",
                table: "AspNetUsers",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_SavedJobAdsSavedJobId",
                table: "UserProfiles",
                column: "SavedJobAdsSavedJobId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_UserProfiles_UserProfileId",
                table: "AspNetUsers",
                column: "UserProfileId",
                principalTable: "UserProfiles",
                principalColumn: "UserProfileId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CoverLetters_UserProfiles_UserProfileId",
                table: "CoverLetters",
                column: "UserProfileId",
                principalTable: "UserProfiles",
                principalColumn: "UserProfileId");
        }
    }
}
