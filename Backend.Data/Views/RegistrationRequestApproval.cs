using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Backend.Data.Views
{
    public class RegistrationRequestApproval
    {
        public int RequestId { get; set; }
        public bool IsApproved { get; set; }
    }
}