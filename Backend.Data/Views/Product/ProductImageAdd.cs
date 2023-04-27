using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Views.Product
{
    public class ProductImageAdd
    {
        public string Description { get; set; }
        [Required]
        public string Path { get; set; }

        [Required]
        public int ProductId { get; set; }
    }
}
