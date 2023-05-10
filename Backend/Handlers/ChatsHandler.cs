using Backend.Data.Models;
using Backend.Data.Views.Message;
using System.Security.Claims;

namespace Backend.Handlers
{
    public class ChatsHandler
    {
        public async Task<List<Conversation>> GetAllConversations()
        {
            throw new NotImplementedException();
        }
        public async Task<List<Conversation>> GetUserConversations(ClaimsPrincipal userClaims)
        {
            throw new NotImplementedException();
        }
        public async Task<Conversation> GetConversation(int userConsoleId)
        {
            throw new NotImplementedException();
        }
        public async Task ContactLender(int userConsoleId)
        {
            throw new NotImplementedException();
        }
        public async Task SendMessage(MessageAddDto addDto)
        {
            throw new NotImplementedException();
        }
    }
}
