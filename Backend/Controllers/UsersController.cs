using AutoMapper;
using Backend.Data.Models;
using Backend.Data.Views.User;
using Backend.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController: ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly UsersHandler _handler;

        public UsersController(IMapper mapper, UsersHandler handler)
        {
            _mapper = mapper;
            _handler = handler;
        }

        [Authorize(Roles = "admin")]
        [HttpGet("admin/getAll")]
        public async Task<ActionResult> GetAllUsers(string? roleName)
        {
            try
            {
                List<UserGet> users = _mapper.Map<List<User>, List<UserGet>>(await _handler.GetUsers(roleName));
                return Ok(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("confirmEmail")]
        public async Task<ActionResult> ConfirmEmail([FromBody] UserEmailConfirmation token)
        {
            try
            {
                token.Token = token.Token.Replace('_', '/');
                await _handler.ConfirmEmail(token.Token);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [AllowAnonymous]
        [HttpPost("passwordReset/send")]
        public async Task<ActionResult> SendPasswordResetEmail([FromBody] string email)
        {
            try
            {
                await _handler.SendPasswordResetEmail(email);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("passwordReset/change")]
        public async Task<ActionResult> ResetPassword([FromBody] UserPasswordReset info)
        {
            try
            {
                info.ResetCode = info.ResetCode.Replace('_', '/');
                await _handler.ResetPassword(info.ResetCode, info.NewPassword);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        //[HttpPatch("account/personalInfo/update")]
        //public async Task<ActionResult<UserGet>> UpdatePersonalInfo([FromBody] UserUpdate info)
        //{
        //    try
        //    {
        //        var result = await _handler.UpdatePersonalInfo(User, _mapper.Map<UserUpdate, User>(info));
        //        return Ok(_mapper.Map<User, UserGet>(result));
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}
        [HttpPost("account/changePassword")]
        public async Task<ActionResult> ChangePassword([FromBody] UserPasswordChange passwordInfo)
        {
            try
            {
                await _handler.ChangePassword(User, passwordInfo);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost("changeEmail/send")]
        public async Task<ActionResult> SendEmailChangeToken([FromBody] string newEmail)
        {
            try
            {
                await _handler.SendEmailAddressChangeEmail(User, newEmail);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost("changeEmail/change")]
        public async Task<ActionResult> ChangeEmail([FromBody] string token)
        {
            try
            {
                token = token.Replace('_', '/');
                await _handler.ChangeEmail(User, token);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
