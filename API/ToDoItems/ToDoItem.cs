using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DailyToDoList.ToDoItems;

public class ToDoItem
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string Title { get; set; }

    public string CreatedBy { get; set; }
}
