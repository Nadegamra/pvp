using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Models
{
    public class BaseModel
    {
        [Key]
        public int Id { get; set; }
    }
}
