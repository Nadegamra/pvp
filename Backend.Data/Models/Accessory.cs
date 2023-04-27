using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Models
{
    public class Accessory: BaseModel
    {
        public string Name { get; set; }
        public AccessoryCategory Category { get; set; }
    }
}
