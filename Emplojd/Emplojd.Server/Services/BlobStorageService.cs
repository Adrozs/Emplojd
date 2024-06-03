using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Emplojd.Server.Services
{
    public class BlobStorageService
    {
        private readonly BlobServiceClient _blobServiceClient;
        private readonly string _containerName;
        private readonly string _connectionString;
        private const long MaxFileSize = 10 * 1024 * 1024; // 10 mb max limit

        public BlobStorageService(string connectionString, string containerName)
        {
            _blobServiceClient = new BlobServiceClient(connectionString);
            _containerName = containerName;
            _connectionString = connectionString;
        }

        public async Task<string> UploadBlobAsync(IFormFile file)
        {
            if (file.Length > MaxFileSize)
            {
                throw new InvalidOperationException($"Filstorleken överskrider: {MaxFileSize / (1024 * 1024)} MB.");
            }

            var containerClient = _blobServiceClient.GetBlobContainerClient(_containerName);
            await containerClient.CreateIfNotExistsAsync();

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var blobClient = containerClient.GetBlobClient(fileName);

            using (var stream = file.OpenReadStream())
            {
                await blobClient.UploadAsync(stream, overwrite: true);
            }
            //We need to build a SAS Url - Secured Access Signature
            //We ensure that the Users can only read the file.
            var sasBuilder = new BlobSasBuilder(BlobSasPermissions.Read, DateTimeOffset.UtcNow.AddYears(100));

            //sometimes the code is so fast; It wasnt available yet.
            sasBuilder.StartsOn = DateTimeOffset.UtcNow.AddMinutes(-15);

            //Represents the object that's pointing to the file.
            //Generate a Secure URL
            var sasUri = blobClient.GenerateSasUri(sasBuilder);

            //Absolute URL - Include the HTTPS followed by the Domain name, Followed by the Full Path. (Think Relative Path in relation)
            return sasUri.AbsoluteUri;
        }
    }
}