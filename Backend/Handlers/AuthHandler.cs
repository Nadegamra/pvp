using Backend.Data;
using Backend.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.OAuth;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Backend.Data.Views.User;

namespace Backend.Handlers
{
    public class AuthHandler
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;

        public AuthHandler(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper, AppDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _context = context;
        }

        private async Task<User> GetUser(UserLogin data)
        {
            MailAddress _;
            return MailAddress.TryCreate(data.UserName, out _) ?
                await _userManager.FindByEmailAsync(data.UserName) :
                await _userManager.FindByNameAsync(data.UserName);
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

        public async Task<UserGet> Register(RegisterPhysical data)
        {
            var user = _mapper.Map<User>(data);
            user.UserName = data.Email;

            var result = await _userManager.CreateAsync(user, data.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "lender");
                await _signInManager.SignInAsync(user, isPersistent: false);

                return _mapper.Map<UserGet>(user);
            }
            else
            {
                string errors = string.Join("\n", result.Errors.Select(e => e.Description));
                throw new Exception(errors);
            }
        }

        public async Task<UserGet> Register(RegisterLegal data)
        {
            var user = _mapper.Map<User>(data);
            user.UserName = data.Email;

            var result = await _userManager.CreateAsync(user, data.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "lender");
                await _signInManager.SignInAsync(user, isPersistent: false);

                return _mapper.Map<UserGet>(user);
            }
            else
            {
                string errors = string.Join("\n", result.Errors.Select(e => e.Description));
                throw new Exception(errors);
            }
        }

        public async Task<UserGet> RegisterBorrower(RegisterLegal data)
        {
            var user = _mapper.Map<User>(data);
            user.UserName = data.Email;

            var result = await _userManager.CreateAsync(user, data.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "borrower");
                await _signInManager.SignInAsync(user, isPersistent: false);

                return _mapper.Map<UserGet>(user);
            }
            else
            {
                string errors = string.Join("\n", result.Errors.Select(e => e.Description));
                throw new Exception(errors);
            }
        }

        public async Task<List<RegistrationRequest>> GetRegistrationRequests()
        {
            return _context.RegistrationRequests.Select(x => x).ToList();
        }

        public async Task<RegistrationRequest> SubmitRegistrationRequest(RegistrationRequest request)
        {
            request.DateCreated= DateTime.Now;
            var result = await _context.RegistrationRequests.AddAsync(request);

            await _context.SaveChangesAsync();

            return result.Entity;
        }
        public async Task<bool> ApproveRegistrationRequest(RegistrationRequestApproval requestApproval)
        {
            var request = await _context.RegistrationRequests.Where(x => x.Id == requestApproval.RequestId).FirstOrDefaultAsync();
            if (request == null)
            {
                throw new ArgumentOutOfRangeException("Request with this id does not exist");
            }

            _context.RegistrationRequests.Remove(request);
            await _context.SaveChangesAsync();

            if (!requestApproval.IsApproved)
            {
                return false;
            }

            RegisterLegal dto = _mapper.Map<RegistrationRequest, RegisterLegal>(request);

            try
            {
                return (await Register(dto) != null);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            


        }
    }
}
