# DailyToDoList

## Why this project was created?
The premise was that I needed a simple app where I could focus on learning new technologies and having fun with them.

## What did I learn and what interesting did I do?
- I created a <a href="https://youtu.be/9OPyORGBB6Q">Minimal API with .NET 6</a>, at the beginning it contained only a few lines of code and it looked like this.
```c#
var bulider = WebApplication.CreateBuilder();
var app = bulider.Build();

app.MapGet("/api/tasks", async () => await database.GetTaskItems());
app.MapPost("/api/tasks", async (string title, string color) => await database.AddTaskItemAsync(title, color));
app.MapPut("/api/tasks/{id}", async (TaskItemDTO taskItemDTO) => await database.UpdateTaskItemAsync(taskItemDTO));
app.MapPut("/api/tasks", async (List<TaskItemDTO> taskItemDTOs) => await database.UpdateTaskItemsAsync(taskItemDTOs));
app.MapDelete("/api/tasks/{id}", async (string id) => await database.DeleteTaskItemAsync(id));
app.MapDelete("/api/tasks", async () => await database.DeleteAllUserTaskItemsAsync());

app.Run();
```
During the project API, it has expanded a little, but it is still quite small.

- This time API and clientapp are separate applications, thanks to this, the API is universal and can be used, for example, for mobile or desktop applications.

- I used the non-relational cloud version of the MongoDB database. 

- I tested all the components etc on Angular using karma. 

- I used NgRx to manage the application state. 

- I used Docker Desktop Linux machine for application containerization, I connected API and client application via docker-compose.

- The API architecture is broken down into functionalities, not types, this time.

    - architecture divided into types.

      ![image](https://user-images.githubusercontent.com/52860350/138107966-dfda2578-a4ac-461c-8ea3-d2e89140dfbc.png)
     
    - architecture divided into functionalities, everything that is, for example, related to the TaskItems is in one place close to each other.

      ![image](https://user-images.githubusercontent.com/52860350/138107797-e5ab8ca8-3ad2-4c99-9f81-e9aba6b6a3df.png)


## Tools:
 * C#
 * .NET 6.0
 * MongoDB
 * NUnit

### Front-end
 * Angular
 * TypeScript
 * Sass
 * HTML5 
 * Angular Material
 
 ### Other
 * Docker
 * Trello
 * JustColorPicker
 * Visual Studio
 * Git
 * Postman
 * Android Studio

## Docker Configuration

In order to get Docker working, you will need to add a temporary SSL cert and mount a volume to hold that cert.
You can find [Microsoft Docs](https://docs.microsoft.com/en-us/aspnet/core/security/docker-https?view=aspnetcore-3.1) that describe the steps required for Windows, macOS, and Linux.

For Windows:
The following will need to be executed from your terminal to create a cert
`dotnet dev-certs https -ep %USERPROFILE%\.aspnet\https\aspnetapp.pfx -p Your_password123`
`dotnet dev-certs https --trust`

NOTE: When using PowerShell, replace %USERPROFILE% with $env:USERPROFILE.

FOR macOS:
`dotnet dev-certs https -ep ${HOME}/.aspnet/https/aspnetapp.pfx -p Your_password123`
`dotnet dev-certs https --trust`

FOR Linux:
`dotnet dev-certs https -ep ${HOME}/.aspnet/https/aspnetapp.pfx -p Your_password123`

In order to build and run the docker containers, execute `docker-compose -f docker-compose.yml up --build` from the DailyToDoList/Compose where you find the docker-compose.yml file. You can also use "Docker Compose" from Visual Studio for Debugging purposes.
Then open on your browser.

API: https://localhost:44381/  /  http://localhost:44380/

ClientApp: http://localhost:4200/ is working with API https://localhost:44381/

To disable Docker in Visual Studio, right-click on the **docker-compose** file in the **Solution Explorer** and select **Unload Project**.
 
## Status
Project is in progress.

