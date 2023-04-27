using Backend.Data;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Backend.Data.Views.Console;

namespace Backend.Handlers
{
    public class ConsolesHandler
    {
        private readonly AppDbContext _context;
        private readonly ImagesHandler _imagesHandler;
        private readonly IMapper _mapper;

        public ConsolesHandler(AppDbContext context, ImagesHandler imagesHandler, IMapper mapper)
        {
            _context = context;
            _imagesHandler = imagesHandler;
            _mapper = mapper;
        }

        public async Task<List<ConsoleDtoGet>> GetConsolesAsync()
        {
            return _mapper.Map<List<Data.Models.Console>,List<ConsoleDtoGet>>(await _context.Consoles.Include(c => c.Images).ToListAsync());
        }
        public async Task<ConsoleDtoGet> GetConsoleAsync(int id)
        {
            return _mapper.Map<Data.Models.Console, ConsoleDtoGet>(await _context.Consoles.Include(c => c.Images).Where(x => x.Id == id).FirstAsync());
        }
        public async Task<ConsoleDtoGet> AddConsoleAsync(ConsoleDtoAdd consoleDto)
        {
            try
            {
                // Add Console
                Data.Models.Console console = _mapper.Map<ConsoleDtoAdd, Data.Models.Console>(consoleDto);
                var res = _context.Consoles.Add(console);
                await _context.SaveChangesAsync();

                //Add Images
                List<ImageDtoAdd> images = consoleDto.Images.ToList();
                for (int i = 0; i < images.Count; i++)
                {
                    images[i].ConsoleId = res.Entity.Id;
                    await _imagesHandler.AddImageAsync(images[i]);
                }

                Data.Models.Console result = _context.Consoles.Include(x => x.Images).Where(x => x.Id == res.Entity.Id).First();
                return _mapper.Map<Data.Models.Console, ConsoleDtoGet>(result);
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
            

        }
        public async Task<ConsoleDtoGet> UpdateConsoleAsync(ConsoleDtoUpdate consoleDto)
        {
            // Update Images
            List<ImageDtoUpdate> images = consoleDto.Images.ToList();
            foreach (ImageDtoUpdate image in images)
            {
                await _imagesHandler.UpdateImageAsync(image);
            }

            // Update Console
            Data.Models.Console console = _mapper.Map<ConsoleDtoUpdate, Data.Models.Console>(consoleDto);
            _context.Consoles.Update(console);
            await _context.SaveChangesAsync();

            Data.Models.Console result = _context.Consoles.Include(x => x.Images).Where(x => x.Id == consoleDto.Id).First();
            return _mapper.Map<Data.Models.Console, ConsoleDtoGet>(result);
        }
        public async Task RemoveConsoleAsync(int id)
        {
            // Remove Images
            List<int> imagesIds = (await _imagesHandler.GetImagesAsync(id)).Select(x=>x.Id).ToList();
            foreach(int imageId in imagesIds)
            {
                await _imagesHandler.RemoveImageAsync(imageId);
            }

            // Remove Console
            Data.Models.Console console = await _context.Consoles.Where(x => x.Id == id).FirstAsync();
            _context.Consoles.Remove(console);
            await _context.SaveChangesAsync();

            return;
        }
    }
}
