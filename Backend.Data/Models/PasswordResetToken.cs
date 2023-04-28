using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Models
{
    public class PasswordResetToken
    {
        [ForeignKey("User")]
        public int? UserId { get; set; }
        [Required]
        public User User { get; set; }
        public string Token { get; set; }
    }
}
