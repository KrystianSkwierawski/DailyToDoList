using DailyToDoList.TaskItems;

ITaskItemsDatabase _db = new TaskItemsDatabase();

var bulider = WebApplication.CreateBuilder();

var app = bulider.Build();

app.MapGet("/api/tasks", async () => await _db.GetTaskItems());
app.MapPost("/api/tasks", async (string title) => await _db.AddTaskItemAsync(title));
app.MapPut("/api/tasks", async (TaskItemDTO toDoItemDTO) => await _db.UpdateTaskItemAsync(toDoItemDTO));
app.MapDelete("/api/tasks/{id}", async (string id) => await _db.DeleteTaskItemAsync(id));
app.MapDelete("/api/tasks", async () => await _db.DeleteAllTaskItemsAsync());


app.Run();

