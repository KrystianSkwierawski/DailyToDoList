﻿namespace DailyToDoList.TaskItems;

public interface ITaskItemsDatabase
{
    Task<List<TaskItemDTO>> GetTaskItems();
    Task AddTaskItemAsync(string title);
    Task UpdateTaskItemAsync(TaskItemDTO taskItemDTO);
    Task DeleteTaskItemAsync(string id);
}
