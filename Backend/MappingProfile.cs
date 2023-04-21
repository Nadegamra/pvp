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
            CreateMap<RegisterPhysical, User>(MemberList.None);
            CreateMap<RegisterLegal, User>(MemberList.None);
            CreateMap<User, RegistrationRequest>()
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.CompanyName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.CompanyCode, opt => opt.MapFrom(src => src.CompanyCode));

            CreateMap<RegistrationRequest, RegisterLegal>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.CompanyCode, opt => opt.MapFrom(src => src.CompanyCode))
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.CompanyName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password));
        }
    }
}