using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Summoners.Api.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<SummonersContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SummonersContext") ?? throw new InvalidOperationException("Connection string 'SummonersContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IPostRepo, PostRepo>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    // app.UseCors(opt => 
    //     opt.SetIsOriginAllowed(origin => true));
    app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"));
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
