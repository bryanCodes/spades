using Microsoft.Owin;
using Owin;
using Microsoft.AspNet.SignalR;

[assembly: OwinStartup(typeof(Spades.Startup))]
namespace Spades
{

	public class Startup
	{
		public void Configuration(IAppBuilder app)
		{
//			app.MapSignalR();
//
//			app.RunSignalR();

			app.Map("/signalr", map =>
			{
				map.RunSignalR(new HubConfiguration());
			});
		}
	}
}