using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.Data.Views.Image;

namespace Backend.Data.Views.Console
{
    public class ConsoleAddDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal DailyPrice { get; set; }
        public ICollection<ImageAddDto> Images { get; set; }
    }
}
