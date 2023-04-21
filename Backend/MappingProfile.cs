using AutoMapper;
using Backend.Data.Models;
using Backend.Data.Views;

namespace Backend
{
    public class MappingProfile : Profile
    {
        public MappingProfile() : base("mapper")
        {
            CreateMap<User, UserGet>(MemberList.None);
            CreateMap<CustomerRegister, User>(MemberList.None);
            CreateMap<CompanyRegister, User>(MemberList.None);
            CreateMap<User, CompanyRegistrationRequest>()
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.CompanyName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
                .ForMember(dest => dest.CompanyCode, opt => opt.MapFrom(src => src.CompanyCode));
        }
    }
}