using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using acservice.Database;
using acservice.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace acservice.Controllers
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
            var admin = await _context.Users.FirstOrDefaultAsync(x => x.email == adminobj.email);
            if (admin == null)
            {
                return NotFound(new { Message = "Account not found" });
            }
            var pwd = await _context.Users.FirstOrDefaultAsync(x => x.email == adminobj.email && x.password == adminobj.password);
             if (admin == null)
            {
                return NotFound(new { Message = "Wrong Password" });
            }
            return Ok(new { Message="Login success" ,admin.userRole});
        }


        [HttpPost("user/login")]
        public async Task<IActionResult> isUserPresent([FromBody] LoginModel userobj)
        {
            if (userobj == null)
            {
                return BadRequest();
            }
            var user = await _context.Users.FirstOrDefaultAsync(x => x.email == userobj.email );
            if (user == null)
            {
                return NotFound(new { Message = "Account not found" });
            }
            var pwd = await _context.Users.FirstOrDefaultAsync(x => x.email == userobj.email && x.password == userobj.password);
            if (pwd == null)
            {
                return NotFound(new { Message = "Wrong password" });
            }
            return Ok(new { Message = "Login successfull" ,user.userRole,user.userName});
        }



        [HttpPost("admin/signup")]
        public async Task<IActionResult> saveAdmin([FromBody] UserModel userobj)
        {
            if (userobj == null)
            {
                return BadRequest();
            }
            var email = await _context.Users.FirstOrDefaultAsync(x => x.email == userobj.email);
            if(email!=null){
                return BadRequest(new
            {
                Message = "Admin already exists"
            });
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
            var email = await _context.Users.FirstOrDefaultAsync(x => x.email == userobj.email);
            if(email!=null){
                return BadRequest(new
                {
                    Message = "User already exists"
                });
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
