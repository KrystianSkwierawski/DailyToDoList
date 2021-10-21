using DailyToDoListAPI.CurrentToken;
using DailyToDoListAPI.TaskItems;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;

namespace DailyToDoListAPI.Configuration
{
    public class Configuration : IConfiguration
    {
        public void DefineEndpoints(WebApplication app)
        {
            ITaskItemsDatabase database = app.Services.GetService<ITaskItemsDatabase>();

            app.MapGet("/api/tasks", async () => await database.GetTaskItems());
            app.MapPost("/api/tasks", async (string title, string color) => await database.AddTaskItemAsync(title, color));
            app.MapPut("/api/tasks/{id}", async (TaskItemDTO taskItemDTO) => await database.UpdateTaskItemAsync(taskItemDTO));
            app.MapPut("/api/tasks", async (List<TaskItemDTO> taskItemDTOs) => await database.UpdateTaskItemsAsync(taskItemDTOs));
            app.MapDelete("/api/tasks/{id}", async (string id) => await database.DeleteTaskItemAsync(id));
            app.MapDelete("/api/tasks", async () => await database.DeleteAllUserTaskItemsAsync());
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<ICurrentTokenService, CurrentTokenService>();
            services.AddSingleton<ITaskItemsDatabase, TaskItemsDatabase>();
            services.AddHttpContextAccessor();

            services.AddCors(options =>
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
        }

        public void Configure(WebApplication app)
        {
            app.UseCors(builder => builder
                 .AllowAnyOrigin()
                 .AllowAnyMethod()
                 .AllowAnyHeader()
            );
        }
    }
}
