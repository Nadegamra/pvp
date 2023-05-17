using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data.Models
{
    public class Conversation: BaseModel
    {
        [ForeignKey("UserConsole")]
        public int? UserConsoleId { get; set; }
        public UserConsole UserConsole { get; set; }
        [ForeignKey("Borrowing")]
        public int? BorrowingId { get; set; }
        public Borrowing Borrowing { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}
