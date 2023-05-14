using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Models
{
    public class UserConsole: BaseModel
    {
        [ForeignKey("User")]
        public int? UserId { get; set; }
        [Required]
        public User User { get; set; }
        public int? BorrowedConsoleId { get; set; }
        public Borrowing BorrowedConsole { get; set; }

        [ForeignKey("Console")]
        public int? ConsoleId { get; set; }
        [Required]
        public Console? Console { get; set; }
        public int? ConversationId { get; set; }
        public Conversation? Conversation { get; set; }
        public int Amount { get; set; }
        public string Accessories { get; set; }
        public ICollection<Image>? Images { get; set; }
        public UserConsoleStatus ConsoleStatus { get; set; }
    }
}
