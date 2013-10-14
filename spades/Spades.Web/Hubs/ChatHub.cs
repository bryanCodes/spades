using Spades.Models;

namespace Spades.Hubs
{
    public class ChatHub : BaseHub
    {
        public void Send(Message message)
        {
            Clients.All.addMessage(message);
        }
    }
}