using DailyToDoList.ToDoItems;

namespace DailyToDoList.Interfaces;

public interface IToDoItemsDatabase
{
    Task<List<ToDoItemDTO>> GetToDoItemsAsync();
    Task AddToDoItemAsync(string title);
    Task UpdateToDoItemAsync(ToDoItem toDoItem);
    Task DeleteToDoItemAsync(ToDoItem toDoItem);
}
