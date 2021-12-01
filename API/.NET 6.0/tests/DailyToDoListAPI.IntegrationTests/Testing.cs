using DailyToDoListAPI.TaskItems;
using System.Threading.Tasks;

namespace DailyToDoListAPI.IntegrationTests;

public class Testing
{
    public static ITaskItemsDatabase GetTestDatabase(string dbName = "TasksItemsTestDB_dotnet6")
    {
        return new TaskItemsDatabase(dbName);
    }

    public static async Task ResetState()
    {
        await GetTestDatabase().DeleteAllUserTaskItemsAsync();
    }
}

