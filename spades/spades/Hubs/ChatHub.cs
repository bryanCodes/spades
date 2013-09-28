using System.Security.Cryptography;
using System.Security.Policy;
using System.Text;
using Microsoft.AspNet.SignalR;

namespace Spades.Hubs
{
    public class ChatHub : Hub
    {
        public void Send(string username, string message, string email)
        {
            var md5 = MD5.Create();
            var emailBytes = Encoding.ASCII.GetBytes(email);
            var hash = md5.ComputeHash(emailBytes);

            var emailHash = new StringBuilder();
            foreach (var b in hash)
            {
                emailHash.Append(b.ToString("X2"));
            }
            
            Clients.All.addMessage(username ?? "unknown", message, emailHash.ToString().ToLower());
        }
    }
}