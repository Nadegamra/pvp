using Backend.Data.Models;
using Backend.Data.Views.Message;
using Backend.Handlers;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatsController: ControllerBase
    {
        private readonly ChatsHandler _handler;

        public ChatsController(ChatsHandler handler)
        {
            _handler = handler;
        }
        [HttpGet("getAll/admin")]

        public async Task<ActionResult<List<Conversation>>> GetAllConversations()
        {
            try
            {
                return await _handler.GetAllConversations();
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getAll")]
        public async Task<ActionResult<List<Conversation>>> GetUserConversations()
        {
            try
            {
                return await _handler.GetUserConversations(User);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("get/{userConsoleId}")]
        public async Task<ActionResult<Conversation>> GetConversation(int userConsoleId)
        {
            try
            {
                return await _handler.GetConversation(userConsoleId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("contact/{userConsoleId}")]
        public async Task<ActionResult> ContactLender(int userConsoleId)
        {
            try
            {
                await _handler.ContactLender(userConsoleId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("message")]
        public async Task<ActionResult> SendMessage(MessageAddDto addDto)
        {
            try
            {
                await _handler.SendMessage(addDto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
