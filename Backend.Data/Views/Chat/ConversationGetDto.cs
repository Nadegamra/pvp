using Backend.Data.Views.BorrowedConsole;
using Backend.Data.Views.Message;
using Backend.Data.Views.UserConsole;

namespace Backend.Data.Views.Chat
{
    public class ConversationGetDto
    {
        public int Id { get; set; }
        public int UserConsoleId { get; set; }
        public UserConsoleGetDto UserConsole { get; set; }
        public int? BorrowingId { get; set; }
        public BorrowingGetDto Borrowing { get; set; }
        public ICollection<MessageGetDto> Messages { get; set; }
    }
}
