using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Views.Image
{
    public class ImageAddDto
    {
        public string Name { get; set; }
        public string Description { get; set; } = "";
        public int? ConsoleId { get; set; }
        public int? UserConsoleId { get; set; }
        public string Stream { get; set; }
    }
}
