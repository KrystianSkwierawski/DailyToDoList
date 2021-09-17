using DailyToDoList.TaskItems;
using FluentAssertions;
using NUnit.Framework;

namespace DailyToDoList.IntegrationTests.TaskItems
{
    using static Testing;
    public class TaskItemsDatabaseTests : TestBase
    {

        [Test]
        public async Task ShouldGetTaskItemDTOs()
        {
            // Arrange
            ITaskItemsDatabase testDatabase = GetTestDatabase();
            var taskItemDTO = await testDatabase.AddTaskItemAsync("test1", "#ffff");
            await testDatabase.AddTaskItemAsync("test2", "#ffff");

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
            await testDatabase.AddTaskItemAsync("test1", "#ffff");

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
            var taskItemDTO = await testDatabase.AddTaskItemAsync("test1", "#ffff");

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
            var taskItemDTO = await testDatabase.AddTaskItemAsync("test2", "#ffff");

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
            await testDatabase.AddTaskItemAsync("test1", "#ffff");
            await testDatabase.AddTaskItemAsync("test2", "#ffff");

            // Act
            await testDatabase.DeleteAllTaskItemsAsync();

            // Assert
            var result = await testDatabase.GetTaskItems();

            result.Should().BeEmpty();
        }
    }
}

