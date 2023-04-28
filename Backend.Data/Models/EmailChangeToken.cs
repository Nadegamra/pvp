using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Models
{
    public class EmailChangeToken
    {
        [ForeignKey("User")]
        public int? UserId { get; set; }
        [Required]
        public User User { get; set; }
        public string Token { get; set; }
        public string NewEmail { get; set; }
    }
}
