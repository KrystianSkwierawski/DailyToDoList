using DailyToDoList.ToDoItems;

namespace DailyToDoList.Interfaces;

public interface IToDoItemsDatabase
{
    Task<List<ToDoItemDTO>> GetToDoItems();
    Task AddToDoItemAsync(string title);
    Task UpdateToDoItemAsync(ToDoItemDTO toDoItemDTO);
    Task DeleteToDoItemAsync(string id);
}
