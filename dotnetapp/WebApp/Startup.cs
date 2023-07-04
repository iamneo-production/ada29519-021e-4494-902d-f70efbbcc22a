using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
using WebApp.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
=======
>>>>>>> e94c7ec3019a41deb2d24763c3202d6d092d3d61
=======
>>>>>>> e94c7ec3019a41deb2d24763c3202d6d092d3d61
=======
>>>>>>> e94c7ec3019a41deb2d24763c3202d6d092d3d61
=======
>>>>>>> e94c7ec3019a41deb2d24763c3202d6d092d3d61
=======
>>>>>>> e94c7ec3019a41deb2d24763c3202d6d092d3d61
>>>>>>> Stashed changes
>>>>>>> 646a076bd82945c34896fb8c6d6fc015b1cd2f0f

namespace WebApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(option =>{option.AddPolicy("Mypolicy", builder =>{builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();});});
            services.AddSwaggerGen(c =>{c.SwaggerDoc("v2", new OpenApiInfo { Title = "WebApp", Version = "v2" });});
            services.AddAuthorization(); // add the required services for authorization
            services.AddControllers(); 
            services.AddDbContext<AppDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("SqlServerConnStr")));
            
          }
=======
>>>>>>> e94c7ec3019a41deb2d24763c3202d6d092d3d61
=======
>>>>>>> e94c7ec3019a41deb2d24763c3202d6d092d3d61
=======
>>>>>>> e94c7ec3019a41deb2d24763c3202d6d092d3d61
=======
>>>>>>> e94c7ec3019a41deb2d24763c3202d6d092d3d61
=======
>>>>>>> e94c7ec3019a41deb2d24763c3202d6d092d3d61
>>>>>>> Stashed changes
>>>>>>> 646a076bd82945c34896fb8c6d6fc015b1cd2f0f

        public IConfiguration Configuration { get; }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            app.UseSwagger();

            app.UseSwaggerUI(c =>{c.SwaggerEndpoint("/swagger/v2/swagger.json", "WebApp");});
            
            app.UseCors("Mypolicy");

            app.UseAuthentication();
=======
>>>>>>> e94c7ec3019a41deb2d24763c3202d6d092d3d61
=======
>>>>>>> e94c7ec3019a41deb2d24763c3202d6d092d3d61
=======
>>>>>>> e94c7ec3019a41deb2d24763c3202d6d092d3d61
=======
>>>>>>> e94c7ec3019a41deb2d24763c3202d6d092d3d61
=======
>>>>>>> e94c7ec3019a41deb2d24763c3202d6d092d3d61
>>>>>>> Stashed changes
>>>>>>> 646a076bd82945c34896fb8c6d6fc015b1cd2f0f

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
