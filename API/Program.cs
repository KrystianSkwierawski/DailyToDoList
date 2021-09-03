using DailyToDoList.Persistance;
using DailyToDoList.ToDoItems;

ToDoItemsDatabase _db = new(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "ToDoItems.db"));

var bulider = WebApplication.CreateBuilder();

var app = bulider.Build();

app.MapGet("/api/todos", async () => await _db.GetToDoItemsAsync());
app.MapPost("/api/todos", async (string title) => await _db.AddToDoItemAsync(title));
app.MapPut("/api/todos", async (ToDoItem toDoItem) => await _db.UpdateToDoItemAsync(toDoItem));
app.MapDelete("/api/todos", async (ToDoItem toDoItem) => await _db.DeleteToDoItemAsync(toDoItem));;

app.Run();

