using DailyToDoList.TaskItems;

TaskItemsDatabase _db = new();

var bulider = WebApplication.CreateBuilder();

var app = bulider.Build();

app.MapGet("/api/tasks", async () => await _db.GetTaskItems());
app.MapPost("/api/tasks", async (string title) => await _db.AddTaskItemAsync(title));
app.MapPut("/api/tasks", async (TaskItemDTO toDoItemDTO) => await _db.UpdateTaskItemAsync(toDoItemDTO));
app.MapDelete("/api/tasks", async (string id) => await _db.DeleteTaskItemAsync(id));;

app.Run();

