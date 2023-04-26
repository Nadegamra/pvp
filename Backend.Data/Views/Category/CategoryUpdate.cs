using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Views.Category
{
    public class CategoryUpdate
    {
        public int CategoryId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int? ParentCategoryId { get; set; }
    }
}
