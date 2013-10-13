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

        public void SignOut(string connectionId)
        {
            var user = Users.Single(u => u.ConnectionId == connectionId);
            Users.Remove(user);
            Clients.All.removeUser(user);
        }

        public override Task OnDisconnected()
        {
            SignOut(Context.ConnectionId);
            return base.OnDisconnected();
        }
    }
}