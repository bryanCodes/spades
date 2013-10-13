using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Spades.App.Utilities;
using Spades.Models;

namespace Spades.Hubs
{
    public class BaseHub : Hub
    {
        protected static readonly List<User> Users;
        protected static readonly Game Game;

        static BaseHub()
        {
            Users = new List<User>();

            Game = new Game
            {
                Players = new User[4]
            };
        }

        public void SignIn(User user)
        {
            user.GravatarHash = HashHelper.Md5((user.Email ?? "unknown").ToLower()).ToLower();
            user.ConnectionId = Context.ConnectionId;

            Users.Add(user);

            Clients.Caller.syncUsers(Users);
            Clients.Others.addUser(user);
            Clients.Caller.signIn(user);
        }

        public void SyncGame()
        {
            Clients.Caller.SyncGame(Game);
        }

        private void SignOut(string connectionId)
        {
            var user = Users.SingleOrDefault(u => u.ConnectionId == connectionId);
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