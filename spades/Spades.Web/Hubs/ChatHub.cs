﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            user.ConnectionId = Context.ConnectionId;

            Users.Add(user);
            Clients.Caller.syncUsers(Users);
            Clients.Others.newUser(user);
            Clients.Caller.signIn(user.GravatarHash);
        }

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