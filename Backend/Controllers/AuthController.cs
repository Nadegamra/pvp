using Backend.Data.Models;
using Backend.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Backend.Data.Views.User;

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

        [HttpPost("register/lender/physical")]
        public async Task<ActionResult<UserGet>> RegisterPhysical(RegisterPhysical data)
        {
            try
            {
                var user = await _authHandler.Register(data);
                user.Role = "lender";
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("register/lender/legal")]
        public async Task<ActionResult<UserGet>> RegisterLegal(RegisterLegal data)
        {
            try
            {
                var user = await _authHandler.Register(data);
                user.Role = "lender";
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("register/borrower/request")]
        public async Task<ActionResult<RegistrationRequest>> SubmitRequest(RegistrationRequest request)
        {
            try
            {
                var requests = await _authHandler.SubmitRegistrationRequest(request);
                return Ok(requests);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "admin")]
        [HttpPost("register/borrower/confirm")]
        public async Task<ActionResult> ApproveRequest(RegistrationRequestApproval requestApproval)
        {
            try
            {
                var result = await _authHandler.ApproveRegistrationRequest(requestApproval);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "admin")]
        [HttpGet("register/borrower/getAll")]
        public async Task<ActionResult<List<RegistrationRequest>>> GetCompanyRegistrationRequests()
        {
            try
            {
                var requests = await _authHandler.GetRegistrationRequests();
                return Ok(requests);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
