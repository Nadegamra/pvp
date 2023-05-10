using Backend.Data.Views.Message;
using Backend.Data.Views.UserConsole;

namespace Backend.Data.Views.Chat
{
    public class ConversationGetDto
    {
        public int Id { get; set; }
        public int UserConsoleId { get; set; }
        public UserConsoleGetDto UserConsole { get; set; }
        public ICollection<MessageGetDto> Messages { get; set; }
    }
}
