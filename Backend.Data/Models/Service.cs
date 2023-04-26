using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Models
{
    public class Service: BaseModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal PriceFrom { get; set; }
        [Required]
        public bool IsActive { get; set; }
        public int ManufactureWorkdaysMin { get; set; }
        public int ManufactureWorkdaysMax { get; set; }
        public virtual ICollection<Image> Images { get; set; }

    }
}
