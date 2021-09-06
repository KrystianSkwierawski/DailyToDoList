using DailyToDoList.Interfaces;
using DailyToDoList.ToDoItems;
using MongoDB.Driver;

namespace DailyToDoList.Persistance;

public class ToDoItemsDatabase : IToDoItemsDatabase
{
    private IMongoDatabase _db;
    private IMongoClient _client;
    private readonly IMongoCollection<ToDoItem> _toDoItems;

    public ToDoItemsDatabase()
    {
        _client = new MongoClient("mongodb+srv://test:123@cluster0.nrv7f.mongodb.net/ToDoListDB?retryWrites=true&w=majority");

        _db = _client.GetDatabase("TodosDB");

        _toDoItems = _db.GetCollection<ToDoItem>("ToDoItems");
    }

    public async Task<List<ToDoItemDTO>> GetToDoItems()
    {
        List<ToDoItemDTO> o_toDoItemDTOs = new();

        foreach (var entity in _toDoItems.AsQueryable())
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

        await _toDoItems.InsertOneAsync(toDoItem);
    }

    public async Task UpdateToDoItemAsync(ToDoItemDTO toDoItemDTO)
    {
        var filter = Builders<ToDoItem>.Filter.Eq(s => s.Id, toDoItemDTO.Id);
        var update = Builders<ToDoItem>.Update.Set(s => s.Title, toDoItemDTO.Title);
        var result = await _toDoItems.UpdateOneAsync(filter, update);
    }

    public async Task DeleteToDoItemAsync(string id)
    {
        await _toDoItems.DeleteOneAsync(x => x.Id == id);
    }
}
