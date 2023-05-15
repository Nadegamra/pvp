using Backend.Data.Views.BorrowedConsole;
using Backend.Handlers;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BorrowingsController: ControllerBase
    {
        private readonly BorrowingsHandler _handler;

        public BorrowingsController(BorrowingsHandler handler)
        {
            _handler = handler;
        }

        [HttpGet("all")]
        public async Task<ActionResult<List<BorrowingGetDto>>> GetAll()
        {
            try
            {
                var result = await _handler.GetAllAsync();
                return Ok(result);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("user")]
        public async Task<ActionResult<List<BorrowingGetDto>>> GetByUser()
        {
            try
            {
                var result = await _handler.GetByUserAsync(User);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BorrowingGetDto>> GetById(int id)
        {
            try
            {
                var result = await _handler.GetByIdAsync(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add(BorrowingAddDto addDto)
        {
            try
            {
                await _handler.AddAsync(addDto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPatch("update")]
        public async Task<ActionResult> Update(BorrowingUpdateDto updateDto)
        {
            try
            {
                await _handler.UpdateAsync(updateDto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPatch("status")]
        public async Task<ActionResult> UpdateStatus(BorrowingUpdateStatusDto statusDto)
        {
            try
            {
                await _handler.UpdateStatusAsync(statusDto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(BorrowingDeleteDto deleteDto)
        {
            try
            {
                await _handler.DeleteAsync(deleteDto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
