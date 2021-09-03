using DailyToDoList.Entities;
using DailyToDoList.ToDoItems;

namespace DailyToDoList.Interfaces;

public interface IToDoItemsDatabase
{
    Task<List<ToDoItemDTO>> GetToDoItemsAsync();
    Task<int> AddToDoItemAsync(string title);
    Task<int> UpdateToDoItemAsync(ToDoItem toDoItem);
    Task<int> DeleteToDoItemAsync(ToDoItem toDoItem);
}
