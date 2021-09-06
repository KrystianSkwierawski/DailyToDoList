using DailyToDoList.Persistance;
using DailyToDoList.ToDoItems;

ToDoItemsDatabase _db = new();

var bulider = WebApplication.CreateBuilder();

var app = bulider.Build();

app.MapGet("/api/todos", async () => await _db.GetToDoItems());
app.MapPost("/api/todos", async (string title) => await _db.AddToDoItemAsync(title));
app.MapPut("/api/todos", async (ToDoItemDTO toDoItemDTO) => await _db.UpdateToDoItemAsync(toDoItemDTO));
app.MapDelete("/api/todos", async (string id) => await _db.DeleteToDoItemAsync(id));;

app.Run();

