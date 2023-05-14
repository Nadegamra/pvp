using AutoMapper;
using Backend.Data;
using Backend.Data.Models;
using Microsoft.AspNetCore.Identity;
using Backend.Data.Views.BorrowedConsole;

namespace Backend.Handlers
{
    public class BorrowingsHandler
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;

        public BorrowingsHandler(IMapper mapper, AppDbContext context, UserManager<User> userManager)
        {
            _mapper = mapper;
            _context = context;
            _userManager = userManager;
        }

        public async Task<List<BorrowingGetDto>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
        public async Task<List<BorrowingGetDto>> GetByUserAsync()
        {
            throw new NotImplementedException();
        }
        public async Task<BorrowingGetDto> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }
        public async Task AddAsync(BorrowingAddDto addDto)
        {
            throw new NotImplementedException();
        }
        public async Task UpdateAsync(BorrowingUpdateDto updateDto)
        {
            throw new NotImplementedException();
        }
        public async Task UpdateStatusAsync(BorrowingUpdateStatusDto statusDto)
        {
            throw new NotImplementedException();
        }
        public async Task DeleteAsync(BorrowingDeleteDto deleteDto)
        {
            throw new NotImplementedException();
        }
    }
}
