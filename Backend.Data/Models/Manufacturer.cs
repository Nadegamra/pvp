using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Models
{
    public class Manufacturer: BaseModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
