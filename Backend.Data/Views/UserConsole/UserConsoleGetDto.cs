using Backend.Data.Views.User;
using Backend.Data.Views.Console;
using Backend.Data.Views.Image;
using Backend.Data.Models;
using Backend.Data.Views.Chat;

namespace Backend.Data.Views.UserConsole
{
    public class UserConsoleGetDto
    {
        public int? Id { get; set; }
        public int? UserId { get; set; }
        public UserGet User { get; set; }
        public int? ConsoleId { get; set; }
        public ConsoleGetDto Console { get; set; }
        public int? BorrowingId { get; set; }
        public int? ConversationId { get; set; }
        public int Amount { get; set; }
        public string Accessories { get; set; }
        public ICollection<ImageGetDto> Images { get; set; }
        public UserConsoleStatus ConsoleStatus { get; set; }
    }
}
