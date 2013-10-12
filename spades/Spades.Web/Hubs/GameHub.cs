using Microsoft.AspNet.SignalR;
using Spades.Models;

namespace Spades.Hubs
{
    public class GameHub : Hub
    {
        public void TakeSeat(User user, int seatId)
        {
            Clients.All.TakeSeat(user, seatId);
        }
    }
}