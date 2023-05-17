using AutoMapper;
using Backend.Data;
using Backend.Data.Models;
using Backend.Data.Views.Chat;
using Backend.Data.Views.Message;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend.Handlers
{
    public class ChatsHandler
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public ChatsHandler(AppDbContext context, UserManager<User> userManager, IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<List<ConversationGetDto>> GetAllConversations()
        {
            return _mapper.Map<List<Conversation>,List<ConversationGetDto>>(await _context.Conversations.Include(x => x.Messages).Include(x => x.UserConsole).ThenInclude(x=>x.Console).Include(x => x.UserConsole).ThenInclude(x => x.Images).ToListAsync());
        }
        public async Task<List<ConversationGetDto>> GetLenderConversations(ClaimsPrincipal userClaims)
        {
            var user = await _userManager.GetUserAsync(userClaims);
            var userConsoleIds = _context.UserConsoles.Where(x=>x.UserId == user.Id).Select(x=>x.Id).ToList();
            return _mapper.Map<List<Conversation>, List<ConversationGetDto>>(await _context.Conversations.Where(x=>x.UserConsoleId != null).Where(x => userConsoleIds.Contains(x.UserConsoleId ?? -1)).Include(x => x.Messages).Include(x => x.UserConsole).ThenInclude(x => x.Console).Include(x => x.UserConsole).ThenInclude(x=>x.Images).ToListAsync());
        }
        public async Task<List<ConversationGetDto>> GetBorrowerConversations(ClaimsPrincipal userClaims)
        {
            var user = await _userManager.GetUserAsync(userClaims);
            var borrowingIds = _context.Borrowings.Where(x => x.UserId == user.Id).Select(x => x.Id).ToList();
            return _mapper.Map<List<Conversation>, List<ConversationGetDto>>(await _context.Conversations.Where(x => x.BorrowingId != null).Where(x => borrowingIds.Contains(x.BorrowingId ?? -1)).Include(x => x.Messages).Include(x=>x.Borrowing).ThenInclude(x=>x.UserConsoles).ThenInclude(x=>x.Images).ToListAsync());
        }

        public async Task<ConversationGetDto> GetConversation(int userConsoleId)
        {
            return _mapper.Map<Conversation,ConversationGetDto>(await _context.Conversations.Include(x=>x.Messages).Include(x => x.UserConsole).ThenInclude(x => x.Console).Include(x => x.UserConsole).ThenInclude(x => x.Images).Where(x => x.UserConsoleId == userConsoleId).FirstOrDefaultAsync());
        }
        public async Task ContactLender(int userConsoleId)
        {
            if(await _context.Conversations.Where(x => x.UserConsoleId == userConsoleId).FirstOrDefaultAsync() != null)
            {
                return;
            }
            var result = await _context.Conversations.AddAsync(new Conversation { UserConsoleId= userConsoleId });

            var userConsole = _context.UserConsoles.Where(x => x.Id == userConsoleId).First();
            userConsole.ConversationId = result.Entity.Id;
            _context.UserConsoles.Update(userConsole);

            await _context.SaveChangesAsync();
            return;
        }
        public async Task SendMessage(MessageAddDto addDto, ClaimsPrincipal userClaims)
        {
            var user = await _userManager.GetUserAsync(userClaims);
            var roles = await _userManager.GetRolesAsync(user);
            await _context.Messages.AddAsync(new Message { ConversationId = addDto.ConversationId, Text = addDto.Text, FromAdmin = roles[0].ToLower() == "admin" });
            await _context.SaveChangesAsync();
        }
    }
}
