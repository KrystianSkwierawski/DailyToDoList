using DailyToDoList.TaskItems;

var bulider = WebApplication.CreateBuilder();

bulider.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
});

var app = bulider.Build();

app.UseCors(builder => builder
     .AllowAnyOrigin()
     .AllowAnyMethod()
     .AllowAnyHeader()
);

ITaskItemsDatabase _db = new TaskItemsDatabase();

app.MapGet("/api/tasks", async () => await _db.GetTaskItems());
app.MapPost("/api/tasks", async (string title, string color) => await _db.AddTaskItemAsync(title, color));
app.MapPut("/api/tasks", async (TaskItemDTO toDoItemDTO) => await _db.UpdateTaskItemAsync(toDoItemDTO));
app.MapDelete("/api/tasks/{id}", async (string id) => await _db.DeleteTaskItemAsync(id));
app.MapDelete("/api/tasks", async () => await _db.DeleteAllTaskItemsAsync());

app.Run();

