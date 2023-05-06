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
        private readonly ConsolesHandler _consolesHandler;
        private readonly ImagesHandler _imagesHandler;

        public ConsolesController(ConsolesHandler consolesHandler, ImagesHandler imagesHandler)
        {
            _consolesHandler = consolesHandler;
            _imagesHandler = imagesHandler;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult> GetConsoles()
        {
            try
            {
                var result = await _consolesHandler.GetConsolesAsync();

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
                var result = await _consolesHandler.GetConsoleAsync(id);

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

                var result = await _consolesHandler.AddConsoleAsync(consoleDto);

                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }
        [HttpPut("update")]
        public async Task<ActionResult> UpdateConsole(ConsoleDtoUpdate consoleDto)
        {
            try
            {
                var result = await _consolesHandler.UpdateConsoleAsync(consoleDto);

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
                await _consolesHandler.RemoveConsoleAsync(id);
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("images/add")]
        public async Task<ActionResult> AddImage(ImageDtoAdd imageDto)
        {
            try
            {
                await _imagesHandler.AddImageAsync(imageDto);
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("images/delete")]
        public async Task<ActionResult> RemoveImage(int id)
        {
            try
            {
                await _imagesHandler.RemoveImageAsync(id);
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
