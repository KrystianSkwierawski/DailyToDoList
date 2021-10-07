using DailyToDoList;
using DailyToDoList.TaskItems;


var bulider = WebApplication.CreateBuilder();

bulider.Services.AddSingleton<ICurrentUserService, CurrentUserService>();
bulider.Services.AddSingleton<ITaskItemsDatabase, TaskItemsDatabase>();
bulider.Services.AddHttpContextAccessor();

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


var serviceProvider = bulider.Services.BuildServiceProvider();

ITaskItemsDatabase database = serviceProvider.GetService<ITaskItemsDatabase>();

app.MapGet("/api/tasks", async () => await database.GetTaskItems());
app.MapPost("/api/tasks", async (string title, string color) => await database.AddTaskItemAsync(title, color));
app.MapPut("/api/tasks/{id}", async (TaskItemDTO taskItemDTO) => await database.UpdateTaskItemAsync(taskItemDTO));
app.MapPut("/api/tasks", async (List<TaskItemDTO> taskItemDTOs) => await database.UpdateTaskItemsAsync(taskItemDTOs));
app.MapDelete("/api/tasks/{id}", async (string id) => await database.DeleteTaskItemAsync(id));
app.MapDelete("/api/tasks", async () => await database.DeleteAllTaskItemsAsync());

app.Run();


