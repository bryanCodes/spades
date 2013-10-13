using System.Linq;
using System.Threading.Tasks;
using Spades.App.Utilities;
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