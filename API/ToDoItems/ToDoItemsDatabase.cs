using DailyToDoList.Entities;
using DailyToDoList.Interfaces;
using DailyToDoList.ToDoItems;
using SQLite;

namespace DailyToDoList.Persistance;

public class ToDoItemsDatabase : IToDoItemsDatabase
{
    readonly SQLiteAsyncConnection database;

    public ToDoItemsDatabase(string dbPath)
    {
        database = new SQLiteAsyncConnection(dbPath);

        if (database is null)
            throw new Exception();

        database.CreateTableAsync<ToDoItem>().Wait();
    }

    public async Task<int> AddToDoItemAsync(string title)
    {
        ToDoItem entity = new()
        {
            Title = title
        };

        return await database.InsertAsync(entity);
    }

    public async Task<int> UpdateToDoItemAsync(ToDoItem toDoItem)
    {
        return await database.UpdateAsync(toDoItem);
    }

    public async Task<int> DeleteToDoItemAsync(ToDoItem toDoItem)
    {
        return await database.DeleteAsync(toDoItem);
    }

    public async Task<List<ToDoItemDTO>> GetToDoItemsAsync()
    {
        List<ToDoItemDTO> o_toDoItemDTOs = new();

        var entities = await database.Table<ToDoItem>().ToListAsync();

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
}
