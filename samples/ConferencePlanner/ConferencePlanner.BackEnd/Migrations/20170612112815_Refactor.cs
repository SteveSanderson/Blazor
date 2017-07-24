using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace BackEnd.Migrations
{
    public partial class Refactor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Speaker",
                table: "Speaker");

            migrationBuilder.RenameTable(
                name: "Speaker",
                newName: "Speakers");

            migrationBuilder.AddColumn<int>(
                name: "ConferenceID",
                table: "Speakers",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Speakers",
                table: "Speakers",
                column: "ID");

            migrationBuilder.CreateTable(
                name: "Attendees",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EmailAddress = table.Column<string>(maxLength: 256, nullable: true),
                    FirstName = table.Column<string>(maxLength: 200, nullable: false),
                    LastName = table.Column<string>(maxLength: 200, nullable: false),
                    UserName = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attendees", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Conferences",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conferences", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 32, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ConferenceAttendee",
                columns: table => new
                {
                    ConferenceID = table.Column<int>(nullable: false),
                    AttendeeID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConferenceAttendee", x => new { x.ConferenceID, x.AttendeeID });
                    table.ForeignKey(
                        name: "FK_ConferenceAttendee_Attendees_AttendeeID",
                        column: x => x.AttendeeID,
                        principalTable: "Attendees",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConferenceAttendee_Conferences_ConferenceID",
                        column: x => x.ConferenceID,
                        principalTable: "Conferences",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Abstract = table.Column<string>(maxLength: 4000, nullable: true),
                    AttendeeID = table.Column<int>(nullable: true),
                    ConferenceID = table.Column<int>(nullable: false),
                    EndTime = table.Column<DateTimeOffset>(nullable: true),
                    StartTime = table.Column<DateTimeOffset>(nullable: true),
                    Title = table.Column<string>(maxLength: 200, nullable: false),
                    TrackId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Sessions_Attendees_AttendeeID",
                        column: x => x.AttendeeID,
                        principalTable: "Attendees",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Sessions_Conferences_ConferenceID",
                        column: x => x.ConferenceID,
                        principalTable: "Conferences",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tracks",
                columns: table => new
                {
                    TrackID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ConferenceID = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tracks", x => x.TrackID);
                    table.ForeignKey(
                        name: "FK_Tracks_Conferences_ConferenceID",
                        column: x => x.ConferenceID,
                        principalTable: "Conferences",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SessionSpeaker",
                columns: table => new
                {
                    SessionId = table.Column<int>(nullable: false),
                    SpeakerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionSpeaker", x => new { x.SessionId, x.SpeakerId });
                    table.ForeignKey(
                        name: "FK_SessionSpeaker_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SessionSpeaker_Speakers_SpeakerId",
                        column: x => x.SpeakerId,
                        principalTable: "Speakers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SessionTag",
                columns: table => new
                {
                    SessionID = table.Column<int>(nullable: false),
                    TagID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionTag", x => new { x.SessionID, x.TagID });
                    table.ForeignKey(
                        name: "FK_SessionTag_Sessions_SessionID",
                        column: x => x.SessionID,
                        principalTable: "Sessions",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SessionTag_Tags_TagID",
                        column: x => x.TagID,
                        principalTable: "Tags",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Speakers_ConferenceID",
                table: "Speakers",
                column: "ConferenceID");

            migrationBuilder.CreateIndex(
                name: "IX_Attendees_UserName",
                table: "Attendees",
                column: "UserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ConferenceAttendee_AttendeeID",
                table: "ConferenceAttendee",
                column: "AttendeeID");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_AttendeeID",
                table: "Sessions",
                column: "AttendeeID");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_ConferenceID",
                table: "Sessions",
                column: "ConferenceID");

            migrationBuilder.CreateIndex(
                name: "IX_SessionSpeaker_SpeakerId",
                table: "SessionSpeaker",
                column: "SpeakerId");

            migrationBuilder.CreateIndex(
                name: "IX_SessionTag_TagID",
                table: "SessionTag",
                column: "TagID");

            migrationBuilder.CreateIndex(
                name: "IX_Tracks_ConferenceID",
                table: "Tracks",
                column: "ConferenceID");

            migrationBuilder.AddForeignKey(
                name: "FK_Speakers_Conferences_ConferenceID",
                table: "Speakers",
                column: "ConferenceID",
                principalTable: "Conferences",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Speakers_Conferences_ConferenceID",
                table: "Speakers");

            migrationBuilder.DropTable(
                name: "ConferenceAttendee");

            migrationBuilder.DropTable(
                name: "SessionSpeaker");

            migrationBuilder.DropTable(
                name: "SessionTag");

            migrationBuilder.DropTable(
                name: "Tracks");

            migrationBuilder.DropTable(
                name: "Sessions");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Attendees");

            migrationBuilder.DropTable(
                name: "Conferences");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Speakers",
                table: "Speakers");

            migrationBuilder.DropIndex(
                name: "IX_Speakers_ConferenceID",
                table: "Speakers");

            migrationBuilder.DropColumn(
                name: "ConferenceID",
                table: "Speakers");

            migrationBuilder.RenameTable(
                name: "Speakers",
                newName: "Speaker");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Speaker",
                table: "Speaker",
                column: "ID");
        }
    }
}
