using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Views.Manufacturer
{
    public class ManufacturerGet
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
