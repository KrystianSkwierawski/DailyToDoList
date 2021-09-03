using DailyToDoList.Interfaces;
using DailyToDoList.ToDoItems;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DailyToDoList.Persistance;

public class ToDoItemsDatabase : IToDoItemsDatabase
{
    private IMongoDatabase _db;
    private IMongoClient _mongoClient;
    private IMongoCollection<ToDoItem> _collection;

    public ToDoItemsDatabase()
    {
        _mongoClient = new MongoClient("mongodb://localhost:65097");

        _db = _mongoClient.GetDatabase("ToDoDb");

        _collection = _db.GetCollection<ToDoItem>(typeof(ToDoItem).Name);
    }

    public async Task<List<ToDoItemDTO>> GetToDoItems()
    {
        List<ToDoItemDTO> o_toDoItemDTOs = new();

        foreach (var entity in _collection.AsQueryable())
        {
            o_toDoItemDTOs.Add(new ToDoItemDTO
            {
                Id = entity.Id,
                Title = entity.Title
            });
        }

        return o_toDoItemDTOs;
    }

    public async Task AddToDoItemAsync(string title)
    {
        ToDoItem toDoItem = new()
        {
            Title = title
        };

        await _collection.InsertOneAsync(toDoItem);
    }

    public async Task UpdateToDoItemAsync(ToDoItemDTO toDoItemDTO)
    {
        var filter = Builders<ToDoItem>.Filter.Eq(s => s.Id, toDoItemDTO.Id);
        var update = Builders<ToDoItem>.Update.Set(s => s.Title, toDoItemDTO.Title);
        var result = await _collection.UpdateOneAsync(filter, update);
    }

    public async Task DeleteToDoItemAsync(ToDoItemDTO toDoItemDTO)
    {
        await _collection.DeleteOneAsync(x => x.Id == toDoItemDTO.Id);
    }
}
