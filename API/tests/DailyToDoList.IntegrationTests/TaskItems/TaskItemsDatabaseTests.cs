using DailyToDoList.IntegrationTests;
using DailyToDoList.TaskItems;
using FluentAssertions;
using NUnit.Framework;

namespace DailyToDoListTests.TaskItems;

using static Testing;
public class TaskItemsDatabaseTests : TestBase
{

    [Test]
    public async Task ShouldGetTaskItemDTOs()
    {
        // Arrange
        ITaskItemsDatabase testDatabase = GetTestDatabase();
        var id = await testDatabase.AddTaskItemAsync("test1");
        await testDatabase.AddTaskItemAsync("test2");

        // Act
        var result = await testDatabase.GetTaskItems();

        // Assert

        result.Count().Should().Be(2);

        result.First().Should().BeEquivalentTo(new TaskItemDTO
        {
            Id = id,
            Title = "test1",
            Color = "#6264A7",
            Completed = false,
            SubtaskItems = Array.Empty<SubtaskItem>()
        });
    }

    [Test]
    public async Task ShouldAddTaskItem()
    {
        // Arrange
        ITaskItemsDatabase testDatabase = GetTestDatabase();

        // Act
        await testDatabase.AddTaskItemAsync("test1");

        // Assert
        var result = await testDatabase.GetTaskItems();

        result.First().Title.Should().Be("test1");
        result.Count().Should().Be(1);
    }

    [Test]
    public async Task ShouldUpdateTaskItem()
    {
        // Arrange
        ITaskItemsDatabase testDatabase = GetTestDatabase();
        var id = await testDatabase.AddTaskItemAsync("test1");

        TaskItemDTO taskItemDTO = new()
        {
            Id = id,
            Title = "test2",
            Color = "#ffff",
            Completed = true
        };

        // Act
        await testDatabase.UpdateTaskItemAsync(taskItemDTO);

        // Assert
        var result = await testDatabase.GetTaskItems();

        result.First().Should().BeEquivalentTo(taskItemDTO);
    }

    [Test]
    public async Task ShouldDeleteTaskItem()
    {
        // Arrange
        ITaskItemsDatabase testDatabase = GetTestDatabase();
        var id = await testDatabase.AddTaskItemAsync("test2");

        // Act
        await testDatabase.DeleteTaskItemAsync(id);

        // Assert
        var result = await testDatabase.GetTaskItems();

        result.Should().BeEmpty();
    }

    [Test]
    public async Task ShouldDeleteAllTaskItems()
    {
        // Arrange
        ITaskItemsDatabase testDatabase = GetTestDatabase();
        await testDatabase.AddTaskItemAsync("test1");
        await testDatabase.AddTaskItemAsync("test2");

        // Act
        await testDatabase.DeleteAllTaskItemsAsync();

        // Assert
        var result = await testDatabase.GetTaskItems();

        result.Should().BeEmpty();
    }
}