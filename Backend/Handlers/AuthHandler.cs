using Backend.Data;
using Backend.Data.Models;
using Backend.Data.Views;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;

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

        public async Task<UserGet> Register(CustomerRegister data)
        {
            var user = _mapper.Map<User>(data);
            user.UserName = data.Email;

            var result = await _userManager.CreateAsync(user, data.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "customer");
                await _signInManager.SignInAsync(user, isPersistent: false);

                return _mapper.Map<UserGet>(user);
            }
            else
            {
                string errors = string.Join("\n", result.Errors.Select(e => e.Description));
                throw new Exception(errors);
            }
        }

        public async Task<UserGet> Register(CompanyRegister data)
        {
            var user = _mapper.Map<User>(data);
            user.UserName = data.Email;

            var result = await _userManager.CreateAsync(user, data.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "company");
                await _signInManager.SignInAsync(user, isPersistent: false);

                return _mapper.Map<UserGet>(user);
            }
            else
            {
                string errors = string.Join("\n", result.Errors.Select(e => e.Description));
                throw new Exception(errors);
            }
        }

        public async Task<UserGet> Login(UserLogin data)
        {
            var user = await GetUser(data);
            var signInResult = await _signInManager.PasswordSignInAsync(user, data.Password, data.RememberPassword, false);

            if (!signInResult.Succeeded)
            {
                throw new ArgumentException("Login credentials are incorrect");
            }

            var userGet = _mapper.Map<UserGet>(user);
            userGet.Role = (await _userManager.GetRolesAsync(user)).First();

            return userGet;
        }

        public async Task<bool> Logout()
        {
            await _signInManager.SignOutAsync();
            return true;
        }

        public async Task<UserGet> GetProfile(ClaimsPrincipal claims)
        {
            var user = await _userManager.GetUserAsync(claims);

            if (user is null)
            {
                return null;
            }

            var userGet = _mapper.Map<UserGet>(user);
            userGet.Role = (await _userManager.GetRolesAsync(user)).First();

            return userGet;
        }
        public async Task<List<CompanyRegistrationRequest>> GetCompanyRegistrationRequests()
        {
            var users = await _userManager.Users.ToListAsync();

            var companyRegistrationRequests = users
                .Where(u => _userManager.IsInRoleAsync(u, "company").Result && !u.CompanyApproved)
                .Select(u => _mapper.Map<CompanyRegistrationRequest>(u))
                .ToList();

            return companyRegistrationRequests;
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
