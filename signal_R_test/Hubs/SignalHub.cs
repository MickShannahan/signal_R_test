using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace signal_r_test.hubs
{
  public class ChatHub : Hub
  {
      public async Task SendMessage( string message)
        {
            await Clients.All.SendAsync("ReceivedMessage", message);
        }

      public async Task JoinGroup(string groupName)
      {
        // joins group
         await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
         await Clients.Group(groupName).SendAsync("JoinedGroup", $" joined the room {groupName}");
      }

  
  }
}