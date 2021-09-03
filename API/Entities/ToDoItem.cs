using SQLite;

namespace DailyToDoList.Entities;

public class ToDoItem
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }

    public string Title { get; set; }

    public string CreatedBy { get; set; }
}
