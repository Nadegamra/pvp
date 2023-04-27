using AutoMapper;
using Backend.Data.Models;
using Backend.Data.Views.Manufacturer;
using Backend.Handlers.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ManufacturersController: ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IManufacturersHandler _handler;

        public ManufacturersController(IMapper mapper, IManufacturersHandler handler)
        {
            _mapper = mapper;
            _handler = handler;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<List<ManufacturerGet>>> GetManufacturers()
        {
            try
            {
                var result = _mapper.Map<List<Manufacturer>, List<ManufacturerGet>>(await _handler.GetManufacturers());
                return Ok(result);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("get")]
        public async Task<ActionResult<ManufacturerGet>> GetManufacturer(int id)
        {
            try
            {
                var result = _mapper.Map<Manufacturer, ManufacturerGet>(await _handler.GetManufacturer(id));
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Authorize(Roles = "admin")]
        [HttpPost("add")]
        public async Task<ActionResult> AddManufacturer([FromBody]ManufacturerAdd manufacturer)
        {
            try
            {
                await _handler.AddManufacturer(_mapper.Map<ManufacturerAdd, Manufacturer>(manufacturer));
                return Ok();
            }
            catch (Exception e)
            {
               return BadRequest(e.Message);
            }
        }
        [Authorize(Roles = "admin")]
        [HttpPatch("update")]
        public async Task<ActionResult> UpdateManufacturer([FromBody]ManufacturerUpdate manufacturer)
        {
            try
            {
                var result = await _handler.UpdateManufacturer(_mapper.Map<ManufacturerUpdate, Manufacturer>(manufacturer), manufacturer.ManufacturerId);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Authorize(Roles = "admin")]
        [HttpDelete("remove")]
        public async Task<ActionResult> RemoveManufacturer(int id)
        {
            try
            {
                await _handler.RemoveManufacturer(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
