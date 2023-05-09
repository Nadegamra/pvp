using Backend.Data.Views.Console;
using Backend.Data.Views.Image;
using Backend.Data.Views.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Views.UserConsole
{
    public class UserConsoleAddDto
    {
        public int? ConsoleId { get; set; }
        public int Amount { get; set; }
        public string Accessories { get; set; }
        public ICollection<ImageAddDto> Images { get; set; }
    }
}
