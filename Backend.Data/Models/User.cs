using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Models
{
    public class User: IdentityUser<int>
    {
        [Required, StringLength(256), ProtectedPersonalData]
        public string FirstName { get; set; } = String.Empty;

        [Required, StringLength(256), ProtectedPersonalData]
        public string LastName { get; set; } = String.Empty;
    }
}
