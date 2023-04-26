using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Views.Category
{
    public class CategoryAdd
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public int? ParentCategoryId { get; set; }
    }
}
