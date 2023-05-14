using AutoMapper;
using Backend.Data;
using Backend.Data.Models;
using Microsoft.AspNetCore.Identity;
using Backend.Data.Views.BorrowedConsole;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Backend.Data.Views.UserConsole;

namespace Backend.Handlers
{
    public class BorrowingsHandler
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly UserConsolesHandler _userConsolesHandler;

        public BorrowingsHandler(IMapper mapper, AppDbContext context, UserManager<User> userManager, UserConsolesHandler userConsolesHandler)
        {
            _mapper = mapper;
            _context = context;
            _userManager = userManager;
            _userConsolesHandler = userConsolesHandler;
        }

        public async Task<List<BorrowingGetDto>> GetAllAsync()
        {
            return _mapper.Map<List<Borrowing>, List<BorrowingGetDto>>(await _context.Borrowings.Include(x => x.UserConsoles).ThenInclude(x => x.Images).Include(x => x.UserConsoles).ThenInclude(x => x.Console).ToListAsync());
        }
        public async Task<List<BorrowingGetDto>> GetByUserAsync(ClaimsPrincipal userClaims)
        {
            User user = await _userManager.GetUserAsync(userClaims);
            return _mapper.Map<List<Borrowing>, List<BorrowingGetDto>>(await _context.Borrowings.Include(x => x.UserConsoles).ThenInclude(x => x.Images).Include(x => x.UserConsoles).ThenInclude(x => x.Console).Where(x=>x.UserId == user.Id).ToListAsync());
        }
        public async Task<BorrowingGetDto> GetByIdAsync(int id)
        {
            return _mapper.Map<Borrowing, BorrowingGetDto>(await _context.Borrowings.Include(x => x.UserConsoles).ThenInclude(x => x.Images).Include(x => x.UserConsoles).ThenInclude(x => x.Console).Where(x=>x.Id == id).FirstAsync());
        }
        public async Task AddAsync(BorrowingAddDto addDto)
        {
            async Task UpdateUserConsole(int id)
            {
                var userConsole = await _context.UserConsoles.Where(x => x.Id == id).FirstAsync();

                userConsole.BorrowedConsoleId = id;

                _context.UserConsoles.Update(userConsole);
                await _context.SaveChangesAsync();
            }

            foreach(var id in addDto.UserConsoleIds)
            {
                await _userConsolesHandler.UpdateStatus(new UserConsoleStatusUpdateDto { Id= id, ConsoleStatus = UserConsoleStatus.AT_LENDER });
                await UpdateUserConsole(id);
            }
            throw new NotImplementedException();
        }

        public async Task UpdateAsync(BorrowingUpdateDto updateDto)
        {
            var borrowing = await _context.Borrowings.Where(x=>x.Id == updateDto.Id).Include(x=>x.UserConsoles).FirstAsync();

            var originalUserConsoleIds = borrowing.UserConsoles.Select(x=>x.Id).ToList();

            foreach(var id in originalUserConsoleIds)
            {
                await _userConsolesHandler.UpdateStatus(new UserConsoleStatusUpdateDto { Id = id, ConsoleStatus = UserConsoleStatus.AT_PLATFORM });
            }

            foreach(var id in updateDto.UserConsoleIds)
            {
                await _userConsolesHandler.UpdateStatus(new UserConsoleStatusUpdateDto { Id = id, ConsoleStatus = UserConsoleStatus.AT_LENDER });
            }
        }
        public async Task UpdateStatusAsync(BorrowingUpdateStatusDto statusDto)
        {
            var borrowing = await _context.Borrowings.Where(x => x.Id == statusDto.Id).FirstAsync();

            borrowing.Status = statusDto.Status;

            _context.Borrowings.Update(borrowing);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(BorrowingDeleteDto deleteDto)
        {
            
            var borrowing = await _context.Borrowings.Where(x=>x.Id ==deleteDto.Id).FirstAsync();

            _context.Borrowings.Remove(borrowing);
            await _context.SaveChangesAsync();
        }
    }
}
