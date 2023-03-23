using AutoMapper;
using Backend.Data.Models;
using Backend.Data.Views;

namespace Backend
{
    public class MappingProfile: Profile
    {
        public MappingProfile(): base("mapper") {
            CreateMap<User, UserGet>(MemberList.None);
            CreateMap<CustomerRegister, User>(MemberList.None);
            CreateMap<CompanyRegister, User>(MemberList.None);
        }
    }
}
