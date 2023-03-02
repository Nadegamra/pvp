using Backend.Data.Models;
using Microsoft.AspNetCore.Identity;
using System.Net.Mail;
using Backend.Data.Views;
using AutoMapper;
using Backend.Data;
using System.Security.Claims;

namespace Backend.Handlers
{
    public class AuthHandler
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;

        public AuthHandler(UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole<int>> roleManager, IMapper mapper, AppDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _mapper = mapper;
            _context = context;
        }

        public async Task<UserGet> Login(UserLogin data)
        {
            User user = await GetUser(data);
            var signInResult = await _signInManager.PasswordSignInAsync(user, data.Password, data.RememberPassword, false);

            if (!signInResult.Succeeded)
            {
                throw new ArgumentException("Login credentials are incorrect");
            }

            UserGet result = _mapper.Map<User, UserGet>(user);
            result.Role = (await _userManager.GetRolesAsync(user)).First();

            return result;
        }

        private async Task<User> GetUser(UserLogin data)
        {
            MailAddress _;
            return MailAddress.TryCreate(data.UserName,out _) ?
                await _userManager.FindByEmailAsync(data.UserName) :
                await _userManager.FindByNameAsync(data.UserName);
        }

        public async Task<UserGet> GetUser(ClaimsPrincipal claims)
        {
            User user = await _userManager.GetUserAsync(claims);

            if(user is null)
            {
                return null;
            }

            UserGet result = _mapper.Map<User, UserGet>(user);
            result.Role = (await _userManager.GetRolesAsync(user)).First();

            return result;
        }

        public async Task<bool> Logout()
        {
            await _signInManager.SignOutAsync();
            return true;
        }
    }
}
