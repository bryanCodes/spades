using Microsoft.AspNet.SignalR;

namespace Spades.Hubs
{
    public class ChatHub : Hub
    {
        public void Send(string message, string username = "unknown")
        {
            Clients.All.addMessage(message, username);
        }
    }
}