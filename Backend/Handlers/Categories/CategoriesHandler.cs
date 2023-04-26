using Backend.Data;
using Backend.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Backend.Handlers.Categories
{
    public class CategoriesHandler : ICategoriesHandler
    {
        private readonly AppDbContext _context;

        public CategoriesHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddCategory(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
        }

        public async Task<Category> EditCategory(Category category, int categoryId)
        {
            Category? original = _context.Categories.Where(x => x.Id == categoryId).FirstOrDefault();
            if(original == null)
            {
                throw new Exception($"Category with id={categoryId} does not exist");
            }
            foreach(PropertyInfo cat in category.GetType().GetProperties())
            {
                if(cat.GetValue(category) == null || cat.Name == "Id")
                {
                    continue;
                }
                cat.SetValue(original,cat.GetValue(category));
            }
            _context.Categories.Update(original);
            await _context.SaveChangesAsync();
            return original;
        }

        public async Task<List<Category>> GetCategoriesWithChildren()
        {
            List<Category> categories = _context.Categories.Include(x=>x.ChildCategories).Where(x => x.ChildCategories.Count != 0).ToList();
            return categories.Where(x => x.ParentCategoryId == null).ToList(); //Nesujungti i viena eilute, nes tada nepilnai veiks
        }

        public async Task<Category> GetCategoryWithChildren(int categoryId)
        {
            List<Category> categories = _context.Categories.Include(x => x.ChildCategories).Where(x => x.Id == categoryId).ToList();
            List<int> resultIds = new List<int> { categoryId };
            while (true)
            {
                List<int> newIds = new List<int>();
                foreach(Category category in categories)
                {
                    var list = category.ChildCategories.Where(x => !resultIds.Contains(x.Id)).Select(x => x.Id).ToList();
                    if(list.Count != 0)
                        newIds.AddRange(list);
                }
                resultIds.AddRange(newIds);
                categories = _context.Categories.Include(x=>x.ChildCategories).Where(x=> newIds.Contains(x.Id)).ToList();
                if(newIds.Count == 0)
                {
                    break;
                }
            }
            categories = _context.Categories.Include(x => x.ChildCategories).Where(x => resultIds.Contains(x.Id)).ToList();
            Category? result = categories.Where(x => x.Id == categoryId).FirstOrDefault();
            if(result == null)
            {
                throw new Exception($"Category with id={categoryId} does not exist");
            }
            return result;
        }

        public async Task RemoveCategory(int categoryId)
        {
            Category? category = await _context.Categories.Where(x => x.Id == categoryId).FirstOrDefaultAsync();
            if (category == null)
            {
                throw new Exception($"Category with id={categoryId} does not exist");
            }
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }
    }
}
