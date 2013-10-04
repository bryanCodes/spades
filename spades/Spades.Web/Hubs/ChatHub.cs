using System.Collections.Generic;
using System.Web;
using System.Web.Caching;
using Microsoft.AspNet.SignalR;
using Spades.App.Utilities;

namespace Spades.Hubs
{
    public class ChatHub : Hub
    {
        private const string UserCacheKey = "users";

        public void SignIn(string username)
        {
            var cache = HttpContext.Current.Application;
            //var users = HttpContext.Current.ApplicationInstance.Context.Cache[UserCacheKey] as List<string>;
            var users = cache[UserCacheKey] as List<string>; 
            if (users == null)
            {
                cache[UserCacheKey] = new List<string> { username };
            }
            else
            {
                users.Add(username);
                cache[UserCacheKey] = users;
            }

            Clients.Caller.syncUsers(users);
            Clients.Others.newUser(username);
            Clients.Caller.signIn(username);
        }

        public void Send(string username, string message, string email)
        {
            var emailHash = HashHelper.Md5((email ?? "unknown").ToLower()).ToLower();
            Clients.All.addMessage(username ?? "unknown", message, emailHash);
        }
    }
}