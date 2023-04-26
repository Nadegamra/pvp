using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Views.Manufacturer
{
    public class ManufacturerAdd
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
