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
                .MaximumLength(40).WithMessage("The maximum title length is 25.");

            RuleFor(task => task.Color)
                .MaximumLength(40).WithMessage("The maximum color length is 25.");


            RuleFor(task => task.CreatedBy)
                .MinimumLength(3).WithMessage("The minimum token length is 3.")
                .MaximumLength(40).WithMessage("The maximum token length is 25.");
        }
    }
}

