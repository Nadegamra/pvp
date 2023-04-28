using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Views.User
{
    public class UserPasswordReset
    {
        public string ResetCode { get; set; }
        public string NewPassword { get; set; }
    }
}
