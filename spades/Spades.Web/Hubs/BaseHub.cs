using System.Collections.Generic;
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
            Clients.Others.newUser(user);
            Clients.Caller.signIn(user);
        }

    }
}