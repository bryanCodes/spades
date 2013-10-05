using System.Collections.Generic;
using Microsoft.AspNet.SignalR;
using Spades.App.Utilities;
using Spades.Models;

namespace Spades.Hubs
{
    public class ChatHub : Hub
    {
        private static readonly List<User> Users;

        static ChatHub()
        {
            Users = new List<User>();
        }

        public void SignIn(User user)
        {
            user.GravatarHash = HashHelper.Md5((user.Email ?? "unknown").ToLower()).ToLower();
            Users.Add(user);
            Clients.Caller.syncUsers(Users);
            Clients.Others.newUser(user);
            Clients.Caller.signIn(user.GravatarHash);
        }

        public void Send(Message message)
        {
            Clients.All.addMessage(message);
        }
    }
}