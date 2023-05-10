using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Models
{
    public class Conversation: BaseModel
    {
        public int UserConsoleId { get; set; }
        public UserConsole UserConsole { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}
