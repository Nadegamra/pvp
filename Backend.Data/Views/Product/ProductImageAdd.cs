using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Views.Product
{
    public class ProductImageAdd
    {
        public string Description { get; set; }
        [Required]
        public string DisplaySizeURL { get; set; }
        [Required]
        public string ThumbnailURL { get; set; }
        [Required]
        public int ProductId { get; set; }
    }
}
