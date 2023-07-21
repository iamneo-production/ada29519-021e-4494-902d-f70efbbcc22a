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
using Microsoft.OpenApi.Models;
using AC_Service_API.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.HttpOverrides;


namespace AC_SERVICE_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
       public void ConfigureServices(IServiceCollection services)
{
    services.AddCors(options =>
    {
        options.AddPolicy("MyPolicy", x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
    });

    services.AddControllers();

    services.AddSwaggerGen(c =>
    {
        
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "AC_SERVICE_API", Version = "v1" });
        c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First()); 
    });

    // Configure database
    var cs = Configuration.GetConnectionString("DefaultConnectionString");
    services.AddDbContext<AC_ServerDbContext>(options => options.UseSqlServer(cs));
}


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("./v1/swagger.json", "AC_SERVICE_API v1"));
                
            }

            
            app.UseRouting();

            app.UseCors("MyPolicy");

            app.UseAuthentication();
            app.UseAuthorization();
             app.UseForwardedHeaders(new ForwardedHeadersOptions
    {
        ForwardedHeaders = ForwardedHeaders.XForwardedProto
    });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

    }
}