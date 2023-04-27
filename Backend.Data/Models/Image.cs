using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Models
{
    public class Image: BaseModel
    {
        public string Path { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } = "";
        public int ConsoleId { get; set; }
        public Console Console { get; set; }
    }
}
