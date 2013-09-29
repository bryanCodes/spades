using Microsoft.AspNet.SignalR;
using Spades.App.Utilities;

namespace Spades.Hubs
{
    public class ChatHub : Hub
    {
        public void Send(string username, string message, string email)
        {
            var emailHash = HashHelper.Md5(email ?? "unknown").ToLower();
            Clients.All.addMessage(username ?? "unknown", message, emailHash);
        }
    }
}