using DailyToDoListAPI.Configuration;
using Microsoft.AspNetCore.Builder;


var bulider = WebApplication.CreateBuilder(args);
bulider.Services.ConfigureServices();

var app = bulider.Build();
app.Configure();

app.DefineEndpoints();

app.Run();


