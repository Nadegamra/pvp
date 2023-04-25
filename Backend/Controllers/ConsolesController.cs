using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Backend.Handlers;
using Backend.Data.Views.Console;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConsolesController: ControllerBase
    {
        private readonly ConsolesHandler _handler;

        public ConsolesController(ConsolesHandler handler)
        {
            _handler = handler;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult> GetConsoles()
        {
            try
            {
                var result = await _handler.GetConsolesAsync();

                return Ok(result);

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [HttpGet("get")]
        public async Task<ActionResult<ImageUploadResult>> GetConsole(int id)
        {
            try
            {
                var result = await _handler.GetConsoleAsync(id);

                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("add")]
        public async Task<ActionResult> AddConsole(ConsoleDtoAdd consoleDto)
        {
            try
            {
                var result = await _handler.AddConsoleAsync(consoleDto);

                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPatch("update")]
        public async Task<ActionResult> UpdateConsole(ConsoleDtoUpdate consoleDto)
        {
            try
            {
                var result = await _handler.UpdateConsoleAsync(consoleDto);

                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("remove")]
        public async Task<ActionResult<ImageUploadResult>> RemoveConsole(int id)
        {
            try
            {
                await _handler.RemoveConsoleAsync(id);
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
