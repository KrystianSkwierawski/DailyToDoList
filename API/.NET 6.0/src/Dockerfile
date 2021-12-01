#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
ENV ASPNETCORE_URLS=https://+:44381;http://+:44380
WORKDIR /app
EXPOSE 44380
EXPOSE 44381


FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["DailyToDoListAPI.csproj", "src/DailyToDoListAPI/"]
RUN dotnet restore "src/DailyToDoListAPI/DailyToDoListAPI.csproj" 
WORKDIR "/src/src/DailyToDoListAPI"
COPY . .
RUN dotnet build "DailyToDoListAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DailyToDoListAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DailyToDoListAPI.dll"]