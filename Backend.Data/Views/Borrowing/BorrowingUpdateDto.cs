using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Views.BorrowedConsole
{
    public class BorrowingUpdateDto
    {
        public int Id { get; set; }
        public ICollection<int> UserConsoleIds { get; set; }
    }
}
