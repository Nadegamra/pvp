using Backend.Data.Models;

namespace Backend.Handlers.Categories
{
    public interface ICategoriesHandler
    {
        public abstract Task<Category> GetCategoryWithChildren(int categoryId);
        public abstract Task<List<Category>> GetCategoriesWithChildren();
        public abstract Task AddCategory(Category category);
        public abstract Task RemoveCategory(int categoryId);
        public abstract Task<Category> EditCategory(Category category, int CategoryId);
    }
}
