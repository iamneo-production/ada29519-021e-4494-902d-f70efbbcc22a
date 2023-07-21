<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d0569e4f3a0fc1311b5f2bfdf431ff18b4694f3e
// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Builder;
// using Microsoft.AspNetCore.Hosting;
// using Microsoft.AspNetCore.HttpsPolicy;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.Hosting;
// using Microsoft.Extensions.Logging;
// using Microsoft.OpenApi.Models;

// namespace acservice
// {
//     public class Startup
//     {
//         public Startup(IConfiguration configuration)
//         {
//             Configuration = configuration;
//         }

//         public IConfiguration Configuration { get; }

//         // This method gets called by the runtime. Use this method to add services to the container.
//         public void ConfigureServices(IServiceCollection services)
//         {

//             services.AddControllers();
//             services.AddSwaggerGen(c =>
//             {
//                 c.SwaggerDoc("v1", new OpenApiInfo { Title = "acservice", Version = "v1" });
//             });
//         }

//         // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
//         public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//         {
//             if (env.IsDevelopment())
//             {
//                 app.UseDeveloperExceptionPage();
//                 app.UseSwagger();
//                 app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "acservice v1"));
//             }

//             app.UseHttpsRedirection();

//             app.UseRouting();

//             app.UseAuthorization();

//             app.UseEndpoints(endpoints =>
//             {
//                 endpoints.MapControllers();
//             });
//         }
//     }
// }
<<<<<<< HEAD
=======
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
=======
>>>>>>> d0569e4f3a0fc1311b5f2bfdf431ff18b4694f3e
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
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using acservice.Database;
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
=======

>>>>>>> d0569e4f3a0fc1311b5f2bfdf431ff18b4694f3e
namespace acservice
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
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
=======

>>>>>>> d0569e4f3a0fc1311b5f2bfdf431ff18b4694f3e
            services.AddControllers();
            services.AddCors(options =>
            {
                options.AddPolicy("MyPolicy", x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });

            // Configure database
            // var cs = Configuration.GetConnectionString("connectionString");
<<<<<<< HEAD
<<<<<<< HEAD
            var connectionString = "User ID=sa;password=examlyMssql@123;server=localhost;Database=BackEND;trusted_connection=false; Persist Security Info=False;Encrypt=False";
            
            services.AddDbContext<AC_ServerDbContext>(options => options.UseSqlServer(connectionString));
=======
            var connectionString = "User ID=sa;password=examlyMssql@123;server=localhost;Database=acservice;trusted_connection=false; Persist Security Info=False;Encrypt=False";
            
            services.AddDbContext<AC_ServerDbContext>(options => options.UseSqlServer(connectionString));
           
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
=======
            var connectionString = "User ID=sa;password=examlyMssql@123;server=localhost;Database=BackEND;trusted_connection=false; Persist Security Info=False;Encrypt=False";
            
            services.AddDbContext<AC_ServerDbContext>(options => options.UseSqlServer(connectionString));
>>>>>>> d0569e4f3a0fc1311b5f2bfdf431ff18b4694f3e
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "acservice", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "acservice v1"));
            }
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
=======

>>>>>>> d0569e4f3a0fc1311b5f2bfdf431ff18b4694f3e
            app.UseCors("MyPolicy");
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
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
=======

>>>>>>> d0569e4f3a0fc1311b5f2bfdf431ff18b4694f3e
