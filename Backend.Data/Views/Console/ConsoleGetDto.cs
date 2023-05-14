using Backend.Data.Models;
using Backend.Data.Views.Image;

namespace Backend.Data.Views.Console
{
    public class ConsoleGetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal DailyPrice { get; set; }
        public ICollection<ImageGetDto> Images { get; set; }
    }
}
