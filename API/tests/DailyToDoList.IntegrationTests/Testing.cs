using DailyToDoList.TaskItems;

namespace DailyToDoList.IntegrationTests
{
    public class Testing
    {
        public static ITaskItemsDatabase GetTestDatabase(string connectionString = "mongodb+srv://test:123@cluster0.nrv7f.mongodb.net/DailyToDoListTestDB?retryWrites=true&w=majority")
        {
            return new TaskItemsDatabase(connectionString);
        }

        public static async Task ResetState()
        {
            await GetTestDatabase().DeleteAllUserTaskItemsAsync();
        }
    }
}
