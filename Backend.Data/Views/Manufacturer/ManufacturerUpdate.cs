using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Views.Manufacturer
{
    public class ManufacturerUpdate
    {
        public int ManufacturerId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}
