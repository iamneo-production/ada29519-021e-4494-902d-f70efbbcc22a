using AC_Service_API.Models;
using Microsoft.EntityFrameworkCore;

namespace AC_Service_API.Database
{
    public class AC_ServerDbContext:DbContext
    {
        public AC_ServerDbContext(DbContextOptions<AC_ServerDbContext>options):base(options)
        {
            
        }
        public DbSet<ProductModel> Products { get; set; }
        public DbSet<UserModel> Users { get; set; } 
        public DbSet<ServiceCenterModel> Services { get; set; }

        public DbSet<AdminModel> Admins { get; set; }
        public DbSet<LoginModel> LoginModels { get; set; }
    }
}
