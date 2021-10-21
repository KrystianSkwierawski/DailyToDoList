using DailyToDoListAPI.Configuration;
using Microsoft.AspNetCore.Builder;

IConfiguration configuration = new Configuration();

var bulider = WebApplication.CreateBuilder(args);
configuration.ConfigureServices(bulider.Services);

var app = bulider.Build();
configuration.Configure(app);

configuration.DefineEndpoints(app);

app.Run();


