using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Views.Console
{
    public class ConsoleDtoUpdate
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string DailyPrice { get; set; }
        public ICollection<ImageDtoUpdate> Images { get; set; }
    }
}
