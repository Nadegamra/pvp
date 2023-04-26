using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Views.Category
{
    public class CategoryGet
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual ICollection<CategoryGet> ChildCategories { get; set; }
    }
}
