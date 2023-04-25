using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Views.User
{
    public class UserLogin
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public bool RememberPassword { get; set; }
    }
}
