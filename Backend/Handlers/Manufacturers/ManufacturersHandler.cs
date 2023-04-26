using Backend.Data;
using Backend.Data.Models;
using Backend.Data.Views.Manufacturer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Reflection;

namespace Backend.Handlers.Products
{
    public class ManufacturersHandler : IManufacturersHandler
    {

        private readonly AppDbContext _context;

        public ManufacturersHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<EntityEntry> AddManufacturer(Manufacturer manufacturer)
        {
            var result = await _context.Manufacturers.AddAsync(manufacturer);
            await _context.SaveChangesAsync();
            return result;
        }
        public async Task<Manufacturer> GetManufacturer(int manufacturerId)
        {
            Manufacturer? manufacturer = await _context.Manufacturers.Where(x => x.Id == manufacturerId).FirstOrDefaultAsync();
            if(manufacturer == null)
            {
                throw new Exception($"Manufacturer with id={manufacturerId} does not exist!");
            }
            return manufacturer;
        }

        public async Task<List<Manufacturer>> GetManufacturers()
        {
            return await _context.Manufacturers.ToListAsync();
        }

        public async Task<EntityEntry> RemoveManufacturer(int id)
        {
            Manufacturer? manufacturer = await _context.Manufacturers.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (manufacturer == null)
            {
                throw new Exception($"Manufacturer with id={id} does not exist!");
            }
            var result = _context.Manufacturers.Remove(manufacturer);
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task<Manufacturer> UpdateManufacturer(Manufacturer manufacturer, int manufacturerId)
        {
            Manufacturer? original = await _context.Manufacturers.Where(x => x.Id == manufacturerId).FirstOrDefaultAsync();
            if (original == null)
            {
                throw new Exception($"Manufacturer with id={manufacturerId} does not exist!");
            }
            foreach (PropertyInfo info in manufacturer.GetType().GetProperties())
            {
                if(info.GetValue(manufacturer) == null || info.Name == "Id")
                {
                    continue;
                }
                info.SetValue(original,info.GetValue(manufacturer));
            }
            _context.Manufacturers.Update(original);
            await _context.SaveChangesAsync();
            return _context.Manufacturers.Where(x=>x.Id == manufacturerId).First();
        }
    }
}
