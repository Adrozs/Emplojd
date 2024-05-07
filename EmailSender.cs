using Microsoft.Extensions.Options;
using MimeKit;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace ChasGPT_Backend
{
    public interface IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string htmlmessage);
    }

    public class EmailSender : IEmailSender
    {
        // Get MailKit settings from appsettings
        private readonly MailKitSettings _emailSettings;

        public EmailSender(IOptions<MailKitSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        public async Task SendEmailAsync(string email, string subject, string htmlmessage)
        {
            // Configure email instance
            MimeMessage message = new MimeMessage();
            message.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.Sender));
            message.To.Add(new MailboxAddress("", email));
            message.Subject = subject;

            message.Body = new TextPart("html")
            {
                Text = htmlmessage
            };

            // Connect, authenticate, send mail and then disconnect
            using (SmtpClient client = new SmtpClient())
            {
                await client.ConnectAsync(_emailSettings.MailServer, _emailSettings.MailPort, useSsl: false);
                await client.AuthenticateAsync(_emailSettings.Sender, _emailSettings.Password);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }

    }
}
