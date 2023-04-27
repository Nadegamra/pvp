using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Views.Console
{
    public class ConsoleDtoAdd
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal DailyPrice { get; set; }
        public ICollection<ImageDtoAdd> Images { get; set; }
    }
}
