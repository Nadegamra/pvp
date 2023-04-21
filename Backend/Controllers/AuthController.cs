using Backend.Data.Models;
using Backend.Data.Views;
using Backend.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthHandler _authHandler;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public AuthController(AuthHandler authHandler, UserManager<User> userManager, IMapper mapper)
        {
            _authHandler = authHandler;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpPost("register-customer")]
        public async Task<ActionResult<UserGet>> RegisterCustomer(CustomerRegister data)
        {
            try
            {
                var user = await _authHandler.Register(data);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "admin")]
        [HttpGet("company-registration-requests")]
        public async Task<List<CompanyRegistrationRequest>> GetCompanyRegistrationRequests()
        {
            var users = await _userManager.Users.ToListAsync();

            var companyRegistrationRequests = users
                .Where(u => _userManager.IsInRoleAsync(u, "company").Result && !u.CompanyApproved)
                .Select(u => new CompanyRegistrationRequest(_userManager, _mapper)
                {
                    CompanyName = u.CompanyName,
                    CompanyCode = u.CompanyCode,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber,
                    Address = $"{u.StreetNo} {u.Street}, {u.City}, {u.County}, {u.Country} {u.PostCode}",
                })
                .ToList();

            return companyRegistrationRequests;
        }
    

    [HttpPost("login")]
        public async Task<ActionResult<UserGet>> Login(UserLogin data)
        {
            try
            {
                var user = await _authHandler.Login(data);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("logout")]
        public async Task<ActionResult<bool>> Logout()
        {
            try
            {
                var result = await _authHandler.Logout();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<ActionResult<UserGet>> GetProfile()
        {
            try
            {
                var user = await _authHandler.GetProfile(HttpContext.User);
                if (user is null)
                {
                    return NotFound();
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
