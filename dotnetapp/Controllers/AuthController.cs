using Microsoft.AspNetCore.Mvc;
using dotnetapp.DataDbContext;
using dotnetapp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Helpers;


namespace dotnetapp.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AcServiceDbContext _context;

        public AuthController(AcServiceDbContext ac_DbContext)
        {
            _context = ac_DbContext;
        }


        [HttpPost("admin/login")]
        public async Task<IActionResult> isAdminPresent([FromBody] LoginModel adminobj)
        {
            if (adminobj == null)
            {
                return BadRequest();
            }
            var admin = await _context.Admins.FirstOrDefaultAsync(x => x.Email == adminobj.Email);
            if (admin == null)
            {
                return NotFound(new { Message = "Account not found" });
            }
            if (!PasswordHasher.VerifyPassword(adminobj.Password, admin.Password))
            {
                return NotFound(new { Message = "Wrong password" });
            }
            return Created("",true);
        }


        [HttpPost("user/login")]
        public async Task<IActionResult> isUserPresent([FromBody] LoginModel userobj)
        {
            if (userobj == null)
            {
                return BadRequest();
            }
           
            var user = await _context.LoginModels.FirstOrDefaultAsync(x => x.Email == userobj.Email);
            if (user == null)
            {
                return NotFound(new { Message = "Account not found" });
            }
            if (!PasswordHasher.VerifyPassword(userobj.Password, user.Password))
            {
                return NotFound(new { Message = "Wrong password" });
            }
    
            return Created("",true);
        }



        [HttpPost("admin/signup")]
        public async Task<IActionResult> saveAdmin([FromBody] UserModel userobj)
        {
            if (userobj == null)
            {
                return BadRequest();
            }
            // var email = await _context.Admins.FirstOrDefaultAsync(x => x.Email == userobj.Email);
            // if (email != null)
            // {
            //     return BadRequest(new
            //     {
            //         Message = "Admin already exists"
            //     });
            // }
            userobj.Password = PasswordHasher.HashPassword(userobj.Password);
            await _context.Users.AddAsync(userobj);
            await _context.SaveChangesAsync();
            var admin = new AdminModel
            {
                Email = userobj.Email,
                Password = userobj.Password,
                UserRole = userobj.UserRole,
                MobileNumber = userobj.MobileNumber,
            };
            await _context.Admins.AddAsync(admin);
            await _context.SaveChangesAsync();
            return Created("", true);
        }

        [HttpPost("user/signup")]
        public async Task<IActionResult> saveUser([FromBody] UserModel userobj)
        {
            if (userobj == null)
            {
                return BadRequest(new
                {
                    Message = "something wrong"
                });
            }
            // var email = await _context.LoginModels.FirstOrDefaultAsync(x => x.Email == userobj.Email);
            // if (email != null)
            // {
            //     return BadRequest(new
            //     {
            //         Message = "User already exists"
            //     });
            // }
            userobj.Password = PasswordHasher.HashPassword(userobj.Password);
            await _context.Users.AddAsync(userobj);
            await _context.SaveChangesAsync();
            var loginobj = new LoginModel
            {
                Email = userobj.Email,
                Password = userobj.Password,
            };
            await _context.LoginModels.AddAsync(loginobj);
            await _context.SaveChangesAsync();
            return Created("", true);
        }
    }
}