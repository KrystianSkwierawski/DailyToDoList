using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;

var bulider = WebApplication.CreateBuilder();

var app = bulider.Build();

List<string> users = new();

app.MapGet("/api/users", () => users);
app.MapPost("/api/users", (string user) => users.Add(user));

app.Run();

