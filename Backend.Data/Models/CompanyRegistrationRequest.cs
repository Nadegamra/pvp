using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;


namespace Backend.Data.Models
{
    public class CompanyRegistrationRequest
    {
        public string CompanyName { get; set; }
        public string CompanyCode { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsApproved { get; set; }

        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public CompanyRegistrationRequest(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }
    }
}
