using Backend.Data.Models;

namespace Backend.Data.Views.Console
{
    public class ConsoleDtoGet
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal DailyPrice { get; set; }
        public ICollection<ImageDtoGet> Images { get; set; }
    }
}
