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
            Users.Add(user);
            Clients.Caller.syncUsers(Users);
            Clients.Others.newUser(user);
            Clients.Caller.signIn();
        }

        public void Send(string username, string message, string email)
        {
            var emailHash = HashHelper.Md5((email ?? "unknown").ToLower()).ToLower();
            Clients.All.addMessage(username ?? "unknown", message, emailHash);
        }
    }
}