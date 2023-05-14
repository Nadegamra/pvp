using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Models
{
    public enum UserConsoleStatus
    {
        UNCONFIRMED,
        AT_PLATFORM,
        AT_LENDER,
        AWAITING_TERMINATION
    }
}
