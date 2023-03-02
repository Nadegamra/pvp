using Backend.Data.Views;
using Backend.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    //Username: admin@admin.com
    //Password: Password123!

    //Username: user@example.com
    //Password: User123!

    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class AuthController: ControllerBase
    {
        private readonly AuthHandler _usersHandler;

        public AuthController(AuthHandler usersHandler)
        {
            _usersHandler = usersHandler;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] UserLogin loginModel)
        {
            UserGet result;
            try
            {
                result = await _usersHandler.Login(loginModel);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Login credentials are invalid");
            }
        }

        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            await _usersHandler.Logout();
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("getProfile")]
        public async Task<ActionResult> GetProfile()
        {
            UserGet result = await _usersHandler.GetProfile(User);
            return Ok(result);
        }
    }
}
