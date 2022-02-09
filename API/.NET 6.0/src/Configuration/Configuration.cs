using DailyToDoListAPI.CurrentToken;
using DailyToDoListAPI.TaskItems;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System.Collections.Generic;
using System.IO;

namespace DailyToDoListAPI.Configuration;

public static class Configuration
{
    public static void DefineEndpoints(this WebApplication app)
    {
        ITaskItemsDatabase database = app.Services.GetService<ITaskItemsDatabase>();

        app.MapGet("/api/tasks", async () =>
        {
            var taskItems = await database.GetTaskItems();
            return taskItems is null ? Results.NotFound() : Results.Ok(taskItems);
        });

        app.MapPost("/api/tasks", async (string title, string color) =>
        {
            var taskItemDTO = await database.AddTaskItemAsync(title, color);
            return Results.Created($"/api/tasks{taskItemDTO.Id}", taskItemDTO);
        });

        app.MapPut("/api/tasks/{id}", async (TaskItemDTO taskItemDTO) =>
        {
            await database.UpdateTaskItemAsync(taskItemDTO);
            return Results.Ok();
        });

        app.MapPut("/api/tasks", async (List<TaskItemDTO> taskItemDTOs) =>
        {
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

    public static IServiceCollection ConfigureServices(this IServiceCollection services)
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

        return services;
    }

    public static void Configure(this WebApplication app, IWebHostEnvironment env)
    {
        app.UseCors(builder => builder
             .AllowAnyOrigin()
             .AllowAnyMethod()
             .AllowAnyHeader()
        );
    }
}

