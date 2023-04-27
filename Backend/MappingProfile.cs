using AutoMapper;
using Backend.Data.Models;
using Backend.Data.Views.Console;
using Backend.Data.Views.User;

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

            CreateMap<RegistrationRequest, RegisterLegal>(MemberList.None)
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.CompanyCode, opt => opt.MapFrom(src => src.CompanyCode))
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.CompanyName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password));

            CreateMap<Data.Models.Console, ConsoleDtoGet>(MemberList.None)
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.DailyPrice, opt => opt.MapFrom(src => src.DailyPrice))
                .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images));
            CreateMap<ConsoleDtoAdd, Data.Models.Console>(MemberList.None)
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.DailyPrice, opt => opt.MapFrom(src => src.DailyPrice));
            CreateMap<ConsoleDtoUpdate, Data.Models.Console>(MemberList.None)
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.DailyPrice, opt => opt.MapFrom(src => src.DailyPrice));
            CreateMap<Image, ImageDtoGet>(MemberList.None);
            CreateMap<ImageDtoAdd, Image>(MemberList.None);
            CreateMap<ImageDtoUpdate, Image>(MemberList.None);

        }
    }
}