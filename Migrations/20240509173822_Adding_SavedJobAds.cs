using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChasGPT_Backend.Migrations
{
    /// <inheritdoc />
    public partial class Adding_SavedJobAds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JobAd",
                columns: table => new
                {
                    JobAdId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlatsbankenJobId = table.Column<int>(type: "int", nullable: false),
                    Headline = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Employer = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobAd", x => x.JobAdId);
                });

            migrationBuilder.CreateTable(
                name: "UserJobAds",
                columns: table => new
                {
                    SavedJobAdsJobAdId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserJobAds", x => new { x.SavedJobAdsJobAdId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_UserJobAds_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserJobAds_JobAd_SavedJobAdsJobAdId",
                        column: x => x.SavedJobAdsJobAdId,
                        principalTable: "JobAd",
                        principalColumn: "JobAdId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserJobAds_UsersId",
                table: "UserJobAds",
                column: "UsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserJobAds");

            migrationBuilder.DropTable(
                name: "JobAd");
        }
    }
}
