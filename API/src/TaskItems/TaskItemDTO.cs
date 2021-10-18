using System.Collections.Generic;

namespace DailyToDoListAPI.TaskItems;

public class TaskItemDTO
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Color { get; set; }
    public bool Completed { get; set; }
    public bool Editing { get; set; } = false;
    public IList<SubtaskItem> SubtaskItems { get; set; }
}
