using acservice.Database;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
#region config cros
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyPolicy", x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});
#endregion
// var connectionString = "User ID=sa;password=examlyMssql@123;server=localhost;Database=BackEND;trusted_connection=false; Persist Security Info=False;Encrypt=False";
           
#region config database
var cs = "User ID=sa;password=examlyMssql@123;server=localhost;Database=BackEND;trusted_connection=false; Persist Security Info=False;Encrypt=False";

builder.Services.AddDbContext<AC_ServerDbContext>(options => options.UseSqlServer(cs));
#endregion

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("MyPolicy");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

