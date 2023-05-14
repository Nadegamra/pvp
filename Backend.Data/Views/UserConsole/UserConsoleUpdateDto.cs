using Backend.Data.Views.Image;

namespace Backend.Data.Views.UserConsole
{
    public class UserConsoleUpdateDto
    {
        public int Id { get; set; }
        public int? ConsoleId { get; set; }
        public int Amount { get; set; }
        public string Accessories { get; set; }
        public ICollection<ImageUpdateDto> Images { get; set; }
    }
}
