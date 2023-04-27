using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Views.Console
{
    public class ImageDtoAdd
    {
        public string Name { get; set; }
        public string Description { get; set; } = "";
        public int ConsoleId { get; set; }
        public string Stream { get; set; }
    }
}
