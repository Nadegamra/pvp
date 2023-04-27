using Backend.Data;
using Backend.Data.Models;
using Backend.Handlers.Categories;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Backend.Handlers.Products
{
    public class ProductsHandler : IProductsHandler
    {
        public readonly AppDbContext _context;
        public readonly ICategoriesHandler _categoriesHandler;

        public ProductsHandler(AppDbContext context, ICategoriesHandler categoriesHandler)
        {
            _context = context;
            _categoriesHandler = categoriesHandler;
        }

        public async Task<Image> AddImage(Image image)
        {
            var result = await _context.Images.AddAsync(image);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Product> AddProduct(Product product)
        {
            var result = _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return result.Entity;
        }


        public async Task<List<Product>> GetCategoryProducts(int categoryId)
        {
            Category category = await _categoriesHandler.GetCategoryWithChildren(categoryId);
            Queue<Category> categoriesToCheck = new Queue<Category>();
            categoriesToCheck.Enqueue(category);
            List<Product> products = new List<Product>();
            while(categoriesToCheck.Count != 0)
            {
                Category cat = categoriesToCheck.Dequeue();
                products.AddRange(_context.Categories.Include(x => x.Products).Include(x => x.Products).ThenInclude(x=>x.Images).Where(x => x.Id == cat.Id).Select(x => x.Products).First());
                foreach(Category childCategory in cat.ChildCategories)
                {
                    categoriesToCheck.Enqueue(childCategory);
                }
            }
            return products;

        }

        public async Task<List<Product>> GetManufacturerProducts(int manufacturerId)
        {
            Manufacturer? manufacturer = await _context.Manufacturers.Include(x=>x.Products).ThenInclude(x => x.Images).Include(x=>x.Products).Where(x => x.Id == manufacturerId).FirstOrDefaultAsync();
            if(manufacturer == null)
            {
                throw new Exception($"Manufacturer with id={manufacturerId} does not exist");
            }
            return manufacturer.Products.ToList();
        }

        public async Task<Product> GetProduct(int productId)
        {
            Product? product = await _context.Products.Include(x => x.Images).Where(x => x.Id == productId).FirstOrDefaultAsync();
            if (product == null)
            {
                throw new Exception($"Product with id={productId} does not exist");
            }
            return product;
        }


        public async Task RemoveImage(int imageId)
        {
            Image? image = await _context.Images.Where(x => x.Id == imageId).FirstOrDefaultAsync();
            if(image == null)
            {
                throw new Exception($"Image with id={imageId} does not exist");
            }
            _context.Images.Remove(image);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task RemoveProduct(int productId)
        {
            Product product = await GetProduct(productId);
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task<Product> UpdateProduct(Product product, int productId)
        {
            Product original = await GetProduct(productId);
            foreach(PropertyInfo info in product.GetType().GetProperties())
            {
                if(info.GetValue(product) == null || info.Name == "Id")
                {
                    continue;
                }
                info.SetValue(original, info.GetValue(product));
            }
            _context.Update(original);
            await _context.SaveChangesAsync();
            return original;
        }
    }
}
