using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace DailyToDoListAPI.TaskItems
{
    public class TaskItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Title { get; set; }

        public string CreatedBy { get; set; }

        public string Color { get; set; } = "#6264A7";

        public bool Completed { get; set; } = false;

        public IList<SubtaskItem> SubtaskItems { get; set; } = new List<SubtaskItem>();


        public TaskItemDTO ToDTO()
        {
            return new TaskItemDTO
            {
                Id = Id,
                Title = Title,
                Color = Color,
                Completed = Completed,
                SubtaskItems = SubtaskItems
            };
        }
    }
}


