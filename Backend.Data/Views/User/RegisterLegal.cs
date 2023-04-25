using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Views.User
{
    public class RegisterLegal
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string CompanyCode { get; set; }

        [Required]
        public string CompanyName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
