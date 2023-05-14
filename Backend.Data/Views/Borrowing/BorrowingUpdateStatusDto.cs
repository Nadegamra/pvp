using Backend.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Views.BorrowedConsole
{
    public class BorrowingUpdateStatusDto
    {
        public int Id { get; set; }
        public BorrowingStatus Status { get; set; }
    }
}
