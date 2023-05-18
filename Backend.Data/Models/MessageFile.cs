using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Models
{
    public class MessageFile : BaseModel
    {
        public string Path { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } = "";
        [ForeignKey("Message")]
        public int? MessageId { get; set; }
        public Message Message { get; set; }
    }
}
