using Backend.Data.Models;
using Microsoft.AspNetCore.Identity;
using System.Net.Mail;
using Backend.Data.Views;
using AutoMapper;
using Backend.Data;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace Backend.Handlers
{
    public class AuthHandler
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;

        public AuthHandler(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
        }

        public async Task<UserGet> Register(UserRegister data, string rolename)
        {
            
            var result = await _userManager.CreateAsync(_mapper.Map<UserRegister, User>(data), data.Password);
            if (result.Succeeded)
            {
                User user = await _userManager.FindByEmailAsync(data.Email);
                await _userManager.AddToRoleAsync(user, rolename);
                await _userManager.UpdateAsync(user);
                await _signInManager.SignInAsync(user, isPersistent: false);
                return _mapper.Map<User, UserGet>(user);
            }
            else
            {
                string errors = "";
                foreach (var error in result.Errors)
                {
                    errors += error.Code + error.Description + "\n";
                }
                throw new Exception(errors);
            }
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

        public async Task<bool> Logout()
        {
            await _signInManager.SignOutAsync();
            return true;
        }

        public async Task<UserGet> GetProfile(ClaimsPrincipal claims)
        {
            User? user = await _userManager.GetUserAsync(claims);

            if(user is null)
            {
                return null;
            }

            UserGet result = _mapper.Map<User, UserGet>(user);
            result.Role = (await _userManager.GetRolesAsync(user)).First();

            return result;
        }

        private async Task<User> GetUser(UserLogin data)
        {
            MailAddress _;
            return MailAddress.TryCreate(data.UserName, out _) ?
                await _userManager.FindByEmailAsync(data.UserName) :
                await _userManager.FindByNameAsync(data.UserName);
        }
    }
}
