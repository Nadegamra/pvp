using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Views.MessageFile
{
    public class MessageFileAddDto
    {
        public string Name { get; set; }
        public string Description { get; set; } = "";
        public int MessageId { get; set; }
        public string Stream { get; set; }
    }
}
