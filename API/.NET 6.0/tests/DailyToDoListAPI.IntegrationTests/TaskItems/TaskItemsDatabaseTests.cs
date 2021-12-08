using DailyToDoListAPI.TaskItems;
using FluentAssertions;
using FluentValidation;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyToDoListAPI.IntegrationTests.TaskItems;

using static Testing;
public class TaskItemsDatabaseTests : TestBase
{
    [Test]
    public async Task ShouldGetTaskItemDTOs()
    {
        // Arrange
        ITaskItemsDatabase testDatabase = GetTestDatabase();
        var taskItemDTO = await testDatabase.AddTaskItemAsync("test1", "#fff");
        await testDatabase.AddTaskItemAsync("test2", "#fff");

        // Act
        var result = await testDatabase.GetTaskItems();

        // Assert

        result.Count().Should().Be(2);

        result.First().Should().BeEquivalentTo(taskItemDTO);
    }

    [Test]
    public async Task ShouldAddTaskItem()
    {
        // Arrange
        ITaskItemsDatabase testDatabase = GetTestDatabase();

        // Act
        await testDatabase.AddTaskItemAsync("test1", "#fff");

        // Assert
        var result = await testDatabase.GetTaskItems();

        result.First().Title.Should().Be("test1");
        result.Count().Should().Be(1);
    }

    [Test]
    public async Task AddTaskItem_ShouldThrowException_IfTaskItemIsInvalid()
    {
        // Arrange
        ITaskItemsDatabase testDatabase = GetTestDatabase();

        // Assert
        Assert.ThrowsAsync<ValidationException>(async () =>
        {
            await testDatabase.AddTaskItemAsync("", "invalid color");
        });
    }

    [Test]
    public async Task ShouldUpdateTaskItem()
    {
        // Arrange
        ITaskItemsDatabase testDatabase = GetTestDatabase();
        var taskItemDTO = await testDatabase.AddTaskItemAsync("test1", "#fff");

        // Act
        await testDatabase.UpdateTaskItemAsync(taskItemDTO);

        // Assert
        var result = await testDatabase.GetTaskItems();

        result.First().Should().BeEquivalentTo(taskItemDTO);
    }


    [Test]
    public async Task UpdateTaskItem_ShouldThrowException_IfTaskItemIsInvalid()
    {
        // Arrange
        ITaskItemsDatabase testDatabase = GetTestDatabase();
        var taskItemDTO = await testDatabase.AddTaskItemAsync("test1", "#fff");


        // Assert
        Assert.ThrowsAsync<ValidationException>(async () =>
        {
            await testDatabase.UpdateTaskItemAsync(new TaskItemDTO
            {
                Title = "",
                Color = "Invalid color"
            });
        });
    }

    [Test]
    public async Task ShouldUpdateTaskItems()
    {
        // Arrange
        var testDatabase = GetTestDatabase();

        TaskItemDTO task1 = await testDatabase.AddTaskItemAsync("test", "#fff");
        TaskItemDTO task2 = await testDatabase.AddTaskItemAsync("test2", "#fff");

        List<TaskItemDTO> expectedTaskItems = new List<TaskItemDTO>() {
            new TaskItemDTO
            {
                Id = task2.Id,
                Title = "New Title",
                Color = "#000"
            },
            new TaskItemDTO
            {
                Id = task1.Id,
                Title = "New Title",
                Color = "#000"
            }
        };


        // Act
        await testDatabase.UpdateTaskItemsAsync(expectedTaskItems);


        // Assert
        var result = await testDatabase.GetTaskItems();

        result.Should().BeEquivalentTo(expectedTaskItems);
    }


    [Test]
    public async Task UpdateTaskItems_ShouldThrowException_IfTaskItemIsInvalid()
    {
        // Arrange
        var testDatabase = GetTestDatabase();

        TaskItemDTO task1 = await testDatabase.AddTaskItemAsync("test", "#fff");
        TaskItemDTO task2 = await testDatabase.AddTaskItemAsync("test2", "#fff");

        List<TaskItemDTO> taskItems = new List<TaskItemDTO>() {
            // This item is valid
            new TaskItemDTO
            {
                Id = task2.Id,
                Title = "New Title",
                Color = "#fff"
            },

            // This item is invalid
            new TaskItemDTO
            {
                Id = task1.Id,
                Title = "",
                Color = "Invalid color"
            }
        };


        // Assert
        Assert.ThrowsAsync<ValidationException>(async () =>
        {
            await testDatabase.UpdateTaskItemsAsync(taskItems);
        });
    }


    [Test]
    public async Task ShouldDeleteTaskItem()
    {
        // Arrange
        ITaskItemsDatabase testDatabase = GetTestDatabase();
        var taskItemDTO = await testDatabase.AddTaskItemAsync("test2", "#fff");

        // Act
        await testDatabase.DeleteTaskItemAsync(taskItemDTO.Id);

        // Assert
        var result = await testDatabase.GetTaskItems();

        result.Should().BeEmpty();
    }

    [Test]
    public async Task ShouldDeleteAllTaskItems()
    {
        // Arrange
        ITaskItemsDatabase testDatabase = GetTestDatabase();
        await testDatabase.AddTaskItemAsync("test1", "#fff");
        await testDatabase.AddTaskItemAsync("test2", "#fff");

        // Act
        await testDatabase.DeleteAllUserTaskItemsAsync();

        // Assert
        var result = await testDatabase.GetTaskItems();

        result.Should().BeEmpty();
    }
}


