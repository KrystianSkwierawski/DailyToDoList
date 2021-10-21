using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace DailyToDoListAPI.Configuration
{
    public interface IConfiguration
    {
        public void DefineEndpoints(WebApplication app);
        public void ConfigureServices(IServiceCollection services);
        public void Configure(WebApplication app);
    }
}
