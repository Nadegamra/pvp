using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Models
{
    public class RegistrationRequest: BaseModel
    {
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
        public DateTime DateCreated { get; set; }
    }
}
