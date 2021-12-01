using DailyToDoListAPI.TaskItems;
using System.Threading.Tasks;

namespace DailyToDoListAPI.IntegrationTests
{
    public class Testing
    {
        public static ITaskItemsDatabase GetTestDatabase(string connectionString = "mongodb+srv://test:123@cluster0.nrv7f.mongodb.net/DailyToDoListAPI_dotnetcore3.1TestDB?retryWrites=true&w=majority")
        {
            return new TaskItemsDatabase(connectionString);
        }

        public static async Task ResetState()
        {
            await GetTestDatabase().DeleteAllUserTaskItemsAsync();
        }
    }
}
