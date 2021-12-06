using DailyToDoListAPI.CurrentToken;
using FluentValidation;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyToDoListAPI.TaskItems
{
    public class TaskItemsDatabase : ITaskItemsDatabase
    {
        private readonly IMongoDatabase _db;
        private readonly IMongoClient _client;
        private readonly IMongoCollection<TaskItem> _taskItems;
        private readonly ICurrentTokenService? _currentTokenService;

        public TaskItemsDatabase(
            string dbName = "TasksItemsDB",
            ICurrentTokenService? currentTokenService = null
        )
        {
            _currentTokenService = currentTokenService;

            string connectionString = "mongodb+srv://test:123@cluster0.nrv7f.mongodb.net/DailyToDoListAPIDB?retryWrites=true&w=majority";
            _client = new MongoClient(connectionString);

            _db = _client.GetDatabase(dbName);

            _taskItems = _db.GetCollection<TaskItem>("TaskItems");
        }

        public async Task<List<TaskItemDTO>> GetTaskItems()
        {
            List<TaskItemDTO> o_toDoItemDTOs = new List<TaskItemDTO>();

            var token = _currentTokenService?.Token;

            foreach (var entity in _taskItems.AsQueryable().Where(task => task.CreatedBy == token))
            {
                o_toDoItemDTOs.Add(entity.ToDTO());
            }

            return o_toDoItemDTOs;
        }

        public async Task<TaskItemDTO> AddTaskItemAsync(string title, string color)
        {
            string token = _currentTokenService?.Token;

            TaskItem taskItem = new TaskItem()
            {
                Title = title,
                Color = color,
                CreatedBy = token
            };

            await new TaskItemValidator().ValidateAndThrowAsync(taskItem);

            await _taskItems.InsertOneAsync(taskItem);

            return taskItem.ToDTO();
        }

        public async Task UpdateTaskItemAsync(TaskItemDTO taskItemDTO)
        {
            var filter = Builders<TaskItem>.Filter.Eq(task => task.Id, taskItemDTO.Id);

            string token = _currentTokenService?.Token;

            TaskItem taskItem = new TaskItem()
            {
                Id = taskItemDTO.Id,
                Title = taskItemDTO.Title,
                CreatedBy = token,
                Color = taskItemDTO.Color,
                Completed = taskItemDTO.Completed,
                SubtaskItems = taskItemDTO.SubtaskItems
            };

            await new TaskItemValidator().ValidateAndThrowAsync(taskItem);

            await _taskItems.ReplaceOneAsync(filter, taskItem);
        }

        public async Task UpdateTaskItemsAsync(List<TaskItemDTO> taskItemDTOs)
        {
            List<TaskItem> updatedTaskItems = new List<TaskItem>();

            string token = _currentTokenService?.Token;

            foreach (var taskItemDTO in taskItemDTOs)
            {
                TaskItem taskItem = new TaskItem
                {
                    Id = taskItemDTO.Id,
                    Title = taskItemDTO.Title,
                    CreatedBy = token,
                    Color = taskItemDTO.Color,
                    Completed = taskItemDTO.Completed,
                    SubtaskItems = taskItemDTO.SubtaskItems
                };

                await new TaskItemValidator().ValidateAndThrowAsync(taskItem);

                updatedTaskItems.Add(taskItem);
            }

            await DeleteAllUserTaskItemsAsync();
            await _taskItems.InsertManyAsync(updatedTaskItems);
        }

        public async Task DeleteTaskItemAsync(string id)
        {
            string token = _currentTokenService?.Token;

            await _taskItems.DeleteOneAsync(task => task.Id == id && task.CreatedBy == token);
        }

        public async Task DeleteAllUserTaskItemsAsync()
        {
            string token = _currentTokenService?.Token;

            await _taskItems.DeleteManyAsync(task => task.CreatedBy == token);
        }
    }
}


