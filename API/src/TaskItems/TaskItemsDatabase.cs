using MongoDB.Driver;
using System;

namespace DailyToDoList.TaskItems;

public class TaskItemsDatabase : ITaskItemsDatabase
{
    private readonly IMongoDatabase _db;
    private readonly IMongoClient _client;
    private readonly IMongoCollection<TaskItem> _taskItems;

    public TaskItemsDatabase(string connectionString = "mongodb+srv://test:123@cluster0.nrv7f.mongodb.net/DailyToDoListDB?retryWrites=true&w=majority")
    {
        _client = new MongoClient(connectionString);

        _db = _client.GetDatabase("TasksItemsDB");

        _taskItems = _db.GetCollection<TaskItem>("TaskItems");
    }

    public async Task<List<TaskItemDTO>> GetTaskItems()
    {
        List<TaskItemDTO> o_toDoItemDTOs = new();

        foreach (var entity in _taskItems.AsQueryable())
        {
            o_toDoItemDTOs.Add(entity.ToDTO());
        }

        return o_toDoItemDTOs;
    }

    public async Task<TaskItemDTO> AddTaskItemAsync(string title, string color)
    {
        TaskItem taskItem = new()
        {
            Title = title,
            Color = color
        };

        await _taskItems.InsertOneAsync(taskItem);

        return taskItem.ToDTO();
    }

    public async Task UpdateTaskItemAsync(TaskItemDTO taskItemDTO)
    {
        var filter = Builders<TaskItem>.Filter.Eq(s => s.Id, taskItemDTO.Id);

        TaskItem taskItem = new()
        {
            Id = taskItemDTO.Id,
            Title = taskItemDTO.Title,
            // CreatedBy = token
            Color = taskItemDTO.Color,
            Completed = taskItemDTO.Completed,
            SubtaskItems = taskItemDTO.SubtaskItems
        };

        var result = await _taskItems.ReplaceOneAsync(filter, taskItem);
    }

    public async Task DeleteTaskItemAsync(string id)
    {
        await _taskItems.DeleteOneAsync(x => x.Id == id);
    }

    public async Task DeleteAllTaskItemsAsync()
    {
        await _db.DropCollectionAsync("TaskItems");
    }
}
