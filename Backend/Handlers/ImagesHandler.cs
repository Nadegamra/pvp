using AutoMapper;
using Backend.Data;
using Backend.Data.Models;
using Backend.Data.Views.Console;
using Backend.Properties;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Backend.Handlers
{
    public class ImagesHandler
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinaryConfig> _config;

        public ImagesHandler(AppDbContext context, IMapper mapper, IOptions<CloudinaryConfig> config)
        {
            _context = context;
            _mapper = mapper;
            _config = config;
        }

        public async Task<List<ImageDtoGet>> GetImagesAsync(int consoleId)
        {
            return _mapper.Map<List<Image>,List<ImageDtoGet>>(_context.Consoles.Include(x => x.Images).Where(x=>x.Id ==consoleId).First().Images.ToList());
        }
        public async Task<ImageDtoGet> GetImageAsync(int id)
        {
            return _mapper.Map<Image,ImageDtoGet>(_context.Images.Where(x => x.Id == id).First());
        }
        public async Task<ImageDtoGet> AddImageAsync(ImageDtoAdd imageDto)
        {
            // Cloudinary
            var cloudinary = new Cloudinary(new Account(_config.Value.Cloud, _config.Value.ApiKey, _config.Value.ApiSecret));
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription("file.jpg", imageDto.Stream)
            };
            var uploadResult = cloudinary.Upload(uploadParams);

            // Database
            Image image = _mapper.Map<ImageDtoAdd, Image>(imageDto);
            image.Path = uploadResult.PublicId;

            await _context.Images.AddAsync(image);
            await _context.SaveChangesAsync();

            return _mapper.Map<Image, ImageDtoGet>(image);
        }
        public async Task<ImageDtoGet> UpdateImageAsync(ImageDtoUpdate imageDto)
        {
            // Database
            Image image = _context.Images.Where(x=>x.Id == imageDto.Id).First();
            image.Description = imageDto.Description;
            image.Name = imageDto.Name;
            _context.Images.Update(image);
            await _context.SaveChangesAsync();

            return _mapper.Map<Image,ImageDtoGet>(image);
        }
        public async Task<ImageDtoGet> RemoveImageAsync(int id)
        {
            Image image = _context.Images.Where(x => x.Id == id).First();
            // Cloudinary
            var cloudinary = new Cloudinary(new Account(_config.Value.Cloud, _config.Value.ApiKey, _config.Value.ApiSecret));
            await cloudinary.DestroyAsync(new DeletionParams(image.Path));
            // Database
            _context.Images.Remove(image);
            await _context.SaveChangesAsync();
            return _mapper.Map<Image, ImageDtoGet>(image);
        }
    }
}
