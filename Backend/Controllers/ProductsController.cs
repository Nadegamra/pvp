using AutoMapper;
using Backend.Data.Models;
using Backend.Data.Views.Product;
using Backend.Handlers.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController: ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IProductsHandler _handler;

        public ProductsController(IMapper mapper, IProductsHandler handler)
        {
            _mapper = mapper;
            _handler = handler;
        }
        [HttpGet("get/id")]
        public async Task<ActionResult<ProductGet>> GetById(int id)
        {
            try
            {
                var result = _mapper.Map<Product, ProductGet>(await _handler.GetProduct(id));
                return Ok(result);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("get/category")]
        public async Task<ActionResult<List<ProductGet>>> GetByCategory(int id)
        {
            try
            {
                var result = _mapper.Map<List<Product>, List<ProductGet>>(await _handler.GetCategoryProducts(id));
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("get/manufacturer")]
        public async Task<ActionResult<List<ProductGet>>> GetByManufacturer(int id)
        {
            try
            {
                var result = _mapper.Map<List<Product>, List<ProductGet>>(await _handler.GetManufacturerProducts(id));
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Authorize(Roles = "lender")]
        [HttpPost("add")]
        public async Task<ActionResult<ProductGet>> AddProduct([FromBody]ProductAdd product)
        {
            try
            {
                var result = _mapper.Map<Product, ProductGet>(await _handler.AddProduct(_mapper.Map<ProductAdd, Product>(product)));
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Roles = "lender")]
        [HttpPatch("update")]
        public async Task<ActionResult<ProductGet>> UpdateProduct([FromBody]ProductUpdate product)
        {
            try
            {
                var result = _mapper.Map<Product, ProductGet>(await _handler.UpdateProduct(_mapper.Map<ProductUpdate, Product>(product), product.ProductId));
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Authorize(Roles = "lender")]
        [HttpDelete("remove")]
        public async Task<ActionResult<ProductGet>> RemoveProduct(int id)
        {
            try
            {
                await _handler.RemoveProduct(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Authorize(Roles = "lender")]
        [HttpPost("images/add")]
        public async Task<ActionResult<Image>> AddImage([FromBody]ProductImageAdd image)
        {
            try
            {
                var result = await _handler.AddImage(_mapper.Map<ProductImageAdd, Image>(image));
                return Ok(result);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Authorize(Roles = "lender")]
        [HttpDelete("images/remove")]
        public async Task<ActionResult> RemoveImage(int id)
        {
            try
            {
                await _handler.RemoveImage(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
