using FluentValidation;

namespace DailyToDoListAPI.TaskItems
{
    public class TaskItemValidator : AbstractValidator<TaskItem>
    {
        public TaskItemValidator()
        {
            RuleFor(task => task.Title)
                .NotEmpty()
                .NotNull()
                .MaximumLength(40).WithMessage("The maximum title length is 40.");

            RuleFor(task => task.Color)
               .Matches("^#(?:[0-9a-fA-F]{3}){1,2}$");


            RuleFor(task => task.CreatedBy)
                .MinimumLength(3).WithMessage("The minimum token length is 3.")
                .MaximumLength(40).WithMessage("The maximum token length is 40.");
        }
    }
}

