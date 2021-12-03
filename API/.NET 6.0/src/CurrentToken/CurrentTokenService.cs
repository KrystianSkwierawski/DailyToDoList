using Microsoft.AspNetCore.Http;
using System;

namespace DailyToDoListAPI.CurrentToken;

public class CurrentTokenService : ICurrentTokenService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentTokenService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
    }

    public string? Token => _httpContextAccessor.HttpContext?.Request.Headers["Authorization"];
}
