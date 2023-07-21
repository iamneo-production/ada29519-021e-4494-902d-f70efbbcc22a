using AC_Service_API.Database;
using AC_Service_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace loginAPI.Controllers
{ 
    [ApiController]


    public class AuthController : ControllerBase
    {
        private readonly AC_ServerDbContext _context;
        public AuthController(AC_ServerDbContext ac_serverDbContext)
        {
            _context = ac_serverDbContext;

        }


        [HttpPost("admin/login")]
        public async Task<IActionResult> isAdminPresent([FromBody] LoginModel adminobj)
        {
            if (adminobj == null)
            {
                return BadRequest();
            }
            var admin = await _context.Users.FirstOrDefaultAsync(x => x.email == adminobj.email && x.password == adminobj.password);
            if (admin == null)
            {
                return NotFound(new { Message = "Account not found" });
            }
            return Ok(new { Message="Login success" });
        }


        [HttpPost("user/login")]
        public async Task<IActionResult> isUserPresent([FromBody] LoginModel userobj)
        {
            if (userobj == null)
            {
                return BadRequest();
            }
            var user = await _context.Users.FirstOrDefaultAsync(x => x.email == userobj.email && x.password == userobj.password);
            if (user == null)
            {
                return NotFound(new { Message = "Account not found" });
            }
            return Ok(new { Message = "Login success" });
        }



        [HttpPost("admin/signup")]
        public async Task<IActionResult> saveAdmin([FromBody] UserModel userobj)
        {
            if (userobj == null)
            {
                return BadRequest();
            }
            await _context.Users.AddAsync(userobj);
            await _context.SaveChangesAsync();
            var admin = new AdminModel
                {
                    email = userobj.email,
                    password = userobj.password,
                    mobileNumber = userobj.mobileNumber,
                    userRole = userobj.userRole
                };
                await _context.Admins.AddAsync(admin);
                await _context.SaveChangesAsync();
            return Ok(new
            {
                Message = "Admin added"
            });
        }
        
        [HttpPost("user/signup")]
        public async Task<IActionResult> saveUser([FromBody] UserModel userobj)
        {
            if (userobj == null)
            {
                return BadRequest();
            }
            await _context.Users.AddAsync(userobj);
            await _context.SaveChangesAsync();
            var loginObj = new LoginModel
            {
                email = userobj.email,
                password = userobj.password
            };
            await _context.LoginModels.AddAsync(loginObj);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                Message = "User added"
            });
        }
    }
}
