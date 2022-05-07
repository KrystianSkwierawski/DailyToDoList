<a href="https://wiktoriaskorek.com/"><p align="center"><img src="https://user-images.githubusercontent.com/52860350/161590205-358a23a4-4061-48d1-ae03-8c177dc8e71a.svg" alt="DailyToDoList"/></p><a/>

## Why was this project created?
The premise was that I needed a simple app where I could focus on learning new technologies and having fun with them.

## What did I learn, and what interesting did I do?
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

- This time an API and a client application are separate. The API works with the Web application, Windows application, Linux application, Mac application, Android application, and Chrome extension.

- <a href="https://youtu.be/scEDHsr3APg">CI/CD</a> - thanks to it , my application is tested, built, and deployed after commits. <a href="https://github.com/KrystianSkwierawski/DailyToDoList/tree/master/.github/workflows">Here</a> you can look at my workflows for the front-end and back-end.

- I used the non-relational cloud version of the MongoDB database. 

- I tested all the components etc., on Angular using karma.

- I used <a href="https://ngrx.io/">NgRx</a> to manage the Angular application state. 

- I Created an <a href="https://documenter.getpostman.com/view/18585475/UVJfkwBc">API documentation</a> using Postman

- I used a Docker Desktop Linux machine for application containerization. I connected API and the client web application via docker-compose.

- I added logging for a dev environment. After each use of the API, it logs some information about a request, response, and error, if any, occurs.

![todolist](https://user-images.githubusercontent.com/52860350/163707736-1fbcd559-eb3b-4192-810e-16a99d90c1df.jpg)

## Tools
### Back-end
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
 * VirtualBox

## Gettings Started
1. Install the lastest <a href="https://dotnet.microsoft.com/download/dotnet/6.0">.NET 6 SDK</a>
2. Install the latest <a href="https://nodejs.org/en/">Node.js LTS</a>
3. Navigate to ```API/.NET 6.0/src``` and run ```dotnet run``` to launch the back end (ASP.NET Core Web API)
4. Navigate to ```ClientApp``` and run ```npm install && ng s -o``` to launch the front end (Angular)

### Docker Configuration
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

ClientApp: http://localhost:4200/ is working with https://localhost:44381/

To disable Docker in Visual Studio, right-click on the **docker-compose** file in the **Solution Explorer** and select **Unload Project**.

## Android Application
1. Setup <a href="https://developer.android.com/studio/install">Android Studio SDK</a>
2. Navigate to ```ClientApp```
3. Run ```npm install```
4. Run ```ng build --prod```
5. Run ```npx cap add android```
6. Run ```npx cap copy android```
7. After the run ```npx cap open android```, Android Studio will open automatically

### Debug
1. Run the app using your phone with <a href="https://www.maztars.com/usb-debugging-is-it-safe/">USB debugging</a> or open the Android Virtual Device Manager. Create a new virtual device (hardware and Android version as you like). Start the device. Once the virtual device has booted, you can start the debug APK on your virtual device

### Build
1. Go to ```Build``` > ```Build Bundle(s) / APK (s)``` > ```Build APK(s)```
2. Android Studio will start building the APK for you. Once done, a pop-up on the bottom right will notify you of its completion. Click the ‘locate’ button in this dialog.
3. The ‘locate’ button should open File Explorer with the debug folder open that contains a file called “app-debug.apk”

### sources
- https://capacitorjs.com/solution/angular
- https://developer.android.com/studio/install
- https://www.maztars.com/usb-debugging-is-it-safe/
- https://youtu.be/Q0exX8u27i8

## Desktop Applications
1. Navigate to ```ClientApp```
2. Run ```npm install```

### Debug 
1. Run ```npm run start:electron```

### Build
1. Run ```npm install electron-packager -g```
2. After the run ```npm run electron-package```, will build your application and create an app consumable based on your operating system

### sources
- https://github.com/electron/electron-packager
- https://www.npmjs.com/package/ngx-electron
- https://www.christianengvall.se/electron-windows-installer/
- https://www.christianengvall.se/electron-installer-debian-package/
- https://www.christianengvall.se/dmg-installer-electron-app/

## Chrome Extension

### Build
1. Navigate to ```ClientApp```
2. Run ```npm install```
3. Uncomment ```@include chrome-extension;``` and ```@import 'scss/abstracts/mixins.scss';``` in ```src/styles.scss```
```
//@import 'scss/abstracts/mixins.scss'; <-- this line

body {
  margin: 0;
  font-family: Roboto, "Helvetica Neue", sans-serif;
  background-color: #282828;
  //@include chrome-extension; <-- this line
}
```
5. Uncomment ```"manifest.json"``` in ```angular.json```
```
 "assets": [
    //"manifest.json", <-- this line
    "src/favicon.ico",
    "src/assets"
],
```
6. Run ```ng build --prod```

#### Note
Chrome has some problems with loading styles. This is my solution to it.

1. Open ```dist/index.html``` in a code editor
2. Press ```Ctrl``` + ```f```
3. Replace ```rel="stylesheet"``` to ```rel="stylesheet" type="text/css"```
4. Replace ```rel="preconnect"``` to ```rel="stylesheet" type="text/css""```
5. Replace ```
rel="preload" as="style" onload="this.rel='stylesheet'"``` to ```rel="stylesheet" type="text/css"```
6. Delete or replace ```media="print" onload="this.media='all'"``` to empty line 

### <a href="https://github.com/KrystianSkwierawski/DailyToDoList/releases/tag/Chrome-Extension-v1.0.0">How to run</a>

### Sources
- https://medium.com/weekly-webtips/is-it-hard-to-create-a-chrome-extension-using-angular-d9fd6a5740f3

## Download
https://github.com/KrystianSkwierawski/DailyToDoList/releases

## Status
The project(demo) is finished. 

