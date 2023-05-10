using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Models
{
    public class Message: BaseModel
    {
        public int ConversationId { get; set; }
        public Conversation Conversation { get; set; }
        public string Text { get; set; }
        public bool FromAdmin { get; set; }
    }
}
