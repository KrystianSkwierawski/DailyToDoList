namespace DailyToDoList.TaskItems;

public class TaskItemDTO
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Color { get; set; }
    public bool Completed { get; set; }
    public IList<SubtaskItem> SubtaskItems { get; set; }
}
