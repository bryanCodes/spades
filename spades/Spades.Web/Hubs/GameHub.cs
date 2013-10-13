using Spades.Models;

namespace Spades.Hubs
{
    public class GameHub : BaseHub
    {
        public void TakeSeat(User user, int seatId)
        {
            Game.Players[seatId] = user;
            Clients.All.TakeSeat(user, seatId);
        }

        public void SyncGame()
        {
            Clients.Caller.SyncGame(Game);
        }
    }
}