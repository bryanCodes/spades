using System.Security.Cryptography;
using System.Text;

namespace Spades.App.Utilities
{
    public static class HashHelper
    {
        public static string Md5(string input)
        {
            var md5 = MD5.Create();
            var inputBytes = Encoding.ASCII.GetBytes(input);
            var hashBytes = md5.ComputeHash(inputBytes);
            var hash = new StringBuilder();
            foreach (var b in hashBytes)
                hash.Append(b.ToString("X2"));

            return hash.ToString();
        }
    }
}
