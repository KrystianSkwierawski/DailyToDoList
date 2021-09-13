using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DailyToDoList.TaskItems;

public class TaskItem
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string Title { get; set; }

    public string CreatedBy { get; set; }
}
