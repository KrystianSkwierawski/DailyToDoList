﻿using MongoDB.Driver;

namespace DailyToDoList.TaskItems;

public class TaskItemsDatabase : ITaskItemsDatabase
{
    private readonly IMongoDatabase _db;
    private readonly IMongoClient _client;
    private readonly IMongoCollection<TaskItem> _taskItems;

    public TaskItemsDatabase()
    {
        _client = new MongoClient("mongodb+srv://test:123@cluster0.nrv7f.mongodb.net/DailyToDoList?retryWrites=true&w=majority");

        _db = _client.GetDatabase("TasksItemsDB");

        _taskItems = _db.GetCollection<TaskItem>("TaskItems");
    }

    public async Task<List<TaskItemDTO>> GetTaskItems()
    {
        List<TaskItemDTO> o_toDoItemDTOs = new();

        foreach (var entity in _taskItems.AsQueryable())
        {
            o_toDoItemDTOs.Add(new TaskItemDTO
            {
                Id = entity.Id,
                Title = entity.Title
            });
        }

        return o_toDoItemDTOs;
    }

    public async Task AddTaskItemAsync(string title)
    {
        TaskItem taskItem = new()
        {
            Title = title
        };

        await _taskItems.InsertOneAsync(taskItem);
    }

    public async Task UpdateTaskItemAsync(TaskItemDTO taskItemDTO)
    {
        var filter = Builders<TaskItem>.Filter.Eq(s => s.Id, taskItemDTO.Id);
        var update = Builders<TaskItem>.Update.Set(s => s.Title, taskItemDTO.Title);
        var result = await _taskItems.UpdateOneAsync(filter, update);
    }

    public async Task DeleteTaskItemAsync(string id)
    {
        await _taskItems.DeleteOneAsync(x => x.Id == id);
    }
}