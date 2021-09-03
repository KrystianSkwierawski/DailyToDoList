using DailyToDoList.Interfaces;
using DailyToDoList.ToDoItems;
using SQLite;

namespace DailyToDoList.Persistance;

public class ToDoItemsDatabase : IToDoItemsDatabase
{
    private readonly SQLiteAsyncConnection _db;

    public ToDoItemsDatabase(string dbPath)
    {
        _db = new SQLiteAsyncConnection(dbPath);

        if (_db is null)
            throw new Exception();

        _db.CreateTableAsync<ToDoItem>().Wait();
    }

    public async Task<List<ToDoItemDTO>> GetToDoItemsAsync()
    {
        List<ToDoItemDTO> o_toDoItemDTOs = new();

        var entities = await _db.Table<ToDoItem>().ToListAsync();

        foreach (var entity in entities)
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
        ToDoItem entity = new()
        {
            Title = title
        };

        await _db.InsertAsync(entity);
    }

    public async Task UpdateToDoItemAsync(ToDoItem toDoItem)
    {
        await _db.UpdateAsync(toDoItem);
    }

    public async Task DeleteToDoItemAsync(ToDoItem toDoItem)
    {
        await _db.DeleteAsync(toDoItem);
    }
}
