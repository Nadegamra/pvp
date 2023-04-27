using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data.Models
{
    public class Image: BaseModel
    {
        public string Description { get; set; }
        [Required]
        public string Path { get; set; }

        [ForeignKey("Product")]
        public int? ProductId { get; set; }
        public Product? Product { get; set; }
        [ForeignKey("Service")]
        public int? ServiceId { get; set; }
    }
}
