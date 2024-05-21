using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChasGPT_Backend.Migrations
{
    /// <inheritdoc />
    public partial class New : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_UserProfiles_UserProfileId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_CoverLetters_AspNetUsers_UserId",
                table: "CoverLetters");

            migrationBuilder.DropForeignKey(
                name: "FK_CoverLetters_UserProfiles_UserProfileId",
                table: "CoverLetters");

            migrationBuilder.DropForeignKey(
                name: "FK_UserJobAds_AspNetUsers_UsersId",
                table: "UserJobAds");

            migrationBuilder.DropForeignKey(
                name: "FK_UserJobAds_JobAd_SavedJobAdsJobAdId",
                table: "UserJobAds");

            migrationBuilder.DropForeignKey(
                name: "FK_UserProfiles_SavedJobAds_SavedJobAdsSavedJobId",
                table: "UserProfiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserProfiles",
                table: "UserProfiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CoverLetters",
                table: "CoverLetters");

            migrationBuilder.RenameTable(
                name: "UserProfiles",
                newName: "UserProfile");

            migrationBuilder.RenameTable(
                name: "CoverLetters",
                newName: "CoverLetter");

            migrationBuilder.RenameColumn(
                name: "UsersId",
                table: "UserJobAds",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "SavedJobAdsJobAdId",
                table: "UserJobAds",
                newName: "JobAdId");

            migrationBuilder.RenameIndex(
                name: "IX_UserJobAds_UsersId",
                table: "UserJobAds",
                newName: "IX_UserJobAds_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserProfiles_SavedJobAdsSavedJobId",
                table: "UserProfile",
                newName: "IX_UserProfile_SavedJobAdsSavedJobId");

            migrationBuilder.RenameIndex(
                name: "IX_CoverLetters_UserProfileId",
                table: "CoverLetter",
                newName: "IX_CoverLetter_UserProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_CoverLetters_UserId",
                table: "CoverLetter",
                newName: "IX_CoverLetter_UserId");

            migrationBuilder.AlterColumn<string>(
                name: "Headline",
                table: "JobAd",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Employer",
                table: "JobAd",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "UserProfileId",
                table: "AspNetUsers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "UserInterestTags",
                table: "UserProfile",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "DescriptiveWords",
                table: "UserProfile",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "GeneratedCoverLetter",
                table: "CoverLetter",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserProfile",
                table: "UserProfile",
                column: "UserProfileId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CoverLetter",
                table: "CoverLetter",
                column: "CoverLetterId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_UserProfile_UserProfileId",
                table: "AspNetUsers",
                column: "UserProfileId",
                principalTable: "UserProfile",
                principalColumn: "UserProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_CoverLetter_AspNetUsers_UserId",
                table: "CoverLetter",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CoverLetter_UserProfile_UserProfileId",
                table: "CoverLetter",
                column: "UserProfileId",
                principalTable: "UserProfile",
                principalColumn: "UserProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserJobAds_AspNetUsers_UserId",
                table: "UserJobAds",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserJobAds_JobAd_JobAdId",
                table: "UserJobAds",
                column: "JobAdId",
                principalTable: "JobAd",
                principalColumn: "JobAdId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserProfile_SavedJobAds_SavedJobAdsSavedJobId",
                table: "UserProfile",
                column: "SavedJobAdsSavedJobId",
                principalTable: "SavedJobAds",
                principalColumn: "SavedJobId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_UserProfile_UserProfileId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_CoverLetter_AspNetUsers_UserId",
                table: "CoverLetter");

            migrationBuilder.DropForeignKey(
                name: "FK_CoverLetter_UserProfile_UserProfileId",
                table: "CoverLetter");

            migrationBuilder.DropForeignKey(
                name: "FK_UserJobAds_AspNetUsers_UserId",
                table: "UserJobAds");

            migrationBuilder.DropForeignKey(
                name: "FK_UserJobAds_JobAd_JobAdId",
                table: "UserJobAds");

            migrationBuilder.DropForeignKey(
                name: "FK_UserProfile_SavedJobAds_SavedJobAdsSavedJobId",
                table: "UserProfile");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserProfile",
                table: "UserProfile");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CoverLetter",
                table: "CoverLetter");

            migrationBuilder.RenameTable(
                name: "UserProfile",
                newName: "UserProfiles");

            migrationBuilder.RenameTable(
                name: "CoverLetter",
                newName: "CoverLetters");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserJobAds",
                newName: "UsersId");

            migrationBuilder.RenameColumn(
                name: "JobAdId",
                table: "UserJobAds",
                newName: "SavedJobAdsJobAdId");

            migrationBuilder.RenameIndex(
                name: "IX_UserJobAds_UserId",
                table: "UserJobAds",
                newName: "IX_UserJobAds_UsersId");

            migrationBuilder.RenameIndex(
                name: "IX_UserProfile_SavedJobAdsSavedJobId",
                table: "UserProfiles",
                newName: "IX_UserProfiles_SavedJobAdsSavedJobId");

            migrationBuilder.RenameIndex(
                name: "IX_CoverLetter_UserProfileId",
                table: "CoverLetters",
                newName: "IX_CoverLetters_UserProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_CoverLetter_UserId",
                table: "CoverLetters",
                newName: "IX_CoverLetters_UserId");

            migrationBuilder.AlterColumn<string>(
                name: "Headline",
                table: "JobAd",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Employer",
                table: "JobAd",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserProfileId",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserInterestTags",
                table: "UserProfiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DescriptiveWords",
                table: "UserProfiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "GeneratedCoverLetter",
                table: "CoverLetters",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserProfiles",
                table: "UserProfiles",
                column: "UserProfileId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CoverLetters",
                table: "CoverLetters",
                column: "CoverLetterId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_UserProfiles_UserProfileId",
                table: "AspNetUsers",
                column: "UserProfileId",
                principalTable: "UserProfiles",
                principalColumn: "UserProfileId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CoverLetters_AspNetUsers_UserId",
                table: "CoverLetters",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CoverLetters_UserProfiles_UserProfileId",
                table: "CoverLetters",
                column: "UserProfileId",
                principalTable: "UserProfiles",
                principalColumn: "UserProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserJobAds_AspNetUsers_UsersId",
                table: "UserJobAds",
                column: "UsersId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserJobAds_JobAd_SavedJobAdsJobAdId",
                table: "UserJobAds",
                column: "SavedJobAdsJobAdId",
                principalTable: "JobAd",
                principalColumn: "JobAdId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserProfiles_SavedJobAds_SavedJobAdsSavedJobId",
                table: "UserProfiles",
                column: "SavedJobAdsSavedJobId",
                principalTable: "SavedJobAds",
                principalColumn: "SavedJobId");
        }
    }
}
