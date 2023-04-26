using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Mime;


namespace Backend.Data.Models
{
    public class Product: BaseModel
    {
        [Required]
        public int? ManufacturerId { get; set; }
        [Required]
        public int? CategoryId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal CurrentDiscount { get; set; }
        [Required]
        public decimal PriceEurNoTaxes { get; set; }
        public int UnitsAvailable { get; set; } = 0;
        public int UnitsReserved { get; set; } = 0;
        [NotMapped]
        public int? Rating { get; set; }
        public virtual ICollection<Image> Images { get; set; }
    }
}
