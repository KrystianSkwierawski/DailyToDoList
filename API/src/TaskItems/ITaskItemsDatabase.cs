namespace DailyToDoList.TaskItems;

public interface ITaskItemsDatabase
{
    Task<List<TaskItemDTO>> GetTaskItems();
    Task<TaskItemDTO> AddTaskItemAsync(string title, string color);
    Task UpdateTaskItemAsync(TaskItemDTO taskItemDTO);
    Task UpdateTaskItemsAsync(List<TaskItemDTO> taskItemDTOs);
    Task DeleteTaskItemAsync(string id);
    Task DeleteAllUserTaskItemsAsync();
}
