using DailyToDoListAPI.CurrentToken;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyToDoListAPI.TaskItems;

public class TaskItemsDatabase : ITaskItemsDatabase
{
    private readonly IMongoDatabase _db;
    private readonly IMongoClient _client;
    private readonly IMongoCollection<TaskItem> _taskItems;
    private readonly ICurrentTokenService? _currentTokenService;

    public TaskItemsDatabase(
        string connectionString = "mongodb+srv://test:123@cluster0.nrv7f.mongodb.net/DailyToDoListAPIDB?retryWrites=true&w=majority",
        ICurrentTokenService? currentTokenService = null
    )
    {
        _currentTokenService = currentTokenService;

        _client = new MongoClient(connectionString);

        _db = _client.GetDatabase("TasksItemsDB");

        _taskItems = _db.GetCollection<TaskItem>("TaskItems");
    }

    public async Task<List<TaskItemDTO>> GetTaskItems()
    {
        List<TaskItemDTO> o_toDoItemDTOs = new();

        var token = _currentTokenService?.Token;

        foreach (var entity in _taskItems.AsQueryable().Where(x => x.CreatedBy == token))
        {
            o_toDoItemDTOs.Add(entity.ToDTO());
        }

        return o_toDoItemDTOs;
    }

    public async Task<TaskItemDTO> AddTaskItemAsync(string title, string color)
    {
        string token = _currentTokenService?.Token;

        TaskItem taskItem = new()
        {
            Title = title,
            Color = color,
            CreatedBy = token
        };

        await _taskItems.InsertOneAsync(taskItem);

        return taskItem.ToDTO();
    }

    public async Task UpdateTaskItemAsync(TaskItemDTO taskItemDTO)
    {
        var filter = Builders<TaskItem>.Filter.Eq(s => s.Id, taskItemDTO.Id);

        string token = _currentTokenService?.Token;

        TaskItem taskItem = new()
        {
            Id = taskItemDTO.Id,
            Title = taskItemDTO.Title,
            CreatedBy = token,
            Color = taskItemDTO.Color,
            Completed = taskItemDTO.Completed,
            SubtaskItems = taskItemDTO.SubtaskItems
        };

        await _taskItems.ReplaceOneAsync(filter, taskItem);
    }

    public async Task UpdateTaskItemsAsync(List<TaskItemDTO> taskItemDTOs)
    {
        List<TaskItem> updatedTaskItems = new();

        string token = _currentTokenService?.Token;

        foreach (var taskItemDTO in taskItemDTOs)
        {
            updatedTaskItems.Add(new TaskItem
            {
                Id = taskItemDTO.Id,
                Title = taskItemDTO.Title,
                CreatedBy = token,
                Color = taskItemDTO.Color,
                Completed = taskItemDTO.Completed,
                SubtaskItems = taskItemDTO.SubtaskItems
            });
        }

        await DeleteAllUserTaskItemsAsync();
        await _taskItems.InsertManyAsync(updatedTaskItems);
    }

    public async Task DeleteTaskItemAsync(string id)
    {
        string token = _currentTokenService?.Token;

        await _taskItems.DeleteOneAsync(x => x.Id == id && x.CreatedBy == token);
    }

    public async Task DeleteAllUserTaskItemsAsync()
    {
        string token = _currentTokenService?.Token;

        await _taskItems.DeleteManyAsync(x => x.CreatedBy == token);
    }
}
