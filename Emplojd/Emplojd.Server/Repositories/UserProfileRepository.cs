using Emplojd.Data;
using Emplojd.Server.Models;
using iText.Kernel.Pdf.Canvas.Parser.Listener;
using iText.Kernel.Pdf.Canvas.Parser;
using iText.Kernel.Pdf;
using System.Net;
using System.Text;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using Emplojd.Server.Models;
using DocumentFormat.OpenXml.Spreadsheet;
using Emplojd.Server.ViewModels___DTOs;

namespace Emplojd.Repositories
{
    public class UserProfileRepository
    {
        public async Task<IResult> SaveUserProfileInfo(UserProfileDto userProfileDto)
        {
            try
            {
                return Results.StatusCode((int)HttpStatusCode.Created);
            }
            catch
            {
                return Results.StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        public async Task<string> GetTextFromCvPdf(IFormFile file)
        {
            try
            {
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    PdfDocument pdfDoc = new PdfDocument(new PdfReader(memoryStream));
                    var text = new StringBuilder();

                    for (int i = 1; i <= pdfDoc.GetNumberOfPages(); i++)
                    {
                        var page = pdfDoc.GetPage(i);
                        text.Append(PdfTextExtractor.GetTextFromPage(page, new SimpleTextExtractionStrategy()));
                    }

                    pdfDoc.Close();
                    return text.ToString();
                }
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

        public async Task<string> GetTextFromCvWord(IFormFile file)
        {
            try
            {
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    memoryStream.Position = 0;

                    StringBuilder text = new StringBuilder();

                    using (WordprocessingDocument wordDocument = WordprocessingDocument.Open(memoryStream, false))
                    {
                        var body = wordDocument.MainDocumentPart.Document.Body;
                        foreach (var paragraph in body.Elements<Paragraph>())
                        {
                            text.AppendLine(paragraph.InnerText);
                        }
                    }

                    return text.ToString();
                }
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

        public void SaveCvManuallyToDatabase(ApplicationContext context, string positionEducation, string startDate, string endDate, string schoolWorkplace, bool isEducation)
        {
            CvManually cvManually = new CvManually()
            {
                PositionEducation = positionEducation,
                StartDate = startDate,
                EndDate = endDate,
                SchoolWorkplace = schoolWorkplace,
                IsEducation = isEducation,
            };

            try
            {
                //context.CvManually.Add(cvManually);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Unable to save cv to database.", ex);
            }
        }
    }
}