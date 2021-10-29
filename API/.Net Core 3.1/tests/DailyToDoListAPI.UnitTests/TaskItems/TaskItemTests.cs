using DailyToDoListAPI.TaskItems;
using FluentAssertions;
using NUnit.Framework;
using System;

namespace DailyToDoListAPI.UnitTests.TaskItems
{
    public class TaskItemTests
    {
        [Test]
        public void ShouldReturnTaskItemDTO()
        {
            TaskItem taskItem = new TaskItem
            {
                Id = "1",
                Title = "title"
            };

            TaskItemDTO taskItemDTO = taskItem.ToDTO();

            taskItemDTO.Should().BeEquivalentTo(new TaskItemDTO
            {
                Id = "1",
                Title = "title",
                Color = "#6264A7",
                Completed = false,
                SubtaskItems = Array.Empty<SubtaskItem>()
            });
        }
    }
}
