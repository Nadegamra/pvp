using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data.Models
{
    public class Message: BaseModel
    {
        [ForeignKey("Conversation")]
        public int ConversationId { get; set; }
        public Conversation Conversation { get; set; }
        public ICollection<MessageFile> MessageFiles { get; set; }
        public string Text { get; set; }
        public bool FromAdmin { get; set; }
        public DateTime DateSent { get; set; }
    }
}
