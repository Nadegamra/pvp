using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.Extensions.Options;
using Backend.Properties;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConsolesController: ControllerBase
    {
        private readonly IOptions<CloudinaryConfig> config;

        public ConsolesController(IOptions<CloudinaryConfig> config)
        {
            this.config = config;
        }

        [HttpGet("download")]
        public async Task<ActionResult> Download()
        {
            using (WebClient client = new WebClient())
            {
                var byteArr = client.DownloadData("https://res.cloudinary.com/drzqsbvky/image/upload/file1.jpg");

                return File(byteArr, "application/octet-stream","file1.jpg");
            }
            
        }
        [HttpPost("upload")]
        public async Task<ActionResult<ImageUploadResult>> Upload(IFormFile file)
        {
            var cloudinary = new Cloudinary(new Account(config.Value.Cloud, config.Value.ApiKey, config.Value.ApiSecret));

            // Upload
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription("file1.jpg", file.OpenReadStream()),
                PublicId = "file1"
            };

            return Ok(cloudinary.Upload(uploadParams));
        }
    }
}
