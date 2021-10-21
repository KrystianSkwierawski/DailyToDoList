using DailyToDoListAPI.CurrentToken;
using DailyToDoListAPI.TaskItems;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;

namespace DailyToDoListAPI.Configuration
{
    public class Configuration : IConfiguration
    {
        public void DefineEndpoints(WebApplication app)
        {
            ITaskItemsDatabase database = app.Services.GetService<ITaskItemsDatabase>();

            app.MapGet("/api/tasks", async () =>
            {
                var taskItems = await database.GetTaskItems();
                return taskItems is null ? Results.NotFound() : Results.Ok(taskItems);
            });

            app.MapPost("/api/tasks", async (string title, string color) =>
            {
                if (string.IsNullOrEmpty(title) || string.IsNullOrEmpty(color))
                    return Results.BadRequest();

                var taskItemDTO = await database.AddTaskItemAsync(title, color);
                return Results.Created($"/api/tasks{taskItemDTO.Id}", taskItemDTO);
            });

            app.MapPut("/api/tasks/{id}", async (TaskItemDTO taskItemDTO) =>
            {
                if (taskItemDTO is null)
                    return Results.BadRequest();

                await database.UpdateTaskItemAsync(taskItemDTO);
                return Results.Ok();
            });

            app.MapPut("/api/tasks", async (List<TaskItemDTO> taskItemDTOs) =>
            {
                if (taskItemDTOs is null)
                    return Results.BadRequest();

                await database.UpdateTaskItemsAsync(taskItemDTOs);
                return Results.Ok();
            });

            app.MapDelete("/api/tasks/{id}", async (string id) =>
            {
                if (string.IsNullOrEmpty(id))
                    return Results.BadRequest();

                await database.DeleteTaskItemAsync(id);
                return Results.Ok();
            });

            app.MapDelete("/api/tasks", async () =>
            {
                await database.DeleteAllUserTaskItemsAsync();
                return Results.Ok();
            });
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
