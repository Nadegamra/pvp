using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data.Models
{
    public class Borrowing: BaseModel
    {
        [ForeignKey("User")]
        public int? UserId { get; set; }
        [Required]
        public User User { get; set; }
        public int? ConversationId { get; set; }
        public Conversation? Conversation { get; set; }
        public ICollection<UserConsole> UserConsoles { get; set; }
        public BorrowingStatus Status { get; set; }
    }
}
