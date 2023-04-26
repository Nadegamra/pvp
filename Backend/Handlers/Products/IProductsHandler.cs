using Backend.Data.Models;

namespace Backend.Handlers.Products
{
    public interface IProductsHandler
    {
        public Task<Product> GetProduct(int productId);
        public Task<List<Product>> GetCategoryProducts(int categoryId);
        public Task<List<Product>> GetManufacturerProducts(int manufacturerId);
        public Task<Product> AddProduct(Product product);
        public Task<Product> UpdateProduct(Product product, int productId);
        public Task RemoveProduct(int productId);
        public Task<Image> AddImage(Image image);
        public Task RemoveImage(int imageId);
        public Task<Product> AddUnits(int productId, int units);
    }
}
