using Backend.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Views.UserConsole
{
    public class UserConsoleStatusUpdateDto
    {
        public int Id { get; set; }
        public ConsoleStatus ConsoleStatus { get; set; }
    }
}
