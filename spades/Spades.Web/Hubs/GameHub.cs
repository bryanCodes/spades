using Microsoft.AspNet.SignalR;
using Spades.Models;

namespace Spades.Hubs
{
    public class GameHub : Hub
    {
        private static readonly Game Game;
        static GameHub()
        {
            Game = new Game
            {
                Players = new User[4]
            };
        }

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