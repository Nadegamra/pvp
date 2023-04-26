using Backend.Data.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Handlers.Products
{
    public interface IManufacturersHandler
    {
        public Task<List<Manufacturer>> GetManufacturers();
        public Task<Manufacturer> GetManufacturer(int manufacturerId);
        public Task<EntityEntry> AddManufacturer(Manufacturer manufacturer);
        public Task<Manufacturer> UpdateManufacturer(Manufacturer manufacturer, int manufacturerId);
        public Task<EntityEntry> RemoveManufacturer(int id);
    }
}
