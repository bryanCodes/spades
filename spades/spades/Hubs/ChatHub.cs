using Microsoft.AspNet.SignalR;

namespace Spades.Hubs
{
    public class ChatHub : Hub
    {
        public void Send(string username, string message)
        {
            Clients.All.addMessage(username ?? "unknown", message);
        }
    }
}