using System.Linq;
using Spades.Models;

namespace Spades.Hubs
{
    public class GameHub : BaseHub
    {
        public void TakeSeat(User user, int seatId)
        {
            Game.Users[seatId] = Users.Single(u => u.ConnectionId == user.ConnectionId);
            Clients.All.TakeSeat(user, seatId);
        }

        public void RemoveFromSeat(int seatId)
        {
            Game.Users[seatId] = null;
            Clients.All.RemoveFromSeat(seatId);
        }
    }
}