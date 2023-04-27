using AutoMapper;
using Backend.Data.Models;
using Backend.Data.Views.Category;
using Backend.Handlers.Categories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController: ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ICategoriesHandler _handler;
        private readonly IMapper _mapper;

        public CategoriesController(IConfiguration configuration, ICategoriesHandler handler, IMapper mapper)
        {
            _configuration = configuration;
            _handler = handler;
            _mapper = mapper;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult> GetCategories()
        {
            try
            {
                var categories = _mapper.Map<List<Category>, List<CategoryGet>>(await _handler.GetCategoriesWithChildren());
                return Ok(categories);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("get")]
        public async Task<ActionResult> GetCategory(int id)
        {
            try
            {
                var category = _mapper.Map<Category, CategoryGet>(await _handler.GetCategoryWithChildren(id));
                return Ok(category);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost("add")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> AddCategory([FromBody]CategoryAdd category)
        {
            try
            {
                await _handler.AddCategory(_mapper.Map<CategoryAdd, Category>(category));
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Authorize(Roles = "admin")]
        [HttpDelete("remove")]
        public async Task<ActionResult> RemoveCategory(int id)
        {
            try
            {
                await _handler.RemoveCategory(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Authorize(Roles = "admin")]
        [HttpPatch("update")]
        public async Task<ActionResult> UpdateCategory([FromBody]CategoryUpdate category)
        {
            try
            {
                var result = await _handler.EditCategory(_mapper.Map<CategoryUpdate, Category>(category), category.CategoryId);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
