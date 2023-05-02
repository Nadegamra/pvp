using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

//TODO: Create more sensible attributes for when User is a company

namespace Backend.Data.Models
{
    public class User: IdentityUser<int>
    {
        [Required, StringLength(256), ProtectedPersonalData]
        public string FirstName { get; set; } = String.Empty;

        [Required, StringLength(256), ProtectedPersonalData]
        public string LastName { get; set; } = String.Empty;

        [Required, StringLength(10), ProtectedPersonalData]
        public string CompanyCode { get; set; } = String.Empty;

        [Required, StringLength(256), ProtectedPersonalData]
        public string CompanyName { get; set; } = String.Empty;

        [Required, StringLength(64), ProtectedPersonalData]
        public string Country { get; set; } = String.Empty;

        [Required, StringLength(64), ProtectedPersonalData]
        public string County { get; set; } = String.Empty;

        [Required, StringLength(64), ProtectedPersonalData]
        public string City { get; set; } = String.Empty;

        [Required, StringLength(64), ProtectedPersonalData]
        public string StreetAddress { get; set; } = String.Empty;

        [Required, StringLength(10), ProtectedPersonalData]
        public string PostalCode { get; set; } = String.Empty;
        public bool IsCompany { get; set; } = false;
    }
}
