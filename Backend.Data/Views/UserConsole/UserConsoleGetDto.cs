using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Backend.Data.Views.User;
using Backend.Data.Views.Console;
using Backend.Data.Views.Image;
using Backend.Data.Models;

namespace Backend.Data.Views.UserConsole
{
    public class UserConsoleGetDto
    {
        public int? UserId { get; set; }
        public UserGet User { get; set; }
        public int? ConsoleId { get; set; }
        public ConsoleGetDto Console { get; set; }
        public int Amount { get; set; }
        public string Accessories { get; set; }
        public ICollection<ImageGetDto> Images { get; set; }
        public ConsoleStatus ConsoleStatus { get; set; }
    }
}
