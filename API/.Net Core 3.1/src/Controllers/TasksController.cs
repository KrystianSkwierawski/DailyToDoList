using DailyToDoListAPI.TaskItems;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DailyToDoListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        ITaskItemsDatabase _database;

        public TasksController(ITaskItemsDatabase database)
        {
            _database = database;
        }

        [HttpGet]
        public async Task<ActionResult<List<TaskItemDTO>>> GetItems()
        {
            var taskItems = await _database.GetTaskItems();

            if (taskItems is null)
                return NoContent();

            return taskItems;
        }

        [HttpPost]
        public async Task<ActionResult<List<TaskItemDTO>>> Post(string title, string color)
        {
            var taskItemDTO = await _database.AddTaskItemAsync(title, color);
            return Created($"/api/tasks{taskItemDTO.Id}", taskItemDTO);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<TaskItemDTO>>> Put(TaskItemDTO taskItemDTO)
        {
            await _database.UpdateTaskItemAsync(taskItemDTO);
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult<List<TaskItemDTO>>> Put(List<TaskItemDTO> taskItemDTOs)
        {
            await _database.UpdateTaskItemsAsync(taskItemDTOs);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<TaskItemDTO>>> Delete(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest();

            await _database.DeleteTaskItemAsync(id);
            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult<List<TaskItemDTO>>> DeleteItems()
        {
            await _database.DeleteAllUserTaskItemsAsync();
            return Ok();
        }
    }
}
